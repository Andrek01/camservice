/**
* -----------------------------------------------------------------------------
* @package     smartVISU
* @author      Andre Kohler
* @copyright   2022
* @license     GPL [http://www.gnu.de]
* -----------------------------------------------------------------------------
*/

/**
* Handling of for the Camservice Admin-Page
*/
  var myHtml = '<div id={id} class="streamsetting" data-role="collapsible" data-collapsed="true" data-theme="c" data-content-theme="a">\
	<h3 style="display:inline"> Stream : <p style="display:inline;font-weight:bold">{Streamid} </p></h3>\
		<div class="ui-field-contain" style="margin-top: 0.2em;margin-bottom: 0.2em">\
      <label for="lbl-input0-{id}" style="margin-top: 0.2em;margin-bottom: 0.2em;">smartVisu-URL</label> \
       <input id="input-Id0-{id}"  name="lbl-input0-{id}" type="text" value="./camservice/video_feed?stream={id}"disabled>\
		</div>\
		<div class="ui-field-contain" style="margin-top: 0.2em;margin-bottom: 0.2em">\
      <label for="lbl-input1-{id}" style="margin-top: 0.2em;margin-bottom: 0.2em;">Camera-URL/File</label>\
       <input id="url-{id}"  name="lbl-input1-{id}" type="text">\
		</div>\
<table style="font-size:small;width:100%">\
<tr>\
<td style="width:12%">\
  In-Feed Driver\
</td>\
<td style="width:14%">\
  <div class="ui-field-contain">\
      <select id="driver-{id}" name="driver" data-native-menu="false" style="font-size:small" onchange="selectChanged(this)">\
              <option value="1" selected="selected">Requests</option>\
              <option value="2">OpenCV</option>\
      </select>\
  </div>\
</td>\
<td style="width:8%; text-align:center">\
 Type\
</td>\
<td style="width:14%">\
  <div class="ui-field-contain">\
      <select id="type-{id}" name="type" data-native-menu="false" onchange="selectChanged(this)">\
              <option value="1" selected="selected"  style="font-size:small">Stream</option>\
              <option value="2"  style="font-size:small">Snapshot</option>\
      </select>\
  </div>\
</td>\
<td style="width:5%">\
  <input id="addText-{id}" type="checkbox" onChange="checkBoxChanged(this)">\
</td>\
<td style="width:6%">\
 add Text\
</td>\
<td style="width:11%">\
  <a href="#popupAddText-{id}" data-rel="popup" class="ui-btn ui-corner-all ui-shadow ui-btn-inline">Options</a>\
    <div data-role="popup" id="popupAddText-{id}" class="ui-content" style="max-width:280px">\
    <a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>\
    <h2 style="text-align:center">Text - Options</h2>\
    <table style="width:300px;padding-left:15px;padding-right:15px;font-size:smaller">\
      <tr>\
        <td style="width:20%;padding-left:15px">\
          Text\
        </td>\
        <td colspan=3>\
          <input id="text-{id}" type="text" value="" onInput="textChanged(this)">\
        </td>\
      </tr>\
      <tr>\
        <td style="width:25%;padding-left:15px">\
          X-Pos\
        </td>\
        <td style="width:25%;padding-left:15px">\
          <input id="TextPosX-{id}"  name="lbl-input2" type="text" value="10" onInput="textChanged(this)">\
        </td>\
        <td style="width:25%;padding-left:15px">\
          Y-Pos\
        </td>\
        <td style="width:25%;padding-left:15px">\
          <input id="TextPosY-{id}"  name="lbl-input2" type="text" value="10" onInput="textChanged(this)">\
        </td>\
      </tr>\
      <tr>\
      <tr>\
        <td style="width:25%;padding-left:15px">\
          Font-Size\
        </td>\
        <td style="width:25%;padding-left:15px">\
          <input id="TextFontSize-{id}"  name="lbl-input2" type="text" value="3" onInput="textChanged(this)">\
        </td>\
        <td style="width:25%;padding-left:15px">\
          Thickness\
        </td>\
        <td style="width:25%;padding-left:15px">\
          <input id="TextFontThickness-{id}"  name="lbl-input2" type="text" value="0.8" onInput="textChanged(this)">\
        </td>\
      </tr>\
      <tr>\
        <td colspan=2 style="padding-left:15px;">\
        Color\
        </td>\
        <td colspan=2>\
          <input class="cam_ColorButton" id="TextColor-{id}" type="button" onclick="GetColor(this)" style="background-color:#000000">\
        </td>\
      </tr>\
    </table>\
    <div id="myColorPicker-TextColor-{id}">\
    </div>\
  </div>\
</td>\
<td style="width:5%">\
  <input id="addDate-{id}" type="checkbox" name="" onChange="checkBoxChanged(this)">\
</td>\
<td style="width:6%">\
  add Date\
</td>\
<td style="width:11%">\
  <a href="#popupAddDate-{id}" data-rel="popup" class="ui-btn ui-corner-all ui-shadow ui-btn-inline">Options</a>\
    <div data-role="popup" id="popupAddDate-{id}" class="ui-content" style="max-width:280px">\
    <a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>\
    <h2 style="text-align:center">Date - Options</h2>\
    <table style="width:300px;padding-left:15px;padding-right:15px;font-size:smaller">\
      <tr>\
        <td style="width:25%;padding-left:15px">\
          X-Pos\
        </td>\
        <td style="width:25%;padding-left:15px">\
          <input id="DatePosX-{id}"  name="lbl-input2" type="text" value="100" onInput="textChanged(this)">\
        </td>\
        <td style="width:25%;padding-left:15px">\
          Y-Pos\
        </td>\
        <td style="width:25%;padding-left:15px">\
          <input id="DatePosY-{id}"  name="lbl-input2" type="text" value="300" onInput="textChanged(this)">\
        </td>\
      </tr>\
      <tr>\
      <tr>\
        <td style="width:25%;padding-left:15px">\
          Font-Size\
        </td>\
        <td style="width:25%;padding-left:15px">\
          <input id="DateFontSize-{id}"  name="lbl-input2" type="text" value="2" onInput="textChanged(this)">\
        </td>\
        <td style="width:25%;padding-left:15px">\
          Thickness\
        </td>\
        <td style="width:25%;padding-left:15px">\
          <input id="DateFontThickness-{id}"  name="lbl-input2" type="text" value="0.8" onInput="textChanged(this)">\
        </td>\
      </tr>\
      <tr>\
        <td colspan=2 style="padding-left:15px;">\
        Color\
        </td>\
        <td colspan=2>\
          <input class="cam_ColorButton" id="DateColor-{id}" type="button" onclick="GetColor(this)" style="background-color:#000000">\
        </td>\
      </tr>\
    </table>\
    <div id="myColorPicker-DateColor-{id}">\
    </div>\
  </div>\
</td>\
</tr>\
</table>\
      <table class="StreamControls" style="width:100%;margin:auto;">\
      <tr>\
        <td style="width:70%">\
        </td>\
        <td style="float:right">\
        <div class="tooltip">\
          <button id="play_Stream-{id}" class="StreamButton ui-mini ui-btn-inline" name="btn-add-stream" type="button"  onclick="previewStream(this)"><img src="icons/ws/audio_play.svg"></button>\
          <span class="tooltiptext">play stream in Preview Block</span>\
          </div>\
          <div class="tooltip">\
          <button id="del_Streams-{id}" class="StreamButton ui-mini ui-btn-inline" name="btn-store-streams" type="button"  onclick="deleteStream(this)"><img src="icons/ws/jquery_delete.svg"></button>\
          <span class="tooltiptext">remove Stream</span>\
          </div>\
        </td>\
      </tr>\
      </table>\
</div>\
'

