import sys
import json
from flask import Flask, request
from flask_cors import CORS
from threading import Thread

from ring_iot import Ring_IOT
from roku_iot import Roku_IOT
from processor import Processor
from config import Config


app = Flask(__name__)

def main():

    Config.__init__(Config)
    Config.load_config_mappings(Config)

    #Start Flask application
    if __name__ == "__main__":
        CORS(app)
        app.run(debug=False)


#Initialize device classes that also get used:
#TODO will need to input controlls to determine if all of these devices will be used.
#TODO anticipated devices: Ring Doorbell, Roku TV, Fitbit, Lightbulbs, Weather Station
def initialize_ring():
    if Config.initialize_ring == True:
        try:
            Ring_IOT.__init__(Ring_IOT, Config.ring_useragent, Config.ring_username, Config.ring_password, Config.ring_auth_code)
            Ring_IOT.authenticate_ring_token(Ring_IOT)

            return "Ring Devices Initialized"
        except Exception as e:
            return e

def initialize_roku():
    if Config.initialize_roku == True:
        try:
            Roku_IOT.__init__(Roku_IOT, Config.lan, Config.roku_devices)
            Roku_IOT.devices_on_network(Roku_IOT)

            return "Roku Devices Initialized"
        except Exception as e:
            return e

def initialize_processor():
    if Config.initialize_ring == True and Config.initialize_roku == True:
        try: 
            Processor.__init__(Processor, Ring_IOT, Roku_IOT)
            thread = Thread(target = Processor.processor_start(Processor)).run()
            
        except Exception as e:
            return e
    return



#############################################
## Routes for Roku API
#############################################

# return a list of Roku devices with basic information collected
@app.route('/roku/device/status')
def roku_device_status():
    Roku_IOT.devices_on_network(Roku_IOT)
    return json.dumps(Roku_IOT.check_status_of_devices(Roku_IOT))

# return a list of Roku devices with more additional information collected
@app.route('/roku/device/info')
def roku_device_info():
    Roku_IOT.devices_on_network(Roku_IOT)
    Roku_IOT.check_status_of_devices(Roku_IOT)
    return json.dumps(Roku_IOT.check_info_of_devices(Roku_IOT))

# Client interface button interaction
# Post call to pass a button value
@app.route('/roku/device/key_input', methods = ['POST'])
def roku_key_input():
    if request.method == 'POST':
        Roku_IOT.devices_on_network(Roku_IOT)
        key = request.json['key']
        ip_address = request.json['ip_address']

    # TODO: Add a valid response message?
    return json.dumps(Roku_IOT.key_input(Roku_IOT, ip_address, key))

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

###############################################
## Routes for config file login API
###############################################

# Get config file
@app.route('/dashboard/config')
def dashboard_get_config():
    return json.dumps(Config.encoded_config(Config))

# Update config file values
@app.route('/dashboard/config/update', methods = ['POST'])
def dashboard_update_config():
    if request.method == 'POST':
        response = Config.update_config_mappings(Config, request.json)
        Roku_IOT.update_device_list(Roku_IOT, Config.roku_devices)
        return json.dumps(response)
    
@app.route('/dashboard/initialize_ring')
def dashboard_initialize_ring():
    Config.set_init_ring_status_true(Config)
    return json.dumps(initialize_ring())

@app.route('/dashboard/initialize_roku')
def dashboard_initialize_roku():
    Config.set_init_roku_status_true(Config)
    return json.dumps(initialize_roku())

@app.route('/dashboard/initialize_processor')
def dashboard_initialize_processor():
    Config.set_init_processor_status_true(Config)
    return json.dumps(initialize_processor()) 

@app.route('/dashboard/ring_enabled')
def dashboard_ring():
    return json.dumps(Config.get_init_ring_status(Config))

@app.route('/dashboard/roku_enabled')
def dashboard_roku():
    return json.dumps(Config.get_init_roku_status(Config))

@app.route('/dashboard/processor_enabled')
def dashboard_processor(): 
    return json.dumps(Config.get_init_processor_status(Config))   

main()