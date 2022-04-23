import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LightDevice } from './light-device';

@Injectable({
  providedIn: 'root'
})
export class LightsApiService {

  constructor(private http: HttpClient) { }

  getDeviceInfo(): Observable<LightDevice[]> {
    return this.http.get<LightDevice[]>('http://127.0.0.1:5000/lights/device/info');
  }
}
