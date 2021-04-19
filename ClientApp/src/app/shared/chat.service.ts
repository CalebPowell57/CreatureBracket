import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IChatMessage } from '../interfaces/chat-message.interface';
import { EImageType } from '../interfaces/image.interface';
import { ImageService } from './image.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  onReceiveMessage$ = new Subject<IChatMessage>();
  onReceiveMessageEvent = new EventEmitter<IChatMessage>();

  private _hubConnection: HubConnection;

  constructor(private http: HttpClient, private imageService: ImageService) {
    this.createConnection();
    this.onReceiveMessage();
    this.startConnection();
  }

  getMessages() : Observable<IChatMessage[]> {
    return this.http.get<IChatMessage[]>('ChatMessage/All').pipe(map((messages: IChatMessage[]) => {
      let userNames: string[] = [];

      messages.forEach(x => userNames.push(x.userName));

      this.imageService.getImages(EImageType.Account, userNames).subscribe(images => {
        messages.forEach(x => {
          const found = images.filter(y => y.key.toLowerCase() === x.userName.toLowerCase());

          x.image = found[0].base64;
        })
      });

      return messages;
    }));
  }

  sendMessage(message: string, userName: string) {
    this._hubConnection.invoke('SendMessage', message, userName);
  }

  private onReceiveMessage(): void {
    this._hubConnection.on('ReceiveMessage', (chatMessage: IChatMessage) => {
      this.onReceiveMessage$.next(chatMessage);
      this.onReceiveMessageEvent.emit(chatMessage);
    });
  }

  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(window.location.origin + '/ChatHub')
      .build();
  }

  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        console.log('Hub connection started');
      })
      .catch(err => {
        console.log('Error while establishing connection, retrying...');
        setTimeout(function () { this.startConnection(); }, 5000);
      });
  }
}    
