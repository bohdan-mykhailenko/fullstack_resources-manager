export interface UserCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends UserCredentials {
  firstName: string;
  lastName: string;
  passwordConfirmation: string;
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
