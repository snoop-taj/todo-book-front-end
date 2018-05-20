import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicTodoComponent } from './public-todo.component';

const routes: Routes = [
    {
        path: '', component: PublicTodoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PublicTodoRoutingModule {
}