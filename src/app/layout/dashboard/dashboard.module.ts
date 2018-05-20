import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {
    TimelineComponent,
    NotificationComponent,
    ChatComponent
} from './components';
import { StatModule } from '../../shared';
import { PublicTodoComponent } from '../pages/public-todo/public-todo.component';
import { PublicTodoSingleComponent } from '../pages/public-todo/public-todo-single/public-todo-single.component';
import { MatCardModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        DashboardRoutingModule,
        StatModule,
        MatCardModule
    ],
    declarations: [
        DashboardComponent,
        PublicTodoComponent,
        PublicTodoSingleComponent,
        TimelineComponent,
        NotificationComponent,
        ChatComponent
    ]
})
export class DashboardModule {}
