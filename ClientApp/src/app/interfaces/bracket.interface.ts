import { Guid } from "guid-typescript";

export enum EStatus { Open, Started, Completed }

export interface IBracket {
  id: Guid;
  title: string;
  status: EStatus;
  creatureEntryDeadline: Date;
  winnerId: Guid;
}
export interface NgttTournament {
  rounds: NgttRound[];
}

export interface NgttRound {
  /**
   * The type determines where in which branch to place a match.
   * SingleElimination-Trees only consist of a winnerbracket and a final
   */
  matchups: any[];
}
