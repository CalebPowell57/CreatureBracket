import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Guid } from 'guid-typescript';
import { Observable, Subject } from 'rxjs';
import { IChatMessage } from '../interfaces/chat-message.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  onReceiveMessage$ = new Subject<IChatMessage>();
  onReceiveMessageEvent = new EventEmitter<IChatMessage>();

  private _hubConnection: HubConnection;

  constructor(private http: HttpClient) {
    this.createConnection();
    this.onReceiveMessage();
    this.startConnection();
  }

  getMessages() : Observable<IChatMessage[]> {
    return this.http.get<IChatMessage[]>('ChatMessage/All');
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
