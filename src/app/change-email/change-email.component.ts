import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, ErrorStateMatcher, MatSnackBar } from '@angular/material';
import { NgForm, FormControl } from '@angular/forms';
import { UserProfileService } from '../services/user-profile.service';
import { EmailConfirmationService } from '../services/email-confirmation.service';

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

  sendCode(form: NgForm) {
    if (!form.controls.email.valid) {
      return;
    }
    this.emailService.sendEmailConfirmationCode(this.email.email)
    .subscribe(
      success => this.snackBar.open("Code sent", "close", {duration: 2000}),
      error => this.snackBar.open(error, "Close", {duration: 3000})
    );
  }
}

export class EmailChangeRequest {
  email: string;
  code: string;
}