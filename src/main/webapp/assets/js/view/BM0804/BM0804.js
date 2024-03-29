var fnObj = {}, CODE = {};

/***************************************** 전역 변수 초기화 ******************************************************/
isUpdate = false;
isNewData = false;
selectedRow = null;
selectedRow0 = null;
var routeData = null;
var addSeq = 0;
var stnSeq = 1;
var maxNodeCnt = 800;
var stopAdd;
var nodeAdd;
/*************************************************************************************************************/

/***************************************** 이벤트 처리 코드 ******************************************************/
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
    	// 새로운 레코드 추가할 시 검색어 삭제
    	if(isNewData == true){
			if(!confirm("편집 후 저장하지 않은 데이터가 유실됩니다. 계속 진행하시겠습니까?")){
				return false;
			}else{
				isNewData = false;
			}
    	}    	
    	
    	var dataFlag = typeof data !== "undefined";
    	var filter = $.extend({}, caller.searchView0.getData());
        axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0804G0S0",
            data: filter,
            callback: function (res) {
            	caller.gridView0.setData(res);
                if(res.list.length == 0) {
                } else {
                	if(dataFlag) {
	                	caller.gridView0.selectIdRow(data);
	                } else {
		                if(selectedRow != null) {
		                	caller.gridView0.selectRow(selectedRow.__index);
		                } else {
		                	caller.gridView0.selectFirstRow();
		                }
	                }
                }
            }
        });

        return false;
    },
    PAGE_EXCEL: function(caller, act, data) {
    	caller.gridView1.target.exportExcel(selectedRow0.routId + "_" + new Date().yyyymmdd() + ".xls");
    },
  
    PAGE_DELETE: function(caller, act, data) {
    	var grid = caller.gridView0.target;
    	
    	if(typeof grid.selectedDataIndexs[0] === "undefined") {
    		axDialog.alert(LANG("ax.script.alert.requireselect"));
    		return false;
    	}
    	
    	axDialog.confirm({
            msg: LANG("ax.script.deleteconfirm")
        }, function() {
            if (this.key == "ok") {
            	axboot.promise()
                .then(function (ok, fail, data) {
	            	axboot.ajax({
	                    type: "POST",
	                    url: "/api/v1/BM0804G0D0",
	                    data: JSON.stringify(grid.list[grid.selectedDataIndexs[0]]),
	                    callback: function (res) {
	                        ok(res);
	                    }
	                });
                })
                .then(function (ok) {
                	axToast.push(LANG("ondelete"));
                    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                })
                .catch(function () {

                });
            }
        });
    },
    
    // 탭닫기
    PAGE_CLOSE: function(caller, act, data) {
    	//원본
    	if(isNewData == true){
			if(confirm("편집 후 저장하지 않은 데이터가 유실됩니다. 계속 진행하시겠습니까?")){
				window.parent.fnObj.tabView.closeActiveTab();
			}
    	}else{
    		window.parent.fnObj.tabView.closeActiveTab();
    	}
    },
    
    ITEM_CLICK_G0: function (caller, act, data) {
    	//data.filter1 = $.extend({}, caller.searchView1.getData());
    	selectedRow0 = data;
    	
    	searchGrid1(caller, act, data);
    	removeMarkers();
    	deleteLine();
    	document.getElementById("toggleNode").checked = true;
    	document.getElementById("toggleStn").checked = true;
    },
    
    ITEM_CLICK_G1: function (caller, act, data) {
    	selectedRow = data;
        //mapMarker(data.lati, data.longi);
    	if(stopAdd == false && nodeAdd == false){
    		moveMap(data.lati, data.longi);    		
    	}
    },
 
    DRAW_ROUTE: function(caller, act, data) {
    	//drawRoute(routeData);
    	drawRoute(fnObj.gridView1.getData());
    },
    PAGE_NEW: function(caller, act, data){
    	//TODO: GRID0에 새로운로우 추가할거고
    	if(isNewData == true){
    		axDialog.alert("편집중인 노선을 삭제하거나, 저장해 주세요");
    		return false;
    	}
    	fnObj.gridView0.addRow({routId: "편집중인 노선"});
    	fnObj.gridView0.selectLastRow();
    	fnObj.gridView0.target.focus("END");
    	isNewData = true;
    	initVal2();
    	addSeq = 1;
    },
    
    PAGE_SAVE: function(caller, act, data){
    	var nodeList = fnObj.gridView1.getData();
    	
        axboot.promise()
            .then(function (ok, fail, data) {
                axboot.ajax({
                    type: "POST",
                    url: "/api/v1/BM0804G1I0",
                    data: JSON.stringify(nodeList),
                    callback: function (res) {
                        ok(res);
                    }
                });
            })
            .then(function (ok, fail, data) {
        		axToast.push(LANG("onsave"));
        		ACTIONS.dispatch(ACTIONS.PAGE_SEARCH, data.message);
                isUpdate = true;
                isNewData = false;
            })
            .catch(function () {

            });
    },
    
    ADD_STOP: function(caller, act, data){
    	axboot.modal.open({
            modalType: "BM0109",
            param: "",
            callback: function (data) {
            	// 운수사, 거래처 등을 선택한 후 이벤트 ex) input에 값을 넣어 주는 등의 로직을 작성하면됨
            	console.log(data);
            	addStopSelected(data);
        		moveMap(data.lati, data.longi);
                this.close();
            }
        });
    },
    
});

