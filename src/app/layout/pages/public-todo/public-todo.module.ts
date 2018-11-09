import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicTodoComponent } from './public-todo.component';
import { PublicTodoRoutingModule } from './public-todo-routing.module';
import { PageHeaderModule } from '../../../shared';
import { PublicTodoSingleComponent } from './public-todo-single/public-todo-single.component';
import { MatProgressSpinnerModule } from '@angular/material';


@NgModule({
    imports: [
        CommonModule,
        PublicTodoRoutingModule,
        PageHeaderModule,
        MatProgressSpinnerModule
    ],
    declarations: [PublicTodoComponent, PublicTodoSingleComponent]
})
export class PublicTodoModule {}
