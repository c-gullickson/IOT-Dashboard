import sys
import json
from flask import Flask

from ring_iot import Ring_IOT
from roku_iot import Roku_IOT


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

    print(config_data) 

    #Initialize device classes that also get used:
    Ring_IOT.__init__(Ring_IOT, ring_useragent, ring_username, ring_password)
    Ring_IOT.authenticate_ring_token(Ring_IOT)

    Ring_IOT.__init__(Roku_IOT, roku_devices)


    #Start Flask application
    if __name__ == "__main__":
        app.run(debug=True)


def update_config_mappings():
    #Read into configFile.txt
    #Loop through each line
        #Print out value
        #Ask user if they want to update the value
    #Update config mappings/passwords/tokens
    pass

main()