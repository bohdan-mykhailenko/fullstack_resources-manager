import { UserOutput } from "@/api/services/users/interfaces";

export interface CurrentUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  isConfirmed: boolean;
}

export interface CurrentUserState {
  currentUser: CurrentUser | null;
  setCurrentUser: (user: UserOutput | null) => void;
  clearCurrentUser: () => void;
}
