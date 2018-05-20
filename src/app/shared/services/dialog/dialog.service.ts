import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TodoComponent } from '../../../layout/pages/todo/todo.component';
import { TodoAddComponent } from '../../../layout/pages/todo/todo-add/todo-add.component';

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openAddTodoDialog() {
    return this.dialog.open(TodoAddComponent, {
      width: '1000'
    });
  }

}
