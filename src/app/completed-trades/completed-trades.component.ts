import { Component, OnInit } from '@angular/core';
import { ActiveTrade, ActiveTradeService } from '../services/active-trade.service';
import { UserProfileService, UserProfile } from '../services/user-profile.service';
import { EnumHelper } from '../enum-helper';

@Component({
  selector: 'app-completed-trades',
  templateUrl: './completed-trades.component.html',
  styleUrls: ['./completed-trades.component.css']
})
export class CompletedTradesComponent implements OnInit {
  completedTrades: ActiveTrade[];
  profile: UserProfile;
  
  constructor(private tradeService: ActiveTradeService, private profileService: UserProfileService) { 
    this.profile = profileService.currentUser;
    this.loadTrades();
  }

  ngOnInit() {
  }

  loadTrades() {
    this.tradeService.listActiveTrades().subscribe(result => {
      this.completedTrades = result.filter(t => t.rateTicket.rate);
    });
  }
  
  createTradeDescription(trade: ActiveTrade): string {
    return `${trade.cryptoCurrencyAmount} ${EnumHelper.currencyToString(trade.cryptoCurrency)} for ${trade.nationalCurrencyAmount} ${EnumHelper.currencyToString(trade.nationalCurrency)}`
  }

  getPartnerName(trade: ActiveTrade): string {
    if (trade.seller.id == this.profile.id) {
      return trade.buyer.username;
    } else {
      return trade.seller.username;
    }
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
