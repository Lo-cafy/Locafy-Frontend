export type User = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isVerified: boolean;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  profileImage?: string;
};

export type UserRole = 'admin' | 'user' | 'provider';
export type UserStatus = 'active' | 'inactive' | 'suspended';

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