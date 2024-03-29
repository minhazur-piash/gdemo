﻿var map;
var infowindow;
var curMarker;

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
		mapTypeControl: false,
		streetViewControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var mapdiv = document.getElementById("yunar_map");
	if(isPhone == 0) {
		mapdiv.style.width = '640px';
		mapdiv.style.height = '480px';
	} else {
		mapdiv.style.position = 'absolute';
		mapdiv.style.top = '0px';
		mapdiv.style.left = '0px';
		mapdiv.style.width = '100%';
		mapdiv.style.height = '100%';
	}
	map = new google.maps.Map(mapdiv, mapOptions);
	getPosition(map);
	infowindow = new google.maps.InfoWindow();
	if(isPhone == 0) {
		var sizeControlDiv = document.createElement('div');
		var sizeControl = new sizeButton(sizeControlDiv, map);
		map.controls[google.maps.ControlPosition.TOP_RIGHT].push(sizeControlDiv);

	}
	if(isPhone == 1) {
	//home
		var homeControlDiv = document.createElement('div');
		var homeControl = new homeButton(homeControlDiv, map);
		map.controls[google.maps.ControlPosition.TOP_LEFT].push(homeControlDiv);
	}
	var inputControlDiv = document.createElement('div');
	var inputControl = new inputButton(inputControlDiv, map);
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(inputControlDiv);
	var nameControlDiv = document.createElement('div');
	var nameControl = new nameText(nameControlDiv, map);
	map.controls[google.maps.ControlPosition.LEFT_TOP].push(nameControlDiv);
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
	if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('iPod') != -1 || useragent.indexOf('Android') != -1 ) {
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

function getPosition(map) {
	if(navigator.geolocation) {
		browserSupportFlag = true;
		navigator.geolocation.getCurrentPosition(function(position) {
			map.setCenter(new google.maps.LatLng(position.coords.latitude,position.coords.longitude));
		});
  // Try Google Gears Geolocation
	} else if (google.gears) {
		browserSupportFlag = true;
		var geo = google.gears.factory.create('beta.geolocation');
		geo.getCurrentPosition(function(position) {
			map.setCenter(new google.maps.LatLng(position.coords.latitude,position.coords.longitude));
		});
  // Browser doesn't support Geolocation
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
			controlText.innerHTML = '<strong>小窗</strong>';
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
	var icon = curMarker.getIcon();
	if(icon=="blue_C.png") {
		curMarker.setIcon("red_C.png");
	} else if(icon=="blue_Y.png") {
		curMarker.setIcon("red_Y.png");
	} else if(icon=="blue_Q.png") {
		curMarker.setIcon("red_Q.png");
	}
}

function deleteMarker() {
	curMarker.setMap(null);
}

function addTransMarker() {
	infowindow.setContent("<form name='transMaker'><p>名称:<input type='text' name='name'></p><p>类型:<input type='radio' checked='checked' name='line' value='land'/>陆运 <input type='radio' name='line' value='sea'/>海运 <input type='radio' name='line' value='air'/>空运</p><p>运力描述:<input type='text' name='transPower'></p><p>联系方式:<input type='text' name='contact'></p></form><button onclick='drawTransMarker()'>确定</button>");
	infowindow.open(map);
}

function addStorageMarker() {
	infowindow.setContent("<form name='storageMaker'><p>名称:<input type='text' name='name'></p><p>仓储面积:<input type='text' name='storageArea'></p><p>装卸描述:<input type='text' name='loadDiscription'></p><p>联系方式:<input type='text' name='contact'></p></form><button onclick='drawStorageMarker()'>确定</button>");
	infowindow.open(map);
}

function addOtherMarker() {
	infowindow.setContent("<form name='otherMaker'><p>名称:<input type='text' name='name'></p><p>服务简介:<input type='text' name='servDiscription'></p><p>联系方式:<input type='text' name='contact'></p></form><button onclick='drawOtherMarker()'>确定</button>");
	infowindow.open(map);
}

function drawOtherMarker() {
	var name = document.otherMaker.name.value;
	if(name=="") {
		alert("请输入名称");
		document.otherMaker.name.focus();
		return false;
	}
	var servDisc = document.otherMaker.servDiscription.value;
	if(servDisc=="") {
		alert("请输入服务简介");
		document.otherMaker.servDiscription.focus();
		return false;
	}
	var contact = document.otherMaker.contact.value;
	if(contact=="") {
		alert("请输入联系方式");
		document.otherMaker.contact.focus();
		return false;
	}
	var ckName = "其他点<br/>";
	ckName+="<br/>名称：";
	ckName+=name;
	ckName+="<br/>服务简介：";
	ckName+=servDisc;
	ckName+="<br/>联系方式：";
	ckName+=contact;
	addEMarker(ckName,"blue_Q.png");
}

function drawStorageMarker() {
	var name = document.storageMaker.name.value;
	if(name=="") {
		alert("请输入名称");
		document.storageMaker.name.focus();
		return false;
	}
	var area = document.storageMaker.storageArea.value;
	if(area=="") {
		alert("请输入仓储面积");
		document.storageMaker.storageArea.focus();
		return false;
	}
	var disc = document.storageMaker.loadDiscription.value;
	if(disc=="") {
		alert("请输入装卸描述");
		document.storageMaker.loadDiscription.focus();
		return false;
	}
	var contact = document.storageMaker.contact.value;
	if(contact=="") {
		alert("请输入联系方式");
		document.storageMaker.contact.focus();
		return false;
	}
	var ckName = "仓储点<br/>";
	ckName+="<br/>名称：";
	ckName+=name;
	ckName+="<br/>仓储面积：";
	ckName+=area;
	ckName+="<br/>装卸描述：";
	ckName+=disc;
	ckName+="<br/>联系方式：";
	ckName+=contact;
	addEMarker(ckName, "blue_C.png");
}

function drawTransMarker() {
	var name = document.transMaker.name.value;
	if(name=="") {
		alert("请输入名称");
		document.transMaker.name.focus();
		return false;
	}
	var transPower = document.transMaker.transPower.value;
	if(transPower=="") {
		alert("请输入运力描述");
		document.transMaker.transPower.focus();
		return false;
	}
	var contact = document.transMaker.contact.value;
	if(contact=="") {
		alert("请输入联系方式");
		document.transMaker.contact.focus();
		return false;
	}
	var lineType = document.transMaker.line;
	var i;
	for(i=0;i<lineType.length;i++){
		if(lineType[i].checked){
			break;        
		}
	}
	var ckName = "运输点<br/>";
	ckName+="<br/>名称：";
	ckName+=name;
	ckName+="<br/>运输类型：";
	if(i==0) {
		ckName+="陆运";
	} else if(i==1) {
		ckName+="海运";
	} else if(i==2) {
		ckName+="空运";
	}
	ckName+="<br/>运力描述：";
	ckName+=transPower;
	ckName+="<br/>联系方式：";
	ckName+=contact;
	addEMarker(ckName, "blue_Y.png");
}

function addEMarker(ckName, iconPath) {
	var location = infowindow.getPosition();
	infowindow.setContent(ckName+"<p><button onclick='verifyMarker()'>认证</button> <button onclick='deleteMarker()'>删除</button></p>");
	//infowindow.setPosition(location);
  var marker = new google.maps.Marker({
    position: location,
	icon: iconPath,
    map: map
  });
  curMarker = marker;
  marker.setMap(map);
  infowindow.open(map,marker);
  //markersArray.push(marker);
	google.maps.event.addListener(marker, 'click', function() {
		curMarker = marker;
	  infowindow.setContent(ckName+"<p><button onclick='verifyMarker()'>认证</button> <button onclick='deleteMarker()'>删除</button></p>");
	  infowindow.open(map,marker);
	});
}

function addMarker(map, location) {
	//showPopMarkerType();
	//return;
	//var new google.maps.InfoWindow();
	infowindow.close();
	infowindow.setPosition(location);
	infowindow.setContent("请选择标注类型：<p><button onclick='addTransMarker()'>运 输</button> <button onclick='addStorageMarker()'>仓 储</button> <button onclick='addOtherMarker()'>其 他</button></p>");
	infowindow.open(map);
	return;
}

// Define a property to hold the state.
inputButton.prototype.state_ = 0;
inputButton.prototype.listener_;
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
  controlText.innerHTML = '<strong>标记<br />仓库</strong>';
  controlUI.appendChild(controlText);

  var control = this;
  // Setup the click event listeners: simply set the map to Chicago.
  google.maps.event.addDomListener(controlUI, 'click', function() {
	if(control.getState() == 0) {
		controlText.innerHTML = '<strong>取消<br />标记</strong>';
		control.setState(1);
		var listener = google.maps.event.addListenerOnce(map, 'click', function(event) {
			addMarker(map, event.latLng);
			controlText.innerHTML = '<strong>标记<br />仓库</strong>';
			control.setState(0);
		});
		control.setListener(listener);
	} else {
		controlText.innerHTML = '<strong>标记<br />仓库</strong>';
		control.setState(0);
		google.maps.event.removeListener(control.getListener());
	}
  });
}

function homeButton(controlDiv, map) {
	
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
  controlUI.title = 'Click to return home page';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '13px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<strong><a href="phone.html">首页</a></strong>';
  controlUI.appendChild(controlText);
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
  controlText.innerHTML = '<strong>用户:</strong>游客 <a href="http://www.dragontrans.com/e/member/register/ChangeRegister.php">注册</a> <a href="http://www.dragontrans.com/e/member/register/ChangeRegister.php">登陆</a>';
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
pathInputButton.prototype.ploy_;
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

pathInputButton.prototype.getPoly = function() {
  return this.ploy_;
}

pathInputButton.prototype.setPoly = function(ploy) {
	this.ploy_ = ploy;
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
  controlText.innerHTML = '<strong>标注<br />路线</strong>';
  controlUI.appendChild(controlText);

  var control = this;
  // Setup the click event listeners: simply set the map to Chicago.
  google.maps.event.addDomListener(controlUI, 'click', function() {
	if(control.getState() == 0) {
		controlText.innerHTML = '<strong>完成<br />路线</strong>';
		control.setState(1);
		var polyOptions = {
			strokeColor: '#000000',
			strokeOpacity: 1.0,
			strokeWeight: 3
		}
		var poly = new google.maps.Polyline(polyOptions);
		control.setPoly(poly);
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
			controlText.innerHTML = '<strong>标路线</strong>';
			control.setState(0);
		});
		control.setListener(listener);
		*/
	} else {
		controlText.innerHTML = '<strong>标注<br />路线</strong>';
		control.setState(0);
		google.maps.event.removeListener(control.getListener());
		var ckName = prompt("请输入：线路名称，运价，耗时","中关村-北京站,3000,220");
		var ckPiece = ckName.split(",");
		var name = ckPiece[0];
		var price = ckPiece[1];
		var time = ckPiece[2];
		if(name==null||price==null||price==""||time==null||time=="") {
			alert("输入格式有误。");
			return;
		}
		infoW = new google.maps.InfoWindow();
		infoW.setContent("<p><b>路线名：</b>"+name+"</p><p><b>运价：</b>"+price+"</p><p><b>耗时：</b>"+time+"</p><p><button onclick='deletePath()'>删除</button></p>");
		var poly = control.getPoly();
		infoW.setPosition(poly.getPath().getAt(0));
		infoW.open(map);
		google.maps.event.addListener(poly, 'click', function(event) {
			curPath = poly;
			infoW.setPosition(event.latLng);
			infoW.open(map);
		});
	}
  });
}

