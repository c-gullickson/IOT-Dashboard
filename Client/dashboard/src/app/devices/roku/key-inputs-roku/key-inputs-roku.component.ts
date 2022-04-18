import { Component, Input, OnInit } from '@angular/core';
import { RokuApiService } from 'src/app/api-services/roku/roku-api.service';
import { KeyInput } from 'src/app/api-services/roku/roku-key-input';

@Component({
  selector: 'app-key-inputs-roku',
  templateUrl: './key-inputs-roku.component.html',
  styleUrls: ['./key-inputs-roku.component.css']
})
export class KeyInputsRokuComponent implements OnInit {

  constructor(private rokuApi: RokuApiService) { }

  @Input() ip_address: string

  ngOnInit(): void {

    console.log(this.ip_address)
  }

  powerOn(){
    let keyRequest : KeyInput = {
      key: "PowerOn",
      ip_address: this.ip_address
    }

    this.rokuApi.controlDeviceKeyInput(keyRequest).subscribe({
      next: (data: any) => {
        console.log("Power On Key Input")
      },
      error: (err) => {

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
        console.log("Power Off Key Input")
      },
      error: (err) => {

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
        console.log("Play Key Input")
      },
      error: (err) => {

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
        console.log("Pause Key Input")
      },
      error: (err) => {

      }
    });
  }



}
