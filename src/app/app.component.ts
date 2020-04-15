import { Component, OnInit, } from '@angular/core';
import { request } from 'graphql-request';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  userMessages = [];
  username: string;
  message: string;
  socket = io('http://localhost:4100/');

  constructor(private http: HttpClient) {
  }

  ngOnInit(){
    this.updateMessage();
    this.socket.on('message', (data)=>{
      this.updateMessage();
    });
  }

  updateMessage(){
    this.userMessages = [];
    this.getMessage().subscribe((res:any)=>{
      res.data.messages.map(msg=>{
        let user_msg=msg.split(': ');
        this.userMessages.push({
          user_short:user_msg[0][0],
          userName:user_msg[0],
          message: user_msg[1]
        });
      });
    });
  }

  getMessage(){
    return this.http.get('../api')
  }

  sendMessage(){
    this.postMessage().subscribe(res=>this.message='');
  }

  postMessage(user=this.username, message=this.message){
    return this.http.post('../api', {query: `mutation { sendMessage(username: "${user}", message: "${message}")}`})
  }
}
