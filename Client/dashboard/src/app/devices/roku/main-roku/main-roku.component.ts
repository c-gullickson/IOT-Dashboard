import { Component, OnInit } from '@angular/core';
import { RokuApiService } from 'src/app/api-services/roku/roku-api.service';
import { RokuDevice } from 'src/app/api-services/roku/roku-device';

@Component({
  selector: 'app-main-roku',
  templateUrl: './main-roku.component.html',
  styleUrls: ['./main-roku.component.css']
})
export class MainRokuComponent implements OnInit {

  constructor(private rokuApi: RokuApiService) { }

  rokuDevices: RokuDevice[] = []

  ngOnInit(): void {
    console.log("Main Roku Start")
    this.getStatusOfDevices()
  }

  getStatusOfDevices() {
    this.rokuApi.getDeviceStatus().subscribe({
      next: (data: RokuDevice[]) => {
        data.forEach(element => {
          this.rokuDevices.push(this.createRokuDevice(element))
        })
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
    );

    return device
  }
}

