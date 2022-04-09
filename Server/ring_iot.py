#Ring Doorbell Base API: https://github.com/tchellomello/python-ring-doorbell/tree/4382c6e54ad7ac342c116fa608d3b45c1e43ed35
from ring_doorbell import Ring, Auth
from oauthlib.oauth2 import MissingTokenError
from pathlib import Path
import json

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

    def get_devices(self):
        
        devices = self.ring.devices()
        print(devices)

        doorbells = devices["doorbots"]
        chimes = devices["chimes"]
        stickup_cams = devices["stickup_cams"]

        print(doorbells)
        print(chimes)
        print(stickup_cams)

    def get_device_info():
        pass
