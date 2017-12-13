import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  contact: ContactInformation = new ContactInformation();
  contactTypes: any[] = [
    {value: 1, viewValue: 'VK'},
    {value: 2, viewValue: 'Telegram'},
    {value: 3, viewValue: 'Email'},
  ]

  constructor(
    public dialogRef: MatDialogRef<AddContactComponent>, 
    @Inject(MAT_DIALOG_DATA) data: any) {
    }

  ngOnInit() {
  }

  addContact(contactForm: NgForm) {
    if (!contactForm.valid) {
      return;
    }
    this.dialogRef.close({redirect: true});
  }
}

export class ContactInformation {
  data: string;
  type: number = 1;
}