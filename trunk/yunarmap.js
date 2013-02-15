//document.write("<scri"+"pt type='text/javascript' src='http://maps.googleapis.com/maps/api/js?key=AIzaSyDESpX0WV4KVfHtiq8aBCtXzPTmrAhuZ4E&sensor=true'></scr"+"ipt>"); 

var isPhone;

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
			mapdiv.style.position = 'absolute';
			mapdiv.style.top = '0px';
			mapdiv.style.left = '0px';
			mapdiv.style.height = '100%';
			mapdiv.style.width = '100%';
			control.setSize(1);
			controlText.innerHTML = '<strong>退出全屏</strong>';
			google.maps.event.trigger(map, 'resize');
		} else {
			mapdiv.style.top = '100px';
			mapdiv.style.width = '640px';
			mapdiv.style.height = '480px';
			control.setSize(0);
			controlText.innerHTML = '<strong>全屏</strong>';
			google.maps.event.trigger(map, 'resize');
		}
  });
}

//var markersArray = [];

function addMarker(map, location) {
	var infowindow = new google.maps.InfoWindow({
		content: '仓库'
	});
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  marker.setMap(map);
  //markersArray.push(marker);
	google.maps.event.addListener(marker, 'click', function() {
	  infowindow.open(map,marker);
	});
}

// Define a property to hold the state.
inputButton.prototype.state_ = 0;
inputButton.prototype.listener_;

// Define setters and getters for this property.
inputButton.prototype.getState = function() {
  return this.state_;
}

inputButton.prototype.setState = function(state) {
	this.state_ = state;
}

inputButton.prototype.getListener = function() {
  return this.listener_;
}

inputButton.prototype.setListener = function(listener) {
	this.listener_ = listener;
}

function inputButton(controlDiv, map) {
	
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
  controlUI.title = 'Click to input user data';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '13px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<strong>录入</strong>';
  controlUI.appendChild(controlText);

  var control = this;
  // Setup the click event listeners: simply set the map to Chicago.
  google.maps.event.addDomListener(controlUI, 'click', function() {
	if(control.getState() == 0) {
		controlText.innerHTML = '<strong>取消录入</strong>';
		control.setState(1);
		var listener = google.maps.event.addListenerOnce(map, 'click', function(event) {
			addMarker(map, event.latLng);
			controlText.innerHTML = '<strong>录入</strong>';
			control.setState(0);
		});
		control.setListener(listener);
	} else {
		controlText.innerHTML = '<strong>录入</strong>';
		control.setState(0);
		google.maps.event.removeListener(control.getListener());
	}
  });
}

function loadMap() {
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
		//mapdiv.style.position = 'absolute';
		//mapdiv.style.top = '0px';
		//mapdiv.style.left = '0px';
		mapdiv.style.width = '100%';
		mapdiv.style.height = '100%';
	}
	var map = new google.maps.Map(mapdiv, mapOptions);
	if(isPhone == 0) {
		var sizeControlDiv = document.createElement('div');
		var sizeControl = new sizeButton(sizeControlDiv, map);
		map.controls[google.maps.ControlPosition.TOP_RIGHT].push(sizeControlDiv);
		var inputControlDiv = document.createElement('div');
		var inputControl = new inputButton(inputControlDiv, map);
		map.controls[google.maps.ControlPosition.TOP_RIGHT].push(inputControlDiv);

	}

}

function read(path) {
	var content = "";
	try{
			var fso = new ActiveXObject("Scripting.FileSystemObject");
			var reader = fso.openTextFile(path, 1);
			while(!reader.AtEndofStream) {
					content += reader.readline();
					content += "\n";
			}
			// close the reader
			reader.close();
	}catch(e){
			if(document.implementation && document.implementation.createDocument){
					try {
							netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
							var lf = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
							lf.initWithPath(path);
							if (lf.exists() == false) {
									alert("File does not exist");
							}

							var fis = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance(Components.interfaces.nsIFileInputStream);
							fis.init(lf, 0x01, 00004, null);
							var sis = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance(Components.interfaces.nsIScriptableInputStream);
							sis.init(fis);
							var converter = Components.classes["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Components.interfaces.nsIScriptableUnicodeConverter);
							content = converter.ConvertToUnicode(sis.read(sis.available()));
							converter.charset = "UTF-8";
					}
					catch (e) {
							alert("Mozilla Firefox read local file error: \n" + e);
					}
			}
	}
	return content;
}
function write(arrstr,path){
	try{
	   var fso  = new ActiveXObject("Scripting.FileSystemObject");
	   var fh = fso.CreateTextFile(path, true);
	   fh.WriteLine(arrstr);
	   fh.Close();
	}catch(e){
		try {
			var pm = netscape.security.PrivilegeManager;
			pm.enablePrivilege('UniversalXPConnect');
		}catch(e)
		{
			alert("!!被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");
		}
		var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);

	  // alert("create file object");
		 if(file instanceof Components.interfaces.nsILocalFile)
			file.initWithPath(path);
		else
		{
			alert("erro");
			return;
		}
		//alert("init file object");
		var outputStream = Components.classes["@mozilla.org/network/file-output-stream;1"].createInstance(Components.interfaces.nsIFileOutputStream);
		//alert("create fout object");

		try
		{
			 outputStream.init(file,0x04|0x08|0x20,420,0);
		}catch(e){alert(e);}
		try
		{
			for(var i=0; i < arrstr.length; i++)
			{
				arrstr[i]+="\r\n";
				outputStream.write(arrstr[i],arrstr[i].length);
			}
		}catch(e){alert(e);};
		outputStream.close();
	}
}


//google.maps.event.addDomListener(window, 'load', initialize);