/********************************************************************************************************************/

/******************************************* 페이지 처음 로딩시 호출 ******************************************************/
fnObj.pageStart = function () {
	var _this = this;
	btnClick();
	chked();
    this.pageButtonView.initView();
    this.searchView0.initView();
    this.searchView1.initView();
    this.gridView0.initView();
    this.gridView1.initView();
    initTmap({width:"100%"
    		, height:"100%"
    		, onClick: onClickMap	
    		});
    setInitVal();
    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
    calcDistance();
    onClickBtn()
};

fnObj.pageResize = function () {

};
/********************************************************************************************************************/


/******************************************** 공통 버튼 클릭 이벤트 ******************************************************/
fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "search": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            },
            "new": function(){
            	ACTIONS.dispatch(ACTIONS.PAGE_NEW);
            },
            "excel": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_EXCEL);
            },
            "delete": function() {
            	ACTIONS.dispatch(ACTIONS.PAGE_DELETE);
            },
            "close": function() {
            	ACTIONS.dispatch(ACTIONS.PAGE_CLOSE);
            },
            "save": function(){
            	ACTIONS.dispatch(ACTIONS.PAGE_SAVE);
            }
            
        });
    }
});

/********************************************************************************************************************/

//== view 시작
/**
 * searchView0
 */
fnObj.searchView0 = axboot.viewExtend(axboot.searchView, {
    initView: function () {
        this.target = $(document["searchView0"]);
        this.target.attr("onsubmit", "return ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);");
        this.filter = $("#filter");
    },
    getData: function () {
        return {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            filter: this.filter.val()
        }
    }
});

/**
 * searchView1
 */
fnObj.searchView1 = axboot.viewExtend(axboot.searchView, {
    initView: function () {
        this.target = $(document["searchView1"]);
        this.target.attr("onsubmit", "return ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);");
        this.filter = $("#filter");
    },
    getData: function () {
        return {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            filter: this.filter.val()
        }
    }
});


/**
 * gridView0
 */
