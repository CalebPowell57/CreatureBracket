import { Guid } from "guid-typescript";

export interface IChatMessage {
  chatMessageId: Guid;
  user: string;
  userId: Guid;
  message: string;
  systemDateTime: Date;
}
