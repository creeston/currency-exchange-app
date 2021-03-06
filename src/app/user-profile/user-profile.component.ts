import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ChangeEmailComponent } from '../change-email/change-email.component'
import { ChangePasswordComponent } from '../change-password/change-password.component'
import { AddPaymentComponent } from '../add-payment/add-payment.component'
import { AddContactComponent } from '../add-contact/add-contact.component'
import { UserProfileService } from '../services/user-profile.service';
import { PaymentRequisite, PaymentMethod, PaymentMethodService } from '../services/payment-method.service';
import { ContactInformation, ContactMethod, ContactInformationService } from '../services/contact-information.service';
import { EnumHelper } from '../enum-helper';
import { concat } from 'rxjs/operator/concat';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  username: string;
  email: string;
  paymentRequisites: PaymentRequisite[];
  contactInformation: ContactInformation[];
  rate: number;
  trades_count: number;
  
  constructor(
    private profileService: UserProfileService, 
    private paymentService: PaymentMethodService, 
    private contactInfoService: ContactInformationService,
    public dialog: MatDialog, public snackBar: MatSnackBar) { 
    this.loadProfile();
  }

  loadProfile() {
    this.profileService.getCurrentUser().subscribe(
      profile => {
        this.username = profile.username;
        this.email = profile.email;
        this.rate = profile.rating;
        this.trades_count = profile.completedTrades;
        this.paymentRequisites = profile.paymentRequisites;
        this.contactInformation = profile.contactInformation;
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

  getContactMethod(m: ContactMethod) {
    return EnumHelper.contactMethodToString(m);
  }

  ngOnInit() {
  }

  openChangeEmailForm() {
    let dialogRef = this.dialog.open(ChangeEmailComponent, {
      width: '300px'
    });
    dialogRef.afterClosed().subscribe(r => {
      if (r && r.success) {
        this.loadProfile();
      }
    })
  }

  openChangePasswordForm() {
    let dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '300px'
    });
    dialogRef.afterClosed().subscribe(r => {
      if (r && r.success) {
        this.snackBar.open("Password changed!", "close", {duration: 2000});
      }
    })
  }
  
  openAddPaymentForm() {
    let dialogRef = this.dialog.open(AddPaymentComponent, {
      width: '300px',
      data: this.profileService.currentUser.paymentRequisites.map(r => r.method)
    });
    dialogRef.afterClosed().subscribe(success => this.loadProfile())
  }

  removePayment(payment: PaymentRequisite) {
    this.dialog.open(ConfirmationDialogComponent, {width: '320px', height: '140px', data: "Are you sure you want to remove the payment?"})
    .afterClosed().subscribe(r => {
      if (r.accepted) {
        this.paymentService.removeUserPayment(payment.id)
        .subscribe(r => this.loadProfile());
      }
    });
  }

  openAddContactForm() {
    let dialogRef = this.dialog.open(AddContactComponent, {
      width: '300px',
      data: this.profileService.currentUser.contactInformation.map(r => r.method)
    });
    dialogRef.afterClosed().subscribe(success => this.loadProfile())
  }

  removeContact(contact: ContactInformation) {
    this.dialog.open(ConfirmationDialogComponent, {width: '320px', height: '140px', data: 'Are you sure you want to delete the contact'})
    .afterClosed().subscribe(r => {
      if (r.accepted) {
        this.contactInfoService.removeContactInformation(contact.id)
        .subscribe(r => this.loadProfile());
      }
    });
  }
}
