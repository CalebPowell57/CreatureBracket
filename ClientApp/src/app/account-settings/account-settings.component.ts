import { Component } from '@angular/core';
import { IAccountSettingDTO } from '../interfaces/AccountSettingDTO.interface';
import { IAccountSettingGroupDTO } from '../interfaces/AccountSettingGroupDTO.interface';
import { AccountService } from '../shared/account.service';
import { NaviService } from '../shared/navi.service';

@Component({
  templateUrl: './account-settings.component.html',
  styleUrls:['./account-settings.component.scss']
})
export class AccountSettingsComponent {
  settingGroups: IAccountSettingGroupDTO[] = [];
  constructor(private naviService: NaviService, private accountService: AccountService) { }

  ngOnInit() {
    this.naviService.loadingChanged$.next(true);
    this.accountService.getSettings().subscribe(x => {
      this.settingGroups = x;
      this.naviService.loadingChanged$.next(false);
    })
  }

  settingChange(setting: IAccountSettingDTO) {
    this.accountService.saveSetting(setting).subscribe();
  }
}
