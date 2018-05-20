import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { TodoSingleComponent } from './todo-single/todo-single.component';
import { PageHeaderModule } from '../../../shared';
import { MatButtonModule, MatDialog, MatDialogModule, MatCardModule, MatSnackBar, MatSnackBarModule, MatTableModule } from '@angular/material';
import { TodoAddComponent } from './todo-add/todo-add.component';

@NgModule({
    imports: [CommonModule, TodoRoutingModule, PageHeaderModule, MatButtonModule, MatSnackBarModule, MatTableModule],
    declarations: [TodoComponent, TodoSingleComponent],
})
export class TodoModule {}
