import { Guid } from "guid-typescript";

export interface IVerifyAccountDTO {
  emailAddress: string;
  verifyGuid: Guid;
}
