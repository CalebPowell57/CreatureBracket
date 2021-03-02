export enum EType { Super, Normal }

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  type: EType;
}
