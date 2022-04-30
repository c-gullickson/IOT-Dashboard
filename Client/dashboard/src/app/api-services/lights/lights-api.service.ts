import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LightDevice } from './light-device';

@Injectable({
  providedIn: 'root'
})
export class LightsApiService {

  constructor(private http: HttpClient) { }

  getDeviceInfo(): Observable<LightDevice[]> {
    return this.http.get<LightDevice[]>(environment.API_URL + '/lights/device/info');
  }
}
