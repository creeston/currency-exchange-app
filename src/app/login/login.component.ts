import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

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
  private http: Http;
  private router: Router;
  private success: Boolean = false;
  public loginMessage: string = "";
  public formState: string = "login"
  myform: FormGroup; 

  constructor(router: Router) {
      this.router = router;
  }

  public Login() {
    this.Flip();
    setTimeout(() => this.Flip(), 1500);
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
    this.myform = new FormGroup({
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });
  }

}

export class User {
  public Email: string;
  public Password: string;
}