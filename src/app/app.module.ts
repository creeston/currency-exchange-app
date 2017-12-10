import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { Router } from '@angular/router/src/router';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import { LoginService } from './login/login.service';
import {HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      routes
    ),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpModule,
    MatButtonModule, MatFormFieldModule, MatInputModule
  ],
  providers: [AuthService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
