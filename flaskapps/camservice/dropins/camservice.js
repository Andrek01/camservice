// ----- multimedia.camservice  ------------------------------------------------------
$.widget("sv.multimedia_camservice", $.sv.widget, {

  initSelector: '[data-widget="multimedia.camservice"]',
  options: {
	'uuid' 	: null,
	'url'	: null
  },
	
	_init: function()
	 {
	  this._super();
	  this.options.uuid = ([1e7]+1e3+4e3+8e3+1e11).replace(/[018]/g, c =>
	  	 (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
	  if (this.element.attr('data-url'))
      		{
      		this.options.url = this.element.attr('data-url')
      		img_base = this.options.url + '&client='+ this.options.uuid+'&command=play' ;
      		this.bindings[0].childNodes[1].src = img_base
      		}
	 },
	
	_update:
	function(response) {
	  	this.options.uuid = _GetUUID()
		var widget_url = this.element.attr('data-url');
		if (widget_url)
		{
			var img_base = widget_url + '&client='+ this.options.uuid+'&command=play' ;
		}
		else
		{
			var img_base = resp + ((resp.indexOf('?') == -1) ? '?' : '&');
		}
		this.element.attr('src', img);

	},
    
	_exit: function(){
		console.log('Exit Function');
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
		  	newUrl = myUrl.replace("command=stop","command=play")+"&seq=1"
			this.bindings[0].childNodes[1].attributes.src.nodeValue= newUrl
			}
		  	break
		  }
		 case  'stop' :
		 {
		  	console.log('Button Stop')
		  	if (myUrl.search("play") != -1)
		  	{
		  	newUrl = myUrl.replace("command=play","command=stop")		  	
			this.bindings[0].childNodes[1].attributes.src.nodeValue= newUrl
			}
		 	break
		 	
		 	
		 }		 
		 }
		}

	},
	//*****************************************************
	// function for drawing the time-table
	//*****************************************************
	_GetUUID: function () {	
		return ([1e7]+1e3+4e3+8e3+1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
	}
});
