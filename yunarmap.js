document.write("<scri"+"pt type='text/javascript' src='http://maps.googleapis.com/maps/api/js?key=AIzaSyDESpX0WV4KVfHtiq8aBCtXzPTmrAhuZ4E&sensor=true'></scr"+"ipt>"); 

function detectBrowser(mapdiv) {
	var useragent = navigator.userAgent;

	if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
		mapdiv.style.width = '100%';
		mapdiv.style.height = '100%';
	} else {
		mapdiv.style.width = '640px';
		mapdiv.style.height = '480px';
	}
}
function initialize() {
	var mapdiv = document.getElementById("yunar_map");
	detectBrowser(mapdiv);
	var mapOptions = {
		center: new google.maps.LatLng(39.92, 116.46),
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(mapdiv, mapOptions);
}