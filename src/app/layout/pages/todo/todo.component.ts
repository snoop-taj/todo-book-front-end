import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { NetworkService, AuthService } from '../../../shared';
import { Todo, TODO_VISIBILITY_STATUS } from '../../../../entities/Todo';
import { User } from '../../../../entities/User';
import { TodoElement } from '../../../../entities/TodoElement';
import { forEach } from '@angular/router/src/utils/collection';
import * as moment from 'moment';
import { routerTransition } from '../../../router.animations';
import { MatDialog, MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DialogService } from '../../../shared/services/dialog/dialog.service';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { SocketsService , TodoCreatedEvent } from '../../../shared/services/sockets/sockets.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  animations: [routerTransition()]
})
export class TodoComponent implements OnInit, AfterViewInit {
  todos: Array<any>
  dataSource: MatTableDataSource<any>
  displayedColumns: Array<any>
  user: User
  loadingResult = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
      private _network: NetworkService,
      private _dialog: DialogService,
      private _snakeBar: MatSnackBar,
      private _auth: AuthService,
      private _sockets: SocketsService
  ) {
    this._sockets.todoCreatedEventFired.subscribe({
      next: this.handleTodoCreatedEvent.bind(this)
    });
  }

  async ngOnInit() {
    this.todos = await this.getTodo();
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = await this.getDataSourceElement()
    this.ngAfterViewInit();
  }

  async getTodo() {
    this._auth.broadcase();
    const response = await this._network.request('get', 'todo') as Array<any>;

    return response.map((item) => new Todo({
      id: item.id,
      content: item.content,
      userId: item.user_id,
      createdAt: moment(item.created_at).fromNow()
    }));
  }

  async getDataSourceElement() {
    this.displayedColumns = ['id', 'userName', 'content', 'createdAt'];
    const todoElement: TodoElement[] = []
    for (var todo of this.todos) {
      const response = await this._network.request('get', `users/${todo.userId}`);
      todoElement.push(new TodoElement({
        id : todo.id,
        userName: response['name'],
        content: todo.content,
        createdAt: todo.createdAt
      }));
    }
    this.loadingResult = false;
    return todoElement;
  }

  rowClicked(row: any): void {
    console.log(row);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openAddTodoDialog() {
    const dialogRef = this._dialog.openAddTodoDialog()

    dialogRef.afterClosed().subscribe(async result => {

      if (result !== 'Cancel') {
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
        
        this.dataSource.data = await this.getDataSourceElement()

        this._snakeBar.open("Added a new task!", "Cancel", {
          duration: 3000
        });
      }
    });
  }

  async handleTodoCreatedEvent(event: TodoCreatedEvent) {
    console.log('todo created event', event);
    if (!this.todos.find(p => p.id === event.todo.id)) {
      this.todos.unshift(
        new Todo({
          id: event.todo['id'],
          content: event.todo['content'],
          userId: event.todo['user_id'],
          createdAt: moment(event.todo['created_at']).fromNow()
        })
      )
    }
  }
}
