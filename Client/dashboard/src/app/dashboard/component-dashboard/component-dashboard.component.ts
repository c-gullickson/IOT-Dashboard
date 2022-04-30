import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DashboardApiService } from 'src/app/api-services/dashboard/dashboard-api.service';
import { WebsocketConnectionService } from 'src/app/api-services/websocket/websocket-connection.service';

@Component({
  selector: 'app-component-dashboard',
  templateUrl: './component-dashboard.component.html',
  styleUrls: ['./component-dashboard.component.css']
})
export class ComponentDashboardComponent implements OnInit {

  @Output() websocketMessageEvent = new EventEmitter<string>();

  constructor(private dashboardApi: DashboardApiService, private websocketApi: WebsocketConnectionService) { }

  isRoku : Boolean = false;
  isRing : Boolean = false;
  isLights: Boolean = false;
  isProcessor : Boolean = false;
  websocketSubscription: any = null;

  ngOnInit(): void {

    if (this.websocketSubscription == undefined){
      this.websocketSubscription = this.websocketApi.receiveMessage().subscribe((message: string) => {
        this.websocketMessageEvent.emit(message['data']);
      });
    }

    this.dashboardApi.rokuIntializedStatus().subscribe({
      next: (data : any) => {
        this.isRoku = data['initialize_roku'];
      }
    });

    this.dashboardApi.ringIntializedStatus().subscribe({
      next: (data : any) => {
        this.isRing = data['initialize_ring'];
      }
    });

    this.dashboardApi.lightIntializedStatus().subscribe({
      next: (data : any) => {
        this.isLights = data['initialize_sengled'];
      }
    });

    this.dashboardApi.processorIntializedStatus().subscribe({
      next: (data : any) => {
        this.isProcessor = data['initialize_processor'];
      }
    });
  }

  toggleRokuChanges($event: MatSlideToggleChange){
    if($event.checked == true) {
      this.dashboardApi.initializeRoku().subscribe({
        next: () => {
          this.isRoku = true;
          window.location.reload();
        },
        error: () => {
          this.isRoku = false;
        }
      });
    }
  }

  toggleRingChanges($event: MatSlideToggleChange){
    if($event.checked == true) {
      this.dashboardApi.initializeRing().subscribe({
        next: () => {
          this.isRing = true;
          window.location.reload();
        },
        error: () => {
          this.isRing = false;
        }
      });
    }
  }

  toggleLightChanges($event: MatSlideToggleChange){
    if($event.checked == true) {
      this.dashboardApi.initializeLights().subscribe({
        next: () => {
          this.isLights = true;
          window.location.reload();
        },
        error: () => {
          this.isLights = false;
        }
      });
    }
  }

  toggleProcessorChanges($event: MatSlideToggleChange){
    if($event.checked == true && (this.isRing == true && this.isRoku == true)) {
      this.dashboardApi.initializeProcessor().subscribe({
        next: () => {
          this.isProcessor = true;
          window.location.reload();
        },
        error: () => {
          this.isProcessor = false;
        }
      });
    }
  }
}
