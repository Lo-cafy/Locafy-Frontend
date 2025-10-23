import { useState, useEffect } from 'react';
import api from '@/Api/baseurl';

interface BankAccount {
  id: number;
  accountHolderName: string;
  accountNumber: string;
  bankName: string;
  ifscCode: string;
  accountType: string;
}

interface BankFormData {
  accountHolderName: string;
  accountNumber: string;
  bankName: string;
  ifscCode: string;
  accountType: string;
}

interface UPIAccount {
  id?: number;
  upiId: string;
  name: string;
}

interface UPIFormData {
  upiId: string;
  name: string;
}

interface ValidationErrors {
  accountHolderName?: string;
  accountNumber?: string;
  bankName?: string;
  ifscCode?: string;
  accountType?: string;
  upiId?: string;
  name?: string;
}

export function usePaymentStore() {
  const [bank, setBank] = useState<BankAccount | null>(null);
  const [upi, setUpi] = useState<UPIAccount | null>(null);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});

  const [dataBank, setDataBank] = useState<BankFormData>({
    accountHolderName: '',
    accountNumber: '',
    bankName: '',
    ifscCode: '',
    accountType: 'Savings'
  });

  const [dataUPI, setDataUPI] = useState<UPIFormData>({
    upiId: '',
    name: ''
  });

  const fetchBankDetails = async () => {
    try {
      const response = await api.get('/payment/bank-account', { withCredentials: true });
      if (response.data.success && response.data.data) {
        setBank(response.data.data);
        setDataBank({
          accountHolderName: response.data.data.accountHolderName || '',
          accountNumber: response.data.data.accountNumber || '',
          bankName: response.data.data.bankName || '',
          ifscCode: response.data.data.ifscCode || '',
          accountType: response.data.data.accountType || 'Savings'
        });
      } else {
        setEdit(true);  
      }
    } catch (error) {
      console.error('Failed to fetch bank details:', error);
      setEdit(true);  
    }
  };

  useEffect(() => {
    fetchBankDetails();
  }, []);

  const changeBank = (key: string, value: string) => {
    setDataBank(prev => ({ ...prev, [key]: value }));
    if (errors[key as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const validateBank = () => {
    const e: ValidationErrors = {};
    if (!dataBank.accountHolderName) e.accountHolderName = 'Account holder name is required';
    if (!dataBank.accountNumber) e.accountNumber = 'Account number is required';
    if (!dataBank.bankName) e.bankName = 'Bank name is required';
    if (!dataBank.ifscCode) e.ifscCode = 'IFSC code is required';
    if (dataBank.ifscCode && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(dataBank.ifscCode)) {
      e.ifscCode = 'Invalid IFSC code format';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submitBank = async () => {
    setErr('');
    setSuccess('');
    
    if (!validateBank()) {
      setErr('Please fix the validation errors');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/payment/bank-account', dataBank, { withCredentials: true });
      if (response.data.success) {
        setSuccess('Bank details saved successfully!');
        setEdit(false);
        await fetchBankDetails();
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      setErr(err.response?.data?.message || 'Failed to save bank details');
    } finally {
      setLoading(false);
    }
  };

  const changeUPI = (key: string, value: string) => {
    setDataUPI(prev => ({ ...prev, [key]: value }));
    if (errors[key as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const submitUPI = async () => {
    setLoading(true);
    setErr('');
    setSuccess('');
    
    const e: ValidationErrors = {};
    if (!dataUPI.upiId) e.upiId = 'UPI ID is required';
    if (!dataUPI.name) e.name = 'Name is required';
    
    if (Object.keys(e).length > 0) {
      setErrors(e);
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/payment/upi-account', dataUPI, { withCredentials: true });
      if (response.data.success) {
        setSuccess('UPI details saved successfully!');
        setEdit(false);
        setUpi(response.data.data);
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      setErr(err.response?.data?.message || 'Failed to save UPI details');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (bank) {
      setDataBank({
        accountHolderName: bank.accountHolderName || '',
        accountNumber: bank.accountNumber || '',
        bankName: bank.bankName || '',
        ifscCode: bank.ifscCode || '',
        accountType: bank.accountType || 'Savings'
      });
    }
    if (upi) {
      setDataUPI({
        upiId: upi.upiId || '',
        name: upi.name || ''
      });
    }
    setEdit(false);
    setErr('');
    setErrors({});
  };

  return {
    bank,
    upi,
    dataBank,
    dataUPI,
    edit,
    loading,
    err,
    success,
    errors,
    changeBank,
    changeUPI,
    submitBank,
    submitUPI,
    handleCancel,
    setEdit
  };
}
