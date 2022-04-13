
class Roku_Device:
    # TODO Add additional information for devcie
    def __init__(self, mapped_name, ip_address):
        self.mapped_name = mapped_name
        self.ip_address = ip_address

        self.state = "UNDEFINED"
        self.is_tv = False
        self.is_stick = False
        self.friendly_device_name = ""

    def return_device(self):
        return self

    def encoded_device(self):
        return {'mapped_name': self.mapped_name, 'ip_address': self.ip_address, 'state': self.state, 
        'friendly_name': self.friendly_device_name, 'is_tv': self.is_tv, 'is_stick': self.is_stick}
