import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';
import { PaymentRequisite, PaymentMethod, PaymentMethodService } from '../services/payment-method.service';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {
  payment: PaymentRequisite = new PaymentRequisite({method: PaymentMethod.PayPal});

  paymentRequisiteTypes: any[] = [
    {value: PaymentMethod.PayPal, viewValue: "PayPal"},
    {value: PaymentMethod.YandexMoney, viewValue: "Yandex.Money"},
    {value: PaymentMethod.QIWI, viewValue: "QIWI"},
  ]

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }

  validateWallet(address) {
    var re = /[\d]{5,}/;
    return re.test(address);
  }

  submitButtonPressed: boolean = false;

  constructor(
    private service: PaymentMethodService,
    public dialogRef: MatDialogRef<AddPaymentComponent>, 
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) existingMethods: PaymentMethod[]) {
      this.paymentRequisiteTypes = this.paymentRequisiteTypes.filter(t => !existingMethods.includes(t.value));
      this.payment.method = this.paymentRequisiteTypes[0].value;
    }

  ngOnInit() {
  }

  addPayment(paymentForm: NgForm) {
    if (!paymentForm.valid) {
      return;
    }
    if (this.payment.method === PaymentMethod.PayPal) {
      if (!this.validateEmail(this.payment.data)) {
        this.snackBar.open("Data must be email", "close", {duration: 2000});
        return;
      }
    } else if (this.payment.method === PaymentMethod.QIWI || this.payment.method === PaymentMethod.YandexMoney){
      if (!this.validateWallet(this.payment.data)) {
        this.snackBar.open("Payment data is not valid", "close", {duration: 2000});
        return''
      }
    }
    this.submitButtonPressed = true;
    this.service.addPaymentRequisite(this.payment)
    .subscribe(r => {
      this.dialogRef.close({success: true});
    });
  }
}