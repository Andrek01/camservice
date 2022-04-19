import os
import sys



def InjectSystem(actPath=None, visuVersion=0.0):
    if visuVersion >= 3.2:
        MenuFile = 'system_menu'
        compareEntry = "SmartHomeNG"
    else:
        MenuFile = 'system'
        compareEntry = "SmartHomeNG"
    print ('*******************************************************************************************')
    print ('injecting Cam-Service into  : '+ '/var/www/html/'+ actPath +'/pages/base/'+MenuFile+'.html')
    print ('*******************************************************************************************')
    injectLine = []
    injectLine.append('    <!-- # Start - injected by Camservice - Setup -->')
    injectLine.append('    <li data-icon="false">')
    injectLine.append('      <a href="index.php?page=camservice">')
    injectLine.append('      <img class="icon" src="{{ icon0 }}it_camera.svg" alt="Cam-Service" />')
    injectLine.append('      <h3>Cam-Service</h3>')
    injectLine.append('      </a>')
    injectLine.append('    </li>')
    injectLine.append('    <!-- # End - injected by Camservice - Setup -->')
    # Check if copy exists
    FileName = '/var/www/html/'+ actPath +'/pages/base/'+MenuFile+'.html'
    try:
        myFile = open ('/var/www/html/'+ actPath +'/pages/base/'+MenuFile+'.org', 'r')
        myContent = myFile.read()
        myFile.close()

    except:
        # Make a copy of original
        myFile = open ('/var/www/html/'+ actPath +'/pages/base/'+MenuFile+'.html', 'r')
        myContent = myFile.read()
        myFile.close()
        myFile = open ('/var/www/html/'+ actPath +'/pages/base/'+MenuFile+'.org', 'w')
        myFile.write(myContent)
        myFile.close()

    try:
        found_start = False
        myLines = myContent.split("\n")
        with open (FileName, 'w') as fp:
            for line in myLines:
                fp.writelines(line+'\n')
                if compareEntry in line:
                    found_start = True
                if found_start and 'endif' in line:
                    for insertLine in injectLine:
                        fp.writelines(insertLine+'\n')
                    found_start = False
        fp.close()
        return True
    except:
        pass

    return False



def InjectApacheSettings(actPath=None):
    injectLine = []
    injectLine.append('')
    injectLine.append('        # Start - injected by Camservice - Setup')
    injectLine.append("        WSGIDaemonProcess camservice user=www-data group=www-data threads=10")
    injectLine.append("        WSGIProcessGroup camservice")
    injectLine.append("        WSGIScriptAlias /{}/camservice /var/www/html/{}/lib/flaskapps/camservice/camservice.wsgi application-group=%{{GLOBAL}}".format(actPath,actPath))
    injectLine.append("        Alias /static/ /var/www/html/{}/lib/flaskapps/camservice/static".format(actPath))
    injectLine.append("        <Directory /var/www/html/{}/lib/flaskapps/camservice/static>".format(actPath))
    injectLine.append("                Order allow,deny")
    injectLine.append("                Allow from all")
    injectLine.append("        </Directory>")
    injectLine.append('        # End - injected by Camservice - Setup')

    myConfFiles = []
    for root, dirs, files in os.walk('/etc/apache2/sites-available'):
        for name in files:
            if '.conf' in name:
                myConfFiles.append(name)
    i = 0
    for entry in myConfFiles:
        i +=1
        print (str(i) + ' ' + entry)
    #print ('Select you correct *.conf-File for Apache-SmartVisu-Site')
    #print ('Enter "q" for abort')
    mySelection = 999
    while (mySelection > i  and mySelection != 99) or mySelection == 999:
        mySelection = int(input ('Select you correct *.conf-File for Apache-SmartVisu-Site / 99= abort'))
        if (mySelection == 99):
            print ('Operation aborted by user')
            return False

    print ('You selected : ' + myConfFiles[mySelection-1])
    # Check if copy exists
    FileName = '/etc/apache2/sites-available/' +myConfFiles[mySelection-1][:-5]
    try:
        myFile = open (FileName+'.org', 'r')
        myContent = myFile.read()
        myFile.close()

    except:
        # Make a copy of original
        myFile = open (FileName+'.conf', 'r')
        myContent = myFile.read()
        myFile.close()
        myFile = open (FileName+'.org', 'w')
        myFile.write(myContent)
        myFile.close()
    try:
        compareEntry = 'DocumentRoot'
        found_start = False
        myLines = myContent.split("\n")
        with open (FileName+'.conf', 'w') as fp:
            for line in myLines:
                fp.writelines(line+'\n')
                if compareEntry in line and found_start == False:
                    found_start = True
                    for insertLine in injectLine:
                        fp.writelines(insertLine+'\n')

        fp.close()
        return True

    except:
        pass

    return False


def GetVisuVersion(actPath=None):
    myFile = open ('/var/www/html/'+ actPath +'/version-info.php', 'r')
    myContent = myFile.read()
    myFile.close()
    myLines = myContent.split("\n")
    for line in myLines:
        if 'config_version' in line:
            myValue = float(line.split(",")[1].strip().replace("'","").split(")")[0])
            break
    return myValue

if __name__ == "__main__":
    myPath = sys.argv[1]
    print ('start-path : ' + myPath)
    visuVersion = GetVisuVersion(myPath)
    print ('***************************************')
    print ('Found Visu-Version : '+ str(visuVersion))
    print ('***************************************')
    myResult = InjectSystem(myPath,visuVersion)
    myResult = InjectApacheSettings(myPath)
    if (myResult == False):
        print ('Apache settings not stored')


