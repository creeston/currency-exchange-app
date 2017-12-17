import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ChangeEmailComponent } from '../change-email/change-email.component'
import { ChangePasswordComponent } from '../change-password/change-password.component'
import { AddPaymentComponent } from '../add-payment/add-payment.component'
import { AddContactComponent } from '../add-contact/add-contact.component'
import { UserProfileService } from '../services/user-profile.service';
import { PaymentRequisite, PaymentMethod } from '../services/payment-method.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  username: string;
  email: string;
  paymentRequisites: PaymentRequisite[];

  contractInformations: any[] = [
    {data: 'id29198680', name: 'VK'},
    {data: '+375445822205', name: 'Telegram'}
  ]

  rate: number;
  trades_count: number;
  
  constructor(private profileService: UserProfileService, public dialog: MatDialog) { 
    profileService.getCurrentUser().subscribe(
      profile => {
        this.username = profile.username;
        this.email = profile.email;
        this.rate = profile.rating;
        this.trades_count = profile.completedTrades;
        this.paymentRequisites = profile.paymentRequisites;
      }, error => {
        console.log(error);
      }
    )
  }

  getPaymentMethod(m: PaymentMethod) {
    if (m == PaymentMethod.PayPal) {
      return "PayPal";
    } else if (m == PaymentMethod.QIWI) {
      return "QIWI";
    } else {
      return "Yandex.Money";
    }
  }

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
