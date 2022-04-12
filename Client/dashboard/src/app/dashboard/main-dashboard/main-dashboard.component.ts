
import { Component, OnInit } from '@angular/core';
import { RokuApiService } from 'src/app/api-services/roku/roku-api.service';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit {

  constructor(private rokuApi: RokuApiService) { }

  ngOnInit(): void {
    console.log("Dashboard Init")
    console.log(this.rokuApi.getDeviceStatus().subscribe());
  }

}
