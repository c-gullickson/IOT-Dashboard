import { RokuDeviceConfig } from "./config-roku-device";

export interface ConfigUpdateRequest { 
    lan?: string;
    ring_username?: string;
    ring_password?: string;
    ring_useragent?: string;
    ring_auth_code?: string;
    roku_devices?: RokuDeviceConfig[];

    sengled_username?: string;
    sengled_password?: string;
}

