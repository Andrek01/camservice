#!/usr/bin/env python
import os
import requests
from flask import Flask, render_template, Response, request, make_response, jsonify
import cv2
import time
from camera import BaseCamera
import uuid
import threading, datetime
import psutil
import io, json

# ****************************
# Globals for Handling the Cams
# ****************************

# get the active pages

app = Flask(__name__)



smartvisu_dir =  os.environ.get('dir_smartvisu')
print ('smartvisu_dir : ' + smartvisu_dir)

filename = app.instance_path
print('Instance_Path : ' + filename)
myTempPath = "/".join(app.instance_path.split("/")[:-1])+"/tmp/"
print ('Tmp-Path : ' + myTempPath)
myResponse = requests.get('http://127.0.0.1/{}/lib/flaskapps/camservice/camservice.php?command=get_page_path'.format(smartvisu_dir))
myActPages = myResponse.content.decode()
myActPages = myActPages.split("\n")[0]
print ('active Pages : ' + myActPages)

'''
myStreams = {}

myStreams['ID1'] = 'http://User:FlitzPiep3@101.64.18.101:8008/axis-cgi/mjpg/video.cgi'
myStreams['ID2'] = 'http://User:FlitzPiep3@101.64.18.105/GetData.cgi?Status=0'
myStreams['ID3'] = 'http://User:FlitzPiep3@101.64.18.103/axis-cgi/mjpg/video.cgi'
'''

# Read Cam-Config
try:
    with open('/var/www/html/'+smartvisu_dir+'/pages/'+myActPages+'/camservice.cfg') as cfg_file:
            myStreams = json.load(cfg_file)
    cfg_file.close()
except:
    pass

myClients = []
myActiveCams     = []
myActiveCamNames = []
myStats = []
myClientStats = []
myCamStats = []
myLock = False

##################################
# Class for statistic-thread
##################################            

class stat_handler(threading.Thread):
    def __init__(self,myCpuArray,myClientArray,myCamsArray):
        threading.Thread.__init__(self)
        self.myCpuAray = myCpuArray
        self.Clients   = myClientArray
        self.Cams      = myCamsArray
        self._datlength= 1800 

    def run(self):
        self.alive = True
        print ('stat-started')
        while self.alive == True:
        ##################################
        # build TimeStamp & get CPU-Load
        ##################################
            dt = datetime.datetime.now()
            _timeStamp = int(time.mktime(dt.timetuple())) * 1000 + int(dt.microsecond / 1000)
            _CpuLoad = psutil.cpu_percent()
        ##################################
        # count the Cpu-Load
        ##################################
            actArray = [_timeStamp, _CpuLoad]
            if len(self.myCpuAray) < self._datlength:
                self.myCpuAray.append(actArray)
            else:
                myDummy = self.myCpuAray[1:]
                self.myCpuAray= myDummy
                self.myCpuAray.append(actArray)

        ##################################
        # count the active Clients
        ##################################
            global myClients
            actArray = [_timeStamp, len(myClients)]
            if len(self.Clients) < self._datlength:
                self.Clients.append(actArray)
            else:
                myDummy = self.Clients[1:]
                self.Clients= myDummy
                self.Clients.append(actArray)
        ##################################
            # count the active Cams
        ##################################
            global myActiveCams
            activeCams = 0
            for cam in myActiveCams:
                if cam.alive:
                    activeCams +=1
            actArray = [_timeStamp, activeCams]
            if len(self.Cams) < self._datlength:
                self.Cams.append(actArray)
            else:
                myDummy = self.Cams[1:]
                self.Cams= myDummy
                self.Cams.append(actArray)            
            time.sleep(1)
    def stop(self):
        self.alive = False

##################################
# Start the statistic-thread
##################################            

myStat = stat_handler(myStats,myClientStats,myCamStats)
myStat.start()

##################################
# the Url & functions for flask
##################################            
@app.route('/status')
def status():
    myReponse = {
                    'Status' : 'running',
                    'cpuload': myStat.myCpuAray,
                    'actCams' : myStat.Cams,
                    'actClients' : myStat.Clients
                }
    
    return jsonify(myReponse)

@app.after_request
def response_processor(response):
    # Prepare all the local variables you need since the request context
    # will be gone in the callback function
    global myClients
    if 'multipart/x-mixed-replace' in response.headers['Content-Type']:
        myId = uuid.uuid4().hex
        myClients.append(myId)
        response.headers["X-API-KEY"] = myId
        print ('act.Clients : ' + str(myClients))

    @response.call_on_close
    def process_after_request():
        # Do whatever is necessary here
        time.sleep(0.5)
        if 'multipart/x-mixed-replace' in response.headers['Content-Type']:
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


@app.route('/changeatonce', methods=['GET', 'POST'])
def changeatonce():
    content = request.get_json()
    print(content)
    newSetting = content
    if (newSetting['ID'] in myActiveCamNames):
        try:
            myActiveCams[myActiveCamNames.index(newSetting['ID'])].settings[newSetting['setting']] = newSetting['value']
        except:
            print ('Error while changing settings immediate')
    myReponse = {
                    'Status' : 'OK'
                }
    
    return jsonify(myReponse)
    
@app.route('/video_feed')
def video_feed():
    """Video streaming route. Put this in the src attribute of an img tag."""
    print ('ip : '+ request.remote_addr + 'port : ' + str(request.environ.get('REMOTE_PORT')))
    print ('got Args : ' + str(request.args))
    myStream = request.args.get('stream')
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
            print ('Setup new Cam for : '+myStreams[myStream]['url'])
            myActiveCamNames.append(myStream)
            myActiveCams.append(BaseCamera(myStreams[myStream]['url'],myStream,myTempPath,myStreams[myStream]['settings'] ))
            myCam = myActiveCams[myActiveCamNames.index(myStream)]
            myLock = False

        
        
        return Response(gen(myCam), mimetype='multipart/x-mixed-replace; boundary=frame')


    if myCmd == 'stop':
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

def gen(camera):
    """Video streaming generator function."""
    i=1
    yield b'--frame\r\n'
    while True:
        i +=1
        frame = camera.get_frame()
        yield b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n--frame\r\n'



if __name__ == '__main__':
    app.run()
