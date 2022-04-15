import sys
import json
from flask import Flask
from flask_cors import CORS


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

    Ring_IOT.__init__(Ring_IOT, ring_useragent, ring_username, ring_password)
    Ring_IOT.authenticate_ring_token(Ring_IOT)
    # Ring_IOT.check_status_of_devices(Ring_IOT)
    # Ring_IOT.check_info_of_devices(Ring_IOT)

    Roku_IOT.__init__(Roku_IOT, lan, roku_devices)
    Roku_IOT.devices_on_network(Roku_IOT)
    # Roku_IOT.check_status_of_devices(Roku_IOT)
    # Roku_IOT.check_info_of_devices(Roku_IOT)

    Processor.__init__(Processor, Ring_IOT, Roku_IOT)
    Processor.processor_start(Processor)

    #Start Flask application
    if __name__ == "__main__":
        CORS(app)
        app.run(debug=False)


def update_config_mappings():
    #Read into configFile.txt
    #Loop through each line
        #Print out value
        #Ask user if they want to update the value
    #Update config mappings/passwords/tokens
    pass

#############################################
## Routes for Roku API
#############################################

# return a list of Roku devices with basic information collected
@app.route('/roku/device/status')
def roku_device_status():
    return json.dumps(Roku_IOT.check_status_of_devices(Roku_IOT))

# return a list of Roku devices with more additional information collected
@app.route('/roku/device/info')
def roku_device_info():
    return json.dumps(Roku_IOT.check_info_of_devices(Roku_IOT))

# Client interface button interaction
# Post call to pass a button value

##############################################
## Routes for Ring API
##############################################

# return a list of Ring devices with additional information collected
@app.route('/ring/device/status')
def ring_device_status():
    return json.dumps(Ring_IOT.check_info_of_devices(Ring_IOT))

# return a list of last captured Ring alert
@app.route('/ring/device/alert')
def ring_device_alert():
    return json.dumps(Ring_IOT.get_recent_doorbell_alert(Ring_IOT))

# return a list of last captured Ring alerts (History) Seems to return the alert from the x number of alerts prior
# @app.route('/ring/device/alerts')
# def ring_device_alerts():
#     return json.dumps(Ring_IOT.get_doorbell_alerts_history(Ring_IOT))

# return a list of last captured Ring alert
@app.route('/ring/device/alert_recording/<device_id>')
def ring_device_alert_recording(device_id):
    return json.dumps(Ring_IOT.get_recent_doorbell_video_url(Ring_IOT, device_id))

# Need to pass MFA value to device login

##############################################
## Routes for Fitbit API
##############################################


##############################################
## Routes for Weather API
##############################################

##############################################
## Routes for Light API
##############################################
main()