
$(document).ready(function(){
	if(google.maps.Map) {
		$("#error").append("<br>地图api连接成功</br>");
	} else {
		$("#error").append("<br>地图api连接失败</br>");
		$("#error").css("color","red");
		return;
	}
	var isPhone = detectBrowser();
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

	}
	var inputControlDiv = document.createElement('div');
	var inputControl = new inputButton(inputControlDiv, map);
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(inputControlDiv);
	var nameControlDiv = document.createElement('div');
	var nameControl = new nameText(nameControlDiv, map);
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(nameControlDiv);
	var searchControlDiv = document.createElement('div');
	var searchControl = new searchFrame(searchControlDiv, map);
	map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(searchControlDiv);
	var inputRoadControlDiv = document.createElement('div');
	var inputRoadControl = new pathInputButton(inputRoadControlDiv, map);
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(inputRoadControlDiv);
	var pathStringControlDiv = document.createElement('div');
	var pathStringControl = new pathStringButton(pathStringControlDiv, map);
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(pathStringControlDiv);
	/*
	google.maps.event.addListener(map, 'click', function(event) {
		alert(event.latLng);
	});
	*/
	
});

function detectBrowser() {
	var useragent = navigator.userAgent;
	var isPhone;
	if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
		//mapdiv.style.width = '100%';
		//mapdiv.style.height = '100%';
		isPhone = 1;
	} else {
		//mapdiv.style.width = '640px';
		//mapdiv.style.height = '480px';
		isPhone = 0;
	}
	return isPhone;
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
  controlUI.title = '点击切换地图全屏';
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

function verifyMarker() {
	curMarker.setIcon("A.png");
}

function deleteMarker() {
	curMarker.setMap(null);
}

function addMarker(map, location, infowindow) {
	var ckName = prompt("请输入仓库名","仓库1");
	if(ckName==null||ckName=="") {
		return;
	}
	infowindow.setContent(ckName+"<p><button onclick='verifyMarker()'>认证</button> <button onclick='deleteMarker()'>删除</button></p>");
	//infowindow.setPosition(location);
  var marker = new google.maps.Marker({
    position: location,
	//icon: "A.png",
    map: map
  });
  curMarker = marker;
  marker.setMap(map);
  infowindow.open(map,marker);
  //markersArray.push(marker);
	google.maps.event.addListener(marker, 'click', function() {
	  infowindow.setContent(ckName+"<p><button onclick='verifyMarker()'>认证</button> <button onclick='deleteMarker()'>删除</button></p>");
	  curMarker = marker;
	  infowindow.open(map,marker);
	});
}

// Define a property to hold the state.
inputButton.prototype.state_ = 0;
inputButton.prototype.listener_;
inputButton.prototype.infowindow_;
// = new google.maps.InfoWindow({
//    content: contentString
//});
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

inputButton.prototype.getInfoWindow = function() {
	return this.infowindow_;
}

inputButton.prototype.setInfoWindow = function(infowindow) {
	this.infowindow_ = infowindow;
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
  controlUI.title = '点击增加新的仓库';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '13px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<strong>标记仓库</strong>';
  controlUI.appendChild(controlText);

  var control = this;
  // Setup the click event listeners: simply set the map to Chicago.
  google.maps.event.addDomListener(controlUI, 'click', function() {
	if(control.getState() == 0) {
		controlText.innerHTML = '<strong>取消标记</strong>';
		control.setState(1);
		var listener = google.maps.event.addListenerOnce(map, 'click', function(event) {
			if(control.getInfoWindow()==null) {
				control.setInfoWindow(new google.maps.InfoWindow());
			}
			addMarker(map, event.latLng, control.getInfoWindow());
			controlText.innerHTML = '<strong>标记仓库</strong>';
			control.setState(0);
		});
		control.setListener(listener);
	} else {
		controlText.innerHTML = '<strong>标记仓库</strong>';
		control.setState(0);
		google.maps.event.removeListener(control.getListener());
	}
  });
}

function nameText(controlDiv, map) {
	
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
  controlText.innerHTML = '<strong>用户:</strong>游客<a href="http://www.dragontrans.com/e/member/register/ChangeRegister.php">登陆</a>';
  controlUI.appendChild(controlText);
}


