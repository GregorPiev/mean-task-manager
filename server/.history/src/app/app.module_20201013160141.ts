import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserModel } from './model/user-model';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TaskModel } from './model/task.model';


import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { TasksComponent } from './views/tasks/tasks.component';
import { AuthenticationService } from './services/nodejs/authentication.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TasksComponent
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
    TaskModel
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
