import { Component, OnInit } from '@angular/core';
import { ActiveTrade, ActiveTradeService } from '../services/active-trade.service';
import { UserProfileService, UserProfile } from '../services/user-profile.service';
import { EnumHelper } from '../enum-helper';
import { MatDialog } from '@angular/material';
import { UserProfileDialogComponent } from '../user-profile-dialog/user-profile-dialog.component';

@Component({
  selector: 'app-completed-trades',
  templateUrl: './completed-trades.component.html',
  styleUrls: ['./completed-trades.component.css']
})
export class CompletedTradesComponent implements OnInit {
  completedTrades: ActiveTrade[];
  profile: UserProfile;
  
  constructor(
    private tradeService: ActiveTradeService, 
    private profileService: UserProfileService,
    private dialog: MatDialog) {
    if (profileService.currentUser) {
      this.profile = profileService.currentUser;
    } else {
      profileService.getCurrentUser().subscribe(profile => {
        this.profile = profile;
      })
    }
    this.loadTrades();
  }

  ngOnInit() {
  }

  loadTrades() {
    this.tradeService.listActiveTrades().subscribe(result => {
      this.completedTrades = result.filter(t => t.rateTicket.rate !== null || t.rateTicket.rate !== undefined);
    });
  }
  
  createTradeDescription(trade: ActiveTrade): string {
    return `${Number(trade.cryptoCurrencyAmount).toFixed(4)} ${EnumHelper.currencyToString(trade.cryptoCurrency)} for ${Number(trade.nationalCurrencyAmount).toFixed(4)} ${EnumHelper.currencyToString(trade.nationalCurrency)}`
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

  openProfileForm(trade: ActiveTrade) {
    let dialogRef = this.dialog.open(UserProfileDialogComponent, {
      width: '550px',
      data: this.getPartnerId(trade)
    })
  }

  getTradeTypeName(trade: ActiveTrade): string {
    if (trade.seller.id == this.profile.id) {
      return "bought";
    } else {
      return "sold";
    }
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

}
