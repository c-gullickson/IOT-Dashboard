import requests
import json

from Class_Objects.sengled_device import Sengled_Device


class Sengled_IOT:
    def __init__(self, sengled_username, sengled_password):
        # Initialize the required Cync class and parameters
        self.sengled_username = sengled_username
        self.sengled_password = sengled_password

        self.sengled_auth_token = ""
        self.devices = []

    def authenticate_sengled_token(self):
        url = "https://us-elements.cloud.sengled.com:9000/zigbee/customer/login.json"

        payload = {"os_type": "android", "user": self.sengled_username,
                   "pwd": self.sengled_password, "uuid": "xxxxxx"}
        headers = {'Content-Type': 'application/json'}

        response = requests.request(
            "POST", url, headers=headers, data=json.dumps(payload), verify=False)

        response_data = response.json()
        self.sengled_auth_token = response_data["jsessionid"]

    def check_info_of_devices(self):
        self.devices = []
        url = "https://life2.cloud.sengled.com/life2/device/list.json"

        payload = {}
        headers = {
            'Content-Type': 'application/json',
            'Cookie': 'JSESSIONID='+self.sengled_auth_token
        }

        response = requests.request("POST", url, headers=headers, data=payload)
        response_data = response.json()

        for dev in response_data['deviceList']:

            device_id = dev['deviceUuid']
            category = dev['category']

            for attribute in dev['attributeList']:

                if attribute['name'] == "brightness": brightness = attribute['value']
                if attribute['name'] == "color": color = attribute['value']
                if attribute['name'] == "colorTemperature": color_temperature = attribute['value']
                if attribute['name'] == "deviceRssi": device_rssi = attribute['value']
                if attribute['name'] == "name": device_name = attribute['value']
                if attribute['name'] == "online": state = attribute['value']

            self.devices.append(Sengled_Device(device_id, category, brightness, color, color_temperature, device_rssi, device_name, state))

        return [d.encoded_device() for d in self.devices]
