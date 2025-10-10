export interface PersonalInfoFormData {
  firstName: string;
  lastName: string;
  age: string;
  phone: string;
  address: string;
}

export interface AccountInfoFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface PersonalInfoStepProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
}

export interface AccountInfoStepProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
}


