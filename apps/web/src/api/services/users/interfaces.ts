export interface SignInInput {
  email: string;
  password: string;
}

export interface SignUpInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface UserOutput {
  id: string;
  first_name: string;
  last_name: string;
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
