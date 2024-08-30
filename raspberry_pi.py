import sys
import numpy as np
from PyQt5 import QtCore, QtWidgets
from picamera import PiCamera
from pyzbar.pyzbar import decode
from pymongo import MongoClient
from bson import ObjectId
import time
from time import sleep
import RPi.GPIO as GPIO
from gpiozero import AngularServo

source_place = "BVB"
destination_place = "HDMC"
# Provided place data
place_data = [
    {"id": 1, "place": "Dharwad BRTS Terminal", "distance": 0},
    {"id": 2, "place": "Jubilee Circle", "distance": 1},
    {"id": 3, "place": "Court Circle", "distance": 2},
    {"id": 4, "place": "NTTF", "distance": 3},
    {"id": 5, "place": "Hosa Yellapur Cross", "distance": 4},
    {"id": 6, "place": "Toll Naka", "distance": 5},
    {"id": 7, "place": "Vidyagiri", "distance": 6},
    {"id": 8, "place": "Gandhinagar", "distance": 7},
    {"id": 9, "place": "Lakmanahalli", "distance": 8},
    {"id": 10, "place": "Sattur", "distance": 9},
    {"id": 11, "place": "SDM Medical College", "distance": 10},
    {"id": 12, "place": "Navluru Railway Station", "distance": 11},
    {"id": 13, "place": "KMF", "distance": 12},
    {"id": 14, "place": "Rayapur", "distance": 13},
    {"id": 15, "place": "Ryazanskiy", "distance": 14},
    {"id": 16, "place": "ISKCON Temple", "distance": 15},
    {"id": 17, "place": "RTO", "distance": 16},
    {"id": 18, "place": "Navanagara", "distance": 17},
    {"id": 19, "place": "APMC 3rd Gate", "distance": 18},
    {"id": 20, "place": "Shantinikethan", "distance": 19},
    {"id": 21, "place": "Biridevarakoppa", "distance": 20},
    {"id": 22, "place": "Unakal Lake", "distance": 21},
    {"id": 23, "place": "Unakal", "distance": 21.5},
    {"id": 24, "place": "Unakal Cross", "distance": 22},
    {"id": 25, "place": "BVB", "distance": 23},
    {"id": 26, "place": "Vidyanagar", "distance": 23.5},
    {"id": 27, "place": "Hosur Regional Terminal", "distance": 24},
    {"id": 28, "place": "Hosur Cross", "distance": 24.5},
    {"id": 29, "place": "Hubballi Central Bus Terminal", "distance": 25},
    {"id": 30, "place": "HDMC", "distance": 26},
    {"id": 31, "place": "DR. B R Ambedkar Circle", "distance": 26.5},
    {"id": 32, "place": "CBT Hubballi", "distance": 28},
    {"id": 33, "place": "Hubballi RailwayStation", "distance": 27}
]

# Convert place data to dictionary for quick lookup
place_lookup = {place['place']: place['distance'] for place in place_data}
#print(place_lookup[destination_place])
#print(place_lookup[source_place])

class VideoRecorder(QtCore.QObject):
    # To take a snapshot one at a time then emit out in term on numpy ndarray
    image_data = QtCore.pyqtSignal(np.ndarray)
    
    def _init_(self, camera_port=0, parent=None):
        super()._init_(parent)
        self.resolution = (320, 240)  
        self.camera = PiCamera() 
        self.camera.resolution = self.resolution
        self.timer = QtCore.QBasicTimer()

    def start_recording(self):
        self.timer.start(0, self)

    def timerEvent(self, event):
        if event.timerId() != self.timer.timerId():
            return
        
        frame = np.empty((self.resolution[1], self.resolution[0], 3), dtype=np.uint8) 
        # Capture image
        self.camera.capture(frame, 'rgb')
        # Emit image out 
        self.image_data.emit(frame)

