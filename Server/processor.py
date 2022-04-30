from time import sleep
from datetime import datetime, timezone, tzinfo

class Processor:
    def __init__(self, ring_iot, roku_iot, socketio):
        self.ring_iot = ring_iot
        self.roku_iot = roku_iot
        self.socketio = socketio
    
    def processor_start(self):
        #Initialize a while loop to look for message alerts
        #TODO 
            #Listen for alerts from doorbell within a recent time (30 seconds)
            #Update device status for each device
            #Need to clear out list of events each time lookup process is ran
        while True:
            print("Processor Running")
            events = self.ring_iot.get_recent_doorbell_alert(self.ring_iot)
            current_time = datetime.now(timezone.utc)
            for e in events:
                print(datetime.strptime(e['event_created_at'], '%Y-%m-%d%H:%M:%S'))
                print(current_time)
                time_difference = (current_time.replace(tzinfo=None) - datetime.strptime(e['event_created_at'], '%Y-%m-%d%H:%M:%S'))
                print("Time Difference ", time_difference)
                
                if time_difference.total_seconds() < 45:
                    print("Trigger Roku Pause: less than 15 second since motion")
                    print(str(time_difference.total_seconds()))

                    devices = self.roku_iot.devices_on_network(self.roku_iot)
                    for dev in devices:
                        print("Pause any device that is currently on the network and associated to dashboard.")
                        self.roku_iot.set_device_pause(self.roku_iot, dev.ip_address)
                else:
                    print("More than 45 second since motion")
                    print(str(time_difference.total_seconds()))
                    self.socketio.emit('message', {'data': str(time_difference.total_seconds())})

            # Sleep before checking a set of events

            sleep(15)

        