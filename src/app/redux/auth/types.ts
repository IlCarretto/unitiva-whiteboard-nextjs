export interface UserState {
  user: {
    email: string | null | undefined;
    image: string | null | undefined;
    name: string | null | undefined;
  };
  isAuth: boolean;
}
