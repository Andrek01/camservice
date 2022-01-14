
import cv2
import datetime
import time
import threading
import requests
import numpy as np

try:
    from greenlet import getcurrent as get_ident
except ImportError:
    try:
        from thread import get_ident
    except ImportError:
        from _thread import get_ident


class CameraEvent(object):
    """An Event-like class that signals all active clients when a new frame is
    available.
    """
    def __init__(self):
        self.events = {}

    def wait(self):
        """Invoked from each client's thread to wait for the next frame."""
        ident = get_ident()
        if ident not in self.events:
            # this is a new client
            # add an entry for it in the self.events dict
            # each entry has two elements, a threading.Event() and a timestamp
            self.events[ident] = [threading.Event(), time.time()]
        return self.events[ident][0].wait()

    def set(self):
        """Invoked by the camera thread when a new frame is available."""
        now = time.time()
        remove = None
        for ident, event in self.events.items():
            if not event[0].isSet():
                # if this client's event is not set, then set it
                # also update the last set timestamp to now
                event[0].set()
                event[1] = now
            else:
                # if the client's event is already set, it means the client
                # did not process a previous frame
                # if the event stays set for more than 5 seconds, then assume
                # the client is gone and remove it
                if now - event[1] > 5:
                    remove = ident
        if remove:
            del self.events[remove]

    def clear(self):
        """Invoked from each client's thread after a frame was processed."""
        self.events[get_ident()][0].clear()


class BaseCamera(object):

    def __init__(self,source,StreamID,tmpPath):
        self.source = source
        self.StreamID = StreamID
        self.tmpPath  = tmpPath
        self.alive = True
        self.thread = None  # background thread that reads frames from camera
        self.frame = None  # current frame is stored here by background thread
        self.last_access = 0  # time of last client access to the camera
        self.event = CameraEvent()

        """Start the background camera thread if it isn't running yet."""
        if self.thread is None:
            self.last_access = time.time()

            # start background frame thread
            self.thread = threading.Thread(target=self._thread)
            self.thread.start()

            # wait until first frame is available
            self.event.wait()

    def get_frame(self):
        """Return the current camera frame."""
        self.last_access = time.time()

        # wait for a signal from the camera thread
        self.event.wait()
        self.event.clear()

        return self.frame

    #@staticmethod
    def frames(self):
        print ('opening Stream :' +self.source )
        self.first_run = True
        if 'http' in self.source:
            stream = requests.get(self.source,stream=True)
            bytes = b''
            for chunk in stream.iter_content(chunk_size=1024):
                bytes += chunk
                a = bytes.find(b'\xff\xd8')
                b = bytes.find(b'\xff\xd9')
                if a != -1 and b != -1:
                    jpg = bytes[a:b + 2]
                    bytes = bytes[b + 2:]
                    # If first Frame take a snapshot
                    if self.first_run == True:
                        print ('took a snapshot !!')
                        self.first_run = False
                        img = cv2.imdecode(np.frombuffer(jpg, dtype=np.uint8), cv2.IMREAD_COLOR)
                        cv2.imwrite(self.tmpPath+self.StreamID+'.jpg',img)
                    yield jpg 
        else:        
            camera = cv2.VideoCapture(self.source)
            if not camera.isOpened():
                raise RuntimeError('Could not start camera.')

            while True:
                # read current frame
                _, img = camera.read()
                #imS = cv2.resize(img, (800, 600))
                imS = img
                # If first Frame take a snapshot
                if first_run == True:
                    first_run = False
                    cv2.imwrite(self.tmpPath+self.StreamID+'.jpg',img)
                
                actTime = datetime.datetime.now().strftime("%d.%m.%Y / %H:%M:%S")
                font = cv2.FONT_HERSHEY_SIMPLEX
                cv2.putText(imS, actTime, (10,30), font, 0.4, (248, 248, 255), 1, cv2.LINE_AA)
                # encode as a jpeg image and return it
                yield cv2.imencode('.jpg', imS)[1].tobytes()

    #@classmethod
    def _thread(self):
        """Camera background thread."""
        print('Starting camera thread.')
        frames_iterator = self.frames()
        for frame in frames_iterator:
            self.frame = frame
            self.event.set()  # send signal to clients
            time.sleep(0)

            # if there hasn't been any clients asking for frames in
            # the last 10 seconds then stop the thread
            if time.time() - self.last_access > 10:
                frames_iterator.close()
                print('Stopping camera thread : '+ self.StreamID + '  due to inactivity.')
                self.alive = False
                break
        self.thread = None
