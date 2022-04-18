import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RingApiService } from 'src/app/api-services/ring/ring-api.service';
import { RingEvent } from 'src/app/api-services/ring/ring-event';

@Component({
  selector: 'app-alerts-ring',
  templateUrl: './alerts-ring.component.html',
  styleUrls: ['./alerts-ring.component.css']
})
export class AlertsRingComponent implements AfterViewInit {

  @Input() device_id: string

  ringEvents: RingEvent[] = []
  displayedColumns: string[] = ['event_id', 'event_type', 'event_answered', 'event_created_at'];
  dataSource = new MatTableDataSource(); // create new object

  recordingUrl = "";

  constructor(private ringApi: RingApiService) { }


  ngAfterViewInit(): void {

    console.log(this.device_id)
    this.ringApi.getDeviceAlerts().subscribe({
      next: (data: RingEvent[]) => {
        console.log("Get Most Recent Device Alert")
        console.log(data)

        data.forEach(element => {
          let ringEvent: RingEvent = {
            event_id: element.event_id,
            event_type: element.event_type,
            event_answered: element.event_answered,
            event_created_at: element.event_created_at
          };

          this.ringEvents.push(ringEvent);
          this.dataSource.data = this.ringEvents
        });
      },
      error: (err) => {
        console.log("Error getting alerts: " + err)
      }
    });
  }

  getAlertUrl() {
    this.ringApi.getAlertRecording(this.device_id).subscribe({
      next: (data: any) => {
        this.recordingUrl = data['recording_url'];
      },
      error: (err) => {
        console.log("Error getting alert recording: " + err)
      }
    })
  }


}
