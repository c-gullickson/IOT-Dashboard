import { Component, OnInit } from '@angular/core';
import { DashboardApiService } from 'src/app/api-services/dashboard/dashboard-api.service';
import { RokuApiService } from 'src/app/api-services/roku/roku-api.service';
import { RokuDevice } from 'src/app/api-services/roku/roku-device';

@Component({
  selector: 'app-main-roku',
  templateUrl: './main-roku.component.html',
  styleUrls: ['./main-roku.component.css']
})
export class MainRokuComponent implements OnInit {

  constructor(private rokuApi: RokuApiService, private dashboardApi: DashboardApiService) { }

  rokuDevices: RokuDevice[] = [];
  isRokuInit: Boolean = false;

  ngOnInit(): void {
    console.log("Main Roku Start")
    this.isRokuInitialized()
  }
  isRokuInitialized() {
    this.dashboardApi.rokuIntializedStatus().subscribe({
      next: (data : any) => {
        this.isRokuInit = data['initialize_roku'];
        if (this.isRokuInit == true){
          console.log("Get Roku Devices");
          this.getStatusOfDevices()
        }
      }, 
      error: (err => {
        this.isRokuInit = false;
        console.log("Error getting Roku Status: " + err)
      })
    });
  }

  getStatusOfDevices() {
    this.rokuDevices = [];
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

