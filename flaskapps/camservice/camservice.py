#!/usr/bin/env python
from importlib import import_module
import os
from flask import Flask, render_template, Response, request

from camera import BaseCamera

# ****************************
# Globals for Handling the Cams
# ****************************
myStreams = {}
'''
myStreams['ID1'] = 'rtsp://akohler:8x+0bzT9@192.168.178.9/1'
myStreams['ID2'] = 'rtsp://admin:christine@192.168.178.104:554/h264Preview_01_sub'
myStreams['ID3'] = 'rtsp://admin:christine@192.168.178.104:554/h264Preview_01_main'
myStreams['ID4'] = 'rtsp://akohler:8x+0bzT9@192.168.178.9/0'
'''

myStreams['ID1'] = 'http://User:FlitzPiep3@101.64.18.101:8008/axis-cgi/mjpg/video.cgi'
myStreams['ID2'] = 'http://User:FlitzPiep3@101.64.18.105/GetData.cgi?Status=0'
myStreams['ID3'] = 'http://User:FlitzPiep3@101.64.18.103/axis-cgi/mjpg/video.cgi'

myActiveCams = []
myActiveCamNames = []

app = Flask(__name__)


@app.route('/')
def index():
    """Video streaming home page."""
    return render_template('index.html')


def gen(camera):
    """Video streaming generator function."""
    i=1
    yield b'--frame\r\n'
    while True:
        i +=1
        frame = camera.get_frame()
        yield b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n--frame\r\n'


@app.route('/video_feed')
def video_feed():
    """Video streaming route. Put this in the src attribute of an img tag."""
    print ('ip : '+ request.remote_addr + 'port : ' + str(request.environ.get('REMOTE_PORT')))

    myStream = request.args.get('stream')
    print ('got Stream ID:'+ str(myStream))
    if myStream in myActiveCamNames:
        myCam = myActiveCams[myActiveCamNames.index(myStream)]
    else: # add new Cam
        print ('Setup new Cam for : '+myStreams[myStream])
        myActiveCamNames.append(myStream)
        myActiveCams.append(BaseCamera(myStreams[myStream]))
        myCam = myActiveCams[myActiveCamNames.index(myStream)]


    return Response(gen(myCam),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == '__main__':
    app.run()
