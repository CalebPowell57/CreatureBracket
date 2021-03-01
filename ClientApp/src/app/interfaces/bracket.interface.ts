import { Guid } from "guid-typescript";

export enum EStatus { Open, Started, Completed }

export interface IBracket {
  Id: string;
  Status: EStatus;
  CreatureEntryDeadline: Date;
  WinnerId: Guid;
}
