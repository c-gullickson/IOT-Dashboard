export class LightDevice {

    device_id: string;
    category: string;
    brightness: string;
    color: string;
    color_temperature: Date;
    device_rssi: number;
    device_name: number;
    state: string;

    constructor(
        device_id: string,
        category: string,
        brightness: string,
        color: string,
        color_temperature: Date,
        device_rssi: number,
        device_name: number,
        state: string
    ) { 
        this.device_id = device_id;
        this.category = category;
        this.brightness = brightness;
        this.color = color;
        this.color_temperature = color_temperature;
        this.device_rssi = device_rssi;
        this.device_name = device_name;
        this.state = state
    }
  }