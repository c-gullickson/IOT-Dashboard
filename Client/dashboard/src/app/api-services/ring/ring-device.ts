export class RingDevice {

    address: string;
    family_name: string;
    device_id: string;
    device_name: string;
    timezone: Date;
    wifi_rssi: number;
    battery: number;
    model: string;

    constructor(
        address: string,
        family_name: string,
        device_id: string,
        device_name: string,
        timezone: Date,
        wifi_rssi: number,
        battery: number,
        model: string
    ) { 
        this.address = address;
        this.family_name = family_name;
        this.device_id = device_id;
        this.device_name = device_name;
        this.timezone = timezone;
        this.wifi_rssi = wifi_rssi;
        this.battery = battery;
        this.model = model
    }
  }