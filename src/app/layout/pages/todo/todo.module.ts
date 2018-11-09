import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { TodoSingleComponent } from './todo-single/todo-single.component';
import { PageHeaderModule } from '../../../shared';
import {
    MatButtonModule,
    MatDialog,
    MatDialogModule,
    MatCardModule,
    MatSnackBar,
    MatSnackBarModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginator,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        TodoRoutingModule,
        PageHeaderModule,
        MatButtonModule,
        MatSnackBarModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule
    ],
    declarations: [TodoComponent, TodoSingleComponent],
})
export class TodoModule { }
