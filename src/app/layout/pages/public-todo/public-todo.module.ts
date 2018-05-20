import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicTodoComponent } from './public-todo.component';
import { PublicTodoRoutingModule } from './public-todo-routing.module';
import { PageHeaderModule } from '../../../shared';
import { MatCardModule } from '@angular/material';
import { PublicTodoSingleComponent } from './public-todo-single/public-todo-single.component';


@NgModule({
    imports: [CommonModule, PublicTodoRoutingModule, PageHeaderModule, MatCardModule],
    declarations: [PublicTodoComponent, PublicTodoSingleComponent]
})
export class PublicTodoModule {}
