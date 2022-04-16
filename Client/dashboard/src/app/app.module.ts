import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainDashboardComponent } from './dashboard/main-dashboard/main-dashboard.component';
import { NavigationComponent } from './navigation/navigation/navigation.component';


import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule} from '@angular/material/button'; 
import { MatCardModule} from '@angular/material/card'; 
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon'; 
import {MatInputModule} from '@angular/material/input';   
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';  
import {MatSelectModule} from '@angular/material/select'; 
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatTableModule} from '@angular/material/table'; 
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatToolbarModule} from '@angular/material/toolbar';
import { AboutComponent } from './about/about.component';
import { MainRokuComponent } from './devices/roku/main-roku/main-roku.component';
import { MainRingComponent } from './devices/ring/main-ring/main-ring.component';
import { MainFitbitComponent } from './devices/fitbit/main-fitbit/main-fitbit.component';
import { MainWeatherComponent } from './devices/weather/main-weather/main-weather.component';
import { MainLightsComponent } from './devices/lights/main-lights/main-lights.component';
import { KeyInputsRokuComponent } from './devices/roku/key-inputs-roku/key-inputs-roku.component';
import { StatusRokuComponent } from './devices/roku/status-roku/status-roku.component';
import { AlertsRingComponent } from './devices/ring/alerts-ring/alerts-ring.component';
import { StatusRingComponent } from './devices/ring/status-ring/status-ring.component';
import { LoginDashboardComponent } from './dashboard/login-dashboard/login-dashboard.component';
import { ComponentDashboardComponent } from './dashboard/component-dashboard/component-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    MainDashboardComponent,
    NavigationComponent,
    MainRokuComponent,
    MainRingComponent,
    MainFitbitComponent,
    MainWeatherComponent,
    MainLightsComponent,
    AboutComponent,
    KeyInputsRokuComponent,
    StatusRokuComponent,
    AlertsRingComponent,
    StatusRingComponent,
    LoginDashboardComponent,
    ComponentDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
