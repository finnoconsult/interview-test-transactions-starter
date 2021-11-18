export interface Health {
  status: 'OK' | string;
  userCount: number;
  started: Date | null;
}
