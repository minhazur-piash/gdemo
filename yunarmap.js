document.write("<scri"+"pt type='text/javascript' src='http://maps.googleapis.com/maps/api/js?key=AIzaSyDESpX0WV4KVfHtiq8aBCtXzPTmrAhuZ4E&sensor=true'></scr"+"ipt>"); 

function detectBrowser() {
	var useragent = navigator.userAgent;
	var mapdiv = document.getElementById("yunar_map");

	if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
		mapdiv.style.width = '100%';
		mapdiv.style.height = '100%';
	} else {
		mapdiv.style.width = '640px';
		mapdiv.style.height = '480px';
	}
}
function initialize() {
	detectBrowser();
	var mapOptions = {
		center: new google.maps.LatLng(39.92, 116.46),
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("yunar_map"), mapOptions);
}