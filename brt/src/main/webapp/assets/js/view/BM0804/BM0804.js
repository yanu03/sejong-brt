var fnObj = {}, CODE = {};

/***************************************** 전역 변수 초기화 ******************************************************/
isUpdate = false;
isNewData = false;
selectedRow = null;
var routeData;
var addSeq;
var stnSeq;
/*************************************************************************************************************/

/***************************************** 이벤트 처리 코드 ******************************************************/
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
    	// 새로운 레코드 추가할 시 검색어 삭제
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
    	caller.gridView0.target.exportExcel("data.xls");
    },
  
    PAGE_DELETE: function(caller, act, data) {

    },
    
    // 탭닫기
    PAGE_CLOSE: function(caller, act, data) {
    	//원본
    	window.parent.fnObj.tabView.closeActiveTab();
    },
    
    ITEM_CLICK_G0: function (caller, act, data) {
    	//data.filter1 = $.extend({}, caller.searchView1.getData());
    	
    	searchGrid1(caller, act, data);
    	removeMarkers();
    	deleteLine();
    },
    
    ITEM_CLICK_G1: function (caller, act, data) {
    	selectedRow = data;
        //mapMarker(data.lati, data.longi);
    	moveMap(data.lati, data.longi);
    },
 
    DRAW_ROUTE: function(caller, act, data) {
    	//drawRoute(routeData);
    	drawRoute(fnObj.gridView1.getData());
    },
    PAGE_NEW: function(caller, act, data){
    	//TODO: GRID0에 새로운로우 추가할거고
    	if(isNewData == true){
    		alert("편집중인 노선을 삭제하거나, 저장해 주세요");
    		return false;
    	}
    	fnObj.gridView0.addRow({routId: "편집중인 노선"});
    	fnObj.gridView0.selectLastRow();
    	fnObj.gridView0.target.focus("END");
    	isNewData = true;
    	initVal2();
    	addSeq = 1;
    }
    
});

/********************************************************************************************************************/

