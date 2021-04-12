import { IGlobalCreatureDTO } from "./GlobalCreatureDTO.interface";
import { IVote } from "./vote.interface";

export interface IGlobalMatchupDTO {
  contestants: IGlobalCreatureDTO[];
  current: boolean;
  matchupId: string;
  matchupSeed: number;
  roundRank: number;
  unset: boolean;
  vote: IVote;
}
