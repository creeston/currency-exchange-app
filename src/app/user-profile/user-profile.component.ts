import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ChangeEmailComponent } from '../change-email/change-email.component'
import { ChangePasswordComponent } from '../change-password/change-password.component'
import { AddPaymentComponent } from '../add-payment/add-payment.component'
import { AddContactComponent } from '../add-contact/add-contact.component'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  username: string = "User";
  email: string = "mityy2012@gmail.com"
  paymentRequisites: any[] = [
    {data: "mityy2012@gmail.com", name: "PayPal"},
    {data: "9496465685638", name: "Yandex.Money"}
  ]

  contractInformations: any[] = [
    {data: 'id29198680', name: 'VK'},
    {data: '+375445822205', name: 'Telegram'}
  ]

  rate: number = 4.2;
  trades_count: number = 8;
  
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openChangeEmailForm() {
    let dialogRef = this.dialog.open(ChangeEmailComponent, {
      width: '300px'
    });
  }

  openChangePasswordForm() {
    let dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '300px'
    });
  }
  
  openAddPaymentForm() {
    let dialogRef = this.dialog.open(AddPaymentComponent, {
      width: '300px'
    });
  }

  openAddContactForm() {
    let dialogRef = this.dialog.open(AddContactComponent, {
      width: '300px'
    });
  }

}
