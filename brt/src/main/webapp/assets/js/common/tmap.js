//티맵용 전역변수
var map, marker, polyline;
var markers = [];
var markers_user = [];

/**티맵 시작**/
function initTmap(width, height, drawMarker){
	map = new Tmapv2.Map("mapView0",  
	{
		center: new Tmapv2.LatLng(36.502212, 127.256300), // 지도 초기 좌표
		width: width, 
		height: height,
		zoom: 15
	});
	if(drawMarker == true){
		map.addListener("click", onClick);
	}
	return map;
} 


/**마커삭제**/
function removeMarkers() {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers = [];
}

/**유저마커삭제**/
function removeMarkers_user() {
	for (var i = 0; i < markers_user.length; i++) {
		markers_user[i].setMap(null);
	}
	markers_user = [];
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

/**선그리기**/
function draw_line(lat_arr, lng_arr){
	var path = [];
	for(var i=0; i < lat_arr.length; i++){
		path.push(new Tmapv2.LatLng(lat_arr[i], lng_arr[i]));
	}
	
	polyline = new Tmapv2.Polyline({
		path: path,
		strokeColor: "#dd00dd", // 라인 색상
		strokeWeight: 3, // 라인 두게
		map: map // 지도 객체
	});
}

/**선그리기**/
function draw_line2(lat_arr, lng_arr, seq_arr){
	console.log(lat_arr);
	console.log(lng_arr);
	console.log(seq_arr);
	var path = [];
	for(var i=0; i < lat_arr.length; i++){
		if(seq_arr[i] != 0){			
			path.push(new Tmapv2.LatLng(lat_arr[i], lng_arr[i]));
		}
	}
	
	polyline = new Tmapv2.Polyline({
		path: path,
		strokeColor: "#dd00dd", // 라인 색상
		strokeWeight: 3, // 라인 두게
		map: map // 지도 객체
	});
}

/**선삭제**/
function delete_line(){
	polyline = new Tmapv2.Polyline();
	polyline.setMap();
}

/**마커여러개추가**/
function addMarkers(lat_arr, lng_arr, id_arr) {
	for(var i=0; i < lat_arr.length; i++){
        marker = new Tmapv2.Marker({
            position: new Tmapv2.LatLng(lat_arr[i], lng_arr[i]), //Marker의 중심좌표 설정.
            label: id_arr[i]//, //Marker의 라벨.
        	//icon:"http://tmapapi.sktelecom.com//resources/images/common/pin_car.png"
        });
        marker.setMap(map); //Marker가 표시될 Map 설정.
        markers.push(marker);
	}
}

/**지도위 팝업 생성**/
function popUp(lat, lng, msg){
	var content =
		"<span style='font-weight:bold;'>" + msg + "</span>" + 
		"<span style='font-size: 12px; margin-left:2px; margin-bottom:2px; display:block;'>"+ lat + "," + lng +"</span>";

	infoWindow = new Tmapv2.InfoWindow({
		position: new Tmapv2.LatLng(lat, lng), //Popup 이 표출될 맵 좌표
		content: content, //Popup 표시될 text
		type: 2, //Popup의 type 설정.
		map: map //Popup이 표시될 맵 객체
	});
}

/**onclick 이벤트시 마커 추가**/
function onClick(e){
	// 클릭한 위치에 새로 마커를 찍기 위해 이전에 있던 마커들을 제거
	removeMarkers_user();
	
	lonlat = e.latLng;
	//Marker 객체 생성.
	marker = new Tmapv2.Marker({
		position: new Tmapv2.LatLng(lonlat.lat(),lonlat.lng()), //Marker의 중심좌표 설정.
		map: map //Marker가 표시될 Map 설정.
	});
	markers_user.push(marker);
	insertGeo(lonlat.lat(), lonlat.lng());
}

/**좌표받아 인서트(임시)**/
function insertGeo(lat, lng){
        var formData = {y : lat, x : lng};
        
        console.log(formData);
        
        axboot.promise()
            .then(function (ok, fail, data) {
            	axboot.ajax({
                	type: "POST",
                    url: "/api/v1/BM0999M0I0",
                    data: JSON.stringify(formData),
                    callback: function (res) {
                        ok(res);
                    }
                });
            })
            .then(function (ok, fail, data) {
        		axToast.push(LANG("onupdate"));
        		ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            })
            .catch(function () {
            });
}