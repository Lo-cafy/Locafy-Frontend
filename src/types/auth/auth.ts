export interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  hydrateFromStorage: () => void;
  logout: () => void;
}

export interface FacebookUser {
  id: string;
  name: string;
  email: string;
  picture?: {
    data: {
      url: string;
    };
  };
}

export interface FacebookResponse {
  accessToken: string;
  userID: string;
  expiresIn: number;
}