fnObj.gridView0 = axboot.viewExtend(axboot.gridView, {
    page: {
        pageNumber: 0,
        pageSize: 10
    },
    
    initView: function () {
        var _this = this;
        
        this.target = axboot.gridBuilder({
        	frozenColumnIndex: 0,
            sortable: true,
            lineNumberColumnWidth:40,
            target: $('[data-ax5grid="gridView0"]'),
            columns: [
                {key: "routId",		label: ADMIN("ax.admin.BM0107G0.routId"),		width: 100,	align: "center"},
                {key: "updatedAt",	label: ADMIN("ax.admin.BM0107G0.updatedAt"),	width: 150,	align: "center"},
            ],
            body: {
                onClick: function () {
                	
                	if(isNewData == true){
            			if(confirm("편집 후 저장하지 않은 데이터가 유실됩니다. 계속 진행하시겠습니까?")){
            				fnObj.gridView0.delRow("last");
            				
            				if(stopAdd) {
            					stopAdd = false;
            					$("#mapView0").removeClass("cursor-crosshair");
            					$('#stopAdd').html('<button class="btn btn-info" data-grid-control="stop-add"><i class="cqc-plus"></i>정류장추가</button>');
            				}
            				
            				if(nodeAdd) {
            					nodeAdd = false;
            					$("#mapView0").removeClass("cursor-crosshair");
            					$('#nodeAdd').html('<button class="btn btn-info" data-grid-control="node-add"><i class="cqc-plus"></i>경로추가</button>');
            				}
            				
            				isNewData = false;
            			}else{
            				return false;
            			}
            		}
                    this.self.select(this.dindex);
                    ACTIONS.dispatch(ACTIONS.ITEM_CLICK_G0, this.item);
                }
            },
        });
    },
    getData: function (_type) {
        var list = [];
        var _list = this.target.getList(_type);

        if (_type == "modified" || _type == "deleted") {
            list = ax5.util.filter(_list, function () {
                delete this.deleted;
                return this.key;
            });
        } else {
            list = _list;
        }
        return list;
    },
    addRow: function (data) {
    	if(typeof data === "undefined") {
    		this.target.addRow({__created__: true}, "last");
    	} else {
    		data["__created__"] = true;
            this.target.addRow(data, "last");
    	}
    },
    selectFirstRow: function() {
    	if(this.target.list.length != 0) {
    		this.selectRow(0);
    	} else {
    	}
    },
    selectLastRow: function() {
    	if(this.target.list.length != 0) {
    		this.selectRow(this.target.list.length - 1);
    	} else {
    	}
    },
    selectRow: function(index) {
    	var data = this.target.list[index];
    	
    	if(typeof data === "undefined") {
    		this.selectLastRow();
    	} else {
    		
    		
    		this.target.select(index);
        	ACTIONS.dispatch(ACTIONS.ITEM_CLICK_G0, data);
    	}
    },
    selectIdRow: function(id) {
    	var i;
    	var length = this.target.list.length;
    	for(i = 0; i < length; i++) {
    		if(this.target.list[i].routId == id) {
    			this.selectRow(i);
    			break;
    		}
    	}
    	
    	if(i == length) {
    	}
    },
    selectAll: function(flag) {
    	this.target.selectAll({selected: flag});
    }
});

function editSeq(){
	return {
		type: "money",
		disabled: function(){
			ACTIONS.dispatch(ACTIONS.DRAW_ROUTE);
		},
		attributes:{
			"maxlength" : 11
		}
			
	}
}

function editSeq(){
	return {
		type: "money",
		disabled: function(){
			ACTIONS.dispatch(ACTIONS.DRAW_ROUTE);
			return this.item.nodeTypeNm != '정류장';
		},
		attributes:{
			"maxlength" : 11
		}
			
	}
}

function editName(){
	return {
		type: "text",
		disabled: function(){
			ACTIONS.dispatch(ACTIONS.DRAW_ROUTE);
			return this.item.nodeId != null;
		},
		attributes:{
			"maxlength" : 20
		}
	}
};

/**
 * gridView1
 */
