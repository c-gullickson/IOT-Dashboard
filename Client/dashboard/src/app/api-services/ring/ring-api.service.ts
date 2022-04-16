import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RingDevice } from './ring-device';

@Injectable({
  providedIn: 'root'
})
export class RingApiService {

  constructor(private http: HttpClient) { }

  getDeviceStatus(): Observable<RingDevice[]> {
    return this.http.get<RingDevice[]>('http://127.0.0.1:5000/ring/device/status');
  }
}
