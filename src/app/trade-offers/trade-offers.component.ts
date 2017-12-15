import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { TradeService, Trade } from '../services/trade.service';

@Component({
  selector: 'app-trade-offers',
  templateUrl: './trade-offers.component.html',
  styleUrls: ['./trade-offers.component.css']
})
export class TradeOffersComponent implements OnInit {
  offers: Trade[];
  offersLoaded: boolean = false;

  constructor(
    private service: TradeService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<TradeOffersComponent>, 
    @Inject(MAT_DIALOG_DATA) trade: Trade) { 
      this.service.listOffers(trade.id).subscribe(
        offers => {
          this.offers = offers;
          this.offersLoaded = true;
        },
        error => {
          this.snackBar.open(JSON.stringify(error), "Close", {
            duration: 2000,
          });
        }
      )
    }

  ngOnInit() {
  }

}
