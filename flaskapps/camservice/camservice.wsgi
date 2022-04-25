#!/var/www/html/smartvisu3.2/lib/flaskapps/camservice/venv/bin/python3

import os
import sys

os.environ['dir_smartvisu'] = 'smartvisu3.2'
sys.path.insert(0,"/var/www/html/smartvisu3.2/lib/flaskapps/camservice/")
from camservice import app as application
