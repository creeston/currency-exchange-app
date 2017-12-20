import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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

  submitButtonPressed: boolean = false;

  constructor(
    private service: PaymentMethodService,
    public dialogRef: MatDialogRef<AddPaymentComponent>, 
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
    this.submitButtonPressed = true;
    this.service.addPaymentRequisite(this.payment)
    .subscribe(r => {
      this.dialogRef.close({success: true});
    });
  }
}