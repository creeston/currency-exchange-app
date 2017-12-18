import { Component, OnInit, Host } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TradesComponent } from '../trades/trades.component';
import { UserProfileService, UserProfile } from '../services/user-profile.service';
import { ActiveTradeService, ActiveTrade, ActiveTradeStatus } from '../services/active-trade.service';
import { TradeType } from '../services/trade.service';
import { EnumHelper } from '../enum-helper'
import { RateService } from '../services/rate.service';
import { UserProfileDialogComponent } from '../user-profile-dialog/user-profile-dialog.component';

@Component({
  selector: 'app-active-trades',
  templateUrl: './active-trades.component.html',
  styleUrls: ['./active-trades.component.css']
})
export class ActiveTradesComponent implements OnInit {
  activeTrades: ActiveTrade[];
  parentComponent: TradesComponent;
  profile: UserProfile;
  tradesLoaded: boolean = false;

  constructor(
    private profileService: UserProfileService,
    private rateService: RateService,
    @Host() parent: TradesComponent,
    public dialog: MatDialog, 
    private tradeService: ActiveTradeService) {
      
     this.parentComponent = parent; 
     this.profile = profileService.currentUser;
     this.loadTrades();
  }

  ngOnInit() {
  }

  createTradeDescription(trade: ActiveTrade): string {
    return `${trade.cryptoCurrencyAmount} ${EnumHelper.currencyToString(trade.cryptoCurrency)} for ${trade.nationalCurrencyAmount} ${EnumHelper.currencyToString(trade.nationalCurrency)}`
  }

  openProfileForm(trade: ActiveTrade) {
    let dialogRef = this.dialog.open(UserProfileDialogComponent, {
      width: '550px',
      data: this.getPartnerId(trade)
    })
  }

  getPartnerName(trade: ActiveTrade): string {
    if (trade.seller.id == this.profile.id) {
      return trade.buyer.username;
    } else {
      return trade.seller.username;
    }
  }

  getPartnerId(trade: ActiveTrade): number {
    if (trade.seller.id == this.profile.id) {
      return trade.buyer.id;
    } else {
      return trade.seller.id;
    }
  }

  getTradeTypeName(trade: ActiveTrade): string {
    if (trade.seller.id == this.profile.id) {
      return "buying";
    } else {
      return "selling";
    }
  }

  getPaymentMethodName(trade: ActiveTrade) {
    return EnumHelper.paymentMethodToString(trade.paymentMethod);
  }

  loadTrades() {
    this.tradesLoaded = false;
    this.tradeService.listActiveTrades().subscribe(result => {
      this.activeTrades = result.filter(t => !t.rateTicket.rate);
      this.tradesLoaded = true;
    });
  }

  changeStatus(trade: ActiveTrade, status: ActiveTradeStatus) {
    this.tradeService.updateTradeStatus(trade.id, status).subscribe(success => this.loadTrades());
  }

  getUserImageUrl(trade: ActiveTrade) {
    while (!this.profile) {}
    let partnerId = 0;
    if (trade.seller.id == this.profile.id) {
      partnerId = trade.buyer.id;
    } else {
      partnerId = trade.seller.id;
    }
    {return `assets/shibes/${partnerId}.jpg`};
  }

  rateUser(trade: ActiveTrade) {
    this.rateService.rateUser(trade.rateTicket).subscribe(success => {
      this.loadTrades();
      this.parentComponent.switchToCompletedTrades();
    });
  }
}
