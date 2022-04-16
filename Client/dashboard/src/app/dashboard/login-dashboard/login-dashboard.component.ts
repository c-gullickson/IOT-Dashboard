import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { RokuDeviceConfig } from 'src/app/api-services/dashboard/config-roku-device';
import { ConfigUpdateRequest } from 'src/app/api-services/dashboard/config-update';
import { DashboardApiService } from 'src/app/api-services/dashboard/dashboard-api.service';

@Component({
  selector: 'app-login-dashboard',
  templateUrl: './login-dashboard.component.html',
  styleUrls: ['./login-dashboard.component.css']
})
export class LoginDashboardComponent implements OnInit {

  constructor(private fb: FormBuilder, private dashboardApi: DashboardApiService) { }

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective | undefined;
  configForm = this.fb.group({

    ringUsername: new FormControl('', { validators: [Validators.required] }),
    ringPassword: new FormControl('', { validators: [Validators.required] }),
    ringUserAgent: new FormControl('', { validators: [Validators.required] }),
    ringAuthCode: new FormControl(''),
    lan: new FormControl(''),

    rokuDevices: this.fb.array([])
  })

  rokuForm = this.fb.group({
    rokuDeviceLocation: new FormControl(''),
    rokuDeviceIp: new FormControl('')
  })

  get rokuDevices() {
    return this.configForm.controls['rokuDevices'] as FormArray;
  }

  configuration: string = "";

  ngOnInit(): void {
    this.dashboardApi.getDashboardConfig().subscribe({
      next: (data: any) => {
        this.configuration = data;
        console.log(this.configuration);
        this.populateFormControls();
      },
      error: (err => {

      })
    });
  }

  populateFormControls() {
    this.configForm.get('ringUsername').patchValue(this.configuration['ring_username']);
    this.configForm.get('ringPassword').patchValue(this.configuration['ring_password']);
    this.configForm.get('ringUserAgent').patchValue(this.configuration['ring_useragent']);
    this.configForm.get('ringAuthCode').patchValue(this.configuration['ring_auth_code']);
    this.configForm.get('lan').patchValue(this.configuration['lan']);

    this.configuration['roku_devices'].forEach(element => {
      this.addRokuDevice(element['device_location'], element['device_ip'])
    });
  }

  addRokuDevice(deviceLocation: string, deviceIp: string) {
    this.rokuDevices.push(this.newDevice(deviceLocation, deviceIp));
  }

  newDevice(deviceLocation: string, deviceIp: string): FormGroup {
    return this.fb.group({
      rokuDeviceLocation: deviceLocation,
      rokuDeviceIp: deviceIp
    });
  }

  removeRokuDevice(index:number){
    this.rokuDevices.removeAt(index);
  }

  onSubmit() {
    console.log("Form Sumbint")
    this.updateConfigurationObject();
  }

  updateConfigurationObject() {
    var rokuDevices = [];

    this.rokuDevices.controls.forEach(element => {
      let rokuDevice: RokuDeviceConfig = {
          device_location: element['controls']['rokuDeviceLocation'].value,
          device_ip: element['controls']['rokuDeviceIp'].value
        }
        rokuDevices.push(rokuDevice)
    });

    console.log(this.configForm)
    let configUpdate: ConfigUpdateRequest = {
      lan: this.configForm['controls']['lan'].value,
      ring_username: this.configForm['controls']['ringUsername'].value,
      ring_password: this.configForm['controls']['ringPassword'].value,
      ring_useragent: this.configForm['controls']['ringUserAgent'].value,
      ring_auth_code: this.configForm['controls']['ringAuthCode'].value,
      roku_devices: rokuDevices
    }

    console.log(configUpdate);
  }

}
