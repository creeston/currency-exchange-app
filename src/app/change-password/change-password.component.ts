import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, ErrorStateMatcher } from '@angular/material';
import { NgForm, FormControl, FormGroupDirective } from '@angular/forms';
import { UserProfileService } from '../services/user-profile.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  passwordsNotEqual: boolean = false;
  passwordNotCorrect: boolean = false;
  password: PasswordChangeRequest = new PasswordChangeRequest();
  matcher = new MyErrorStateMatcher(this);
  changeButtonClicked: boolean = false;

  constructor(
    private userService: UserProfileService,
    public dialogRef: MatDialogRef<ChangePasswordComponent>, 
    @Inject(MAT_DIALOG_DATA) data: any) {
    }

  ngOnInit() {
  }

  changePassword(passwordForm: NgForm) {
    this.changeButtonClicked = true;
    this.passwordNotCorrect = false;
    if (!passwordForm.valid) {
      return;
    }
    if (this.password.new != this.password.repeatedNew) {
      this.passwordsNotEqual = true;
      return;
    }
    this.userService.changeUserPassword(this.password.old, this.password.new)
    .subscribe(r => {
      this.dialogRef.close({success: true});
    }, error => {
      this.passwordNotCorrect = true;
    })
  }
}

export class PasswordChangeRequest {
  old: string;
  new: string;
  repeatedNew: string;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  constructor(private component: ChangePasswordComponent) {}

  isErrorState(control: FormControl | null, form: NgForm): boolean {
    if (form != undefined && form.controls != undefined && form.controls.old != undefined)
    {
      if (control === form.controls.repeatedNew)
      {
        return form.controls.new.value != form.controls.repeatedNew.value;
      } else if (control == form.controls.old) {
        return this.component.passwordNotCorrect || (this.component.changeButtonClicked && !control.valid);
      }
    }
    return false;
  }
}