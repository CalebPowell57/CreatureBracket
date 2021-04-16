import { IAccountSettingDTO } from "./AccountSettingDTO.interface";

export interface IAccountSettingGroupDTO {
  title: string;
  settings: IAccountSettingDTO[];
}
