import api from '@/Api/baseurl';
import { useState } from 'react';

interface UseAvatarUploadProps {

  onSuccess: (newAvatarUrl: string) => void;

  onError?: (message: string) => void;
}

export const useAvatarUpload = ({ onSuccess, onError }: UseAvatarUploadProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return; 
    }
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('File', file);

    setIsLoading(true);
    setError(null);

    try {
      const response = await api.patch('users/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

   
      const newUrl = response.data.data.avatarUrl; 
      
      onSuccess(newUrl);

    } catch (err: any) {
      console.error('Error uploading avatar:', err);
      const errorMessage = err.response?.data?.message || 'Upload failed. Please try again.';
      setError(errorMessage);
      
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    
    uploadAvatar, 
   
    isLoading, 
    
    error 
  };
};