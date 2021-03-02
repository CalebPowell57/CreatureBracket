import { Guid } from "guid-typescript";

export interface ICreatureSubmission {
  id: Guid;
  bracketId: Guid;
  name: string;
  bio: string;
  entryDate: Date;
}
