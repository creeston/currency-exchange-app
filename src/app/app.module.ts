import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { CurrencyDataService } from './services/currency-data.service';
import { Router } from '@angular/router/src/router';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
  ErrorStateMatcher
} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginService } from './services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MainComponent } from './main/main.component';
import { CdkTableModule } from '@angular/cdk/table';
import { UserThumbnailComponent } from './user-thumbnail/user-thumbnail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CurrencyChartComponent } from './currency-chart/currency-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CreateTradeComponent } from './create-trade/create-trade.component';
import { WithdrawCurrencyComponent } from './withdraw-currency/withdraw-currency.component';
import { DepositCurrencyComponent } from './deposit-currency/deposit-currency.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { TradesComponent } from './trades/trades.component';
import { TradesQueueComponent } from './trades-queue/trades-queue.component';
import { TradeService } from './services/trade.service'
import { UserProfileService } from './services/user-profile.service';
import { BalanceService } from './services/balance.service';
import { PaymentMethodService } from './services/payment-method.service';
import { TradeOffersComponent } from './trade-offers/trade-offers.component';
import { GlobalErrorHandler } from './error-handler';
import { ActiveTradesComponent } from './active-trades/active-trades.component';
import { ActiveTradeService } from './services/active-trade.service'
import { HeadersProvider } from './services/headers-provider'
import { RateService } from './services/rate.service';
import { UserProfileDialogComponent } from './user-profile-dialog/user-profile-dialog.component';
import { CompletedTradesComponent } from './completed-trades/completed-trades.component';
import { EmailConfirmationService } from './services/email-confirmation.service';
import { RegistrationService } from './services/registration.service'
import { ContactInformationService } from './services/contact-information.service';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: MainComponent,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'settings', component: UserProfileComponent},
      {path: 'trades', component: TradesComponent}
    ]
  }
];

@NgModule({
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  declarations: []
})
export class MaterialModule {}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    UserThumbnailComponent,
    DashboardComponent, 
    CurrencyChartComponent,
    CreateTradeComponent,
    WithdrawCurrencyComponent, 
    DepositCurrencyComponent,
    UserProfileComponent,
    ChangeEmailComponent, 
    ChangePasswordComponent, 
    AddPaymentComponent, 
    AddContactComponent,
    TradesComponent,
    TradesQueueComponent,
    TradeOffersComponent,
    ActiveTradesComponent,
    UserProfileDialogComponent, 
    CompletedTradesComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      routes
    ),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpModule,
    MaterialModule,
    NgxChartsModule
  ],
  providers: [AuthService, LoginService, CurrencyDataService, TradeService, UserProfileService, BalanceService, PaymentMethodService,
  ActiveTradeService, HeadersProvider, RateService, EmailConfirmationService, RegistrationService, ContactInformationService],
  bootstrap: [AppComponent, CreateTradeComponent, WithdrawCurrencyComponent, DepositCurrencyComponent,
    ChangeEmailComponent, ChangePasswordComponent, AddPaymentComponent, AddContactComponent, TradeOffersComponent,
    UserProfileDialogComponent, ConfirmationDialogComponent]
})
export class AppModule { }
