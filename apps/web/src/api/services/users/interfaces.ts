export interface SignInInput {
  email: string;
  password: string;
}

export interface SignUpInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserOutput {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  is_confirmed: boolean;
}

export interface RefreshTokenOutput {
  accessToken: string;
}

export interface ConfirmEmailInput {
  token: string;
}

export interface ConfirmEmailOutput {
  message: string;
}
