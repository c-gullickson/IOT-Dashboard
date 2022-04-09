import json
import requests
from Class_Objects.roku_devices import Roku_Devices

class Roku_IOT:
    def __init__(self, device_list):
        #Initialize the required Roku class and parameters
        self.device_list = device_list
        self.devices = []

    def devices_on_network(self):
        #Check to see if the IP of the device is on the network

        for device in self.device_list:
            Roku_Devices.__init__(Roku_Devices, device["device_location"], device["device_ip"])
            new_device = Roku_Devices.return_device(Roku_Devices)
            self.devices.append(new_device)
            print(new_device.mapped_name)
            print(new_device.ip_address)


    def get_device_status(self):
        #Lookup the status of each device
        for device in self.device_list:

            pass
        

    def set_device_on(self, device_ip):
        #Request to turn on a device
        pass

    def set_device_off(self, device_ip):
        #Request to turn off a device
        pass
    
    def set_device_play(self, device_ip):
        #Request to continue playing a show on a device
        pass

    def set_device_pause(self, device_ip):
        #Request to pause playing a show on a device
        pass
    