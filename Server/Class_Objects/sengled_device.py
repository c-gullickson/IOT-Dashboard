class Sengled_Device:
    # TODO Add additional information for devcie
    def __init__(self, device_id, category, brightness, color, color_temperature, device_rssi, device_name, state):

        self.device_id = device_id
        self.category = category
        self.brightness = brightness
        self.color = color
        self.color_temperature = color_temperature
        self.device_rssi = device_rssi
        self.device_name = device_name
        self.state = state

    def return_device(self):
        return self

    def encoded_device(self):
        return {'device_id': self.device_id, 'category': self.category, 'brightness': self.brightness, 'color': self.color, 
        'color_temperature': self.color_temperature, 'device_rssi': self.device_rssi, 'device_name': self.device_name, "state": self.state }
