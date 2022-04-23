import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RingApiService } from 'src/app/api-services/ring/ring-api.service';
import { RingEvent } from 'src/app/api-services/ring/ring-event';
import { NotificationSnackbarComponent } from 'src/app/misc-components/notification/notification-snackbar/notification-snackbar.component';

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

  recordingUrl: SafeUrl = "";
  hasAlert = false;

  constructor(private ringApi: RingApiService, private sanitizer: DomSanitizer, private snackBar: MatSnackBar) { }

  ngAfterViewInit(): void {

    console.log(this.device_id)
    this.ringApi.getDeviceAlerts().subscribe({
      next: (data: RingEvent[]) => {
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
        this.snackBar.openFromComponent(NotificationSnackbarComponent, {
          data: "Returned Alert URL for Ring Device Id" + this.device_id,
          duration: 5000
        });
      },
      error: (err: any) => {
        this.snackBar.openFromComponent(NotificationSnackbarComponent, {
          data: "Error Getting Alert URL for Ring Devices: " + JSON.stringify(err),
          duration: 15000
        });
      }
    });
  }

  getAlertUrl() {
    this.ringApi.getAlertRecording(this.device_id).subscribe({
      next: (data: any) => {
        this.recordingUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data['recording_url'])
        this.snackBar.openFromComponent(NotificationSnackbarComponent, {
          data: "Returned Alert URL for Ring Device Id" + this.device_id,
          duration: 5000
        });
      },
      error: (err: any) => {
        this.snackBar.openFromComponent(NotificationSnackbarComponent, {
          data: "Error Getting Alert URL for Ring Devices: " + JSON.stringify(err),
          duration: 15000
        });
      }
    });

    this.hasAlert = true;
  }


}
