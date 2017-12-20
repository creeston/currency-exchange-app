import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
import { ContactInformation, ContactInformationService, ContactMethod } from "../services/contact-information.service"
import { concat } from 'rxjs/observable/concat';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  contact: ContactInformation = new ContactInformation(null);
  contactTypes: any[] = [
    {value: ContactMethod.Vk, viewValue: 'VK'},
    {value: ContactMethod.Telegram, viewValue: 'Telegram'},
    {value: ContactMethod.Email, viewValue: 'Email'},
    {value: ContactMethod.Instagram, viewValue: 'Instagram'},
    {value: ContactMethod.Facebook, viewValue: 'Facebook'},
  ]
  
  submitButtonPressed: boolean = false;

  constructor(
    private service: ContactInformationService,
    public dialogRef: MatDialogRef<AddContactComponent>, 
    @Inject(MAT_DIALOG_DATA) existingContactMethods: ContactMethod[]) {
      this.contactTypes = this.contactTypes.filter(t => !existingContactMethods.includes(t.value));
      this.contact.method = this.contactTypes[0].value;
    }

  ngOnInit() {
  }

  addContact(contactForm: NgForm) {
    if (!contactForm.valid) {
      return;
    }
    this.submitButtonPressed = true;
    this.service.addContactInformation(this.contact)
    .subscribe(r => {
      this.dialogRef.close({redirect: true});
    })
  }
}