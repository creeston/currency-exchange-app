import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {
  email: EmailChangeRequest = new EmailChangeRequest();

  constructor(
    public dialogRef: MatDialogRef<ChangeEmailComponent>, 
    @Inject(MAT_DIALOG_DATA) data: any) {
    }

  ngOnInit() {
  }

  changeEmail(emailForm: NgForm) {
    if (!emailForm.valid) {
      return;
    }
    this.dialogRef.close({redirect: true});
  }

  sendCode() {

  }
}

export class EmailChangeRequest {
  email: string;
  code: string;
}