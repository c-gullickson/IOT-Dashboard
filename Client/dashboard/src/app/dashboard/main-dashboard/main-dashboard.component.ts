
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardApiService } from 'src/app/api-services/dashboard/dashboard-api.service';
import { NotificationSnackbarComponent } from 'src/app/misc-components/notification/notification-snackbar/notification-snackbar.component';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit {

  constructor(private dashboardApi: DashboardApiService, private snackBar: MatSnackBar) { }

  isRoku: Boolean = false;
  isRing: Boolean = false;
  isLights: Boolean = false;
  isConfiguration: Boolean = true

  ngOnInit(): void {
    this.dashboardApi.rokuIntializedStatus().subscribe({
      next: (data: any) => {
        this.isRoku = data['initialize_roku'];
        this.isConfiguration = false;
      },
      error: (err: any) => {
        this.snackBar.openFromComponent(NotificationSnackbarComponent, {
          data: "Error Initializing Roku: " + err,
          duration: 5000
        });
      }
    });

    this.dashboardApi.ringIntializedStatus().subscribe({
      next: (data: any) => {
        this.isRing = data['initialize_ring'];
        this.isConfiguration = false;
      },
      error: (err: any) => {
        this.snackBar.openFromComponent(NotificationSnackbarComponent, {
          data: "Error Initializing Ring: " + err,
          duration: 5000
        });
      }
    });

    this.dashboardApi.lightIntializedStatus().subscribe({
      next: (data: any) => {
        this.isLights = data['initialize_sengled'];
        this.isConfiguration = false;
      },
      error: (err: any) => {
        this.snackBar.openFromComponent(NotificationSnackbarComponent, {
          data: "Error Initializing Ring: " + err,
          duration: 5000
        });
      }
    });
  }

  displayMessage(message: string) {
    this.snackBar.openFromComponent(NotificationSnackbarComponent, {
      data: "New Processor Event: " + JSON.stringify(message),
      duration: 5000
    });
  }
}
