import json
import requests

class Roku_IOT:
    def __init__(self, device_list):
        #Initialize the required Roku class and parameters
        self.device_list = device_list

    def devices_on_network(self):
        #Check to see if the IP of the device is on the network
        pass

    def get_device_status():
        #Lookup the status of each device
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
    