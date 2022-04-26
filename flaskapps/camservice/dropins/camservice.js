// ----- multimedia.camservice  ------------------------------------------------------
$.widget("sv.multimedia_camservice", $.sv.widget, {

  initSelector: '[data-widget="multimedia.camservice"]',
  options: {
	'url'	: null
  },
	
	_init: function()
	 {
	  this._super();
	  if (this.element.attr('data-url'))
      		{
      		this.options.url = this.element.attr('data-url')
      		img_base = this.options.url + '&command=play' ;
      		this.bindings[0].childNodes[1].src = img_base
      		}
	 },
	
	_update:
	function(response) {
		var widget_url = this.element.attr('data-url');
		if (widget_url)
		{
			var img_base = widget_url + '&command=play' ;
		}
		else
		{
			var img_base = resp + ((resp.indexOf('?') == -1) ? '?' : '&');
		}
		this.element.attr('src', img);

	},
    
	_exit: function(){
		console.log('Exit Function');
		myUrl=this.bindings[0].childNodes[1].attributes.src.nodeValue.split("&")[0]+"&command=stop"
		this.bindings[0].childNodes[1].attributes.src.nodeValue= myUrl
		
		// prepare Restart of Stream
		
		$(document).on('pagecontainerbeforeshow', function () {
			console.log("onPageBeforeCamService")
			myActStreams = $(":mobile-pagecontainer").pagecontainer( "getActivePage" ).find('[data-widget="multimedia.camservice"]')
			for (let i = 0; i < myActStreams.length; i++) {
					console.log(myActStreams[i].childNodes[1].src)
					myActStreams[i].childNodes[1].src = myActStreams[i].childNodes[1].src.split("&")[0]+"&command=play" 
					} 
				
                             
		});
		
	},
	_events: {
	'click': function (event) {
		console.log("Click Event")
		myUrl=this.bindings[0].childNodes[1].attributes.src.nodeValue
		
		myTarget = event.target.id
		switch (myTarget)
		 {
		 case  'play' :
		  {
		  	console.log('Button Play')
		  	if (myUrl.search("stop") != -1)
		  	{		  	
		  	newUrl = this.bindings[0].childNodes[1].attributes.src.nodeValue.split("&")[0] +"&command=play"+"&seq=" + new Date().getTime();
			this.bindings[0].childNodes[1].attributes.src.nodeValue= newUrl
			}
		  	break
		  }
		 case  'stop' :
		 {
		  	console.log('Button Stop')
		  	if (myUrl.search("play") != -1)
		  	{
		  	newUrl = this.bindings[0].childNodes[1].attributes.src.nodeValue.split("&")[0] +"&command=stop"
			this.bindings[0].childNodes[1].attributes.src.nodeValue= newUrl
			}
		 	break
		 	
		 	
		 }		 
		 }
		}

	}

});
