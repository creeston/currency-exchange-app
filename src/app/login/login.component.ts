import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms'
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public flipped: boolean = false;
  public user: User = new User();
  private http: Http;
  private router: Router;
  private success: Boolean = false;
  public loginMessage: string = "";
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