fnObj.gridView1 = axboot.viewExtend(axboot.gridView, {
    page: {
        pageNumber: 0,
        pageSize: 10
    },
    
    initView: function () {
        var _this = this;
        
        this.target = axboot.gridBuilder({
        	frozenColumnIndex: 0,
        	lineNumberColumnWidth:40,
            //sortable: true,
            //showRowSelector: true,
            target: $('[data-ax5grid="gridView1"]'),
            columns: [
                {key: "routId", 	label: ADMIN("ax.admin.BM0107G1.routId"),		width: 80,	align: "center"},
                {key: "seq",		label: ADMIN("ax.admin.BM0107G1.seq"),			width: 60,	editor: editSeq(),	align: "right"},
                {key: "nodeTypeNm",	label: ADMIN("ax.admin.BM0107G1.nodeType"),		width: 50,	align: "center"},
                {key: "nodeId", 	label: ADMIN("ax.admin.BM0107G1.nodeId"),		width: 80,	align: "center"},
                {key: "staNo", 		label: "정류장번호",								width: 80,	align: "center", editor: editName()},
                {key: "nodeNm", 	label: ADMIN("ax.admin.BM0107G1.nodeNm"),		width: 120, editor: editName()},
                {key: "krNm", 		label: "국문표출명",								width: 120, editor: editName()},
                {key: "enNm", 		label: "영문표출명",								width: 120, editor: editName()},
                {key: "lati",		label: ADMIN("ax.admin.BM0107G1.lati"),			width: 120},
                {key: "longi",		label: ADMIN("ax.admin.BM0107G1.longi"),		width: 120},
                {key: "updatedAt",	label: ADMIN("ax.admin.BM0107G1.updatedAt"),	width: 120},
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                    ACTIONS.dispatch(ACTIONS.ITEM_CLICK_G1, this.item);
                    drawRoute(fnObj.gridView1.getData(), this.dindex);
                }
            },
        });
    },
    getData: function (_type) {
        var list = [];
        var _list = this.target.getList(_type);

        if (_type == "modified" || _type == "deleted") {
            list = ax5.util.filter(_list, function () {
                delete this.deleted;
                return this.key;
            });
        } else {
            list = _list;
        }
        return list;
    },
    addRow: function (data) {
    	if(typeof data === "undefined") {
    		this.target.addRow({__created__: true}, "last");
    	} else {
    		data["__created__"] = true;
            this.target.addRow(data, "last");
    	}
    },
    selectFirstRow: function() {
    	if(this.target.list.length != 0) {
    		this.selectRow(0);
    	} else {
    	}
    },
    selectLastRow: function() {
    	if(this.target.list.length != 0) {
    		this.selectRow(this.target.list.length - 1);
    	} else {
    	}
    },
    selectRow: function(index) {
    	var data = this.target.list[index];
    	
    	if(typeof data === "undefined") {
    		this.selectLastRow();
    	} else {
    		this.target.select(index);
        	ACTIONS.dispatch(ACTIONS.ITEM_CLICK_G1, data);
    	}
    },
    selectIdRow: function(id) {
    	var i;
    	var length = this.target.list.length;
    	for(i = 0; i < length; i++) {
    		if(this.target.list[i].staId == id) {
    			this.selectRow(i);
    			break;
    		}
    	}
    	
    	if(i == length) {
    	}
    },
    selectAll: function(flag) {
    	this.target.selectAll({selected: flag});
    }
});

var numEditor = {
		type: "money",
		disabled: function(){
			var duration = calcDuration();
			var distance = calcDistance();
			console.log(duration + " , " + distance);
			footSumConfig(distance, duration);
		}
}


/*****************************************/
function searchGrid1(caller, act, data){
	var dataFlag = typeof data !== "undefined";
	data.filter1 = $('#filter1').val();
	axboot.ajax({
        type: "GET",
        url: "/api/v1/BM0804G1S0",
        data: data,
        callback: function (res) {
        	caller.gridView1.setData(res);
        	removeAllPopUp();
        	/**추가한거**/
            if(res.list != null && res.list.length != 0) {
            	routeData = res.list.slice();
            	caller.gridView1.selectRow(0);
            	calcResult();
            } else {
            	routeData = [];
            }
            ACTIONS.dispatch(ACTIONS.DRAW_ROUTE);
            /**추가한거끝**/	
        }
    });
}

