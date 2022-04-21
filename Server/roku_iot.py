import ipaddress
import xmltodict
import json
from urllib import response
import requests
import os
from Class_Objects.roku_device import Roku_Device

class Roku_IOT:
    def __init__(self, lan, device_list):
        #Initialize the required Roku class and parameters
        self.lan = lan
        self.device_list = device_list
        self.devices = []

    def devices_on_network(self):
        #Check to see if the IP of the device is on the network
        self.devices = []
        for device in self.device_list:
            if self.ping_network(self,  device["device_ip"]):
                self.devices.append(Roku_Device(device["device_location"], device["device_ip"]))

        return self.devices        

    def ping_network(self, ip_address):
        #Send ping message to check the IP address is valid for the device
        try:
            response = os.system("ping -n 2 " + ip_address)
            if response == 0:
                return True
        except:
            return False

    def check_status_of_devices(self):
        #Lookup the status of each device
        for device in self.devices:
            url = "http://{ip_address}:8060/query/media-player".format(ip_address = device.ip_address)

            payload={}
            headers = {}

            response = xmltodict.parse(requests.request("GET", url, headers=headers, data=payload).text)
            json_data = json.loads(json.dumps(response))

            device.state = json_data["player"]["@state"]      

        return [d.encoded_device() for d in self.devices]

    def check_info_of_devices(self):
        #Lookup additional info for each device
        for device in self.devices:
            url = "http://{ip_address}:8060/query/device-info".format(ip_address = device.ip_address)

            payload={}
            headers = {}

            response = xmltodict.parse(requests.request("GET", url, headers=headers, data=payload).text)
            json_data = json.loads(json.dumps(response, default=lambda obj: obj.__dict__))

            print(json_data)  
            device.is_tv = json_data["device-info"]["is-tv"]
            device.is_stick = json_data["device-info"]["is-stick"]
            device.friendly_device_name = json_data["device-info"]["friendly-device-name"] 

        return [d.encoded_device() for d in self.devices]

    def key_input(self, ip_address, key):
        if key == "PowerOn":
            self.set_device_on(self, ip_address)
        if key == "PowerOff":
            self.set_device_off(self, ip_address)
        if key == "Play":
            self.set_device_play(self, ip_address)
        if key == "Pause":
            self.set_device_pause(self, ip_address)
        
        return

    #Does there need to be check state return value?
    #Thinking for checking in processor before acting on an alert?
    def get_device_state(self, device_ip):
        for device in self.devices:
            if device.ip_address == device_ip:
                return device.state

    def set_device_on(self, device_ip):
        #Request to turn on a device
        url = "http://{ip_address}:8060/keypress/PowerOn".format(ip_address = device_ip)
        self.remote_button_press(self, url)

    def set_device_off(self, device_ip):
        #Request to turn off a device
        url = "http://{ip_address}:8060/keypress/PowerOff".format(ip_address = device_ip)
        self.remote_button_press(self, url)
    
    def set_device_play(self, device_ip):
        #Request to continue playing a show on a device
        url = "http://{ip_address}:8060/keypress/Play".format(ip_address = device_ip)
        self.remote_button_press(self, url)

    def set_device_pause(self, device_ip):
        #Request to pause playing a show on a device
        url = "http://{ip_address}:8060/keypress/Pause".format(ip_address = device_ip)
        self.remote_button_press(self, url)
    
    def remote_button_press(self, url):
        #Universal method for making keypad button request
        payload={}
        headers = {}
        response = requests.request("POST", url, headers=headers, data=payload)

        print(response.text)

    def update_device_list(self, device_list):
        self.device_list = device_list
