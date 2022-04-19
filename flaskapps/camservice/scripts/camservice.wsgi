#!/var/www/html/smartvisu_dir/lib/flaskapps/camservice/venv/bin/python3

import os
import sys

os.environ['dir_smartvisu'] = 'smartvisu_dir'
sys.path.insert(0,"/var/www/html/smartvisu_dir/lib/flaskapps/camservice/")
from camservice import app as application
