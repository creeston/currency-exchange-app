import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {
  payment: PaymentRequisite = new PaymentRequisite();

  paymentRequisiteTypes: any[] = [
    {value: 1, viewValue: "PayPal"},
    {value: 2, viewValue: "Yandex.Money"},
    {value: 3, viewValue: "QIWI"},
  ]

  constructor(
    public dialogRef: MatDialogRef<AddPaymentComponent>, 
    @Inject(MAT_DIALOG_DATA) data: any) {
    }

  ngOnInit() {
  }

  addPayment(paymentForm: NgForm) {
    if (!paymentForm.valid) {
      return;
    }
    this.dialogRef.close({redirect: true});
  }
}

export class PaymentRequisite {
  type: number = 1;
  data: string;
}