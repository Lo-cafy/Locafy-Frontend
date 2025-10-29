import { useState, useEffect, useCallback } from 'react';
import api from '@/Api/baseurl';
import { toast } from 'react-toastify';

type KycStatus = "Pending" | "Verified" | "Rejected";
type DocumentType = "Passport" | "DriversLicense" | "NationalId";

export interface KycSubmission {
  id: number;
  documentType: DocumentType;
  documentFrontUrl: string;
  documentBackUrl?: string;
  status: KycStatus;
  submittedAt: string;
  reviewerNotes?: string;
}

interface KYCData {
  documentType: string;
  documentNumber: string;
  frontSide: File | null;
  backSide: File | null;
  photo: File | null;
}

export function useKYC() {
  // KYC Submissions State
  const [submission, setSubmission] = useState<KycSubmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // KYC Form State
  const [showKYCModal, setShowKYCModal] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [kycData, setKycData] = useState<KYCData>({
    documentType: 'Passport',
    documentNumber: '',
    frontSide: null,
    backSide: null,
    photo: null
  });

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch KYC Submissions
  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/kyc/my-submissions", { withCredentials: true });
      if (res.data.success && res.data.data.length > 0) {
        setSubmission(res.data.data[0]);
      } else {
        setSubmission(null);
      }
    } catch (error) {
      console.error("Failed to fetch KYC status:", error);
      setError("Could not load your KYC status.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  // File Change Handler
  const handleFileChange = (field: 'frontSide' | 'backSide') => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        setKycData(prev => ({ ...prev, [field]: e.target.files![0] }));
      }
    };

  // Camera Capture Handler
  const handleCameraCapture = (file: File) => {
    setKycData(prev => ({ ...prev, photo: file }));
    setShowCamera(false);
  };

  // Submit KYC
  const handleKYCSubmit = async () => {
    if (!kycData.documentNumber || !kycData.frontSide || !kycData.photo) {
      setErrorMessage("Please fill all required fields");
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('DocumentType', kycData.documentType);
      formData.append('DocumentNumber', kycData.documentNumber);
      formData.append('FrontSide', kycData.frontSide);
      
      if (kycData.backSide) {
        formData.append('BackSide', kycData.backSide);
      }
      
      formData.append('Photo', kycData.photo);

      const response = await api.post('/kyc/submit', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setSubmitStatus('success');
        setTimeout(() => {
          setShowKYCModal(false);
          resetForm();
          fetchSubmissions(); // Refresh submissions
        }, 2000);
      } else {
        toast.error(response.data.message)
        throw new Error(response.data.message || 'Failed to submit KYC');
      }

    } catch (error: any) {
      console.error('Error submitting KYC:', error);
      setSubmitStatus('error');
      setErrorMessage(error.response?.data?.message || error.message || 'Failed to submit KYC');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset Form
  const resetForm = () => {
    setKycData({
      documentType: 'Passport',
      documentNumber: '',
      frontSide: null,
      backSide: null,
      photo: null
    });
    setSubmitStatus('idle');
    setErrorMessage('');
  };

  // Open Camera
  const openCamera = () => {
    setShowCamera(true);
  };

  return {
    // Submission Data
    submission,
    loading,
    error,
    refetch: fetchSubmissions,

    // Modal State
    showKYCModal,
    setShowKYCModal,
    showCamera,
    setShowCamera,

    // Form Data
    kycData,
    setKycData,

    // Handlers
    handleFileChange,
    handleCameraCapture,
    handleKYCSubmit,
    openCamera,

    // Submission Status
    isSubmitting,
    submitStatus,
    errorMessage
  };
}