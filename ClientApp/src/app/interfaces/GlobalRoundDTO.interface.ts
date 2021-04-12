import { IGlobalMatchupDTO } from './GlobalMatchupDTO.interface';
export interface IGlobalRoundDTO {
  matchups: IGlobalMatchupDTO[];
  rank: number;
}
