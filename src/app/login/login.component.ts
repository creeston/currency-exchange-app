import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Http } from '@angular/http';
import { NgForm, FormGroupDirective } from '@angular/forms'
import { LoginService } from '../services/login.service'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { ErrorStateMatcher } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('formState', [
      state('login', style({
        right: '0px',
      })),
      state('register_1', style({
        right: '350px',
      })),
      state('register_2', style({
        right: '700px',
      })),
      transition('login => register_1', animate('300ms ease-in')),
      transition('register_1 => register_2', animate('300ms ease-in')),
      transition('register_2 => login', animate('0ms ease-out'))
    ])
  ]
})
export class LoginComponent implements OnInit {
  public flipped: boolean = false;
  public user: User = new User();
  public registrationInfo: RegistrationInfo = new RegistrationInfo();
  private http: Http;
  has_error: Boolean = false;
  private success: Boolean = false;
  public loginMessage: string = "";
  public formState: string = "login"
  public validationMessage: string;
  public regForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  private customValidator(control) {
    if (this.regForm === undefined) {
      return {isEqual: true};
    }         
    return {isEqual: control.value === this.regForm.controls.password.value}
  }
  constructor(
    private router: Router,
    private loginService: LoginService,
    fb: FormBuilder) {
      this.regForm = fb.group({
        username : ['', Validators.required],
        email : ['', [Validators.required, Validators.email]],
          password: ['', Validators.required],
          repeatedPassword: [''],
      },{validator: this.areEqual});   
    }

    areEqual(group: FormGroup) {
      if (group.controls.password === undefined || group.controls.repeatedPassword === undefined) {
        return null;
      }
      var isValid = group.controls.password.value === group.controls.repeatedPassword.value;
      if (isValid) {
        return null;
      }
      return {areEqual: false};
    }

  public Login(loginForm: NgForm) {
    if (!loginForm.valid) {
      return;
    }
    this.loginMessage = "";
    this.Flip();
    this.loginService.login(this.user.Username, this.user.Password)
    .subscribe(result => {
      if (result == true) {
        this.loginMessage = "Login succeeded!";
        this.has_error = false;
      } else {
        this.loginMessage = "Login failed";
        this.has_error = true;
      }
      this.router.navigate(['home']);
    },
    error => {
      let values = Object.keys(error).map(key=>error[key]);
      this.loginMessage = values[0];
      this.has_error = true;
      setTimeout(() => this.Flip(), 1500);
    })
  }

  signUp() {
  }

  sendCode() {

  }

  proceedSignUp() {
    if (!this.regForm.valid) {
      return;
    }
    this.toggleState();
  }

  private Flip() {
      if (this.flipped == false)
          this.flipped = true;
      else 
          this.flipped = false;
  }

  toggleState() {
    if (this.formState == "login") {
      this.formState = "register_1";
    } else if (this.formState == "register_1") {
      this.formState = "register_2";
    } else {
      this.formState = "login";
    }
  }

  ngOnInit() {
    this.loginService.logout();
  }

}

export class User {
  public Username: string;
  public Password: string;
}

export class RegistrationInfo {
  public Username: string;
  public Password: string;
  public RepeatedPassword: string;
  public Email: string;
  public ConfirmationCode: string;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return true;
  }
}