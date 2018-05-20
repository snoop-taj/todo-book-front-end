import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NetworkService } from '../../../shared';
import { Todo } from '../../../../entities/Todo';
import * as moment from 'moment';

@Component({
  selector: 'app-public-todo',
  templateUrl: './public-todo.component.html',
  styleUrls: ['./public-todo.component.scss'],
  animations: [routerTransition()]
})
export class PublicTodoComponent implements OnInit {

  todos: Array<any>

  constructor(private _network: NetworkService) { }

  async ngOnInit() {
    this.todos = await this.getTodos();
  }

  async getTodos() {
    const respone = await this._network.request('get', 'todos') as Array<any>;

    return respone.map((item) => new Todo({
        id: item.id,
        content: item.content,
        userId: item.user_id,
        createdAt: moment(item.created_at).fromNow()
      })
    )
  }

}
