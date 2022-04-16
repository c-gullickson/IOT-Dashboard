import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DashboardApiService } from 'src/app/api-services/dashboard/dashboard-api.service';

@Component({
  selector: 'app-component-dashboard',
  templateUrl: './component-dashboard.component.html',
  styleUrls: ['./component-dashboard.component.css']
})
export class ComponentDashboardComponent implements OnInit {

  constructor(private dashboardApi: DashboardApiService) { }

  isRoku : Boolean = false;
  isRing : Boolean = false;
  isProcessor : Boolean = false;


  ngOnInit(): void {
    this.dashboardApi.rokuIntializedStatus().subscribe({
      next: (data : any) => {
        this.isRoku = data['initialize_roku'];
        console.log(this.isRoku);
      }
    });

    this.dashboardApi.ringIntializedStatus().subscribe({
      next: (data : any) => {
        this.isRing = data['initialize_ring'];
        console.log(this.isRing);
      }
    });

    this.dashboardApi.processorIntializedStatus().subscribe({
      next: (data : any) => {
        this.isProcessor = data['initialize_processor'];
        console.log(this.isProcessor);
      }
    });
  }

  toggleRokuChanges($event: MatSlideToggleChange){
    if($event.checked == true) {
      this.dashboardApi.initializeRoku().subscribe({
        next: (data : any) => {
          console.log(data);
          this.isRoku = true;
        },
        error: (err) => {
          this.isRoku = false;
          console.log(err);
        }
      });
    }
  }

  toggleRingChanges($event: MatSlideToggleChange){
    if($event.checked == true) {
      this.dashboardApi.initializeRing().subscribe({
        next: (data : any) => {
          console.log(data);
          this.isRing = true;
        },
        error: (err) => {
          this.isRing = false;
          console.log(err);
        }
      });
    }
  }
  toggleProcessorChanges($event: MatSlideToggleChange){
    if($event.checked == true && (this.isRing == true && this.isRoku == true)) {
      this.dashboardApi.initializeProcessor().subscribe({
        next: (data : any) => {
          console.log(data);
          this.isProcessor = true;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
}
