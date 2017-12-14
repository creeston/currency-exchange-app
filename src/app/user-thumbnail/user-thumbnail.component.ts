import { Component, OnInit } from '@angular/core';
import { UserProfileService, UserProfile } from '../user-profile/user-profile.service';

@Component({
  selector: 'app-user-thumbnail',
  templateUrl: './user-thumbnail.component.html',
  styleUrls: ['./user-thumbnail.component.css']
})
export class UserThumbnailComponent implements OnInit {
  profile: UserProfile = new UserProfile(null);
  userImageUrl: string;

  constructor(public service: UserProfileService) { 
    service.getCurrentUser().subscribe(
      profile => {
        this.profile = profile;
        this.userImageUrl = `assets/shibes/${this.profile.id}.jpg`;
      }, error => {
        console.log(error);
      }
    )
  }

  ngOnInit() {
  }
}