//****************************************
// some global variables
//****************************************
var CamServiceintervalID = null
var myStreams = {}
const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`
//****************************************

$( document ).ready(function() {
	GetStatus();
	GetCamSettings();
});

// Activate Status on pageBefore
$(document).on('pagebeforeshow', function(event) {
      if (event.currentTarget.URL.search("camservice") > 0)
        { CamServiceintervalID = setInterval(GetStatus, 1000); }
		});

// Stop Status on leaving page
$(document).on('pagecontainerbeforetransition', function(event,ui) {
	if (ui.prevPage!= undefined && ui.toPage[0].id != ui.prevPage[0].id) { 
    clearInterval(CamServiceintervalID);
	}
});


function textChanged(that)
{
	console.log("textChanged")
	myValue = that.value
	myObjName=that.id.split("-")[1]
	myJSON = {'ID' : myObjName, 'setting' : that.id.split("-")[0], 'value' : myValue}
	changeatonce(myJSON)
}

function checkBoxChanged(that)
{
	console.log("checkBoxChanged")
	myValue = that.checked
	myObjName=that.id.split("-")[1]
	myJSON = {'ID' : myObjName, 'setting' : that.id.split("-")[0], 'value' : myValue}
	changeatonce(myJSON)
}
function selectChanged(that)
{
	console.log("selectChanged")
	myValue = that.value
	myObjName=that.id.split("-")[1]
	myJSON = {'ID' : myObjName, 'setting' : that.id.split("-")[0], 'value' : myValue}
	changeatonce(myJSON)
}


function changeatonce(myJson)
{
	$.ajax({
    url: "./camservice/changeatonce",
    type: "POST",
    data:  JSON.stringify(myJson),
    contentType: "application/json; charset=utf-8",
    success: function (response) {
    	console.log("OK");
    },
    error: function () {
        console.log("Error - while getting Status")
        _Status = "Error - Service not running"
        $('#Status')[0].innerHTML= -Status
    		$('#Status')[0].style.color="red"
    		$('#StatusHeadline')[0].innerHTML=_Status
    		$('#StatusHeadline')[0].style.color="red"
    }
 });
}


function uuidv4() {
  return ([1e7]+1e3+4e3+8e3+1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function storeStreams()
{
streams2Save = getValuefromScreen()

$.ajax({
    url: "lib/flaskapps/camservice/camservice.php",
    type: "GET",
		   data: {
			   		command : 'store_cam_settings',
			   		data : JSON.stringify(streams2Save)
			   	 },
    contentType: "application/json; charset=utf-8",
    success: function (response) {
    	console.log('Status of storing :'+ response );
    },
    error: function () {
        console.log("Error - while storing settings")

    }
 });
}

function deleteStream(button)
{
	myStreamId=button.id.split("-")[1]
	delete myStreams[myStreamId]
	Cams2Screen(myStreams,false);
}
function GetCamSettings()
{
// get_cam_settings
$.ajax({
    url: "lib/flaskapps/camservice/camservice.php",
    type: "GET",
		   data: {
			   		command : 'get_cam_settings'
			   	 },
    contentType: "application/json; charset=utf-8",
    success: function (response) {
   	  myStreams = JSON.parse(response)
    	Cams2Screen(myStreams,false);
    },
    error: function () {
        console.log("Error - while getting Status")

    }
 });
}

function Cams2Screen(data, addNew)
{
  myHtmlStreams = ""
  for (var key in data) {
    
    myHtml2append = myHtml.split("{id}").join(key)
    myHtml2append = myHtml2append.split("{Streamid}").join(data[key].url)
    
    myHtmlStreams += myHtml2append

    }
    if (addNew == true)
      {
        newStreamID = uuidv4()
        myStreams[newStreamID] = {}
        myStreams[newStreamID]['url']='**** NEW ****'
        myHtml2append = myHtml.split("{id}").join(newStreamID)
				myHtml2append = myHtml2append.split('data-collapsed="true"').join('data-collapsed="false"')
				
        myHtml2append = myHtml2append.split("{Streamid}").join(myStreams[newStreamID].url)
        myHtmlStreams += myHtml2append        
      }
    streamlist = $('.camservice_stream_list');
    streamlist.html(myHtmlStreams).trigger('create');
		FillValue2Screen(data)
}

function getValuefromScreen()
{
	myNewSettings = {}
	myStreams = $(".streamsetting")
	for (stream in myStreams)
		{
			console.log(myStreams[stream].id)
			key = myStreams[stream].id
			if (key === undefined) continue;
			myNewSettings[myStreams[stream].id]={}
			myNewSettings[myStreams[stream].id]['url'] = document.getElementById('url-'+key).value
			myNewSettings[myStreams[stream].id]['settings']={}
			myNewSettings[myStreams[stream].id]['settings']['addDate'] = document.getElementById('addDate-'+key).checked
			myNewSettings[myStreams[stream].id]['settings']['DatePosX'] = document.getElementById('DatePosX-'+key).value
			myNewSettings[myStreams[stream].id]['settings']['DatePosY'] = document.getElementById('DatePosY-'+key).value
			myNewSettings[myStreams[stream].id]['settings']['DateFontSize'] = document.getElementById('DateFontSize-'+key).value
			myNewSettings[myStreams[stream].id]['settings']['DateFontThickness'] = document.getElementById('DateFontThickness-'+key).value
			myNewSettings[myStreams[stream].id]['settings']['addText'] = document.getElementById('addText-'+key).checked
			myNewSettings[myStreams[stream].id]['settings']['text'] = document.getElementById('text-'+key).value
			myNewSettings[myStreams[stream].id]['settings']['TextPosX'] = document.getElementById('TextPosX-'+key).value
			myNewSettings[myStreams[stream].id]['settings']['TextPosY'] = document.getElementById('TextPosY-'+key).value
			myNewSettings[myStreams[stream].id]['settings']['TextFontSize'] = document.getElementById('TextFontSize-'+key).value
			myNewSettings[myStreams[stream].id]['settings']['TextFontThickness'] = document.getElementById('TextFontThickness-'+key).value
			myNewSettings[myStreams[stream].id]['settings']['DateColor'] = rgba2hex(document.getElementById('DateColor-'+key).style.backgroundColor)
			myNewSettings[myStreams[stream].id]['settings']['TextColor'] = rgba2hex(document.getElementById('TextColor-'+key).style.backgroundColor)
			
			myNewSettings[myStreams[stream].id]['settings']['driver'] = $("#"+'driver-'+key)[0].value
			myNewSettings[myStreams[stream].id]['settings']['type'] = $("#"+'type-'+key)[0].value
		}
	console.log('finished')
	return myNewSettings
}

function FillValue2Screen(data)
{
	for (var key in data) {
			
			document.getElementById('url-'+key).value = data[key].url
			document.getElementById('addDate-'+key).checked = data[key].settings.addDate
			document.getElementById('DatePosX-'+key).value = data[key].settings.DatePosX
			document.getElementById('DatePosY-'+key).value = data[key].settings.DatePosY
			document.getElementById('DateFontSize-'+key).value = data[key].settings.DateFontSize
			document.getElementById('DateFontThickness-'+key).value = data[key].settings.DateFontThickness
			
			
			document.getElementById('addText-'+key).checked = data[key].settings.addText
			document.getElementById('text-'+key).value = data[key].settings.text
			document.getElementById('TextPosX-'+key).value = data[key].settings.TextPosX
			document.getElementById('TextPosY-'+key).value = data[key].settings.TextPosY
			document.getElementById('TextFontSize-'+key).value = data[key].settings.TextFontSize
			document.getElementById('TextFontThickness-'+key).value = data[key].settings.TextFontThickness						
			
			
			document.getElementById('DateColor-'+key).style.backgroundColor= data[key].settings.DateColor
			document.getElementById('TextColor-'+key).style.backgroundColor= data[key].settings.TextColor
			
			$("#"+'driver-'+key).val(data[key].settings.driver).change()
			$("#"+'type-'+key).val(data[key].settings.type).change()
	}
}

function GetStatus()
{
$.ajax({
    url: "./camservice/status",
    type: "GET",
    data: { Test : 'Test'
          },
    contentType: "application/json; charset=utf-8",
    success: function (response) {
    	UpdateStatus(response);
    },
    error: function () {
        console.log("Error - while getting Status")
        _Status = "Error - Service not running"
        $('#Status')[0].innerHTML= -Status
    		$('#Status')[0].style.color="red"
    		$('#StatusHeadline')[0].innerHTML=_Status
    		$('#StatusHeadline')[0].style.color="red"
    }
 });
}

function UpdateStatus(data)
{
  //	console.log(data)
	if (data.hasOwnProperty("cpuload"))
		{
		
		// get the correct chart
    myCharts = Highcharts.charts
		myCharts.forEach(chart => {
		  if (chart.renderTo.id == 'camservice-plot_camservice')
		    myChart = chart
		   }) 
		

		chart = Highcharts.charts[0] 

		chart.xAxis[0].update({ min: data.cpuload[0][0], max: data.cpuload.slice(-1)[0][0] }, false);
        if(chart.navigator) {
            chart.navigator.xAxis.update({ min: data.cpuload[0][0], max: data.cpuload.slice(-1)[0][0] }, false);
        }
		chart.series[0].setData(data.cpuload, false);
		chart.series[1].setData(data.actClients, false);
		chart.series[2].setData(data.actCams, false);
		if (chart.xAxis[0].hasOwnProperty('extKey'))
			{
			lastMax = parseFloat(chart.xAxis[0].extKey.split(",")[1])
			lastMin = parseFloat(chart.xAxis[0].extKey.split(",")[0])
			newMax = data.cpuload.slice(-1)[0][0]
			diff = newMax - lastMax
			newMin = lastMin + diff
			chart.xAxis[0].setExtremes(newMin,data.cpuload.slice(-1)[0][0])
			}
		chart.redraw()
		if  (data.actClients.slice(-1)[0][1] != 0 && data.actCams.slice(-1)[0][1] != 0)
		 {
		  _Status = 'OK - streaming to Clients'
		  _Color = 'green'
		 }
		else
		 {
 		  _Status = 'Idle - waiting for Connections'
 		  _Color = 'orange'
     }
		$('#Status')[0].innerHTML=_Status
		$('#Status')[0].style.color=_Color
				
		$('#StatusHeadline')[0].innerHTML=_Status
		$('#StatusHeadline')[0].style.color=_Color

		$('#actClients')[0].innerHTML=data.actClients.slice(-1)[0][1]
		$('#actCams')[0].innerHTML=data.actCams.slice(-1)[0][1]
		$('#cpuload')[0].innerHTML=data.cpuload.slice(-1)[0][1]+' %'
		}
}


////////////////////////////////

function GetColor(button) {
    
    var self = this;

		var myColorButton = button;
		var myID = button.id.split("-")[1];
		var myButtonType = button.id.split("-")[0];
		
		if ($('#myColorPicker-'+myButtonType+'-'+myID).has('canvas').length != 0)
		  {
		    document.getElementById('myColorPicker-'+myButtonType+'-'+myID).innerHTML=""
		    return
		  }
		var canvas = $('<canvas style="border: none;">')

		var node = this.element;
		var size = 280;
		var colors = 15;
		var steps = 19;
		var step = Math.round(2 * 100 / (steps + 1) * 10000) / 10000;

		var arc = Math.PI / (colors + 2) * 2;
		var startangle = arc - Math.PI / 2;
		var gauge = (size - 2) / 2 / (steps + 1);
		var share = 360 / colors;
		var center = size / 2;

		if (canvas[0].getContext) {
			var ctx = canvas[0].getContext("2d");
			ctx.canvas.width = size;
			ctx.canvas.height = size;
			canvas.width(size).height(size);

			// draw background
			ctx.beginPath();
			ctx.fillStyle = '#888';
			ctx.shadowColor = 'rgba(96,96,96,0.4)';
			ctx.shadowOffsetX = 2;
			ctx.shadowOffsetY = 2;
			ctx.shadowBlur = 4;
			ctx.arc(center, center, size / 2 - 1, 0, 2 * Math.PI, false);
			ctx.fill();
			ctx.beginPath();
			ctx.shadowOffsetX = 0;
			ctx.shadowOffsetY = 0;
			ctx.shadowBlur = 0;
			ctx.fillStyle = '#555';
			ctx.arc(center, center, size / 2 - 2, 0, 2 * Math.PI, false);
			ctx.fill();

			// draw colors
			for (var i = 0; i <= colors; i++) {
				var angle = startangle + i * arc;
				var ring = 1;
				var h = i * share;
				for (var v = step; v <= 100 - step/2; v += step) {
					ctx.beginPath();
					ctx.fillStyle = 'rgb('+fx.hsv2rgb(h, 100, v).join(',')+')';
					ctx.arc(center, center, ring * gauge + gauge + 1, angle, angle + arc + 0.01, false);
					ctx.arc(center, center, ring * gauge, angle + arc + 0.01, angle, true);
					ctx.fill();
					ring += 1;
				}
				for (var s = (100 - step * ((steps + 1) % 2)/2); s >= step/2; s -= step) {
					ctx.beginPath();
					ctx.fillStyle = 'rgb('+fx.hsv2rgb(h, s, 100).join(',')+')';
					ctx.arc(center, center, ring * gauge + gauge + 1, angle, angle + arc + 0.01, false);
					ctx.arc(center, center, ring * gauge, angle + arc + 0.01, angle, true);
					ctx.fill();
					ring += 1;
				}
			}

			// draw grey
			angle = startangle - 2 * arc;
			ring = 1;
			h = i * share;
			for (var v = step; v <= 100; v += (step / 2)) {
				ctx.beginPath();
				ctx.fillStyle = 'rgb('+fx.hsv2rgb(h, 0, v).join(',')+')';
				ctx.arc(center, center, ring * gauge + gauge + 1, angle, angle + 2 * arc + 0.01, false);
				ctx.arc(center, center, ring * gauge, angle + 2 * arc + 0.01, angle, true);
				ctx.fill();
				ring += 1;
			}

			// draw center
			ctx.beginPath();
			ctx.fillStyle = 'rgb(0,0,0)';
			ctx.arc(center, center, gauge + 1, 0, 2 * Math.PI, false);
			ctx.fill();

		}

//		var items = this.options.item.explode();
		var colormodel = 'rgb'
		var max = [255,255,255]
		var min = [0,0,0]
		// ensure max and min as array of 3 floats (fill by last value if array is shorter)
		for(var i = 0; i <= 2; i++) {
			max[i] = parseFloat(max[Math.min(i, max.length-1)])
			min[i] = parseFloat(min[Math.min(i, min.length-1)])
		}
		canvas.on(
		{'click': function (event)
		 {
				var offset = $(this).offset();
				var x = Math.round(event.pageX - offset.left);
				var y = Math.round(event.pageY - offset.top);

				var values = canvas[0].getContext("2d").getImageData(x, y, 1, 1).data;
				// DEBUG: console.log([rgb[0], rgb[1], rgb[2], rgb[3]]);

				if(values[3] > 0) { // set only if selected color is not transparent
					switch(colormodel) {
						case 'rgb':
							values = [
								Math.round(values[0] / 255 * (max[0] - min[0])) + min[0],
								Math.round(values[1] / 255 * (max[1] - min[1])) + min[1],
								Math.round(values[2] / 255 * (max[2] - min[2])) + min[2]
							];
							break;
						case 'hsl':
							values = fx.rgb2hsl(values[0],values[1],values[2]);
							values = [
								Math.round(values[0] / 360 * (max[0] - min[0])) + min[0],
								Math.round(values[1] / 100 * (max[1] - min[1])) + min[1],
								Math.round(values[2] / 100 * (max[2] - min[2])) + min[2]
							];
							break;
						case 'hsv':
							values = fx.rgb2hsv(values[0],values[1],values[2]);
							values = [
								Math.round(values[0] / 360 * (max[0] - min[0])) + min[0],
								Math.round(values[1] / 100 * (max[1] - min[1])) + min[1],
								Math.round(values[2] / 100 * (max[2] - min[2])) + min[2]
							];
							break;
					}
          self._mem = values;
				}

//				$(this).remove();
				myColor = rgbToHex(values[0],values[1],values[2])
				myColorButton.style.backgroundColor=myColor
			}
		 })
		 
    document.getElementById('myColorPicker-'+myButtonType+'-'+myID).appendChild(canvas[0])

	}
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


function previewStream(button)
{
  console.log('Stream-Button-pressed')
  myStreamId=button.id.split("-")[1]
  myStream = document.getElementById("input-Id0-"+myStreamId).value
  previewSrc=$(":mobile-pagecontainer").pagecontainer( "getActivePage" ).find('[data-widget]')[2] 
  previewSrc.childNodes[1].src=myStream+'&command=play' 
}

function addStream()
{
  Cams2Screen(myStreams,true);  
}

