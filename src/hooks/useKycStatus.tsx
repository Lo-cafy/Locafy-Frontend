import { useState, useEffect, useCallback } from 'react';
import api from '@/Api/baseurl';

type KycStatus = "Pending" | "Verified" | "Rejected";
type DocumentType = "Passport" | "DriversLicense" | "NationalID";

export interface KycSubmission {
  id: number;
  documentType: DocumentType;
  documentFrontUrl: string;
  documentBackUrl?: string;
  status: KycStatus;
  submittedAt: string;
  reviewerNotes?: string;
}

export function useKYCStatus() {
  const [submission, setSubmission] = useState<KycSubmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/kyc/my-submissions", { withCredentials: true });
      if (res.data.success && res.data.data.length > 0) {
        // Assuming the API returns the most recent submission first
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

  const refetch = () => {
    fetchSubmissions();
  };

  return {
    submission,
    loading,
    error,
    refetch
  };
}
