import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, ErrorStateMatcher, MatSnackBar } from '@angular/material';
import { NgForm, FormControl } from '@angular/forms';
import { UserProfileService } from '../services/user-profile.service';
import { EmailConfirmationService } from '../services/email-confirmation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {
  email: EmailChangeRequest = new EmailChangeRequest();

  constructor(
    private userService: UserProfileService,
    private emailService: EmailConfirmationService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ChangeEmailComponent>, 
    @Inject(MAT_DIALOG_DATA) data: any) {
    }

  ngOnInit() {
  }

  serverErrors = {};

  changeEmail(emailForm: NgForm) {
    if (!emailForm.valid) {
      return;
    }
    this.userService.changeUserEmail(this.email.email, this.email.code)
    .subscribe(
      s => this.dialogRef.close({success: true}), 
      error => this.snackBar.open(error, "Close", {duration: 3000}))
  }

  codeButtonLabel: string = "Send code";
  
  sendCode(form: NgForm) {
    if (!form.controls.email.valid) {
      return;
    }
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
    this.emailService.sendEmailConfirmationCode(this.email.email)
    .subscribe(
      success => this.snackBar.open("Code sent", "close", {duration: 2000}))
      error => this.snackBar.open(error, "Close", {duration: 3000})
    }
}

export class EmailChangeRequest {
  email: string;
  code: string;
}