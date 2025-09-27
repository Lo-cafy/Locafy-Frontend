export type UserStatus = 'Active' | 'Inactive' | 'Pending';
export type UserRole = 'Admin' | 'Provider' | 'Customer';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  joinDate: string;
  phone?: string;
  address?: string;
}

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: User;
  token: string;
  refreshToken: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
};

export type AuthTokens = {
  token: string;
  refreshToken: string;
};

export type ResetPasswordRequest = {
  email: string;
  token: string;
  password: string;
};

export type VerifyEmailRequest = {
  token: string;
};