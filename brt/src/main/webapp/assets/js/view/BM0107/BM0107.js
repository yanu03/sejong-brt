var fnObj = {}, CODE = {};

/***************************************** 전역 변수 초기화 ******************************************************/
isUpdate = false;
selectedRow = null;
/*************************************************************************************************************/

/***************************************** 이벤트 처리 코드 ******************************************************/
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
    	// 새로운 레코드 추가할 시 검색어 삭제
    	var dataFlag = typeof data !== "undefined";
    	var filter = $.extend({}, caller.searchView0.getData());
        axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0107G0S0",
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
    	var grid = caller.gridView1.target;
    	
    	if(typeof grid.selectedDataIndexs[0] === "undefined") {
    		axDialog.alert(LANG("ax.script.alert.requireselect"));
    		return false;
    	}
    	
    	if(grid.list[grid.selectedDataIndexs].nodeType == 1){
    		alert("정류장은 삭제할 수 없습니다");
    		return false;
    	}
    	if(confirm("삭제 후에는 되돌릴수 없습니다. 정말 삭제하시겠습니까?") == true){    //확인
    		//노드 삭제
    		console.log(grid.selectedDataIndexs[0]);
    		
    		axboot.promise()
			.then(function (ok, fail, data) {
				axboot.ajax({
					type: "POST",
					url: "/api/v1/BM0107G1D1",
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
    		
    		
    	}else{
    		
    	}
    	
    },
    
    
    
    // 탭닫기
    PAGE_CLOSE: function(caller, act, data) {
    	//원본
    	//window.parent.fnObj.tabView.closeActiveTab();
    	axboot.ajax({
			type: "POST",
			url: "/api/v1/makeRoute",
			callback: function (res) {
				if(res.status == 0){
					alert('갱신 성공');
					ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
				}else{
					alert('갱신 실패');
				}
			}
		});
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
   
    INTERFACE_ROUTE: function(caller, act, data){
    	var list = caller.gridView0.getData("selected");
    	
		if(confirm("갱신 후에는 되돌릴수 없습니다. 정말 갱신하시겠습니까?") == true){    //확인
			//
			if(list.length > 0) {
				var msg = "선택 노선 목록\n------------------\n";
				for(var i=0; i<list.length; i++){
					msg += list[i].routNm + "(" + list[i].routId + ")\n"
				}
				
				msg += "------------------\n다음 노선의 정류장을 갱신합니다. 진행하시겠습니까?";
				
				if(confirm(msg) == true){
					
				axboot.ajax({
					type: "POST",
					url: "/api/v1/BM0107G0U0",
					data: JSON.stringify(list),
					callback: function (res) {
						if(res.status == 0){
							alert('갱신 성공');
							ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
						}else{
							alert('갱신 실패');
						}
					}
				});
				return false;
				}else{
					alert("취소합니다");
					return;
				}
			} else {
				alert(LANG("ax.script.requireselect"));
			}
		}else{   //취소
			alert("취소합니다.");
			return;
		}
    },
    DRAW_ROUTE: function(caller, act, data) {
    	drawRoute(routeData);
    },
    
    
});

/********************************************************************************************************************/

/******************************************* 페이지 처음 로딩시 호출 ******************************************************/
fnObj.pageStart = function () {
	var _this = this;
	
    this.pageButtonView.initView();
    this.searchView0.initView();
    this.searchView1.initView();
    this.gridView0.initView();
    this.gridView1.initView();
    initTmap({width:"100%"
    		, height:"100%"});
    
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
            "excel": function () {
            	selectedRow = null;
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            },
            "interface": function() {
            	ACTIONS.dispatch(ACTIONS.INTERFACE_ROUTE);
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
			//showRowSelector: true,
			//multipleSelect: true,
            target: $('[data-ax5grid="gridView0"]'),
            columns: [
                {key: "routId", label: ADMIN("ax.admin.BM0107G0.routId"), width: 80},
                {key: "routNm", label: ADMIN("ax.admin.BM0107G0.routNm"), width: 180},
                {key: "updatedAt", label: ADMIN("ax.admin.BM0107G0.updatedAt"), width: 160},
            ],
            body: {
                onClick: function () {
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
        url: "/api/v1/BM0107G1S0",
        data: data,
        callback: function (res) {
        	caller.gridView1.setData(res);
        	removeAllPopUp();

        	/**추가한거**/
            if(res.list != null && res.list.length != 0) {
            	routeData = res.list.slice();
            	caller.gridView1.selectRow(0);
            } else {
            	routeData = [];
            }
            ACTIONS.dispatch(ACTIONS.DRAW_ROUTE);
            /**추가한거끝**/	
        }
    });
}

/*****************************************/

function drawRoute(list) {
	var path = [];
	
	removeMarkers();
	deleteLine();
	deleteCircle();
	deleteNode();
	
	if(list != null && list.length != 0) {
		for(var i = 0; i < list.length; i++) {
			if(list[i].seq == 0){
				continue;
			}
			path.push(new Tmapv2.LatLng(list[i].lati, list[i].longi));
			
			// 노드 타입이 버스 정류장 또는 음성편성 노드일 경우 마커 표시
			if(list[i].nodeType == '1' || list[i].nodeType == '898') {
				list[i].label = "<span style='background-color: #46414E; color:white; padding: 3px;'>" + list[i].nodeNm + "</span>";
				addMarker(list[i]);
			}
			// 일반 노드인 경우
			else if(list[i].nodeType == '30'){
				list[i].icon = "/assets/images/tmap/road_trans.png";
				list[i].label = "<span style='background-color: #46414E; color:white; padding: 3px;'>" + list[i].nodeId + "</span>";
				addMarkerInter(list[i], fnObj.gridView1, i);
			}
			// 아닐 경우(무슨노드?) 네모 박스 표시
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