import json
class Ring_Device:
    # TODO Add additional information for devcie
    def __init__(self, address, family_name, device_id, device_name, timezone, wifi_rssi, battery, model):
        self.address = address
        self.family_name = family_name
        self.device_id = device_id
        self.device_name = device_name
        self.timezone = timezone
        self.wifi_rssi = wifi_rssi
        self.battery = battery,
        self.model = model

    def return_device(self):
        return self

    def encoded_device(self):
        return {'address': self.address, 'family_name': self.family_name, 'device_id': self.device_id, 
        'device_name': self.device_name, 'timezone': self.timezone, 'wifi_rssi': self.wifi_rssi, 'battery': self.battery, 'model': self.model}