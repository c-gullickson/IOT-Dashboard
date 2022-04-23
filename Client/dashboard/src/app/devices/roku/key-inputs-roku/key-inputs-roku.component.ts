import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RokuApiService } from 'src/app/api-services/roku/roku-api.service';
import { KeyInput } from 'src/app/api-services/roku/roku-key-input';
import { NotificationSnackbarComponent } from 'src/app/misc-components/notification/notification-snackbar/notification-snackbar.component';

@Component({
  selector: 'app-key-inputs-roku',
  templateUrl: './key-inputs-roku.component.html',
  styleUrls: ['./key-inputs-roku.component.css']
})
export class KeyInputsRokuComponent implements OnInit {

  constructor(private rokuApi: RokuApiService, private snackBar: MatSnackBar) { }

  @Input() ip_address: string

  ngOnInit(): void {
  }

  powerOn(){
    let keyRequest : KeyInput = {
      key: "PowerOn",
      ip_address: this.ip_address
    }

    this.rokuApi.controlDeviceKeyInput(keyRequest).subscribe({
      next: (data: any) => {
        this.snackBar.openFromComponent(NotificationSnackbarComponent, {
          data: "Roku Device: Power On",
          duration: 5000
        });
      },
      error: (err: any) => {
        this.snackBar.openFromComponent(NotificationSnackbarComponent, {
          data: "Error With Input for Roku Device:" + JSON.stringify(err),
          duration: 15000
        });
      }
    });
  }

  powerOff(){
    let keyRequest : KeyInput = {
      key: "PowerOff",
      ip_address: this.ip_address
    }

    this.rokuApi.controlDeviceKeyInput(keyRequest).subscribe({
      next: (data: any) => {
        this.snackBar.openFromComponent(NotificationSnackbarComponent, {
          data: "Roku Device: Power Off",
          duration: 5000
        });
      },
      error: (err: any) => {
        this.snackBar.openFromComponent(NotificationSnackbarComponent, {
          data: "Error With Input for Roku Device:" + JSON.stringify(err),
          duration: 15000
        });
      }
    });
  }

  play(){
    let keyRequest : KeyInput = {
      key: "Play",
      ip_address: this.ip_address
    }

    this.rokuApi.controlDeviceKeyInput(keyRequest).subscribe({
      next: (data: any) => {
        this.snackBar.openFromComponent(NotificationSnackbarComponent, {
          data: "Roku Device: Play",
          duration: 5000
        });
      },
      error: (err: any) => {
        this.snackBar.openFromComponent(NotificationSnackbarComponent, {
          data: "Error With Input for Roku Device:" + JSON.stringify(err),
          duration: 15000
        });
      }
    });
  }

  pause(){
    let keyRequest : KeyInput = {
      key: "Pause",
      ip_address: this.ip_address
    }

    this.rokuApi.controlDeviceKeyInput(keyRequest).subscribe({
      next: (data: any) => {
        this.snackBar.openFromComponent(NotificationSnackbarComponent, {
          data: "Roku Device: Pause",
          duration: 5000
        });
      },
      error: (err: any) => {
        this.snackBar.openFromComponent(NotificationSnackbarComponent, {
          data: "Error With Input for Roku Device:" + JSON.stringify(err),
          duration: 15000
        });
      }
    });
  }



}
