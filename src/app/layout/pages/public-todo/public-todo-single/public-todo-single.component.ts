import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../../../../../entities/Todo';
import { NetworkService } from '../../../../shared';
import { User } from '../../../../../entities/User';

@Component({
  selector: '[app-public-todo-single]',
  templateUrl: './public-todo-single.component.html',
  styleUrls: ['./public-todo-single.component.scss']
})
export class PublicTodoSingleComponent implements OnInit {
  @Input() todo: Todo
  @Input() index: number
  user: User
  odd: boolean

  constructor(private _network: NetworkService) { }

  async ngOnInit() {
    this.user = await this.getUser();
    this.odd = this.checkOdd(this.index);
  }

  async getUser() {
    const response = await this._network.request('get', `users/${this.todo.userId}`) as Array<any>
    return new User(response['name'], response['email'], null, response['id']);
  }

  checkOdd(val: number) {
    return val % 2 !== 0;
  }

}
