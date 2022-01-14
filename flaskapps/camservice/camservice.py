#!/usr/bin/env python
from importlib import import_module
import os
import requests
from flask import Flask, render_template, Response, request, make_response
import cv2
import time
from camera import BaseCamera
import uuid

# ****************************
# Globals for Handling the Cams
# ****************************

# get the active pages

app = Flask(__name__)
print (app.config.get('SERVER_NAME', 'some.sensible.default.domain'))

filename = app.instance_path
print('Instance_Path : ' + filename)
myTempPath = "/".join(app.instance_path.split("/")[:-1])+"/tmp/"
print ('Tmp-Path : ' + myTempPath)
myResponse = requests.get('http://127.0.0.1/smartvisu3.2/lib/flaskapps/camservice/camservice.php?command=get_page_path')
myActPages = myResponse.content.decode()
print ('active Pages : ' + myActPages)


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

myClients = []
myActiveCams     = []
myActiveCamNames = []
myLock = False


@app.after_request
def response_processor(response):
    # Prepare all the local variables you need since the request context
    # will be gone in the callback function
    global myClients
    myId = uuid.uuid4().hex
    myClients.append(myId)
    response.headers["X-API-KEY"] = myId 
    print ('act.Clients : ' + str(myClients))

    @response.call_on_close
    def process_after_request():
        # Do whatever is necessary here
        time.sleep(0.5)
        myId = response.headers['X-API-KEY']
        print ('after_request - ' + str(myId))
        global myClients
        myClients.remove(myId)
        print ('act.Clients : ' + str(myClients))
        pass

    return response

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
    print ('got Args : ' + str(request.args))
    myStream = request.args.get('stream')
    myClient = request.args.get('client')
    myCmd    = request.args.get('command')
    print ('got Stream ID:'+ str(myStream))
    print ('got Command  :'+ str(myCmd))
    print (str(myActiveCams) + ' / ' + str(myActiveCamNames))


    global myLock
    if myCmd == 'play':
        while myLock == True:
            time.sleep(0.1)
        if myStream in myActiveCamNames:
            if myActiveCams[myActiveCamNames.index(myStream)].alive == False:
                myCam = myActiveCams[myActiveCamNames.index(myStream)]
                myActiveCams.remove(myCam)
                myActiveCamNames.remove(myStream)

                print (str(myActiveCams) + ' / ' + str(myActiveCamNames))


        if myStream in myActiveCamNames:
            myCam = myActiveCams[myActiveCamNames.index(myStream)]
        else: # add new Cam
            myLock = True
            print ('Setup new Cam for : '+myStreams[myStream])
            myActiveCamNames.append(myStream)
            myActiveCams.append(BaseCamera(myStreams[myStream],myStream,myTempPath))
            myCam = myActiveCams[myActiveCamNames.index(myStream)]
            myLock = False

        #myClients.append(myClient)
        #print ('act.Clients : ' + str(myClients))
        return Response(gen(myCam), mimetype='multipart/x-mixed-replace; boundary=frame')


    if myCmd == 'stop':
        #myClients.remove(myClient)
        img = cv2.imread(myTempPath+myStream+'.jpg')
        dimensions = img.shape
        x_Text = int(dimensions[1]/2)-int(dimensions[1]*0.37)
        y_Text = int(dimensions[0]/2)-50
        font = cv2.FONT_HERSHEY_SIMPLEX
        font_Thickness = int(dimensions[1]/100)
        font_Size      = round(dimensions[1]/400,1)
        cv2.putText(img, 'to be continued...', (x_Text,y_Text), font, font_Size, (248, 248, 255), font_Thickness, cv2.LINE_AA)
        print ('act.Clients : ' + str(myClients))
        ret, buffer = cv2.imencode('.jpg', img)
        myResponse = make_response(buffer.tobytes())
        myResponse.headers['Content-Type'] = 'image/png'

        return myResponse

if __name__ == '__main__':
    app.run()
