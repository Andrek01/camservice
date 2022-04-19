#!/bin/bash
actPath="${PWD##*/}"
echo $actPath
echo "Creating *.wsgi-File for Service"
sed -e s/smartvisu_dir/$actPath/g ./lib/flaskapps/camservice/scripts/camservice.wsgi > ./camservice.tmp
mv ./camservice.tmp ./lib/flaskapps/camservice/camservice.wsgi
echo "moving camservice-Page to /pages/base"
cp ./lib/flaskapps/camservice/camservice.html ./pages/base/
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
echo "Installing Apache WSGI-Module"
apt-get -y install libapache2-mod-wsgi-py3
echo "Enabling WSGI on Apache2"
a2enmod wsgi
echo "Setting Permissions"
chown -R www-data:www-data ./lib/flaskapps
echo "Starting Installer Script"
python3 ./lib/flaskapps/camservice/installer.py $actPath
echo "restarting Apache"
systemctl restart apache2.service
