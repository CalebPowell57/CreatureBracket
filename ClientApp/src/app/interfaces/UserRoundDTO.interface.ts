import { IUserMatchupDTO } from "./UserMatchupDTO.interface";

export interface IUserRoundDTO {
  matchups: IUserMatchupDTO[];
  rank: number;
}