class MainWidget(QtWidgets.QWidget):
    def _init_(self, parent=None):
        super()._init_(parent)
        self.recorder = VideoRecorder()
        self.recorder.image_data.connect(self.process_image)
        self.recorder.start_recording()
        self.last_detection_time = 0
        self.print_delay = 3  # seconds
        self.data_store = SensorDataStore('Minor1-embedded', 'orders', connection_uri)
        self.setup_led()
        #self.setup_servo()

    def setup_led(self):
        GPIO.setmode(GPIO.BCM)
        GPIO.setwarnings(False)
        GPIO.setup(27, GPIO.OUT)  # First LED
        GPIO.setup(17, GPIO.OUT)  # Second LED

    def process_image(self, image_data):
        qr_data = decode(image_data)
        if qr_data:
            qr_content = qr_data[0].data.decode('utf-8')
            current_time = time.time()
            if current_time - self.last_detection_time > self.print_delay:
                self.last_detection_time = current_time
                print("QR Code Content:", qr_content)
                self.check_database(qr_content)
        else:
            # If no QR code detected, reset last_detection_time
            self.last_detection_time = 0

    def check_database(self, qr_content):
        print("Checking database for ID:", qr_content)
        result = self.data_store.find_data_by_id(qr_content)
        if result:
            count = result.get('count', 0)
            source = result.get('source', '')
            destination = result.get('destination', '')
            source_distance = result.get('sourceDistance', 0)
            dest_distance = result.get('destDistance', 0)
            passengers = result.get('passengers', 0)  # Retrieve passengers count
            if source != source_place:  # Check if source is not the expected source place
                print("Invalid source place.")
                self.blink_led(17)  # Blink second LED
                return;
            if count > 0:
                if count > passengers and source == source_place:
                    servo = AngularServo(18, min_pulse_width=0.0006, max_pulse_width=0.0023)
                    servo.angle = 90
                    self.blink_led(27)
                    sleep(4)
                    servo.angle = 0
                    sleep(2)
                    print("Servo motor activated.")
                    self.data_store.update_count(qr_content, count - 1)
                    print("Count decremented successfully.")
                    
                elif count <= passengers and (dest_distance <= place_lookup[destination_place] or dest_distance >= place_lookup[destination_place]):
                    servo = AngularServo(18, min_pulse_width=0.0006, max_pulse_width=0.0023)
                    servo.angle = 90
                    self.blink_led(27)
                    sleep(4)
                    servo.angle = 0
                    sleep(2)
                    print("Servo motor activated.")
                    self.data_store.update_count(qr_content, count - 1)
                    print("Count decremented successfully.")
            elif count == 0:
                print("Count is already zero.")
                self.blink_led(17)  # Blink second LED
            else:
                print("Source or Destination does not match criteria.")
                self.blink_led(17)  # Blink second LED
        else:
            print("Invalid QR code or user not found.")
            self.blink_led(17)  # Blink second LED

    def blink_led(self, pin):
        GPIO.output(pin, GPIO.HIGH)
        time.sleep(0.5)
        GPIO.output(pin, GPIO.LOW)

class SensorDataStore:
    def _init_(self, db_name, collection_name, connection_uri, reconnect_attempts=3, reconnect_delay=5):
        self.db_name = db_name
        self.collection_name = collection_name
        self.connection_uri = connection_uri
        self.reconnect_attempts = reconnect_attempts
        self.reconnect_delay = reconnect_delay
        self.connect()

    def connect(self):
        attempt = 1
        while True:
            try:
                self.client = MongoClient(self.connection_uri)
                self.db = self.client[self.db_name]
                self.collection = self.db[self.collection_name]
                print("Connected to MongoDB successfully.")
                break
            except Exception as e:
                if attempt <= self.reconnect_attempts:
                    print(f"Connection failed (Attempt {attempt}/{self.reconnect_attempts}). Retrying in {self.reconnect_delay} seconds...")
                    attempt += 1
                    sleep(self.reconnect_delay)
                else:
                    print(f"Failed to connect to MongoDB after {self.reconnect_attempts}.")
                    raise e

    def find_data_by_id(self, _id):
        try:
            return self.collection.find_one({'_id': ObjectId(_id)})
        except Exception as e:
            print("Error occurred while searching:", e)

    def update_count(self, _id, count):
        try:
            self.collection.update_one({'_id': ObjectId(_id)}, {'$set': {'count': count}})
            print("Count updated successfully.")
        except Exception as e:
            print("Error occurred while updating count:", e)

if _name_ == "_main_":
    
    connection_uri = " mongobd url" # Replace the connection_uri with your cloud MongoDB service URI
    
    app = QtWidgets.QApplication(sys.argv)
    main_window = QtWidgets.QMainWindow()
    main_widget = MainWidget()
    main_window.setCentralWidget(main_widget)
    main_window.show()
    sys.exit(app.exec_())