/*****************************************/
//맵 클릭 이벤트
function onClickMap(e) {
	$("input:checkbox[id='toggleStn']").prop("checked", true);
	$("input:checkbox[id='toggleNode']").prop("checked", true);
	var routNm = selectedRow0.routNm;
	
	
	if(stopAdd && !nodeAdd) {
		if(fnObj.gridView1.getData().length >= maxNodeCnt){
			axDialog.alert("더이상 추가할 수 없습니다.");
			return false;
		}
		
		var lonlat = e.latLng;
		var min = 10000000;
		var minIndex = null;

		for(var i = 0; i < routeData.length - 1; i++) {
			var result = getDistanceToLine(
				lonlat.lat(),
				lonlat.lng(),
				routeData[i].lati,
				routeData[i].longi,
				routeData[i + 1].lati,
				routeData[i + 1].longi
			)
			
			if(result.distance) {
				if(min > result.distance) {
					min = result.distance;
					minIndex = i;
				}
			}
		}
		
		if(minIndex == null) {
			axDialog.alert("선택할 수 없는 좌표입니다. 경로를 먼저 입력하세요");
		} else {
			var seq = 0;
			seq = routeData[minIndex].seq + (routeData[minIndex + 1].seq - routeData[minIndex].seq) / 2;				
			var insertIndex = minIndex + 1;
			
			routeData.splice(insertIndex, 0, {
				routId: selectedRow0.routId,
				lati: lonlat.lat(),
				longi: lonlat.lng(),
				seq: seq,
				nodeNm: "정류장" + stnSeq,
				nodeType: '1',
				nodeTypeNm : '정류장',
				icon: '',
			});

			routeData.sort(function (a,b){ return a.seq - b.seq });
			stnSeq++;
			
			fnObj.gridView1.setData(routeData);
			ACTIONS.dispatch(ACTIONS.DRAW_ROUTE);
			
		}
	}else if(!stopAdd && nodeAdd){
		if(fnObj.gridView1.getData().length >= maxNodeCnt){
			axDialog.alert("더이상 추가할 수 없습니다.");
			return false;
		}
		
		
		var lonlat = e.latLng;
		
		var idx;
		if(selectedRow.__index != undefined){
			idx = selectedRow.__index;
		}else{
			idx = 0;
		}
		
		var row1 = fnObj.gridView1.getData()[idx];
		var row2 = fnObj.gridView1.getData()[idx+1];

		if(row1 == undefined){
			seq = 100;
		}else{
			if(row2 != undefined){
				seq = (row1.seq + row2.seq) / 2;
			}else{
				seq = row1.seq + 100;
			}
		}
		
		var data = {
				routId: selectedRow0.routId,
				lati: lonlat.lat(),
				longi: lonlat.lng(),
				seq: seq,
				nodeNm: selectedRow0.routId + "_작업노드" + seq,
				nodeType: '30', 
				nodeTypeNm: '지점',
				icon: '',};
		
		routeData.splice(insertIndex, 0, data);
		
		routeData.sort(function (a,b){ return a.seq - b.seq });
		addSeq++;
		fnObj.gridView1.setData(routeData);
		fnObj.gridView1.selectRow(idx+1);
		ACTIONS.dispatch(ACTIONS.DRAW_ROUTE);
	}
	
}


function returnInsertRouteInfo(lat, lon) {
	var min = 10000000;
	var minIndex = null;
	
	for(var i = 0; i < routeData.length - 1; i++) {
		var result = getDistanceToLine(
			lat,
			lon,
			routeData[i].lati,
			routeData[i].longi,
			routeData[i + 1].lati,
			routeData[i + 1].longi
		)
		
		if(result.distance) {
			if(min > result.distance) {
				min = result.distance;
				minIndex = i;
			}
		}
	}
	
	if(minIndex == null) {
		return false;
	} else {
		var seq = routeData[minIndex].seq + (routeData[minIndex + 1].seq - routeData[minIndex].seq) / 2;
		var insertIndex = minIndex + 1;
		
		return {
			seq: seq,
			index: insertIndex
		};
	}
}

