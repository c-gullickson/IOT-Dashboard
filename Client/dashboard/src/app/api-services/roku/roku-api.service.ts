import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RokuDevice } from './roku-device'; 


@Injectable({
  providedIn: 'root'
})
export class RokuApiService {

  constructor(private http: HttpClient) { }
  
  getDeviceStatus(): Observable<RokuDevice> {
    return this.http.get<RokuDevice>('http://127.0.0.1:5000/device/status');
  }
}
