export enum EType { Super, Normal }

export interface IUser {
  Id: string;
  FirstName: string;
  LastName: string;
  UserName: string;
  Password: string;
  Type: EType;
}
