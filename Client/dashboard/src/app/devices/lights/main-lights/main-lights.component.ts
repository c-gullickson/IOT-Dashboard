import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardApiService } from 'src/app/api-services/dashboard/dashboard-api.service';
import { LightDevice } from 'src/app/api-services/lights/light-device';
import { LightsApiService } from 'src/app/api-services/lights/lights-api.service';
import { NotificationSnackbarComponent } from 'src/app/misc-components/notification/notification-snackbar/notification-snackbar.component';

@Component({
  selector: 'app-main-lights',
  templateUrl: './main-lights.component.html',
  styleUrls: ['./main-lights.component.css']
})
export class MainLightsComponent implements OnInit {

  constructor(private lightApi: LightsApiService, private dashboardApi: DashboardApiService, private snackBar: MatSnackBar) { }

  lightDevices: LightDevice[] = []
  isLightsInit: Boolean;

  ngOnInit(): void {
    console.log("Main Light Start")
    this.isLightsInitialized()
  }

  isLightsInitialized() {
    this.dashboardApi.lightIntializedStatus().subscribe({
      next: (data: any) => {
        this.isLightsInit = data['initialize_sengled'];
        if (this.isLightsInit == true) {
          this.getStatusOfDevices()
        }
      },
      error: (err => {
        this.isLightsInit = false;
        this.snackBar.openFromComponent(NotificationSnackbarComponent, {
          data: "Error Getting Status of Light Devices: " + JSON.stringify(err),
          duration: 15000
        });
      })
    });
  }

  getStatusOfDevices() {
    this.lightApi.getDeviceInfo().subscribe({
      next: (data: LightDevice[]) => {
        data.forEach(element => {
          this.lightDevices.push(this.createLightDevice(element))
        })
        this.snackBar.openFromComponent(NotificationSnackbarComponent, {
          data: "Returned Device Status for " + this.lightDevices.length + " Light Device(s)",
          duration: 5000
        });
      },
      error: (err: any) => {
        this.snackBar.openFromComponent(NotificationSnackbarComponent, {
          data: "Error Getting Status of Light Devices: " + JSON.stringify(err),
          duration: 15000
        });
      }
    });
  }

  createLightDevice(data: any): LightDevice {
    let device = new LightDevice(
      data['device_id'],
      data['category'],
      data['brightness'],
      data['color'],
      data['color_temperature'],
      data['device_rssi'],
      data['device_name'],
      data['state'],
    );

    return device
  }
}
