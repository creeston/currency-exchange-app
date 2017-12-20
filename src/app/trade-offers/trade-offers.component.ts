import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { TradeService, Trade, TradeType, Currency } from '../services/trade.service';
import { UserProfileService, UserProfile } from '../services/user-profile.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { ActiveTradeService } from '../services/active-trade.service';
import { EnumHelper } from '../enum-helper';

@Component({
  selector: 'app-trade-offers',
  templateUrl: './trade-offers.component.html',
  styleUrls: ['./trade-offers.component.css']
})
export class TradeOffersComponent implements OnInit {
  offers: Trade[];
  offersLoaded: boolean = false;
  userTrade: Trade;

  constructor(
    private tradeService: TradeService,
    private activeTradeService: ActiveTradeService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<TradeOffersComponent>, 
    @Inject(MAT_DIALOG_DATA) trade: Trade) { 
      this.tradeService.listOffers(trade.id).subscribe(
        offers => {
          this.offers = offers;
          this.offersLoaded = true;
        }
      )
      this.userTrade = trade;
    }

  ngOnInit() {
  }

  createOfferDescription(trade: Trade):string {
    let userName = trade.creator.username;
    let description = `${userName} is `;
    if (trade.type == TradeType.Sell) {
      description += "selling ";
    } else {
      description += "buying ";
    }
    description += `${Number(trade.firstCurrencyAmount).toFixed(4)} ${EnumHelper.currencyToString(trade.firstCurrency)} for ${Number(trade.secondCurrencyAmount).toFixed(4)} ${EnumHelper.currencyToString(trade.secondCurrency)}`
    return description;
  }

  acceptOffer(offer: any) {
    if (offer.secondCurrency === Currency.BTC || offer.secondCurrency === Currency.LTC || offer.secondCurrency === Currency.ETH) {
      offer.accepted = true;
      this.activeTradeService.exchangeCryptoCurrency(this.userTrade, offer)
      .subscribe(
        success => {
          this.dialogRef.close({redirectToCompleted: true});
        },
        error => {
          this.snackBar.open(error, "close", {duration: 3000});
        }
      )
    } else {
      offer.accepted = true;
      this.activeTradeService.acceptTrade(this.userTrade, offer)
      .subscribe(success => {
        this.dialogRef.close({redirect: true})
      })
    }
  }

  getUserImageUrl(user: UserProfile): string {
    return `assets/shibes/${user.id}.jpg`;
  }
}
