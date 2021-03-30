import { Guid } from "guid-typescript";

export interface IChatMessage {
  chatMessageId: Guid;
  user: string;
  accountId: Guid;
  message: string;
  systemDateTime: Date;
}
