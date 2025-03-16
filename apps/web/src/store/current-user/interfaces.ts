import { UserOutput } from "@/api/encore-client/services/users/interfaces";

export interface CurrentUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface CurrentUserState {
  currentUser: CurrentUser | null;
  setCurrentUser: (user: UserOutput | null) => void;
  clearCurrentUser: () => void;
}
