
class Roku_Devices:
    #TODO Add additional information for devcie
    def __init__(self, mapped_name, ip_address):
        self.mapped_name = mapped_name
        self.ip_address = ip_address

        self.state = "UNDEFINED"
        self.is_tv = False
        self.is_stick = False
        self.friendly_device_name = ""

    def return_device(self):
        return self

    