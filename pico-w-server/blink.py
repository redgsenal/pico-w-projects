import rp2
import network
import ubinascii
import machine
# import urequest as request
import time

import socket

def blink_led(num_blinks, pin_number):
    led = machine.Pin(pin_number, machine.Pin.OUT)
    for i in range(num_blinks):
        led.on()
        time.sleep(.2)
        led.off()
        time.sleep(.2)
        
blink_led(100, 19)