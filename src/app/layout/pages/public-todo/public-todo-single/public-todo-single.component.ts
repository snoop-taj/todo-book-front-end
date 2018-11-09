import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../../../../../entities/Todo';
import { NetworkService } from '../../../../shared';
import { User } from '../../../../../entities/User';
import { UserService } from '../../../../shared/services/user/user.service';

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

  constructor(private _user: UserService) { }

  async ngOnInit() {
    this.user = await this._user.getUserDetails(this.todo.userId);
    this.odd = this.checkOdd(this.index);
  }

  checkOdd(val: number) {
    return val % 2 !== 0;
  }

}
