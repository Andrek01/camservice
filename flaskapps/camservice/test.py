import cv2
import numpy as np
import subprocess as sp

# Create a VideoCapture object and read from input file
# If the input is the camera, pass 0 instead of the video file name


pipe = sp.Popen(['ffmpeg', "-i", 'http://User:FlitzPiep3@101.64.18.101:8008/axis-cgi/mjpg/video.cgi',
                      "-an",  # disable audio
                      "-f", "image2pipe",
                      "-pix_fmt", "bgr24",
                      "-vcodec", "mjpeg", "-"],
                     stdin=sp.PIPE, stdout=sp.PIPE)

# Read until video is completed
byte_lenght = 1920
byte_width = 720

while(True):
    # Capture frame-by-frame
    #ret, frame = cap.read()
    count = 0
    if count > 10:
        raw_image = pipe.stdout.read(byte_lenght * byte_width * 3)  # read length*width*3 bytes (= 1 frame)
    
        frame = np.fromstring(raw_image, dtype='uint8').reshape((byte_width, byte_lenght, 3))
        # Display the resulting frame
        cv2.imshow('Frame',frame)
    
        # Press Q on keyboard to  exit
        if cv2.waitKey(25) & 0xFF == ord('q'):
            break
    count += 1
  # Break the loop


# When everything done, release the video capture object


# Closes all the frames
cv2.destroyAllWindows()

