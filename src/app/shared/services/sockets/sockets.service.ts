import { Injectable, EventEmitter } from '@angular/core';
import * as Echo from 'laravel-echo';
import { User } from '../../../../entities/User';

export class TodoCreatedEvent {
  todo: any
  author: any
}

@Injectable()
export class SocketsService {
  echo : Echo = null
  user : User = null

  public todoCreatedEventFired = new EventEmitter<TodoCreatedEvent>()

  setupWithToken(token, user) {
    if (!token || !user) {
      this.echo = null;

      return;
    }
    
    this.user = user;
    this.echo = new Echo({
      broadcaster: 'socket.io',
      host: 'http://localhost:6001',
      auth: {
          headers: {
            Authorization: `Bearer ${token}`
          }
      }
    });

    window['echo'] = this.echo;
    this.listen();
  }

  listen() {
    this.echo.private(`App.User.${this.user.id}`)
      .listen(
        'TodoCreatedEvent',
        (event) => this.todoCreatedEventFired.emit(event)
        );
  }
}
