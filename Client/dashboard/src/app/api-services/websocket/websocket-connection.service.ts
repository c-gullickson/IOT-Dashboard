import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketConnectionService {

  socket = null;
  message$: BehaviorSubject<string> = new BehaviorSubject('');
  
  constructor() { 

  }

  // Use if websocket logic ever wants to send messages from Client Application
  // sendMessage(){
  //     this.socket.emit('clientMessage', {any: 'test'});
  // }
  
  // Use if websocket logic ever wants to listen for messages from Server Application
  receiveMessage = () => {
    this.socket = io(environment.API_URL);
    
    this.socket.on('message', (message) =>{
      this.message$.next(message);
    });
    
    return this.message$.asObservable();
  };
}