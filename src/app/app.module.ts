import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { CurrencyDataService } from './currency-chart/currency-data.service';
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
import { LoginService } from './login/login.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MainComponent } from './main/main.component';
import { CdkTableModule } from '@angular/cdk/table';
import { UserThumbnailComponent } from './user-thumbnail/user-thumbnail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CurrencyChartComponent } from './currency-chart/currency-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: MainComponent,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent}
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
  ]
})
export class MaterialModule {}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    UserThumbnailComponent,
    DashboardComponent, 
    CurrencyChartComponent
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
  providers: [AuthService, LoginService, CurrencyDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
