export interface User {
    name: string;
    password: string;
    currency: string;
    amount: number;
}

export interface ApiResponse {
  status: boolean;
  data: User[];
}