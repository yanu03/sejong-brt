
var fnObj = {}, CODE = {};

/***************************************** 전역 변수 초기화 ******************************************************/
var isAdd = false;
var selectedRow = null;
var selectedOrga = null;
var routeData;
var routeDataOriginal;
var orgaIcon = "http://tmapapi.sktelecom.com//resources/images/common/pin_car.png";
/*************************************************************************************************************/

/***************************************** 이벤트 처리 코드 ******************************************************/
var ACTIONS = axboot.actionExtend(fnObj, {
	PAGE_RESERVATION: function(caller, act, data) {
    	if(selectedRow == null) {
    		axDialog.alert(LANG("ax.script.alert.requireselect"));
    		return false;
    	}
    	
        axboot.ajax({
            type: "GET",
            url: "/api/v1/checkVoiceReservation",
            data: {
        		vocId: selectedRow.vocId,
            },
            callback: function (res) {
                if(res.message == "true") {
	        		// 예약적용일때
        			axboot.modal.open({
        	            modalType: "RESERVATION",
        	            param: "",
        	            callback: function (result) {
        	            	this.close();
        	            	ACTIONS.dispatch(ACTIONS.INSERT_RESERVATION, {
        	            		date: result
        	            	});
        	            }
        	        });
	        	} else {
	        		axDialog.alert(LANG("ax.script.check.organization"));
	        	}
            }
        });
    },
    
    INSERT_RESERVATION: function(caller, act, data) {
    	axboot.promise()
	        .then(function (ok, fail, _data) {
	            axboot.ajax({
	                type: "POST",
	                url: "/api/v1/voiceReservation",
	                data: JSON.stringify({
	            		vocId: selectedRow.vocId,
	            		rsvDate: data.date
	                }),
	                callback: function (res) {
	                    ok(res);
	                }
	            });
	        })
	        .then(function (ok, fail, data) {
	        })
	        .catch(function () {
	
	        });
    },
    
	PAGE_SEARCH: function (caller, act, data) {
    	var dataFlag = typeof data !== "undefined";
    	var filter = $.extend({}, caller.searchView0.getData());
    	
        axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0405G0S0",
            data: filter,
            callback: function (res) {
                caller.gridView0.setData(res);
                
                if(res.list.length == 0) {
                	isUpdate = false;
                	caller.gridView1.setData(null);
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
    	caller.gridView2.target.exportExcel("data.xls");
    },
    
    PAGE_NEW: function (caller, act, data) {
    	isAdd = true;
    },
    
    // 탭닫기
    PAGE_CLOSE: function(caller, act, data) {
    	window.parent.fnObj.tabView.closeActiveTab();
    },
    
    ITEM_CLICK: function (caller, act, data) {
    	isUpdate = true;
    	selectedRow = data;
    	
    	ACTIONS.dispatch(ACTIONS.REFRESH_G1);
    	ACTIONS.dispatch(ACTIONS.REFRESH_G2);
    },
    
    
    ITEM_CLICK_G1: function(caller, act, data) {
    	moveMap(data.lati, data.longi);
    },
    
    ITEM_CLICK_G2: function(caller, act, data) {
    	moveMap(data.lati, data.longi);
    },
    
    DRAW_ROUTE: function(caller, act, data) {
    	drawRoute(routeData);
    },
    
    OPEN_BM0405: function(caller, act, data) {
    	var _this = this;
    	
    	data["routId"] = selectedRow.routId;
    	
    	axboot.modal.open({
            modalType: "BM0405",
            param: "",
            sendData: function() {
            	return data;
            },
            callback: function (result) {
            	ACTIONS.dispatch(ACTIONS.REFRESH_G1);
            	ACTIONS.dispatch(ACTIONS.REFRESH_G2);
            	ACTIONS.dispatch(ACTIONS.DRAW_ROUTE);
            },
        });
    },
    
    REFRESH_G1: function(caller, act, data) {
    	axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0405G1S0",
            data: {
        		routId: selectedRow.routId,
            },
            callback: function (res) {
            	caller.gridView1.setData(res);
            	
            	if(res.list != null && res.list.length != 0) {
            		routeData = routeDataOriginal = res.list.slice();
            	} else {
            		routeData = [];
            	}
            	
            	ACTIONS.dispatch(ACTIONS.DRAW_ROUTE);
            }
        });
    },
    
    REFRESH_G2: function(caller, act, data) {
    	axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0405G2S0",
            data: {
            	routId: selectedRow.routId
            },
            callback: function (res) {
                caller.gridView2.setData(res);
            }
        });
    }
});

