import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UserProfileService, UserProfile } from '../services/user-profile.service';
import { PaymentRequisite, PaymentMethod } from '../services/payment-method.service';
import { ContactInformation, ContactMethod } from '../services/contact-information.service';
import { EnumHelper } from '../enum-helper';

@Component({
  selector: 'app-user-profile-dialog',
  templateUrl: './user-profile-dialog.component.html',
  styleUrls: ['./user-profile-dialog.component.css']
})
export class UserProfileDialogComponent implements OnInit {
  profile: UserProfile;
  username: string;
  email: string;
  rate: number;
  trades_count: number;
  paymentRequisites: PaymentRequisite[];
  contactInformation: ContactInformation[];
  profileId: number;

  constructor(
    private profileService: UserProfileService,
    public dialogRef: MatDialogRef<UserProfileDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) userId: number) {
      this.profileId = userId; 
      this.loadProfile();
  }

  ngOnInit() {
  }

  loadProfile() {
    this.profileService.getUser(this.profileId).subscribe(
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

}
