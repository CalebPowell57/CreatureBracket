import { Guid } from "guid-typescript";

export interface IChatMessage {
  chatMessageId: Guid;
  user: string;
  userName: string;
  message: string;
  systemDateTime: Date;
  image: string;
}
