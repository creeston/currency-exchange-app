import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-user-profile-dialog',
  templateUrl: './user-profile-dialog.component.html',
  styleUrls: ['./user-profile-dialog.component.css']
})
export class UserProfileDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UserProfileDialogComponent>, @Inject(MAT_DIALOG_DATA) userId: number) { 
    
  }

  ngOnInit() {
  }

}
