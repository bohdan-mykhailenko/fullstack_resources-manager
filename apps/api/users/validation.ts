import { MaxLen, MinLen } from "encore.dev/validate";

export interface SignUpInput {
  first_name: string & (MinLen<1> & MaxLen<50>);
  last_name: string & (MinLen<1> & MaxLen<50>);
  email: string & (MinLen<1> & MaxLen<50>);
  password: string & (MinLen<6> & MaxLen<50>);
}

export interface SignInInput {
  email: string & (MinLen<1> & MaxLen<50>);
  password: string & (MinLen<6> & MaxLen<50>);
}
