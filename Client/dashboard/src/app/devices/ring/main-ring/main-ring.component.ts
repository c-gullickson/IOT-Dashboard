import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardApiService } from 'src/app/api-services/dashboard/dashboard-api.service';
import { RingApiService } from 'src/app/api-services/ring/ring-api.service';
import { RingDevice } from 'src/app/api-services/ring/ring-device';
import { NotificationSnackbarComponent } from 'src/app/misc-components/notification/notification-snackbar/notification-snackbar.component';

@Component({
  selector: 'app-main-ring',
  templateUrl: './main-ring.component.html',
  styleUrls: ['./main-ring.component.css']
})
export class MainRingComponent implements OnInit {

  constructor(private ringApi: RingApiService, private dashboardApi: DashboardApiService, private snackBar: MatSnackBar) { }

  ringDevices: RingDevice[] = []
  isRingInit: Boolean = false;

  ngOnInit(): void {
    console.log("Main Ring Start")
    this.isRokuInitialized()
  }

  isRokuInitialized() {
    this.dashboardApi.ringIntializedStatus().subscribe({
      next: (data: any) => {
        this.isRingInit = data['initialize_ring'];
        if (this.isRingInit == true) {
          console.log("Get Ring Devices");
          this.getStatusOfDevices()
        }
      },
      error: (err => {
        this.isRingInit = false;
        this.snackBar.openFromComponent(NotificationSnackbarComponent, {
          data: "Error Getting Status of Ring Devices: " + JSON.stringify(err),
          duration: 15000
        });
      })
    });
  }

  getStatusOfDevices() {
    this.ringDevices = [];
    this.ringApi.getDeviceStatus().subscribe({
      next: (data: RingDevice[]) => {
        data.forEach(element => {
          this.ringDevices.push(this.createRingDevice(element))
        })
        this.snackBar.openFromComponent(NotificationSnackbarComponent, {
          data: "Returned Device Status for " + this.ringDevices.length + " Ring Device(s)",
          duration: 5000
        });
      },
      error: (err: any) => {
        this.snackBar.openFromComponent(NotificationSnackbarComponent, {
          data: "Error Getting Status of Ring Devices: " + JSON.stringify(err),
          duration: 15000
        });
      }
    });
  }

  createRingDevice(data: any): RingDevice {
    console.log(data)

    let device = new RingDevice(
      data['address'],
      data['family_name'],
      data['device_id'],
      data['device_name'],
      data['timezone'],
      data['wifi_rssi'],
      data['battery'],
      data['model'],
    );

    return device
  }

}