function deletePath() {
	curPath.setMap(null);
	infoW.close();
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
  controlUI.title = '点击可输入字符串格式的路线';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '13px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<strong>路线<br />输入</strong>';
  controlUI.appendChild(controlText);

  var control = this;
  // Setup the click event listeners: simply set the map to Chicago.
  google.maps.event.addDomListener(controlUI, 'click', function() {
	var ckName = prompt("路线格式为：路线名|纬度,精度;...纬度,精度|运价|时间","中关村-北京站|39.98386,116.31659;39.98540,116.31646;39.98678,116.35354;39.90719,116.35655;39.90835,116.42710;39.90496,116.42723|3000|220");
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
		alert("输入错误：路线点至少两个以上。");
		return;
	}
	var polyOptions = {
		strokeColor: '#000000',
		strokeOpacity: 1.0,
		strokeWeight: 3
	}
	var poly = new google.maps.Polyline(polyOptions);
	poly.setMap(map);
	var pt;
	for(var i=0;i<points.length;++i) {
		var latLon = points[i].split(",");
		var lat = latLon[0];
		var lon = latLon[1];
		pt = new google.maps.LatLng(lat,lon,false);
		var path = poly.getPath();
		path.push(pt);
	}
	curPath = poly;
	infoW = new google.maps.InfoWindow();
	infoW.setContent("<p><b>路线名：</b>"+name+"</p><p><b>运价：</b>"+price+"</p><p><b>耗时：</b>"+time+"</p><p><button onclick='deletePath()'>删除</button></p>");
	infoW.setPosition(pt);
	infoW.open(map);
	google.maps.event.addListener(poly, 'click', function(event) {
		curPath = poly;
		infoW.setPosition(event.latLng);
		infoW.open(map);
	});
  });
}
