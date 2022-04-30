import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LightDevice } from 'src/app/api-services/lights/light-device';
import { LightsApiService } from 'src/app/api-services/lights/lights-api.service';
import { NotificationSnackbarComponent } from 'src/app/misc-components/notification/notification-snackbar/notification-snackbar.component';

@Component({
  selector: 'app-status-lights',
  templateUrl: './status-lights.component.html',
  styleUrls: ['./status-lights.component.css']
})
export class StatusLightsComponent implements OnInit {

  constructor(private lightApi: LightsApiService, private snackBar: MatSnackBar) { }

  lightDevices: LightDevice[] = []
  lightColor: string = 'rgb(255,0,0)'

  ngOnInit(): void {
    console.log("Main Light Start")
    this.getStatusOfDevices()
  }

  getStatusOfDevices() {
    this.lightApi.getDeviceInfo().subscribe({
      next: (data: LightDevice[]) => {
        data.forEach(element => {
          this.lightDevices.push(this.createLightDevice(element))
        })
        this.snackBar.openFromComponent(NotificationSnackbarComponent, {
          data: "Light Device Information Update",
          duration: 5000
        });
      },
      error: (err: any) => {
        this.snackBar.openFromComponent(NotificationSnackbarComponent, {
          data: "Error With Light Device Status:" + JSON.stringify(err),
          duration: 15000
        });
      }    });
  }

  createLightDevice(data: any): LightDevice {

    var state = 'Off';
    if (data['state'] == 0){
      state = 'Off';
    }
    else if (data['state'] == 1){
      state = 'On';
    }
    this.lightColor = 'rgb(' + data['color'].replaceAll(':', ',') + ')';

    let device = new LightDevice(
      data['device_id'],
      data['category'],
      data['brightness'],
      this.lightColor,
      data['color_temperature'],
      data['device_rssi'],
      data['device_name'],
      state,
      );
    
    return device
  }
}
