import { IUserRoundDTO } from "./UserRoundDTO.interface";

export interface IUserBracketDTO {
  rounds: IUserRoundDTO[];
  userName: string;
}
