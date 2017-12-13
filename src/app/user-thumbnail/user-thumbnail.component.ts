import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-thumbnail',
  templateUrl: './user-thumbnail.component.html',
  styleUrls: ['./user-thumbnail.component.css']
})
export class UserThumbnailComponent implements OnInit {
  username: string = "user";
  rate: number = 4.6;
  
  constructor() { }

  ngOnInit() {
  }

}
