export interface User {
  id: number;
  user: string;
  issuance_date: Date;
  return_date: Date;
  actual_return_date: Date | null;
  body: number;
  percent: number;
}
