import { Component, OnInit } from '@angular/core';
import { UserProfileService, UserProfile } from '../services/user-profile.service';
import { BalanceService, CurrencyBalance } from '../services/balance.service';

@Component({
  selector: 'app-user-thumbnail',
  templateUrl: './user-thumbnail.component.html',
  styleUrls: ['./user-thumbnail.component.css']
})
export class UserThumbnailComponent implements OnInit {
  profile: UserProfile = new UserProfile(null);
  userImageUrl: string;
  balance: any[] = []
  userBalanceInfo: string;

  constructor(private profileService: UserProfileService) { 
    console.log("UserThumbnail.constructor was called");
    profileService.getCurrentUser().subscribe(
      profile => {
        this.profile = profile;
        this.userImageUrl = `assets/shibes/${this.profile.id}.jpg`;
      }, error => {
        console.log(error);
      }
    )
  }

  ngOnInit() {
    console.log("UserThumbnail.ngOnInit was called");
  }
}
