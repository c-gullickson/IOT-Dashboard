import requests
import json

class Sengled_IOT:
    def __init__(self, sengled_username, sengled_password):
        #Initialize the required Cync class and parameters
        self.sengled_username = sengled_username
        self.sengled_password = sengled_password

        self.devices = []


    def authenticate_sengled_token(self):
        url = "https://us-elements.cloud.sengled.com:9000/zigbee/customer/login.json"

        payload={"os_type": "android", "user": self.sengled_username, "pwd": self.sengled_password, "uuid": "xxxxxx"}
        headers = {'Content-Type': 'application/json'}

        response = requests.request("POST", url, headers=headers, data=json.dumps(payload), verify=False)

        print(response.text)

            