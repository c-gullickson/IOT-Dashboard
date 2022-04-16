from asyncore import write
import json
class Config:
    # TODO Add additional information for devcie
    def __init__(self):
        self.config_file = None
        self.ring_username = ""
        self.ring_password = ""
        self.ring_useragent = ""
        self.ring_auth_code = ""
        self.roku_devices = ""
        self.lan = ""

        self.initialize_ring = True
        self.initialize_roku = True
        self.initialize_processor = True

    def load_config_mappings(self):
        #Read file for mappings and passwords
        #TODO: Change path to be local so it does not get uploaded to GitHub
        self.config_file = open("Config/configFile.json", "r")
        config_data = json.load(self.config_file)

        self.ring_username = config_data['ring_username']
        self.ring_password = config_data['ring_password']
        self.ring_useragent = config_data['ring_useragent']
        self.ring_auth_code = config_data['ring_auth_code']

        self.roku_devices = config_data['roku_devices']
        self.lan = config_data['lan']

    def update_config_mappings(self, request):
        #Read into configFile.txt
        self.config_file = open("Config/configFile.json", "w")

        print(request)
        self.ring_username = request['ring_username']
        self.ring_password = request['ring_password']
        self.ring_useragent = request['ring_useragent']
        self.ring_auth_code = request['ring_auth_code']

        self.roku_devices = request['roku_devices']
        self.lan = request['lan']

        json_object = json.dumps(self.encoded_config(Config))
        try:
            self.config_file.write(json_object)
            self.load_config_mappings(Config)
            return "Update Config Successfull"

        except Exception as e:
            return e
        
# Controls for enabling external devices
    def get_init_ring_status(self):
        return {"initialize_ring": self.initialize_ring}

    def set_init_ring_status_true(self):
        self.initialize_ring = True

    def get_init_roku_status(self):
        return {"initialize_roku": self.initialize_roku}

    def set_init_roku_status_true(self):
        self.initialize_roku = True

    def get_init_processor_status(self):
        return {"initialize_processor": self.initialize_processor}

    def set_init_processor_status_true(self):
        self.initialize_processor = True


    def return_config(self):
        return self

    def encoded_config(self):
        return {'ring_username': self.ring_username, 'ring_password': self.ring_password, 'ring_useragent': self.ring_useragent, 
        'roku_devices': self.roku_devices, 'lan': self.lan, 'ring_auth_code': self.ring_auth_code}