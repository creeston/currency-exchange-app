import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {
  message: string;

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) message: string) {
      this.message = message;
   }

  ngOnInit() {
  }

  accept() {
    this.dialogRef.close({accepted: true});
  }

  reject() {
    this.dialogRef.close({accepted: false});
  }
 
}
