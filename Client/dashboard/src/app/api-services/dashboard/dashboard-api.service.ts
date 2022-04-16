import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService {

  constructor(private http: HttpClient) { }

  getDashboardConfig(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:5000/dashboard/config');
  }

  updateDashboardConfig(requestBody): Observable<any>{
    return this.http.post<any>('http://127.0.0.1:5000/dashboard/config/update', requestBody);
  }

  initializeRing(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:5000/dashboard/initialize_ring');
  }

  initializeRoku(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:5000/dashboard/initialize_roku');
  }

  initializeProcessor(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:5000/dashboard/initialize_processor');
  }

  ringIntializedStatus(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:5000/dashboard/ring_enabled');
  }

  rokuIntializedStatus(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:5000/dashboard/roku_enabled');
  }

  processorIntializedStatus(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:5000/dashboard/processor_enabled');
  }

}
