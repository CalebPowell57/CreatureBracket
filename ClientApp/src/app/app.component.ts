import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { ToastrService } from 'ngx-toastr';
import { IChatMessage } from './interfaces/chat-message.interface';
import { ChatService } from './shared/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  constructor(private chatService: ChatService, private toastrService: ToastrService, private authService: MsalService) {}
 
  ngOnInit() {
    var CurrentURL = window.location.href;
    if (CurrentURL !== window.origin) {
      var LoadingAnimation = document.querySelector(".LoadingAnimation");
      LoadingAnimation.classList.add("Loaded")
      LoadingAnimation.addEventListener("animationend", function (){
        this.remove();
      })
    }

    this.chatService.onReceiveMessage$.subscribe((chatMessage: IChatMessage) => {
      if (chatMessage.userName.toLowerCase() !== this.authService.getAccount().userName.toLowerCase()) {
        this.toastrService.info(chatMessage.message, `${chatMessage.user} Says:`);//add on click at some point
      }
    });
  }
}
