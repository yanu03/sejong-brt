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
            url: "/api/v1/BM0109G0S0",
            data: filter,
            callback: function (res) {
            	caller.gridView0.setData(res);
                if(res.list.length == 0) {
                } else {
                	if(dataFlag) {
	                	caller.gridView0.selectIdRow(data);
	                } else {
		                if(selectedRow != null) {
		                	caller.gridView0.selectRow(selectedRow0.__index);
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
    	caller.gridView1.target.exportExcel(selectedRow0.routId + "(" + selectedRow0.interRoutId + ")_" + new Date().yyyymmdd() + ".xls");
    	//caller.gridView0.target.exportExcel("data.xls");
    },
    
    PAGE_EXCELFORM: function(caller, act, data){
    	location.href = "/api/v1/downloadExcel?type=routResult";
    },
  
    PAGE_DELETE: function(caller, act, data) {
    	var grid = caller.gridView0.target;
    	
    	if(typeof grid.selectedDataIndexs[0] === "undefined") {
    		axDialog.alert(LANG("ax.script.alert.requireselect"));
    		return false;
    	}
    	var msg = "";
    	axDialog.confirm({
    		msg: "해당 노선의 경로정보, 정류장 정보가 삭제됩니다. 정말 삭제하시겠습니까?"
    	},	function(){
    		if(this.key == "ok"){
    			axDialog.confirm({
    				msg: "이 작업은 되돌릴 수 없습니다."
    			},
    			function() {
    				if (this.key == "ok") {
    					axboot.promise()
    					.then(function (ok, fail, data) {
    						axboot.ajax({
    							type: "POST",
    							url: "/api/v1/BM0109G0D0",
    							data: JSON.stringify(grid.list[grid.selectedDataIndexs[0]]),
    							callback: function (res) {
    								msg = res.message;
    								ok(res);
    							}
    						});
    					})
    					.then(function (ok) {
    						if(msg == "true"){
    							axToast.push(LANG("ondelete"));
    						}else{
    							axDialog.alert("삭제 실패. 해당 노선에 편성된 음성이 있는지 확인하세요.");
    						}

    						ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
    					})
    					.catch(function () {

    					});
    				}
    			});
    		}
    	}
    	);
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
    	stnSeq = 1;
    	selectedRow0 = data;
    	searchGrid1(caller, act, data);
    	removeMarkers();
    	deleteLine();
    	document.getElementById("toggleNode").checked = true;
    	document.getElementById("toggleStn").checked = true;
    },
    
    ITEM_CLICK_G1: function (caller, act, data) {
    	selectedRow = data;
    	stnSeq = 1;
        //mapMarker(data.lati, data.longi);
    	if(stopAdd == false && nodeAdd == false){
    		moveMap(data.lati, data.longi);    		
    	}
    },
 
    DRAW_ROUTE: function(caller, act, data) {
    	drawRoute(routeData);
    	// drawRoute(fnObj.gridView1.getData());
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
    	addSeq = 1;
    },
    
    PAGE_SAVE: function(caller, act, data){
    	isNewData = false;
    	var nodeList = fnObj.gridView1.getData();
    	var formData = {};
    	formData.voList = nodeList;
    	formData.routId = selectedRow0.routId;
        axboot.promise()
            .then(function (ok, fail, data) {
                axboot.ajax({
                    type: "POST",
                    url: "/api/v1/BM0109G1I0",
                    data: JSON.stringify(formData),
                    callback: function (res) {
                        ok(res);
                    }
                });
            })
            .then(function (ok, fail, data) {
        		axToast.push("저장되었습니다");
        		//ACTIONS.dispatch(ACTIONS.PAGE_SEARCH, data.message);
        		ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
        		
        		searchGrid1();
                isUpdate = true;
                isNewData = false;
            })
            .catch(function () {

            });
    },
    
    IMPORT_EXCEL:function(caller, act, data){
    	axboot.modal.open({
            modalType: "FILE_UPLOAD",
            param: "",
            callback: function (data) {
            	this.close();
            	var formData = new FormData();
            	formData.append("attFile", data);
            	formData.append("routId", selectedRow0.routId);
            	axDialog.confirm({
 		        	msg: "해당 노선에 데이터가 있을경우 새로운 데이터로 덮어쓰게됩니다. 이 작업은 자동으로 저장됩니다. 진행하시겠습니까?"
 		        }, function(){
	            	
	            	axboot.promise()
	                .then(function (ok, fail, data) {
	                	axboot.ajax({
	                    	type: "POST",
	                    	enctype: "multipart/form-data",
	                    	processData: false,
	                        url: "/api/v1/BM0109IMPORT",
	                        data: formData,
	                        callback: function (res) {
	                            ok(res);
	                        },
	                        options: {
	                        	contentType:false
	                        }
	                    });
	                })
	                .then(function (ok, fail, data) {
	            		axToast.push(LANG("onsave"));
	            		ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
	                })
	                .catch(function () {
	                	
	                });
            	
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
 		        });
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
            },
            "excelimport": function(){
            	ACTIONS.dispatch(ACTIONS.IMPORT_EXCEL);
            },
            "excelform": function(){
            	ACTIONS.dispatch(ACTIONS.PAGE_EXCELFORM);
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
            	/*
                {key: "routId", 	label: ADMIN("ax.admin.BM0107G1.routId"),		width: 80,	align: "center"},
                {key: "seq",		label: ADMIN("ax.admin.BM0107G1.seq"),			width: 60,	editor: editSeq(),	align: "right"},
                {key: "nodeTypeNm",	label: ADMIN("ax.admin.BM0107G1.nodeType"),		width: 50,	align: "center"},
                {key: "nodeId", 	label: ADMIN("ax.admin.BM0107G1.nodeId"),		width: 80,	align: "center"},
                {key: "staNo", 		label: "정류장번호",								width: 80,	align: "center", editor: editSeq()},
                {key: "nodeNm", 	label: ADMIN("ax.admin.BM0107G1.nodeNm"),		width: 120, editor: editName()},
                {key: "krNm", 		label: "국문표출명",								width: 120, editor: editName()},
                {key: "enNm", 		label: "영문표출명",								width: 120, editor: editName()},
                {key: "lati",		label: ADMIN("ax.admin.BM0107G1.lati"),			width: 120},
                {key: "longi",		label: ADMIN("ax.admin.BM0107G1.longi"),		width: 120},
                {key: "updatedAt",	label: ADMIN("ax.admin.BM0107G1.updatedAt"),	width: 120},
                */
            	{key: "routId", 	label: ADMIN("ax.admin.BM0107G1.routId"),		width: 80,	align: "center"},
                {key: "seq",		label: ADMIN("ax.admin.BM0107G1.seq"),			width: 60,	editor: editSeq(),	align: "right"},
                {key: "nodeTypeNm",	label: ADMIN("ax.admin.BM0107G1.nodeType"),		width: 50,	align: "center"},
                {key: "nodeId", 	label: ADMIN("ax.admin.BM0107G1.nodeId"),		width: 80,	align: "center"},
                {key: "nodeNm", 	label: ADMIN("ax.admin.BM0107G1.nodeNm"),		width: 120, editor: editName()},
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

var numEditor = {
		type: "money",
		disabled: function(){
			var duration = calcDuration();
			var distance = calcDistance();
			footSumConfig(distance, duration);
		}
}


/*****************************************/

function searchGrid1(caller, act, data){
	var dataFlag = typeof data !== "undefined";
	data.filter1 = $('#filter1').val();
	axboot.ajax({
        type: "GET",
        url: "/api/v1/BM0109G1S0",
        data: data,
        callback: function (res) {
        	fnObj.gridView1.setData(res);
        	removeAllPopUp();
        	/**추가한거**/
            if(res.list != null && res.list.length != 0) {
            	routeData = res.list.slice();
            	fnObj.gridView1.selectRow(0);
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
				nodeNm: routNm + "_정류장" + stnSeq,
				nodeType: '1',
				nodeTypeNm: '정류장',
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
				nodeNm: routNm + "_작업노드" + seq,
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
				list[i].icon = "/assets/images/tmap/busstop.png";
				list[i].label = "<span style='background-color: white; color:black; padding: 3px; border: 0.5px solid black;'>" + list[i].nodeNm + "</span>";
			}
			// 아닐 경우(일반 노드) 네모 박스 표시
			else {
				list[i].icon = "/assets/images/tmap/road_trans.png";
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
	
	$('#searchSta').on('click', function(){
		searchGrid1(fnObj,null,selectedRow0);
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
				//list[i].label = "<span style='background-color: #46414E; color:white; padding: 3px;'>" + list[i].nodeNm + "</span>";
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

