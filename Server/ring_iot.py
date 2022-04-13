#Ring Doorbell Base API: https://github.com/tchellomello/python-ring-doorbell/tree/4382c6e54ad7ac342c116fa608d3b45c1e43ed35
from ring_doorbell import Ring, Auth
from oauthlib.oauth2 import MissingTokenError
from pathlib import Path
import json

from Class_Objects.ring_event import Ring_Event

cache_file = Path("ring_token.cache")

class Ring_IOT:
    def __init__(self, user_agent, username, password):
        #Initialize the required Ring class and parameters
        self.user_agent = user_agent
        self.username = username
        self.password = password
        self.ring = None
        

    def token_updated(token):
        cache_file.write_text(json.dumps(token))

    def otp_callback():
        # TODO: Will need to become a user input of some type?
        auth_code = input("2FA code: ")
        return auth_code

    def authenticate_ring_token(self):
        if cache_file.is_file():
            auth = Auth(self.user_agent, json.loads(cache_file.read_text()), self.token_updated)
        else:
            auth = Auth(self.user_agent, None, self.token_updated)
            try:
                auth.fetch_token(self.username, self.password)
            except MissingTokenError:
                auth.fetch_token(self.username, self.password, self.otp_callback())

        #Initialize the Python_Ring_API imported from ring_doorbell
        self.ring = Ring(auth)
        self.ring.update_data()
        print("Successful Login to Ring system")

    def check_status_of_devices(self):
        devices = self.ring.devices()
        print(devices)

        doorbells = devices["doorbots"]
        chimes = devices["chimes"]
        stickup_cams = devices["stickup_cams"]

        print(doorbells)
        print(chimes)
        print(stickup_cams)

    def check_info_of_devices(self):
        devices = self.ring.devices()
        for dev in list(devices['stickup_cams'] + devices['chimes'] + devices['doorbots'] + devices['authorized_doorbots']):
            dev.update_health_data()
            print('Address:    %s' % dev.address)
            print('Family:     %s' % dev.family)
            print('ID:         %s' % dev.id)
            print('Name:       %s' % dev.name)
            print('Timezone:   %s' % dev.timezone)
            print('Wifi Name:  %s' % dev.wifi_name)
            print('Wifi RSSI:  %s' % dev.wifi_signal_strength)
        pass

    def get_doorbell_alerts(self):
        ring_events = []
        #Will need to run in a constant loop to see if there is an alert that is triggered
        devices = self.ring.devices()
        for doorbell in devices['authorized_doorbots']:

            # listing the last 1 events of any kind
            for event in doorbell.history(limit=1):
                Ring_Event.__init__(Ring_Event, event["id"], event["kind"], event["answered"], event["created_at"])
                new_event = Ring_Event.return_event(Ring_Event)
                ring_events.append(new_event)

            # get a event list only the triggered by motion
            # events = doorbell.history(kind='motion')

        return ring_events