// 맵 클릭 이벤트
function onClickMap(e) {
	if(isAdd) {
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
			axDialog.alert("선택할 수 없는 좌표입니다.");
		} else {
			var seq = routeData[minIndex].seq + (routeData[minIndex + 1].seq - routeData[minIndex].seq) / 2;
			var insertIndex = minIndex + 1;
			
			routeData.splice(insertIndex, 0, {
				lati: lonlat.lat(),
				longi: lonlat.lng(),
				seq: seq,
				nodeNm: ADMIN("ax.admin.BM0405M0.voc.node"),
				nodeType: orgaNodeType,
				icon: orgaIcon,
			});
			
			ACTIONS.dispatch(ACTIONS.DRAW_ROUTE);
			ACTIONS.dispatch(ACTIONS.OPEN_BM0405, {
				lati: lonlat.lat(),
				longi: lonlat.lng(),
				seq: seq,
				nodeType: orgaNodeType,
			});
		}
	}
	isAdd = false;
}

/**노선 그리기**/
function drawRoute(list) {
	var path = [];
	
	removeMarkers();
	delete_line();
	deleteCircle();
	
	if(list != null && list.length != 0) {
		for(var i = 0; i < list.length; i++) {
			if(list[i].allPlayTm != null && list[i].allPlayTm != 0) {
				var m = (limitSpeed / 3600 * 1000);
				var radius = Math.round(m * list[i].allPlayTm);
				
				circles.push(new Tmapv2.Circle({
					center: new Tmapv2.LatLng(list[i].lati, list[i].longi),
					radius: radius,
					strokeColor: "#A872EE",
					strokeWeight: 3,
					fillColor: "#A872EE",
					fillOpacity: 0.2,
					map: map
				}));
			}
			path.push(new Tmapv2.LatLng(list[i].lati, list[i].longi));
			
			if(list[i].nodeType == busstopNodeType || list[i].nodeType == orgaNodeType) {
				list[i].label = "<span style='background-color: #46414E; color:white; padding: 3px;'>" + list[i].nodeNm + "</span>";
				
				if(list[i].nodeType == orgaNodeType) {
					var node = list[i];
					
					list[i].click = function(e) {
						console.log(e.marker);
						var point = e.marker.getPosition();
						
						console.log(node, point)
						
						node.lati = point.lat();
						node.longi = point.lng();
						
						ACTIONS.dispatch(ACTIONS.DRAW_ROUTE);
						ACTIONS.dispatch(ACTIONS.OPEN_BM0405, {
							orgaId: e.nodeId,
							lati: point.lat(),
							longi: point.lng(),
						});
					};
					list[i].icon = orgaIcon;
					list[i].draggable = true;
				}
				
				addMarker(list[i]);
			}
		}
		
		polyline = new Tmapv2.Polyline({
			path: path,
			strokeColor: "#DD00DD",
			strokeWeight: 3,
			map: map
		}); 
	}
}

/********************************************************************************************************************/

/******************************************* 페이지 처음 로딩시 호출 ******************************************************/
fnObj.pageStart = function () {
    this.pageButtonView.initView();
    this.searchView0.initView();
    this.gridView0.initView();
    this.gridView1.initView();
    this.gridView2.initView();
    
    initTmap({
    	width: "100%",
    	height: "100%",
    	onClick: onClickMap,
    });
    
    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
};

fnObj.pageResize = function () {

};
/********************************************************************************************************************/


