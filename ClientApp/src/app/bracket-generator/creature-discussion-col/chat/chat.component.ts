import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { IChatMessage } from '../../../interfaces/chat-message.interface';
import { ChatService } from '../../../shared/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent {
  chatMessages: IChatMessage[];
  chatText = '';
  userId = Guid.parse('54E715D0-2B42-4B19-A36B-E4ADA9DC2594');

  constructor(private chatService: ChatService, private cdr: ChangeDetectorRef) {
    this.subscribeToEvents();
  }

  ngOnInit() {
    this.chatService.getMessages().subscribe(chatMessages => {
      this.chatMessages = chatMessages;
      this.cdr.detectChanges();
    });
    this.cdr.detectChanges();
  }

  onSubmit(form: NgForm) {
    if (this.chatText !== '' && form.valid) {
      this.chatService.sendMessage(this.chatText, this.userId);

      this.chatText = '';
    }
    this.cdr.detectChanges();
  }

  private subscribeToEvents(): void {
    this.chatService.onReceiveMessage$.subscribe((chatMessage: IChatMessage) => {
      this.chatMessages.push(chatMessage);
    });
  }
}