function calcResult(){
	var result = 0;
	var stopCnt = 0;
	if(routeData != undefined){
		for(var i = 0; i < routeData.length - 1; i++) {
			if(routeData[i].nodeType == '1'){
				stopCnt++;
			}
			if(routeData[i].seq == '0'){
				continue;
			}
			var tmp = getDistanceBetween(
					routeData[i].lati,
					routeData[i].longi,
					routeData[i + 1].lati,
					routeData[i + 1].longi
			)
			result += tmp;
		}
	}
	var stopTime = $('#stopTime').val() / 60;
	var avgSpeed = $('#avgSpeed').val();
	var distance = (result/1000).toFixed(3);
	var duration = (distance/avgSpeed * 60) + (stopCnt * stopTime);

	$('#distance').val(distance + "km");
	$('#duration').val("약 " + duration.toFixed(1) + "분");
}

function calcDistance(){
	var result = 0;
	var stopCnt = 0;
	if(routeData != undefined){
		for(var i = 0; i < routeData.length - 1; i++) {
			if(routeData[i].nodeType == '1'){
				stopCnt++;
			}
			if(routeData[i].seq == '0'){
				continue;
			}
			var tmp = getDistanceBetween(
					routeData[i].lati,
					routeData[i].longi,
					routeData[i + 1].lati,
					routeData[i + 1].longi
			)
			result += tmp;
		}
	}
	return distance = (result/1000).toFixed(3);
	
}


function setInitVal(){
	$('#stopTime').val('60');
	$('#avgSpeed').val('40');
}

function initVal2(){
	$('#distance').val('');
	$('#duration').val('');
}

function onClickBtn(){
	$('#refreshBtn').on('click', function(){
		calcResult();
	});
}

/**노선 그리기**/
function drawRoute(list, idx) {
	var path = [];
	
	removeMarkers();
	deleteLine();
	deleteCircle();
	deleteNode();
	
	if(list != null && list.length != 0) {
		for(var i = 0; i < list.length; i++) {
			path.push(new Tmapv2.LatLng(list[i].lati, list[i].longi));
			
			/**드래그이벤트**/
			list[i].click = function(e) {
				var point = e.marker.getPosition();
				var node = $.extend(true, {}, routeData[e.index]);
				routeData.splice(e.index, 1);
				var val = returnInsertRouteInfo(point.lat(), point.lng());
				
				if(e.index == 0 || e.index == routeData.length){
					val = true;
				}
				
				if(val) {
					var temp = {
						nodeId: e.nodeId,
						lati: point.lat(),
						longi: point.lng(),
						seq: val.seq
					};
					
					temp = $.extend(true, node, temp);
					
					
					routeData.splice(val.index, 0, temp);
					
					routeData.sort(function (a,b){ return a.seq - b.seq });
					fnObj.gridView1.setData(routeData);
					
					ACTIONS.dispatch(ACTIONS.DRAW_ROUTE);
				} else {
					axDialog.alert("선택할 수 없는 좌표입니다.");
					var tmpData = fnObj.gridView1.getData();
					tmpData.sort(function (a,b){return a.seq - b.seq});
					fnObj.gridView1.setData(tmpData);
					drawRoute(fnObj.gridView1.getData());
				}
			};
			
			list[i].index = i;
			/**드래그이벤트**/
			list[i].draggable = true;
			
			// 노드 타입이 버스 정류장 또는 음성편성 노드일 경우 마커 표시
			if(list[i].nodeType == busstopNodeType) {
				if(i == idx){
					list[i].icon = "/assets/images/tmap/busstop_selected.png";
				}else{
					list[i].icon = "/assets/images/tmap/busstop.png";
				}
				list[i].label = "<span style='background-color: white; color:black; padding: 3px; border: 0.5px solid black;'>" + list[i].nodeNm + "</span>";
			}
			// 아닐 경우(일반 노드) 네모 박스 표시
			else {
				if(i == idx){
					list[i].icon = "/assets/images/tmap/road_selected.png";
				}else{
					list[i].icon = "/assets/images/tmap/road_trans.png";
				}
				list[i].label = "<span style='background-color: white; color:black; padding: 3px; border: 0.5px solid black;'>" + list[i].nodeNm + "</span>";
				nodes.push(getDrawingNode(list[i].lati, list[i].longi));
			}
			
			addMarkerInter(list[i], fnObj.gridView1, i);
		}
		
		polyline = new Tmapv2.Polyline({
			path: path,
			strokeColor: "#FF005E",
			strokeWeight: 2,
			map: map,
			zIndex: -1
		}); 
	}
}

