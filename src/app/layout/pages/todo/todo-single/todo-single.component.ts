import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../../../../../entities/Todo';
import { User } from '../../../../../entities/User';
import { NetworkService } from '../../../../shared';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: '[app-todo-single]',
  templateUrl: './todo-single.component.html',
  styleUrls: ['./todo-single.component.scss']
})
export class TodoSingleComponent implements OnInit {
  @Input() todo: Todo
  user: User
  
  constructor(private _network: NetworkService) {}

  async ngOnInit() {
    this.user = await this.getUserDetail();
  }
  async getUserDetail() {
    const response = await this._network.request('get', `users/${this.todo.userId}`);
    return new User(response['name'], response['email']);
  }
}
