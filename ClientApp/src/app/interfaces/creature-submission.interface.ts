import { Guid } from "guid-typescript";

export enum eCreatureSubmissionStatus { Pending, Approved }

export interface ICreatureSubmission {
  id: Guid;
  bracketId: Guid;
  name: string;
  bio: string;
  entryDate: Date;
  status: eCreatureSubmissionStatus;
  image: string;
}