/******************************************* 페이지 처음 로딩시 호출 ******************************************************/
fnObj.pageStart = function () {
	var _this = this;
	btnClick();
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
            	selectedRow = null;
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            },
            "delete": function() {
            	ACTIONS.dispatch(ACTIONS.PAGE_DELETE);
            },
            "close": function() {
            	ACTIONS.dispatch(ACTIONS.PAGE_CLOSE);
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
                {key: "routId", label: ADMIN("ax.admin.BM0107G0.routId"), width: 140},
                {key: "updatedAt", label: ADMIN("ax.admin.BM0107G0.updatedAt"), width: 250},
            ],
            body: {
                onClick: function () {
                	if(isNewData == true){
            			if(confirm("편집 후 저장하지 않은 데이터가 유실됩니다. 계속 진행하시겠습니까?")){
            				fnObj.gridView0.delRow("last");
            				
            				if(stopAdd) {
            					stopAdd = false;
            					$("#mapView0").removeClass("cursor-crosshair");
            					$('#stopAdd').html('<button class="btn btn-default" data-grid-control="stop-add"><i class="cqc-plus"></i>정류장추가</button>');
            				}
            				
            				if(nodeAdd) {
            					nodeAdd = false;
            					$("#mapView0").removeClass("cursor-crosshair");
            					$('#nodeAdd').html('<button class="btn btn-default" data-grid-control="node-add"><i class="cqc-plus"></i>경로추가</button>');
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
                {key: "routId", 	label: ADMIN("ax.admin.BM0107G1.routId"),		width: 80},
                {key: "seq",		label: ADMIN("ax.admin.BM0107G1.seq"),			width: 60,	editor: {type: "number"}
                },
                {key: "nodeType",	label: ADMIN("ax.admin.BM0107G1.nodeType"),		width: 30},
                {key: "nodeId", 	label: ADMIN("ax.admin.BM0107G1.nodeId"),		width: 120},
                {key: "nodeNm", 	label: ADMIN("ax.admin.BM0107G1.nodeNm"),		width: 120},
                {key: "lati",		label: ADMIN("ax.admin.BM0107G1.lati"),			width: 120},
                {key: "longi",		label: ADMIN("ax.admin.BM0107G1.longi"),		width: 120},
                {key: "updatedAt",	label: ADMIN("ax.admin.BM0107G1.updatedAt"),	width: 120},
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                    ACTIONS.dispatch(ACTIONS.ITEM_CLICK_G1, this.item);
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

/*****************************************/
function searchGrid1(caller, act, data){
	var dataFlag = typeof data !== "undefined";
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
	if(stopAdd && !nodeAdd) {
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
			var seq = routeData[minIndex].seq + (routeData[minIndex + 1].seq - routeData[minIndex].seq) / 2;
			var insertIndex = minIndex + 1;
			
			routeData.splice(insertIndex, 0, {
				lati: lonlat.lat(),
				longi: lonlat.lng(),
				seq: seq,
				nodeNm: "임시정류장" + stnSeq,
				nodeType: '1', 
				icon: '',
			});

			routeData.sort(function (a,b){ return a.seq - b.seq });
			stnSeq++;
			
			fnObj.gridView1.setData(routeData);
			ACTIONS.dispatch(ACTIONS.DRAW_ROUTE);
			
		}
	}else if(!stopAdd && nodeAdd){
		var lonlat = e.latLng;
		
		routeData.splice(insertIndex, 0, {
			lati: lonlat.lat(),
			longi: lonlat.lng(),
			seq: addSeq*100,
			nodeNm: "임시노드" + addSeq*100,
			nodeType: '30', 
			icon: '',
		});
		
		routeData.sort(function (a,b){ return a.seq - b.seq });
		addSeq++;
		fnObj.gridView1.setData(routeData);
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
		axDialog.alert("선택할 수 없는 좌표입니다.");
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

/**노선 그리기**/
function drawRoute(list) {
	var path = [];
	
	removeMarkers();
	deleteLine();
	deleteCircle();
	deleteNode();
	
	if(list != null && list.length != 0) {
		for(var i = 0; i < list.length; i++) {
			path.push(new Tmapv2.LatLng(list[i].lati, list[i].longi));
			
			// 노드 타입이 버스 정류장 또는 음성편성 노드일 경우 마커 표시
			if(list[i].nodeType == busstopNodeType) {
				list[i].label = "<span style='background-color: #46414E; color:white; padding: 3px;'>" + list[i].nodeNm + "</span>";
				
				if(list[i].nodeType == orgaNodeType) {
					list[i].click = function(e) {
						var point = e.marker.getPosition();
						var node = $.extend(true, {}, routeData[e.index]);
						
						routeData.splice(e.index, 1);
						
						var val = returnInsertRouteInfo(point.lat(), point.lng());
						
						if(val) {
							var temp = {
								orgaId: e.nodeId,
								lati: point.lat(),
								longi: point.lng(),
								seq: val.seq
							};
							
							temp = $.extend(true, node, temp);
							
							routeData.splice(val.index, 0, temp);
							
							ACTIONS.dispatch(ACTIONS.DRAW_ROUTE);
							ACTIONS.dispatch(ACTIONS.OPEN_BM0405, temp);
						} else {
							axDialog.alert("선택할 수 없는 좌표입니다.");
						}
					};
					list[i].index = i;
					list[i].icon = orgaIcon;
					list[i].draggable = true;
				}
				
				addMarker(list[i]);
			}
			// 아닐 경우(일반 노드) 네모 박스 표시
			else {
				nodes.push(getDrawingNode(list[i].lati, list[i].longi));
			}
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
}

function addStop(){
	if(stopAdd) {
		stopAdd = false;
		$("#mapView0").removeClass("cursor-crosshair");
		$('#stopAdd').html('<button class="btn btn-default" data-grid-control="stop-add"><i class="cqc-plus"></i>정류장추가</button>');
	} else {
		stopAdd = true;
		isNewData = true;
		$("#mapView0").addClass("cursor-crosshair");
		$('#stopAdd').html('<button class="btn btn-default" data-grid-control="stop-add"><i class="cqc-minus"></i>정류장추가 취소</button>');
	}
	
	if(nodeAdd) {
		nodeAdd = false;
		$("#mapView0").removeClass("cursor-crosshair");
		$('#nodeAdd').html('<button class="btn btn-default" data-grid-control="node-add"><i class="cqc-plus"></i>경로추가</button>');
	}
}

function addNode(){
	if(nodeAdd) {
		nodeAdd = false;
		$("#mapView0").removeClass("cursor-crosshair");
		$('#nodeAdd').html('<button class="btn btn-default" data-grid-control="node-add"><i class="cqc-plus"></i>경로추가</button>');
	} else {
		nodeAdd = true;
		isNewData = true;
		$("#mapView0").addClass("cursor-crosshair");
		$('#nodeAdd').html('<button class="btn btn-default" data-grid-control="node-add"><i class="cqc-minus"></i>경로추가 취소</button>');
	}
	
	if(stopAdd) {
		stopAdd = false;
		$("#mapView0").removeClass("cursor-crosshair");
		$('#stopAdd').html('<button class="btn btn-default" data-grid-control="stop-add"><i class="cqc-plus"></i>정류장추가</button>');
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
	console.log((result/1000).toFixed(3));
	var stopTime = $('#stopTime').val() / 60;
	var avgSpeed = $('#avgSpeed').val();
	var distance = (result/1000).toFixed(3);
	var duration = (distance/avgSpeed * 60) + (stopCnt * stopTime);
	$('#distance').val(distance + "km");
	$('#duration').val("약 " + duration.toFixed(1) + "분");
}

function setInitVal(){
	$('#stopTime').val('60');
	$('#avgSpeed').val('40');
}

function initVal2(){
	$('#distance').val('');
	$('#duration').val('');
}
