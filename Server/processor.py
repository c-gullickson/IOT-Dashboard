from time import sleep
from ring_iot import Ring_IOT
from roku_iot import Roku_IOT

class Processor:
    def __init__(self, ring_iot, roku_iot):
        self.ring_iot = ring_iot
        self.roku_iot = roku_iot
    
    def processor_start(self):
        #Initialize a while loop to look for message alerts
        #TODO 
            #Listen for alerts from doorbell within a recent time (15 seconds)
            #Update device status for each device
            #
        while True:
            print("Processor Running")
            sleep(15)