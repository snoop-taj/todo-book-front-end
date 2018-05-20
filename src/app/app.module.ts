import 'hammerjs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard, NetworkService, AuthService } from './shared';
import { DialogService } from './shared/services/dialog/dialog.service';
import { MatDialogModule, MatCardModule, MatButtonModule, MatSlideToggleModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { TodoAddComponent } from './layout/pages/todo/todo-add/todo-add.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-5/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        AppRoutingModule,
        MatDialogModule,
        MatCardModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [AppComponent, TodoAddComponent],
    providers: [AuthGuard, AuthService, NetworkService, DialogService],
    bootstrap: [AppComponent],
    entryComponents: [TodoAddComponent]
})
export class AppModule {}
