import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ChangeEmailComponent>, 
    @Inject(MAT_DIALOG_DATA) data: any) {
    }

  ngOnInit() {
  }

  changeEmail() {
    this.dialogRef.close({redirect: true});
  }
}