function btnClick(){
	stopAdd = false;
	nodeAdd = false;
	
	$('#stopAdd').on('click', function(){
		addStop();
	});
	$('#nodeAdd').on('click', function(){
		addNode();
	});
	
	//0315추가
	$('#stopAdd2').on('click', function(){
		ACTIONS.dispatch(ACTIONS.ADD_STOP);
	});
	
	$('#refresh').on('click', function(){
		var tmpData = fnObj.gridView1.getData();
		tmpData.sort(function (a,b){return a.seq - b.seq});
		fnObj.gridView1.setData(tmpData);
		drawRoute(fnObj.gridView1.getData());
	});
	
	$('#rowDel').on('click', function(){
		var idx = selectedRow.__index;
		fnObj.gridView1.delRow("selected");
		
		routeData = fnObj.gridView1.getData();
		routeData.sort(function (a,b){ return a.seq - b.seq });
		
		fnObj.gridView1.setData(routeData);
		drawRoute(routeData);
		fnObj.gridView1.selectRow(idx);
	});
	
	$('#gogo').on('click', function(){
		calcResult();
	});
}

var insertStn = "정류장추가";
var activeStn = "정류장종료";

var insertNode = "경로추가";
var activeNode = "경로종료";

function addStop(){
	if(stopAdd) {
		stopAdd = false;
		$("#mapView0").removeClass("cursor-crosshair");
		$('#stopAdd').html('<button class="btn btn-default" data-grid-control="stop-add" style="width: 100px;"><i class="cqc-plus"></i>'+ insertStn +'</button>');
	} else {
		stopAdd = true;
		isNewData = true;
		$("#mapView0").addClass("cursor-crosshair");
		$('#stopAdd').html('<button class="btn btn-info" data-grid-control="stop-add" style="width: 100px;"><i class="cqc-minus"></i>' + activeStn + '</button>');
	}
	
	if(nodeAdd) {
		nodeAdd = false;
		$("#mapView0").removeClass("cursor-crosshair");
		$('#nodeAdd').html('<button class="btn btn-default" data-grid-control="node-add" style="width: 100px;"><i class="cqc-plus"></i>' + insertNode + '</button>');
	}
}

function addNode(){
	if(nodeAdd) {
		nodeAdd = false;
		$("#mapView0").removeClass("cursor-crosshair");
		$('#nodeAdd').html('<button class="btn btn-default" data-grid-control="node-add" style="width: 100px;"><i class="cqc-plus"></i>' + insertNode + '</button>');
	} else {
		nodeAdd = true;
		isNewData = true;
		$("#mapView0").addClass("cursor-crosshair");
		$('#nodeAdd').html('<button class="btn btn-info" data-grid-control="node-add" style="width: 100px;"><i class="cqc-minus"></i>' + activeNode + '</button>');
	}
	
	if(stopAdd) {
		stopAdd = false;
		$("#mapView0").removeClass("cursor-crosshair");
		$('#stopAdd').html('<button class="btn btn-default" data-grid-control="stop-add" style="width: 100px;"><i class="cqc-plus"></i>' + insertStn + '</button>');
	}
}

function chked(){
	$('#toggleStn').on('change', function(){
		if($('#toggleStn').is(":checked")){
			if($('#toggleNode').is(":checked")){
				onOffMarker("11");
			}else{
				onOffMarker("10");
			}
		}else{
			if($('#toggleNode').is(":checked")){
				onOffMarker("01");
			}else{
				onOffMarker("00");
			}
		}
	});
	
	$('#toggleNode').on('change', function(){
		if($('#toggleStn').is(":checked")){
			if($('#toggleNode').is(":checked")){
				onOffMarker("11");
			}else{
				onOffMarker("10");
			}
		}else{
			if($('#toggleNode').is(":checked")){
				onOffMarker("01");
			}else{
				onOffMarker("00");
			}
		}
	});
}

