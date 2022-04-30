import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService {

  constructor(private http: HttpClient) {
   }

  getDashboardConfig(): Observable<any> {
    return this.http.get<any>( environment.API_URL + '/dashboard/config');
  }

  updateDashboardConfig(requestBody): Observable<any>{
    return this.http.post<any>(environment.API_URL + '/dashboard/config/update', requestBody);
  }

  initializeRing(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/dashboard/initialize_ring');
  }

  initializeRoku(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/dashboard/initialize_roku');
  }

  initializeLights(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/dashboard/initialize_sengled');
  }

  initializeProcessor(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/dashboard/initialize_processor');
  }

  ringIntializedStatus(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/dashboard/ring_enabled');
  }

  rokuIntializedStatus(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/dashboard/roku_enabled');
  }

  lightIntializedStatus(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/dashboard/sengled_enabled');
  }

  processorIntializedStatus(): Observable<any> {
    return this.http.get<any>(environment.API_URL + '/dashboard/processor_enabled');
  }

}
