#!/var/www/html/smartVISU2.91/lib/flaskapps/camservice/venv/bin/python3

import os
import sys

os.environ['dir_smartvisu'] = 'smartVISU2.91'
sys.path.insert(0,"/var/www/html/smartVISU2.91/lib/flaskapps/camservice/")
from camservice import app as application