/******************************************** 공통 버튼 클릭 이벤트 ******************************************************/
fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
        	"reservation": function() {
        		ACTIONS.dispatch(ACTIONS.PAGE_RESERVATION);
        	},
            "search": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            },
            "excel": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_EXCEL);
            },
            "new": function() {
            	ACTIONS.dispatch(ACTIONS.PAGE_NEW);
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
            height: 300,
            target: $('[data-ax5grid="gridView0"]'),
            columns: [
            	{key: "routId", label: ADMIN("ax.admin.BM0405G0.routId"), width: 80},
            	{key: "routNm", label: ADMIN("ax.admin.BM0405G0.routNm"), width: 70},
                {key: "shortRoutNm", label: ADMIN("ax.admin.BM0405G0.shortRoutNm"), width: 100},
                {key: "stStaNm", label: ADMIN("ax.admin.BM0405G0.stStaNm"), width: 140},
                {key: "edStaNm", label: ADMIN("ax.admin.BM0405G0.edStaNm"), width: 140},
                {key: "wayDiv", label: ADMIN("ax.admin.BM0405G0.wayDiv"), width: 100},
                {key: "userWayDiv", label: ADMIN("ax.admin.BM0405G0.userWayDiv"), width: 140},
                {key: "turnDiv", label: ADMIN("ax.admin.BM0405G0.turnDiv"), width: 100},
                {key: "updatedAt", label: ADMIN("ax.admin.BM0405G0.updatedAt"), width: 140},
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                    ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.item);
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
    		isUpdate = false;
    	}
    },
    selectLastRow: function() {
    	if(this.target.list.length != 0) {
    		this.selectRow(this.target.list.length - 1);
    	} else {
    		isUpdate = false;
    	}
    },
    selectRow: function(index) {
    	isUpdate = true;
    	var data = this.target.list[index];
    	
    	if(typeof data === "undefined") {
    		this.selectLastRow();
    	} else {
    		this.target.select(index);
        	ACTIONS.dispatch(ACTIONS.ITEM_CLICK, data);
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
    		isUpdate = false;
    		fnObj.formView0.clear();
    		fnObj.formView0.disable();
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
            sortable: true,
            target: $('[data-ax5grid="gridView1"]'),
            columns: [
            	{key: "nodeId",		label: ADMIN("ax.admin.BM0105G1.staId"),		width: 80},
                {key: "nodeNm",		label: ADMIN("ax.admin.BM0105G1.staNm"),		width: 160},
                {key: "nodeType",	label: ADMIN("ax.admin.BM0105G1.staNo"),		width: 100},
                {key: "lati", 		label: ADMIN("ax.admin.BM0105G1.lati"),			width: 100},
                {key: "longi",		label: ADMIN("ax.admin.BM0105G1.longi"),		width: 100},
                {key: "updatedAt",	label: ADMIN("ax.admin.BM0105G1.updatedAt"),	width: 140},
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
    		isUpdate = false;
    	}
    },
    selectLastRow: function() {
    	if(this.target.list.length != 0) {
    		this.selectRow(this.target.list.length - 1);
    	} else {
    		isUpdate = false;
    	}
    },
    selectRow: function(index) {
    	isUpdate = true;
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
    		if(this.target.list[i].vocId == id) {
    			this.selectRow(i);
    			break;
    		}
    	}
    	
    	if(i == length) {
    		isUpdate = false;
    		fnObj.formView0.clear();
    		fnObj.formView0.disable();
    	}
    },
    selectAll: function(flag) {
    	this.target.selectAll({selected: flag});
    }
});

/**
 * gridView2
 */
fnObj.gridView2 = axboot.viewExtend(axboot.gridView, {
    page: {
        pageNumber: 0,
        pageSize: 10
    },
    initView: function () {
        var _this = this;

        this.target = axboot.gridBuilder({
        	frozenColumnIndex: 0,
            sortable: true,
            target: $('[data-ax5grid="gridView2"]'),
            columns: [
            	{key: "orgaId",		label: ADMIN("ax.admin.BM0405G2.orga.id"),		width: 80},
                {key: "orgaNm",		label: ADMIN("ax.admin.BM0405G2.orga.nm"),		width: 160},
                {key: "allPlayTm",	label: ADMIN("ax.admin.BM0405G2.all.play.tm"),	width: 160},
                {key: "lati",		label: ADMIN("ax.admin.BM0405G2.lati"),			width: 120},
                {key: "longi", 		label: ADMIN("ax.admin.BM0405G2.longi"),		width: 120},
                {key: "remark",		label: ADMIN("ax.admin.BM0405G2.remark"),		width: 180},
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                    ACTIONS.dispatch(ACTIONS.ITEM_CLICK_G2, this.item);
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
    		isUpdate = false;
    	}
    },
    selectLastRow: function() {
    	if(this.target.list.length != 0) {
    		this.selectRow(this.target.list.length - 1);
    	} else {
    		isUpdate = false;
    	}
    },
    selectRow: function(index) {
    	isUpdate = true;
    	var data = this.target.list[index];
    	
    	if(typeof data === "undefined") {
    		this.selectLastRow();
    	} else {
    		this.target.select(index);
        	ACTIONS.dispatch(ACTIONS.ITEM_CLICK, data);
    	}
    },
    selectIdRow: function(id) {
    	var i;
    	var length = this.target.list.length;
    	for(i = 0; i < length; i++) {
    		if(this.target.list[i].vocId == id) {
    			this.selectRow(i);
    			break;
    		}
    	}
    	
    	if(i == length) {
    		isUpdate = false;
    		fnObj.formView0.clear();
    		fnObj.formView0.disable();
    	}
    },
    selectAll: function(flag) {
    	this.target.selectAll({selected: flag});
    }
});

