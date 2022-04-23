import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RokuApiService } from 'src/app/api-services/roku/roku-api.service';
import { RokuDevice } from 'src/app/api-services/roku/roku-device';
import { NotificationSnackbarComponent } from 'src/app/misc-components/notification/notification-snackbar/notification-snackbar.component';

@Component({
  selector: 'app-status-roku',
  templateUrl: './status-roku.component.html',
  styleUrls: ['./status-roku.component.css']
})
export class StatusRokuComponent implements OnInit {

  constructor(private rokuApi: RokuApiService, private snackBar: MatSnackBar) { }

  rokuDevices: RokuDevice[] = []

  ngOnInit(): void {
    console.log("Main Roku Start")
    this.getStatusOfDevices()
  }

  getStatusOfDevices() {
    this.rokuApi.getDeviceInfo().subscribe({
      next: (data: RokuDevice[]) => {
        data.forEach(element => {
          this.rokuDevices.push(this.createRokuDevice(element))
        })
        this.snackBar.openFromComponent(NotificationSnackbarComponent, {
          data: "Roku Device Information Update",
          duration: 5000
        });
      },
      error: (err: any) => {
        this.snackBar.openFromComponent(NotificationSnackbarComponent, {
          data: "Error With Roku Device Status:" + JSON.stringify(err),
          duration: 15000
        });
      }
    });
  }

  createRokuDevice(data: any): RokuDevice {
    console.log(data)

    let device = new RokuDevice(
      data['mapped_name'],
      data['ip_address'],
      data['state'],
      data['friendly_name'],
      data['is_tv'],
      data['is_stick'],
      data['channel'],
    );

    return device
  }
}
