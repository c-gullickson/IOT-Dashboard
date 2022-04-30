import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RingDevice } from './ring-device';
import { RingEvent } from './ring-event';

@Injectable({
  providedIn: 'root'
})
export class RingApiService {

  constructor(private http: HttpClient) { }

  getDeviceStatus(): Observable<RingDevice[]> {
    return this.http.get<RingDevice[]>(environment.API_URL + '/ring/device/status');
  }

  getDeviceAlerts(): Observable<RingEvent[]> {
    return this.http.get<RingEvent[]>(environment.API_URL + '/ring/device/alert');
  }

  getAlertRecording(deviceId): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/ring/device/alert_recording/'+ deviceId);
  }
}
