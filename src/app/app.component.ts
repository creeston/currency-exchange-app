import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(authService: AuthService, router: Router) {
    if (!authService.isLoggedIn()) {
      router.navigate(['login']);
    } else {
      router.navigate(['home']);
    }
  }
}
