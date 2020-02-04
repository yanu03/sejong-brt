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
			url: "/api/v1/BM0104G0S0",
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

	PAGE_NEW: function (caller, act, data) {
		isUpdate = false;
		caller.gridView0.selectAll(false);
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
						url: "/api/v1/BM0105G0D0",
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

	PAGE_SAVE: function (caller, act, data) {
	},

	PAGE_UPDATE: function(caller, act, data) {
	},

	// 탭닫기
	PAGE_CLOSE: function(caller, act, data) {
		window.parent.fnObj.tabView.closeActiveTab();
	},

	ITEM_CLICK_G0: function (caller, act, data) {
		removeAllPopUp();
		removeMarkers();
		searchGrid1(caller, act, data);
		
	},

	ITEM_CLICK_G1: function (caller, act, data) {
		moveMap(data.lati, data.longi);
	},
	
	INTERFACE: function (caller, act, data){
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
					url: "/api/v1/BM0105G2U0",
					data: JSON.stringify(list),
					callback: function (res) {
						if(res.list.length > 0){
							alert('갱신 성공');
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
		//
	}
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
				ACTIONS.dispatch(ACTIONS.INTERFACE);
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
		this.filter = $("#filter1");
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
				{key: "routId",			label: ADMIN("ax.admin.BM0104G0.routId"),		width: 80,	align: "center"},
				{key: "routNm",			label: ADMIN("ax.admin.BM0104G0.routNm"),		width: 100},
				{key: "shortRoutNm",	label: ADMIN("ax.admin.BM0104G0.shortRoutNm"),	width: 160},
				{key: "stStaNm",		label: ADMIN("ax.admin.BM0104G0.stStaNm"),		width: 160},
				{key: "edStaNm",		label: ADMIN("ax.admin.BM0104G0.edStaNm"),		width: 160},
				{key: "wayDiv",			label: ADMIN("ax.admin.BM0104G0.wayDiv"),		width: 140},
				{key: "userWayDiv",		label: ADMIN("ax.admin.BM0104G0.userWayDiv"),	width: 140},
				{key: "turnDiv",		label: ADMIN("ax.admin.BM0104G0.turnDiv"),		width: 100},
				{key: "updatedAt",		label: ADMIN("ax.admin.BM0104G0.updatedAt"),	width: 180},
				],
				body: {
					onClick: function () {
						this.self.select(this.dindex);
						console.log(this.self.list[this.dindex]);
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
			//ACTIONS.dispatch(ACTIONS.ITEM_CLICK_G0, this.target.list[0]);
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
			sortable: true,
			target: $('[data-ax5grid="gridView1"]'),
			columns: [
				{key: "staId",		label: "<font color=CD1039>" + ADMIN("ax.admin.BM0105G1.staId") + "</font>",		width: 80,	align: "center"},
				{key: "staNm",		label: ADMIN("ax.admin.BM0105G1.staNm"),		width: 160},
				{key: "staNo",		label: ADMIN("ax.admin.BM0105G1.staNo"),		width: 90},
				{key: "lati", 		label: ADMIN("ax.admin.BM0105G1.lati"),			width: 90},
				{key: "longi",		label: ADMIN("ax.admin.BM0105G1.longi"),		width: 90},
				{key: "updatedAt",	label: ADMIN("ax.admin.BM0105G1.updatedAt"),	width: 130},
				],
				body: {
					onClick: function () {
						this.self.select(this.dindex);
						console.log(this.item);
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
		console.log("FirstRow");
		if(this.target.list.length != 0) {
			this.selectRow(0);
			//ACTIONS.dispatch(ACTIONS.ITEM_CLICK_G1, this.target.list[0]);
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
	for(var i = 0; i < data.list.length; i++){
		stnX.push(data.list[i].longi);
		stnY.push(data.list[i].lati);
		staNm.push(i+1 + ". " + data.list[i].staNm);
		//popUp(data.list[i].lati, data.list[i].longi, data.list[i].staNm);
	}
	addMarkers(stnY, stnX, staNm);
	
}
