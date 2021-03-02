import { Guid } from "guid-typescript";

export enum EStatus { Open, Started, Completed }

export interface IBracket {
  id: Guid;
  title: string;
  status: EStatus;
  creatureEntryDeadline: Date;
  winnerId: Guid;
}
