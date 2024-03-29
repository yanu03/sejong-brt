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
    		axDialog.alert("정류장은 삭제할 수 없습니다");
    		return false;
    	}
    	if(confirm("삭제 후에는 되돌릴수 없습니다. 정말 삭제하시겠습니까?") == true){    //확인
    		//노드 삭제
    		
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
    
    PAGE_EXCELIMPORT: function(caller, act, data){
    	axboot.modal.open({
            modalType: "FILE_UPLOAD",
            param: "",
            callback: function (data) {
                this.close();
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            }
        });
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
					axToast.push("갱신 성공");
					ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
				}else{
					axDialog.alert('갱신 실패');
				}
			}
		});
    },
    
    ITEM_CLICK_G0: function (caller, act, data) {
    	//data.filter1 = $.extend({}, caller.searchView1.getData());
    	selectedRow = data;
    	searchGrid1(caller, act, data);
    	removeMarkers();
    	deleteLine();
    	
    	document.getElementById("toggleNode").checked = true;
    	document.getElementById("toggleStn").checked = true;
    },
    
    ITEM_CLICK_G1: function (caller, act, data) {
    	
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
							axDialog.alert('갱신 성공');
							ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
							caller.gridView0.selectRow(selectedRow.__index);
						}else{
							axDialog.alert('갱신 실패');
						}
					}
				});
				return false;
				}else{
					axDialog.alert("취소합니다");
					return;
				}
			} else {
				axDialog.alert(LANG("ax.script.requireselect"));
			}
		}else{   //취소
			axDialog.alert("취소합니다.");
			return;
		}
    },
    DRAW_ROUTE: function(caller, act, data) {
    	drawRoute(routeData);
    },
    
    PAGE_SAVE: function(caller, act, data){
    	var postData = fnObj.gridView1.getData();
        axboot.promise()
            .then(function (ok, fail, data) {
                axboot.ajax({
                    type: "POST",
                    url: "/api/v1/BM0107G1I0",
                    data: JSON.stringify(postData),
                    callback: function (res) {
                    	if(res.message == "error"){
                    		axDialog.alert("중복된 노선ID가 있습니다. 확인 후 저장하세요.");
                    	}else{
                    		ok(res);
                    	}
                    }
                });
            })
            .then(function (ok, fail, data) {
        		axToast.push(LANG("onsave"));
        		ACTIONS.dispatch(ACTIONS.PAGE_SEARCH, data.message);
                isUpdate = true;
            })
            .catch(function () {

            });
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
	chked();
	btnClick();
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
        	lineNumberColumnWidth: 30,
        	frozenColumnIndex: 0,
            sortable: true,
			//showRowSelector: true,
			//multipleSelect: true,
            target: $('[data-ax5grid="gridView0"]'),
            columns: [
            	{key: "routId",			label: ADMIN("ax.admin.BM0104G0.routId"),											width: 80,	sortable: true},
            	{key: "interRoutId",			label: ADMIN("ax.admin.BM0104G0.interRoutId"),								width: 80,	sortable: true},
            	{key: "routNm",			label: ADMIN("ax.admin.BM0104G0.routNm"),											width: 70,	sortable: true},
                {key: "shortRoutNm",	label: "<font color=0000FF>" + ADMIN("ax.admin.BM0104G0.shortRoutNm") + "</font>",	width: 100,	sortable: true},
                {key: "wayInfo",		label: "<font color=0000FF>" + ADMIN("ax.admin.BM0104G0.wayInfo") + "</font>",		width: 130},
                {key: "dirInfo",		label: "<font color=0000FF>" + ADMIN("ax.admin.BM0104G0.dirInfo") + "</font>",		width: 130},
                {key: "stStaNm",		label: ADMIN("ax.admin.BM0104G0.stStaNm"),											width: 160},
                {key: "edStaNm",		label: ADMIN("ax.admin.BM0104G0.edStaNm"),											width: 160},
                {key: "wayDivNm",		label: ADMIN("ax.admin.BM0104G0.wayDiv"),											width: 60,			align: "center"},
                {key: "userWayDivNm",		label: "<font color=0000FF>" + ADMIN("ax.admin.BM0104G0.userWayDiv") + "</font>",	width: 120,		align: "center"},
                //{key: "turnDivNm",		label: ADMIN("ax.admin.BM0104G0.turnDiv"),width: 100},
                {key: "dvcName",		label: ADMIN("ax.admin.BM0104G0.dvcName"),											width: 90},
                {key: "line1Str",		label: ADMIN("ax.admin.BM0104G0.line1Str"),											width: 200},
                {key: "line2Str",		label: ADMIN("ax.admin.BM0104G0.line2Str"),											width: 200},
                {key: "line1Satstr",	label: ADMIN("ax.admin.BM0104G0.line1Satstr"),										width: 200},
                {key: "line2Satstr",	label: ADMIN("ax.admin.BM0104G0.line2Satstr"),										width: 200},
                {key: "line1Sunstr",	label: ADMIN("ax.admin.BM0104G0.line1Sunstr"),										width: 200},
                {key: "line2Sunstr",	label: ADMIN("ax.admin.BM0104G0.line2Sunstr"),										width: 200},
                {key: "updatedAt",		label: ADMIN("ax.admin.BM0104G0.updatedAt"),										width: 140,	sortable: true},
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
        	lineNumberColumnWidth: 30,
        	frozenColumnIndex: 0,
            //sortable: true,
            //showRowSelector: true,
            target: $('[data-ax5grid="gridView1"]'),
            columns: [
                {key: "routId", 	label: ADMIN("ax.admin.BM0107G1.routId"),		width: 80,	align: "center"},
                {key: "seq",		label: ADMIN("ax.admin.BM0107G1.seq"),			width: 60,	align: "right"},
                {key: "nodeTypeNm",	label: ADMIN("ax.admin.BM0107G1.nodeType"),		width: 50,	align: "center"},
                {key: "nodeId", 	label: ADMIN("ax.admin.BM0107G1.nodeId"),		width: 80,	align: "center"},
                {key: "staNo", 		label: "정류장번호",								width: 80,	align: "center",},
                {key: "nodeNm", 	label: ADMIN("ax.admin.BM0107G1.nodeNm"),		width: 120,},
                {key: "krNm", 		label: "국문표출명",								width: 120, },
                {key: "enNm", 		label: "영문표출명",								width: 120,},
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

/*****************************************/
function searchGrid1(caller, act, data){
	var dataFlag = typeof data !== "undefined";
	data.filter1 = $('#filter1').val();
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
	return false;
}

/*****************************************/

function drawRoute(list, idx) {
	var path = [];
	
	removeMarkers();
	deleteLine();
	deleteCircle();
	deleteNode();
	
	if(list != null && list.length != 0) {
		for(var i = 0; i < list.length; i++) {
			path.push(new Tmapv2.LatLng(list[i].lati, list[i].longi));
			list[i].click = function(e){
				
			};
			// 노드 타입이 버스 정류장 또는 음성편성 노드일 경우 마커 표시
			if(list[i].nodeType == '1') {
				if(i == idx){
					list[i].icon = "/assets/images/tmap/busstop_selected.png";
				}else{
					list[i].icon = "/assets/images/tmap/busstop.png";					
				}
				list[i].label = "<span style='background-color: white; color:black; padding: 3px; border: 0.5px solid black;'>" + list[i].nodeNm + "</span>";
				addMarkerInter(list[i], fnObj.gridView1, i);
			}
			// 일반 노드인 경우
			else if(list[i].nodeType == '30'){
				if(i == idx){
					list[i].icon = "/assets/images/tmap/road_selected.png";
				}else{
					list[i].icon = "/assets/images/tmap/road_trans.png";
				}
				list[i].label = "<span style='background-color: white; color:black; padding: 3px; border: 0.5px solid black;'>" + list[i].nodeNm + "</span>";
				addMarkerInter(list[i], fnObj.gridView1, i);
				if(list[i].seq != 0){
					nodes.push(getDrawingNode(list[i].lati, list[i].longi));					
				}
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
				//list[i].label = "<span style='background-color: #46414E; color:white; padding: 3px;'>" + list[i].nodeNm + "</span>";
				list[i].label = "<span style='background-color: white; color:black; padding: 3px; border: 0.5px solid black;'>" + list[i].nodeNm + "</span>";
				addMarker(list[i]);
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
				addMarker(list[i]);
			}
		}
		break;
		
	case "11" : //다
		removeMarkers();
		for(var i=0; i<list.length; i++){
			if(list[i].nodeType=="30"){
				list[i].icon = "/assets/images/tmap/road_trans.png";
			}else{
				
			}
			//list[i].label = "<span style='background-color: #46414E; color:white; padding: 3px;'>" + list[i].nodeNm + "</span>";
			list[i].label = "<span style='background-color: white; color:black; padding: 3px; border: 0.5px solid black;'>" + list[i].nodeNm + "</span>";
			addMarker(list[i]);
		}
		break;
	}
}

var editSeq = {
		type: "money",
		disabled: function(){
		},
		attributes:{
			"maxlength" : 11
		}
}

function btnClick(){
	
	$('#refresh').on('click', function(){
		var tmpData = fnObj.gridView1.getData();
		tmpData.sort(function (a,b){return a.seq - b.seq});
		fnObj.gridView1.setData(tmpData);
		drawRoute(fnObj.gridView1.getData());
	})
}