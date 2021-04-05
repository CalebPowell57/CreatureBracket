import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MsalService } from '@azure/msal-angular';
import { Guid } from 'guid-typescript';
import { IChatMessage } from '../../../../interfaces/chat-message.interface';
import { ChatService } from '../../../../shared/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  chatMessages: IChatMessage[];
  chatText = '';
  userName = this.authService.getAccount().userName;

  constructor(private chatService: ChatService,
              private authService: MsalService) {
    this.subscribeToEvents();
  }

  ngOnInit() {
    this.chatService.getMessages().subscribe(chatMessages => {
      this.chatMessages = chatMessages;
    });
  }

  onSubmit(form: NgForm) {
    const account = this.authService.getAccount();

    if (this.chatText !== '' && form.valid) {
      this.chatService.sendMessage(this.chatText, account.userName);

      this.chatText = '';
    }
  }

  private subscribeToEvents(): void {
    this.chatService.onReceiveMessage$.subscribe((chatMessage: IChatMessage) => {
      this.chatMessages.push(chatMessage);
    });
  }
}