function searchFrame(controlDiv, map) {
	
  // Set CSS styles for the DIV containing the control
  // Setting padding to 5 px will offset the control
  // from the edge of the map.
  controlDiv.style.padding = '15px';

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
  controlText.innerHTML = '起点：<input type="text" name="from" size="12" maxlength="20">终点：<input type="text" name="to" size="12" maxlength="20"><input type="submit" name="搜索" value="搜索">';
  controlUI.appendChild(controlText);
}

// Define a property to hold the state.
pathInputButton.prototype.state_ = 0;
pathInputButton.prototype.listener_;
// Define setters and getters for this property.
pathInputButton.prototype.getState = function() {
  return this.state_;
}

pathInputButton.prototype.setState = function(state) {
	this.state_ = state;
}

pathInputButton.prototype.getListener = function() {
  return this.listener_;
}

pathInputButton.prototype.setListener = function(listener) {
	this.listener_ = listener;
}

function pathInputButton(controlDiv, map) {
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
  controlUI.title = '点击增加运输路线';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '13px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<strong>标注路径</strong>';
  controlUI.appendChild(controlText);

  var control = this;
  // Setup the click event listeners: simply set the map to Chicago.
  google.maps.event.addDomListener(controlUI, 'click', function() {
	if(control.getState() == 0) {
		controlText.innerHTML = '<strong>完成路径</strong>';
		control.setState(1);
		var polyOptions = {
			strokeColor: '#000000',
			strokeOpacity: 1.0,
			strokeWeight: 3
		}
		var poly = new google.maps.Polyline(polyOptions);
		poly.setMap(map);
		var listener = google.maps.event.addListener(map, 'click', function(event) {
			var path = poly.getPath();
			path.push(event.latLng);
			/*
			  var marker = new google.maps.Marker({
				position: event.latLng,
				title: '#' + path.getLength(),
				map: map
			  });
			  */
		});
		control.setListener(listener);
		/*
		var listener = google.maps.event.addListenerOnce(map, 'click', function(event) {
			if(control.getInfoWindow()==null) {
				control.setInfoWindow(new google.maps.InfoWindow());
			}
			addMarker(map, event.latLng, control.getInfoWindow());
			controlText.innerHTML = '<strong>标路径</strong>';
			control.setState(0);
		});
		control.setListener(listener);
		*/
	} else {
		controlText.innerHTML = '<strong>标注路径</strong>';
		control.setState(0);
		google.maps.event.removeListener(control.getListener());
	}
  });
}


function pathStringButton(controlDiv, map) {
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
  controlUI.title = '点击可导入字符串格式的路径';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '13px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<strong>路径导入</strong>';
  controlUI.appendChild(controlText);

  var control = this;
  // Setup the click event listeners: simply set the map to Chicago.
  google.maps.event.addDomListener(controlUI, 'click', function() {
	var ckName = prompt("路径格式为：路线名|纬度,精度;...纬度,精度|运价|时间","中关村-北京站|39.98386,116.31659;39.98540,116.31646;39.98678,116.35354;39.90719,116.35655;39.90835,116.42710;39.90496,116.42723|3000|220");
	if(ckName==null||ckName=="") {
		return;
	}
	var ckPiece = ckName.split("|");
	var name = ckPiece[0];
	var path = ckPiece[1];
	var price = ckPiece[2];
	var time = ckPiece[3];
	if(name==null||path==null||path==""||price==null||price==""||time==null||time=="") {
		alert("输入格式有误。");
		return;
	}
	var points = path.split(";");
	if(points.length<2) {
		alert("输入错误：路径点至少两个以上。");
		return;
	}
	var polyOptions = {
		strokeColor: '#000000',
		strokeOpacity: 1.0,
		strokeWeight: 3
	}
	var poly = new google.maps.Polyline(polyOptions);
	poly.setMap(map);
	for(var i=0;i<points.length;++i) {
		var latLon = points[i].split(",");
		var lat = latLon[0];
		var lon = latLon[1];
		var pt = new google.maps.LatLng(lat,lon,false);
		var path = poly.getPath();
		path.push(pt);
	}
	google.maps.event.addListener(poly, 'click', function(event) {
	
		var infoW = new google.maps.InfoWindow();
		infoW.setContent("<p><b>路线名：</b>"+name+"</p><p><b>运价：</b>"+price+"</p><p><b>耗时：</b>"+time+"</p>");
		infoW.setPosition(event.latLng);
		infoW.open(map);
	});
  });
}
