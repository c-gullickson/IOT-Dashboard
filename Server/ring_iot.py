#Ring Doorbell Base API: https://github.com/tchellomello/python-ring-doorbell/tree/4382c6e54ad7ac342c116fa608d3b45c1e43ed35
from ring_doorbell import Ring, Auth
from oauthlib.oauth2 import MissingTokenError
from pathlib import Path
import json

from Class_Objects.ring_event import Ring_Event
from Class_Objects.ring_device import Ring_Device

cache_file = Path("ring_token.cache")

class Ring_IOT:
    def __init__(self, user_agent, username, password, ring_auth_code):
        #Initialize the required Ring class and parameters
        self.user_agent = user_agent
        self.username = username
        self.password = password
        self.ring_auth_code = ring_auth_code
        self.ring = None
        self.devices = []
        

    def token_updated(token):
        cache_file.write_text(json.dumps(token))

    # def otp_callback():
    #     # TODO: Will need to become a user input of some type?
    #     auth_code = input("2FA code: ")
    #     return auth_code

    def authenticate_ring_token(self):
        if cache_file.is_file():
            auth = Auth(self.user_agent, json.loads(cache_file.read_text()), self.token_updated)
        else:
            auth = Auth(self.user_agent, None, self.token_updated)
            try:
                auth.fetch_token(self.username, self.password)
            except MissingTokenError:
                auth.fetch_token(self.username, self.password, self.ring_auth_code)

        #Initialize the Python_Ring_API imported from ring_doorbell
        self.ring = Ring(auth)
        self.ring.update_data()
        print("Successful Login to Ring system")

    def check_info_of_devices(self):
        self.devices = []
        devices = self.ring.devices()
        for dev in list(devices['stickup_cams'] + devices['chimes'] + devices['doorbots'] + devices['authorized_doorbots']):
            dev.update_health_data()

            Ring_Device.__init__(Ring_Device, dev.address, dev.family, dev.id, dev.name, dev.timezone, dev.wifi_signal_strength, dev.battery_life, dev.model)
            new_device = Ring_Device.return_device(Ring_Device)

            self.devices.append(new_device)

        return [d.encoded_device(d) for d in self.devices]


    def get_recent_doorbell_alert(self):
        ring_events = []
        devices = self.ring.devices()
        for doorbell in devices['authorized_doorbots']:

            # listing the last 1 events of any kind
            for event in doorbell.history(limit=1):
                
                Ring_Event.__init__(Ring_Event, event["id"], event["kind"], event["answered"], event["created_at"])
                new_event = Ring_Event.return_event(Ring_Event)
                ring_events.append(new_event)

        return [e.encoded_event(e) for e in ring_events]

    def get_recent_doorbell_video_url(self, device_id):
        recorded_url = ""
        devices = self.ring.devices()
        for dev in list(devices['authorized_doorbots']):
            print(dev.id)
            if dev.id == (int(device_id)):
                recorded_url = dev.recording_url(dev.last_recording_id)
                print(recorded_url)

        return {'recording_url' : recorded_url}

    # def get_doorbell_alerts_history(self):
    #     ring_events = []
    #     devices = self.ring.devices()
    #     for doorbell in devices['authorized_doorbots']:

    #         # listing the last 10 events of any kind
    #         for event in doorbell.history(limit=15):
    #             Ring_Event.__init__(Ring_Event, event["id"], event["kind"], event["answered"], event["created_at"])
    #             new_event = Ring_Event.return_event(Ring_Event)
    #             ring_events.append(new_event)

    #     return [e.encoded_event(e) for e in ring_events]