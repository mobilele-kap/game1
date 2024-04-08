import eel
from connection_js.key_press import *
import threading
from time import sleep


def test():
    num = 0
    while True:

        # eel.say_hello_js(str(num))
        print(num)
        sleep(1)
        num += 1


if __name__ == '__main__':
    eel.init('front')
    t1 = threading.Thread(target=test, daemon=True)
    t1.start()
    # eel.browsers.set_path("chrome", "./chrome-win/chrome.exe")
    eel.start('index.html', mode="chrome", size=(700, 411), cmdline_args=['--autoplay-policy=no-user-gesture-required'])
    # eel.start('index.html', mode='chrome', cmdline_args=['--kiosk'])