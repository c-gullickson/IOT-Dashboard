import sys
import json
from flask import Flask

from ring_iot import Ring_IOT
from roku_iot import Roku_IOT
from processor import Processor


app = Flask(__name__)

def main():
    #Read file for mappings and passwords
    #TODO: Change path to be local so it does not get uploaded to GitHub
    config_file = open("Config/configFile.json", "r")
    config_data = json.load(config_file)

    ring_username = config_data['ring_username']
    ring_password = config_data['ring_password']
    ring_useragent = config_data['ring_useragent']

    roku_devices = config_data['roku_devices']
    lan = config_data['lan']

    print(roku_devices) 

    #Initialize device classes that also get used:
    #TODO will need to input controlls to determine if all of these devices will be used.
    #TODO anticipated devices: Ring Doorbell, Roku TV, Fitbit, Lightbulbs, Weather Station

    # Ring_IOT.__init__(Ring_IOT, ring_useragent, ring_username, ring_password)
    # Ring_IOT.authenticate_ring_token(Ring_IOT)
    # Ring_IOT.get_devices(Ring_IOT)

    # Ring_IOT.get_doorbell_alert(Ring_IOT)

    Roku_IOT.__init__(Roku_IOT, lan, roku_devices)
    Roku_IOT.devices_on_network(Roku_IOT)
    Roku_IOT.get_device_status(Roku_IOT)
    Roku_IOT.get_device_info(Roku_IOT)

    # Processor.__init__(Processor, Ring_IOT, Roku_IOT)
    # Processor.processor_start(Processor)

    #Start Flask application
    if __name__ == "__main__":
        app.run(debug=False)


def update_config_mappings():
    #Read into configFile.txt
    #Loop through each line
        #Print out value
        #Ask user if they want to update the value
    #Update config mappings/passwords/tokens
    pass

main()