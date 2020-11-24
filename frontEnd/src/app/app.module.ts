import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserModel } from './model/user-model';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TaskModel } from './model/task.model';

import { TaskService } from './services/task.service';
import { AuthenticationService } from './services/authentication.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { TasksComponent } from './views/tasks/tasks.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { TaskGridComponent } from './views/task-grid/task-grid.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TasksComponent,
    TaskGridComponent
  ],
  imports: [

    AppRoutingModule,
    BrowserModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    NgxDatatableModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthenticationService,
    UserModel,
    TaskModel,
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
