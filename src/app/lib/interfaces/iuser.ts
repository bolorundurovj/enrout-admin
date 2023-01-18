export interface IUser {
  firstName: string;
  lastName: string;
  role: UserType;
  email: string;
  phone: string;
  avatar?: string;
  isActive?: boolean;
}
