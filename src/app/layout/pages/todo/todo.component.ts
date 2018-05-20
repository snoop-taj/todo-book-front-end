import { Component, OnInit, Input } from '@angular/core';
import { NetworkService } from '../../../shared';
import { Todo, TODO_VISIBILITY_STATUS } from '../../../../entities/Todo';
import { User } from '../../../../entities/User';
import { forEach } from '@angular/router/src/utils/collection';
import * as moment from 'moment';
import { routerTransition } from '../../../router.animations';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogService } from '../../../shared/services/dialog/dialog.service';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  animations: [routerTransition()]
})
export class TodoComponent implements OnInit {

  todos: Array<any>
  dataSource: TodoDataSource
  displayedColumns: Array<any>
  
  constructor(
      private _network: NetworkService,
      private _dialog: DialogService,
      private _snakeBar: MatSnackBar
  ) {}

  async ngOnInit() {
    this.todos = await this.getTodo();
    this.dataSource = new TodoDataSource(this.todos);
    this.displayedColumns = ['id', 'userId', 'content', 'createdAt'];
    console.log(this.dataSource)
  }

  async getTodo() {
    const response = await this._network.request('get', 'todo') as Array<any>;

    return response.map((item) => new Todo({
      id: item.id,
      content: item.content,
      userId: item.user_id,
      createdAt: moment(item.created_at).fromNow()
    }));
  }

  openAddTodoDialog() {
    const dialogRef = this._dialog.openAddTodoDialog()

    dialogRef.afterClosed().subscribe(async result => {

      if (typeof result !== 'undefined') {
        const response = await this._network.request('post', 'todo', {
          body: {
            content: result.content,
            visibility: result.visibility === false ? TODO_VISIBILITY_STATUS.PUBLIC : TODO_VISIBILITY_STATUS.FRIENDS
          }
        });

        this.todos.unshift(new Todo({
          id: response['id'],
          content: response['content'],
          userId: response['user_id'],
          createdAt: moment(response['created_at']).fromNow()
        }));

        this._snakeBar.open("Added a bew task!", "Cancel", {
          duration: 3000
        });
      }
    });
  }
}

export class TodoDataSource extends DataSource<any> {
  constructor(public todo: Array<Todo>) {
    super()
  }

  connect(): Observable<Todo[]> {
    return Observable.create(this.todo);
  }

  disconnect() {

  }
}
