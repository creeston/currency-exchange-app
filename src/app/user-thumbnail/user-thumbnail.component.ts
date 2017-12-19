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
    if (profileService.currentUser) {
      this.loadUser();
    }
    profileService.getCurrentUser().subscribe(
      profile => {
        this.loadUser();
      }, error => {
        console.log(error);
      }
    )
  }

  loadUser() {
    this.profile = this.profileService.currentUser;
    this.userImageUrl = `assets/shibes/${this.profile.id}.jpg`;
  }

  ngOnInit() {
  }
}
