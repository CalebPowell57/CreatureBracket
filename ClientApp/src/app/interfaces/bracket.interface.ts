import { Guid } from "guid-typescript";

export enum EStatus { Open, Started, Completed }

export interface IBracket {
  id: Guid;
  title: string;
  status: EStatus;
  BracketSubmissionDeadline: Date;
  CompletedDateTime: Date;
  winnerId: Guid;
}
