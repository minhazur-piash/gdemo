//document.write("<scri"+"pt type='text/javascript' src='http://maps.googleapis.com/maps/api/js?key=AIzaSyDESpX0WV4KVfHtiq8aBCtXzPTmrAhuZ4E&sensor=true'></scr"+"ipt>"); 

function detectBrowser() {
	var useragent = navigator.userAgent;

	if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
		//mapdiv.style.width = '100%';
		//mapdiv.style.height = '100%';
		isPhone = 1;
	} else {
		//mapdiv.style.width = '640px';
		//mapdiv.style.height = '480px';
		isPhone = 0;
	}
}

// Define a property to hold the Size state.
sizeButton.prototype.size_ = 0;

// Define setters and getters for this property.
sizeButton.prototype.getSize = function() {
  return this.size_;
}

sizeButton.prototype.setSize = function(size) {
	this.size_ = size;
}

function sizeButton(controlDiv, map) {
	
  // Set CSS styles for the DIV containing the control
  // Setting padding to 5 px will offset the control
  // from the edge of the map.
  controlDiv.style.padding = '5px';

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = 'white';
  controlUI.style.borderStyle = 'solid';
  controlUI.style.borderWidth = '1px';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to set the map to Home';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '13px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<strong>全屏</strong>';
  controlUI.appendChild(controlText);

  var control = this;
  // Setup the click event listeners: simply set the map to Chicago.
  google.maps.event.addDomListener(controlUI, 'click', function() {
		var mapdiv = map.getDiv();
		if(control.getSize() == 0) {
			//
			mapdiv.style.height = '100%';
			mapdiv.style.width = '100%';
			control.setSize(1);
			google.maps.event.trigger(map, 'resize');
		} else {
			mapdiv.style.width = '640px';
			mapdiv.style.height = '480px';
			control.setSize(0);
			google.maps.event.trigger(map, 'resize');
		}
  });
}

function initialize() {
	detectBrowser();
	var mapOptions = {
		center: new google.maps.LatLng(39.92, 116.46),
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var mapdiv = document.getElementById("yunar_map");
	if(isPhone == 0) {
		mapdiv.style.width = '640px';
		mapdiv.style.height = '480px';
	} else {
		mapdiv.style.width = '100%';
		mapdiv.style.height = '100%';
	}
	var map = new google.maps.Map(mapdiv, mapOptions);
	if(isPhone == 0) {
		var sizeControlDiv = document.createElement('div');
		var sizeControl = new sizeButton(sizeControlDiv, map);
		sizeControlDiv.index = 1;
		map.controls[google.maps.ControlPosition.TOP_RIGHT].push(sizeControlDiv);
	}

}

//google.maps.event.addDomListener(window, 'load', initialize);