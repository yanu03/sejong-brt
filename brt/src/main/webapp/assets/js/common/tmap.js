//티맵용 전역변수
var map, marker;
var markers = [];

/**티맵 시작**/
function initTmap(width, height){
	map = new Tmapv2.Map("mapView0",  
	{
		center: new Tmapv2.LatLng(36.502212, 127.256300), // 지도 초기 좌표
		width: width, 
		height: height,
		zoom: 15
	});
	return map;
} 


/**마커삭제**/
function removeMarkers() {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers = [];
}

/**마커그리기**/
function map_marker(lat, lng){
	removeMarkers();
	
	marker = new Tmapv2.Marker({
		position: new Tmapv2.LatLng(lat, lng), //Marker의 중심좌표 설정.
		map: map //Marker가 표시될 Map 설정..
	});
	map.setCenter(new Tmapv2.LatLng(lat,lng));
	markers.push(marker);
}