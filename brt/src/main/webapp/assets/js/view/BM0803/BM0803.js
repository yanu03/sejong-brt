var fnObj = {}, CODE = {};

/***************************************** 전역 변수 초기화 ******************************************************/
isUpdate = false;
selectedRow = null;
dataList = [];
/*************************************************************************************************************/

/***************************************** 이벤트 처리 코드 ******************************************************/
var ACTIONS = axboot.actionExtend(fnObj, {
	PAGE_SEARCH: function (caller, act, data) {
		// 새로운 레코드 추가할 시 검색어 삭제
		var dataFlag = typeof data !== "undefined";
		var filter = {};
		
		axboot.ajax({
			type: "GET",
			url: "/api/v1/BM0803G0S0",
			data: filter,
			callback: function (res) {
				dataList = res.list;
				caller.gridView0.setData(res);
				drawArticulatedBus(dataList);
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

	// 탭닫기
	PAGE_CLOSE: function(caller, act, data) {
		window.parent.fnObj.tabView.closeActiveTab();
	},

	ITEM_CLICK_G0: function (caller, act, data) {
		if(data.lati != null && data.longi != null){
			moveMap(data.lati , data.longi);			
		}
	},

	ITEM_CLICK_G1: function (caller, act, data) {
		moveMap(data.lati, data.longi);
	},
});

/********************************************************************************************************************/

/******************************************* 페이지 처음 로딩시 호출 ******************************************************/
fnObj.pageStart = function () {
	var _this = this;
	initTmap({width:"100%", height:"100%"});
	makeSelBox();
	this.pageButtonView.initView();
	this.gridView0.initView();
	this.gridView1.initView();

	ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
	

};

fnObj.pageResize = function () {

};
/********************************************************************************************************************/


/******************************************** 공통 버튼 클릭 이벤트 ******************************************************/
fnObj.pageButtonView = axboot.viewExtend({
	initView: function () {
		axboot.buttonClick(this, "data-page-btn", {
			"close": function() {
				ACTIONS.dispatch(ACTIONS.PAGE_CLOSE);
			}
		});
	}
});

/********************************************************************************************************************/


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
			target: $('[data-ax5grid="gridView0"]'),
			columns: [
				{key: "vhcNo",			label: ADMIN("ax.admin.BM0103F0.vhcNo"),		width: 120 , align: "center"},
				{key: "lati",			label: "위도",									width: 80 , align: "left"},
				{key: "longi",			label: "경도", 									width: 80 , align: "left"},
				{key: "vhcId",			label: ADMIN("ax.admin.BM0103F0.vhcId"),		width: 115,	align: "center"},
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
			ACTIONS.dispatch(ACTIONS.ITEM_CLICK_G0, this.target.list[0]);
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
			sortable: true,
			target: $('[data-ax5grid="gridView1"]'),
			columns: [
				{key: "vhcNo",			label: ADMIN("ax.admin.BM0103F0.vhcNo"),		width: 120 , align: "center"},
				{key: "lati",			label: "위도",									width: 80 , align: "left"},
				{key: "longi",			label: "경도",									width: 80 , align: "left"},
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
			ACTIONS.dispatch(ACTIONS.ITEM_CLICK_G1, this.target.list[0]);
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
	var input = {};
	input.filter = caller.searchView1.getData().filter;
	input.routId = data.routId;

	axboot.ajax({
		type: "GET",
		url: "/api/v1/BM0105G1S0",
		data: input,
		callback: function (res) {
			caller.gridView1.setData(res);
			if(res.list.length == 0) {
			}
			else {
				caller.gridView1.selectFirstRow();
				
				if(selectedRow != null) {
					caller.gridView1.selectRow(selectedRow.__index);
				}
				else {
					caller.gridView1.selectFirstRow();
				}
			}
		}
	});
}

function makeSelBox(){
	var options = [{value: "", text: "노선을 선택하세요."}];

	axboot.ajax({
		type: "GET",
		url:"/api/v1/BM0104G0S0",
		callback: function(res){
			for(var i=0; i<res.list.length; i++){
				var v = res.list[i].interRoutId;
				var t = res.list[i].shortRoutNm + "_" + res.list[i].userWayDivNm + "(" + res.list[i].interRoutId + ")";
				options.push({value: v, text: t});
			}
			
			$('[data-ax5select]').ax5select({
				options: options,
				onChange: function(){
					removeMarkers();
					drawArticulatedBus(dataList);
					
			    	var input = {};
			    	input.routId = $(this)[0].value[0].value;
			    	
			    	axboot.ajax({
			    		type: "POST",
			    		url: "/api/v1/BM0803G1S0",
			    		data: JSON.stringify(input),
			    		callback: function (res) {
			    			fnObj.gridView1.setData(res);
			    			drawNormalBus(res.list);
			    			if(res.list.length == 0) {
			    			}
			    			else {
			    				fnObj.gridView1.selectFirstRow();
			    				
			    				if(selectedRow != null) {
			    					fnObj.gridView1.selectRow(selectedRow.__index);
			    				}
			    				else {
			    					fnObj.gridView1.selectFirstRow();
			    				}
			    			}
			    		}
			    	});
				}
			});
		}
	});
}

function drawNormalBus(busList){
	var grid0 = fnObj.gridView0.getData();
	var resultList = busList;
	for(var i = 0; i < busList.length; i++){
		/*
		for(var j = 0; j < grid0.length; j++){
			
			if(busList[i].vhcNo == grid0[j].vhcNo){
				delete resultList[i];
			}
		}
		*/
		busList[i].label = "<span style='background-color: white; color:black; padding: 3px; border: 0.5px solid black'>" + busList[i].vhcNo + "</span>";
		busList[i].icon = "/assets/images/tmap/bus_Normal.png";
		
		//if(busList[i] != null && busList[i] != undefined){
			addMarker(busList[i]);							
		//}
	}	
}

function drawArticulatedBus(busList){
	for(var i=0; i<busList.length; i++){
		if(busList[i].lati != null && busList[i].longi != null){
			busList[i].label = "<span style='background-color: white; color:black; padding: 3px; border: 0.5px solid black'>" + busList[i].vhcNo + "</span>";
			busList[i].icon = "/assets/images/tmap/bus_Articulated.png";
			addMarker(busList[i]);
		}
	}
}

function returnNoArt(grid0, grid1){
	var grid0 = fnObj.gridView0.getData();
	var grid1 = fnObj.gridView1.getData();
	var gridResult = [];
}

