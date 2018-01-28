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
import { ErrorStateMatcher, MatSnackBar } from '@angular/material';
import { EmailConfirmationService } from '../services/email-confirmation.service';
import { RegistrationInfo, RegistrationService } from '../services/registration.service';
import 'rxjs/add/operator/merge'
import 'rxjs/add/operator/mergeAll'
import 'rxjs/add/operator/map'
import { BalanceService } from '../services/balance.service';
import { UserProfileService } from '../services/user-profile.service';
import { CurrencyDataService } from '../services/currency-data.service';
import { Observable } from 'rxjs';

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
      transition('register_2 => register_1', animate('300ms ease-in')),
      transition('register_1 => login', animate('300ms ease-in'))
    ])
  ]
})
export class LoginComponent implements OnInit {
  public flipped: boolean = false;
  public user: User = new User();
  public registrationInfo: RegistrationInfo = new RegistrationInfo();
  private http: Http;
  has_error: Boolean = false;
  barColor: string = 'primary';
  private success: Boolean = false;
  public loginMessage: string = "";
  public formState: string = "login"
  public validationMessage: string;
  public regForm: FormGroup;
  registrationButtonPressed: boolean = false;
  matcher = new MyErrorStateMatcher(this);
  isNameAlreadyExist: boolean = false;

  private customValidator(control) {
    if (this.regForm === undefined) {
      return {isEqual: true};
    }         
    return {isEqual: control.value === this.regForm.controls.password.value}
  }
  constructor(
    private router: Router,
    private loginService: LoginService,
    private emailConfirmationService: EmailConfirmationService,
    private registrationService: RegistrationService,
    private balanceService: BalanceService,
    private userProfileService: UserProfileService,
    private chartService: CurrencyDataService,
    private snackBar: MatSnackBar,
    fb: FormBuilder) {
      this.regForm = fb.group({
        username : ['', Validators.required],
        email : ['', [Validators.required, Validators.email, this.validateEmail]],
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

  validateEmail(control) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(control.value.toLowerCase())) {
      return {email: false};
    }
  }

  public Login(loginForm: NgForm) {
    if (!loginForm.valid) {
      return;
    }
    this.loginMessage = "";
    this.barColor = 'primary';
    this.Flip();
    this.loginService.login(this.user.Username, this.user.Password)
    .subscribe(result => {
      if (result == true) {
        this.barColor = 'primary';
        this.loginMessage = "Login succeeded!";
        this.has_error = false;
        let profile = this.userProfileService.getCurrentUser();
        let balance = this.balanceService.getBalance();
        let chart = this.chartService.getCurrencyRates();
        Observable.forkJoin(profile, balance, chart)
        .subscribe(r => {
          this.router.navigate(['home'])
        });
      } else {
        this.loginMessage = "Login failed";
        this.has_error = true;
        this.barColor = 'accent';
      }
    },
    error => {
      let values = Object.keys(error).map(key=>error[key]);
      this.loginMessage = values[0];
      this.has_error = true;
      setTimeout(() => this.Flip(), 1500);
    })
  }

  serverErrors = {};

  signUp() {
    if (!this.regForm.valid || !this.registrationInfo.ConfirmationCode) {
      return;
    }
    this.registrationButtonPressed = true;
    this.registrationInfo.Email = this.regForm.controls.email.value;
    this.registrationInfo.Username = this.regForm.controls.username.value;
    this.registrationInfo.Password = this.regForm.controls.password.value;
    this.registrationService.registerUser(this.registrationInfo)
    .subscribe(success => {
      this.loginService.login(this.registrationInfo.Username, this.registrationInfo.Password)
      .subscribe(success => {
        let profile = this.userProfileService.getCurrentUser();
        let balance = this.balanceService.getBalance();
        let chart = this.chartService.getCurrencyRates();
        Observable.forkJoin(profile, balance, chart)
        .subscribe(r => {
          this.router.navigate(['home'])
        });
      })
    }, error => {
      this.registrationButtonPressed = false;
      this.serverErrors['code'] = error.confirmation_code;
      //this.snackBar.open(JSON.stringify(error), "close", {duration: 3000});
    })
  }

  codeButtonLabel: string = "Send code";

  sendCode() {
    this.codeButtonLabel = '30';
    let timeout = 30;
    Observable.interval(1000)
    .takeWhile(() => timeout > 0)
    .subscribe(i => {
      timeout -= 1;
      if (timeout == 0) {
        this.codeButtonLabel = "Send code";
      } else {
        this.codeButtonLabel = timeout.toString();
      }
    })
    this.emailConfirmationService.sendEmailConfirmationCode(this.regForm.controls.email.value)
    .subscribe(success => this.snackBar.open("Code sent", "close", {duration: 2000}))
  }

  regForm1Touched: boolean = false;

  proceedSignUp() {
    this.regForm1Touched = true;
    this.isNameAlreadyExist = false;
    if (!this.regForm.valid) {
      return;
    }
    this.registrationService.isNameUnique(this.regForm.controls.username.value)
    .subscribe(result => {
      if (result) {
        this.toggleState();
      } else {
        this.isNameAlreadyExist = true;//this.snackBar.open("Name is already taken", "close", {duration: 2000});
        return;
      }
    })
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
      this.formState = "register_1";
    }
  }

  backState() {
    if (this.formState == "register_2") {
      this.formState = "register_1";
    } else if (this.formState == "register_1"){
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

export class MyErrorStateMatcher implements ErrorStateMatcher {
  constructor(private component: LoginComponent) {

  }
  isErrorState(control: FormControl | null, form: NgForm): boolean {
    if (form != undefined && form.form != undefined && form.form.controls != undefined)
    {
      if (control === form.form.controls.repeatedPassword)
      {
        return form.form.controls.password.value != form.form.controls.repeatedPassword.value;
      } else if (control === form.form.controls.username) {
        return this.component.isNameAlreadyExist || (this.component.regForm1Touched && control.invalid);
      }
    }
    return false;
  }
}