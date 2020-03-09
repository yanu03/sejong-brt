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
			var filter = {};
			var dataList = [];
			
			axboot.ajax({
				type: "GET",
				url: "/api/v1/BM0803G0S0",
				data: filter,
				callback: function (res) {
					dataList = res.list;
					makeStnMarker(dataList);
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
					axboot.ajax({
						type: "GET",
						url: "/api/v1/BM0803G1S0",
						data: filter,
						callback: function (resOne) {
							$("#busRout").change(function(){
								removeMarkers();
								var list = new Array();
								var routList = {};
								routList.page = {};
								routList.list = list;
								var count = 0;
								var countOne = 0;
								
								if(this.value != "노선을선택하세요."){
									/*for(var i = 0; i<res.list.length; i++){
										for(var j = 0; j<resOne.list.length; j++){
											if(res.list[i].vhcId != resOne.list[j].vhcId){
												console.log("2번째");
												resOne.list[countOne] = resOne.list[j];
												countOne ++;
											}
										}
									}*/
									
									for(var i = 0; i<resOne.list.length; i++){
										if(this.value == resOne.list[i].routNm){
												routList.list[count] = resOne.list[i];
												count++;
										}
									}
									
									makeStnMarker(routList.list);
									makeStnMarker(res.list);
									caller.gridView1.setData(routList);
								}
							})
						}
					});
				}
			});
			

			return false;
		},
	PAGE_EXCEL: function(caller, act, data) {
	},

	PAGE_NEW: function (caller, act, data) {
	},

	PAGE_DELETE: function(caller, act, data) {
	},

	PAGE_SAVE: function (caller, act, data) {
	},

	PAGE_UPDATE: function(caller, act, data) {
	},

	// 탭닫기
	PAGE_CLOSE: function(caller, act, data) {
		window.parent.fnObj.tabView.closeActiveTab();
	},

	ITEM_CLICK_G0: function (caller, act, data) {
		moveMap(data.lati , data.longi);
	},

	ITEM_CLICK_G1: function (caller, act, data) {
		moveMap(data.lati, data.longi);
	},
	SELECT_ROUT : function(caller, act, data){
	},
});

/********************************************************************************************************************/

/******************************************* 페이지 처음 로딩시 호출 ******************************************************/
fnObj.pageStart = function () {
	var _this = this;
	makeSelBox();
	this.pageButtonView.initView();
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
			"close": function() {
				ACTIONS.dispatch(ACTIONS.PAGE_CLOSE);
			}
		});
	}
});

/********************************************************************************************************************/

//== view 시작
/**
 * searchView1
 */
fnObj.searchView1 = axboot.viewExtend(axboot.searchView, {
	initView: function () {
		
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
				{key: "vhcId",			label: ADMIN("ax.admin.BM0103F0.vhcId"),		width: 115,	align: "center"},
				{key: "vhcNo",			label: ADMIN("ax.admin.BM0103F0.vhcNo"),		width: 115 , align: "center"},
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
			//showRowSelector: true,
			//multipleSelect: true,
			target: $('[data-ax5grid="gridView1"]'),
			columns: [
				{key: "routNm",			label: ADMIN("ax.admin.BM0103F0.vhcId"),		width: 100,	align: "center"},
				{key: "vhcNo",			label: ADMIN("ax.admin.BM0103F0.vhcNo"),		width: 120 , align: "center"},
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
			makeStnMarker(res);
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

function makeStnMarker(data){
	var staNm	= [];
	var stnY	= [];
	var stnX	= [];
	var mainStaNm = [];
	var mainStnY = [];
	var mainStnX = [];
	for(var i = 0; i < data.length; i++){
		if(data[i].modelNm == "전기굴절버스"){
			mainStnX.push(data[i].longi);
			mainStnY.push(data[i].lati);
			mainStaNm.push(data[i].vhcNo);
		}else{
			stnX.push(data[i].longi);
			stnY.push(data[i].lati);
			staNm.push(i+1 + ". " + data[i].vhcNo);
		}
	}
	addMarkerAni(mainStnY , mainStnX , mainStaNm);
	addMarkers(stnY, stnX, staNm);
	
}

function makeSelBox(){
	var options = [];

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
			    	var input = $(this)[0].value[0].value;
					//노선별 차량목록 검색할것임
			    	
			    	axboot.ajax({
			    		type: "GET",
			    		url: "/api/v1/BM0803G1S0",
			    		data: JSON.stringify(input),
			    		callback: function (res) {
			    			console.log(res);
			    			fnObj.gridView1.setData(res);
			    			makeStnMarker(res);
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