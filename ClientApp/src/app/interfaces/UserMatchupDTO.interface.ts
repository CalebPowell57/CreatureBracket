import { IUserCreatureDTO } from "./UserCreatureDTO.interface";

export interface IUserMatchupDTO {
  creature1: IUserCreatureDTO;
  creature2: IUserCreatureDTO;
  roundRank: number;
  matchupSeed: number;
  unset: boolean;
}
