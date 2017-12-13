import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { MyErrorStateMatcher } from '../login/login.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  passwordsNotEqual: boolean = false;
  password: PasswordChangeRequest = new PasswordChangeRequest();
  matcher = new MyErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordComponent>, 
    @Inject(MAT_DIALOG_DATA) data: any) {
    }

  ngOnInit() {
  }

  changePassword(passwordForm: NgForm) {
    if (!passwordForm.valid) {
      return;
    }
    if (this.password.new != this.password.repeatedNew) {
      this.passwordsNotEqual = true;
      return;
    }
    this.dialogRef.close({redirect: true});
  }
}

export class PasswordChangeRequest {
  old: string;
  new: string;
  repeatedNew: string;
}
