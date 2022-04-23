export class RokuDevice {

    mapped_name: string;
    ip_address: string;
    state: string;
    friendly_name: string;
    is_tv: Boolean;
    is_stick: Boolean;
    channel: string;

    constructor(
      mapped_name: string,
      ip_address: string,
      state: string,
      friendly_name: string,
      is_tv: Boolean,
      is_stick: Boolean,
      channel: string
    ) { 
        this.mapped_name = mapped_name;
        this.ip_address = ip_address;
        this.state = state;
        this.friendly_name = friendly_name;
        this.is_tv = is_tv;
        this.is_stick = is_stick;
        this.channel = channel;
    }
  }