function onOffMarker(input){
	var list = fnObj.gridView1.getData();
	switch(input){
	case "00" :
		removeMarkers();
		break;
		
	case "10" : //정류장만
		removeMarkers();
		for(var i=0; i<list.length; i++){
			if(list[i].nodeType == '1'){
				list[i].icon = "/assets/images/tmap/busstop.png";
				list[i].label = "<span style='background-color: white; color:black; padding: 3px; border: 0.5px solid black;'>" + list[i].nodeNm + "</span>";
				list[i].draggable = true;
				addMarkerInter(list[i], fnObj.gridView1, i);
			}
		}
		break;
		
	case "01" : //경로만
		removeMarkers();
		for(var i=0; i<list.length; i++){
			if(list[i].nodeType == '30'){
				list[i].icon = "/assets/images/tmap/road_trans.png";
				//list[i].label = "<span style='background-color: #46414E; color:white; padding: 3px;'>" + list[i].nodeNm + "</span>";
				list[i].label = "<span style='background-color: white; color:black; padding: 3px; border: 0.5px solid black;'>" + list[i].nodeNm + "</span>";
				list[i].draggable = true;
				addMarkerInter(list[i], fnObj.gridView1, i);
			}
		}
		break;
		
	case "11" : //다
		removeMarkers();
		for(var i=0; i<list.length; i++){
			if(list[i].nodeType=="30"){
				list[i].icon = "/assets/images/tmap/road_trans.png";
			}else{
				list[i].icon = "/assets/images/tmap/busstop.png";				
			}
			//list[i].label = "<span style='background-color: #46414E; color:white; padding: 3px;'>" + list[i].nodeNm + "</span>";
			list[i].label = "<span style='background-color: white; color:black; padding: 3px; border: 0.5px solid black;'>" + list[i].nodeNm + "</span>";
			list[i].draggable = true;
			addMarkerInter(list[i], fnObj.gridView1, i);
		}
		break;
	}
}

//0315 기존정류장 선택
function addStopSelected(data) {
	$("input:checkbox[id='toggleStn']").prop("checked", true);
	$("input:checkbox[id='toggleNode']").prop("checked", true);
	var routNm = selectedRow0.routNm;
	
	if(fnObj.gridView1.getData().length >= maxNodeCnt){
		axDialog.alert("더이상 추가할 수 없습니다.");
		return false;
	}
	
	
	var min = 10000000;
	var minIndex = null;

	for(var i = 0; i < routeData.length - 1; i++) {
		var result = getDistanceToLine(
			data.lati,
			data.longi,
			routeData[i].lati,
			routeData[i].longi,
			routeData[i + 1].lati,
			routeData[i + 1].longi
		)
		
		if(result.distance) {
			if(min > result.distance) {
				min = result.distance;
				minIndex = i;
			}
		}
	}
	
	if(minIndex == null) {
		axDialog.alert("선택할 수 없는 좌표입니다. 경로를 먼저 입력하세요");
	} else {
		isNewData = true;
		var seq = 0;
		seq = routeData[minIndex].seq + (routeData[minIndex + 1].seq - routeData[minIndex].seq) / 2;				
		var insertIndex = minIndex + 1;
		
		routeData.splice(insertIndex, 0, {
			routId: selectedRow0.routId,
			lati: data.lati,
			longi: data.longi,
			seq: seq,
			nodeNm: data.staNm,
			nodeType: '1',
			nodeId: data.staId,
			nodeTypeNm: '정류장',
			updatedAt: data.updatedAt,
			icon: '',
		});

		routeData.sort(function (a,b){ return a.seq - b.seq });
		stnSeq++;
		
		fnObj.gridView1.setData(routeData);
		ACTIONS.dispatch(ACTIONS.DRAW_ROUTE);
		
	}
	
}
//
