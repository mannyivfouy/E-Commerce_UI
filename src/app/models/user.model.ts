export interface User {
  _id?: string;
  fullname: string;
  email: string;
  password: string;
  role: 'Admin' | 'User';
  status: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
