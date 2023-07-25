export interface Room {
  userName: string | null | undefined;
  roomId: string;
  userId: string;
  host: boolean;
  presenter: boolean;
}
