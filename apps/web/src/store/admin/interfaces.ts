export interface AdminState {
  isAdmin: boolean;
  setAdminToken: (token: string) => void;
  clearAdminToken: () => void;
}
