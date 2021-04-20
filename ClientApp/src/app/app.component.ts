import { Component, Output } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { ToastrService } from 'ngx-toastr';
import { IChatMessage } from './interfaces/chat-message.interface';
import { AccountService } from './shared/account.service';
import { ChatService } from './shared/chat.service';
import { ISidebarParams } from './interfaces/sidebar.interface';
import { SidebarService } from './shared/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  constructor(private chatService: ChatService,
    private toastrService: ToastrService,
    private authService: MsalService,
    private accountService: AccountService,
    private sidebarService: SidebarService
  ) {
    this.subscribeToEvents();
  }

  @Output() sidebarParams: ISidebarParams;

  ngOnInit() {
    var CurrentURL = window.location.href;
    if (CurrentURL !== window.origin) {
      var LoadingAnimation = document.querySelector(".LoadingAnimation");
      LoadingAnimation.classList.add("Loaded")
      LoadingAnimation.addEventListener("animationend", function () {
        LoadingAnimation.remove();
      })
       this.sidebarService.sidebarColumnState("pageLoad", undefined, undefined);
    }

    this.chatService.onReceiveMessage$.subscribe((chatMessage: IChatMessage) => {
      if (this.authService.getAccount() && chatMessage.userName.toLowerCase() !== this.authService.getAccount().userName.toLowerCase()) {
        this.accountService.getAccountSettings().subscribe(x => {
          if (x.Chat) {
            this.toastrService.info(chatMessage.message, `${chatMessage.user} Says:`);//add on click at some point
          }
        });
      }
    });
  }
  public onchatClick() {
     this.sidebarService.sidebarColumnState("Discussion", undefined, undefined);
  }
  private subscribeToEvents(): void {
    this.sidebarService.onSidebarParamsChanged$.subscribe((newSidebarParams: ISidebarParams) => {
      this.sidebarParams = newSidebarParams;
    });
  }
}
