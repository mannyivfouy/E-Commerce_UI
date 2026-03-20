export interface User {
  _id?: string;
  fullname: string;
  email: string;
  password: string;
  role: 'Admin' | 'User';
  createdAt?: Date;
  updatedAt?: Date;
}
