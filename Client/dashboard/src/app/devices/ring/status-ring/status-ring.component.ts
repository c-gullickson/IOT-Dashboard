import { Component, OnInit } from '@angular/core';
import { RingApiService } from 'src/app/api-services/ring/ring-api.service';
import { RingDevice } from 'src/app/api-services/ring/ring-device';

@Component({
  selector: 'app-status-ring',
  templateUrl: './status-ring.component.html',
  styleUrls: ['./status-ring.component.css']
})
export class StatusRingComponent implements OnInit {

  constructor(private ringApi: RingApiService) { }

  ringDevices: RingDevice[] = []

  ngOnInit(): void {
    console.log("Main Ring Start")
    this.getStatusOfDevices()
  }

  getStatusOfDevices() {
    this.ringApi.getDeviceStatus().subscribe({
      next: (data: RingDevice[]) => {
        data.forEach(element => {
          this.ringDevices.push(this.createRingDevice(element))
        })
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
