export class RokuDevice {
    constructor(
      public mapped_name: string,
      public ip_address: string,
      public state: string,
      public friendly_name: string,
      public is_tv: Boolean,
      public is_stick: Boolean
    ) { }
  }