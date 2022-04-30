import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RokuDevice } from './roku-device'; 


@Injectable({
  providedIn: 'root'
})
export class RokuApiService {

  constructor(private http: HttpClient) { }
  
  getDeviceStatus(): Observable<RokuDevice[]> {
    return this.http.get<RokuDevice[]>(environment.API_URL + '/roku/device/status');
  }

  getDeviceInfo(): Observable<RokuDevice[]> {
    return this.http.get<RokuDevice[]>(environment.API_URL + '/roku/device/info');
  }

  controlDeviceKeyInput(keyInput): Observable<any> {
    return this.http.post<any>(environment.API_URL + '/roku/device/key_input', keyInput);
  }
}
