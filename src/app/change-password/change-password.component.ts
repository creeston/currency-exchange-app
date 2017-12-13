import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, ErrorStateMatcher } from '@angular/material';
import { NgForm, FormControl, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  passwordsNotEqual: boolean = false;
  passwordNotCorrect: boolean = false;
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

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: NgForm): boolean {
    if (form != undefined && form.controls != undefined && form.controls.old != undefined)
    {
      if (control === form.controls.repeatedNew)
      {
        return form.controls.new.value != form.controls.repeatedNew.value;
      }
    }
    return false;
  }
}