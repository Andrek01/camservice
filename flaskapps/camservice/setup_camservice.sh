#!/bin/bash
actPath="${PWD##*/}"
echo $actPath
sed -e s/smartvisu_dir/$actPath/g ./lib/flaskapps/camservice/scripts/camservice.wsgi > ./camservice.tmp
mv ./camservice.tmp ./lib/flaskapps/camservice/camservice.wsgi
echo "Installing virtual environment for Python3"
apt-get install -y python3-venv
echo "Creating virutal environment for CamService"
sudo python3 -m venv ./lib//flaskapps/camservice/venv	
echo "Activating virutal environment"
source ./lib/flaskapps/camservice/venv/bin/activate
echo "Installing requirements"
pip install -r ./lib/flaskapps/camservice/requirements.txt
echo "Deactivating virutal environment"
deactivate
echo "Installing Apache WSGI-Mod"
apt-get -y install libapache2-mod-wsgi-py3
echo "Enabling WSGI on Apache2"
a2enmod wsgi
echo "Setting Permissions"
chown -R www-data:www-data ./lib/flaskapps
echo "restarting Apache"
systemctl restart apache2.service

