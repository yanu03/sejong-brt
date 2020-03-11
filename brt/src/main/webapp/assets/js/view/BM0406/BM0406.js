
var fnObj = {}, CODE = {};

/***************************************** 전역 변수 초기화 ******************************************************/
var selectedRow = null;
/*************************************************************************************************************/

/***************************************** 이벤트 처리 코드 ******************************************************/
var ACTIONS = axboot.actionExtend(fnObj, {
	PAGE_RESERVATION: function(caller, act, data) {
		var routeList = caller.gridView0.getData("selected");
		
    	if(routeList.length == 0) {
    		axDialog.alert("노선을 선택해주세요");
    		return false;
    	}
    	
    	var vehicleList = caller.gridView1.getData("selected");
    	
    	if(vehicleList.length == 0) {
    		axDialog.alert("차량을 선택해주세요");
    		return false;
    	}
    	
    	for(var i = 0; i < vehicleList.length; i++) {
    		if(vehicleList[i].rsvId != null) {
    			axDialog.alert("예약중인 차량은 중복예약이 되지 않습니다.")
    			return false;
    		}
    	}
    	
    	
    	//2차비밀번호 modal
		axboot.modal.open({
            modalType: "SECOND_PASSWORD",
            param: "",
            callback: function (data) {
                this.close();
                
                axboot.modal.open({
                    modalType: "RESERVATION",
                    param: "",
                    callback: function (result) {
                    	this.close();
                    	
                    	var rsvDate = result;
                    	var list = vehicleList.map(function(item) {
                    		return item.mngId;
                    	});
                    	
                    	var data = {
                    		rsvDate: rsvDate,
                    		routeList: routeList,
                    		list: list
                    	}
                    	
                    	axboot.promise()
        	    	        .then(function (ok, fail, _data) {
        	    	            axboot.ajax({
        	    	                type: "POST",
        	    	                url: "/api/v1/BM0406G1I0",
        	    	                data: JSON.stringify(data),
        	    	                callback: function (res) {
        	    	                    ok(res);
        	    	                }
        	    	            });
        	    	        })
        	    	        .then(function (ok, fail, data) {
        	    	        	axToast.push(LANG("ax.script.alert.reservation"));
        	    	        	ACTIONS.dispatch(ACTIONS.PAGE_SEARCH_G1);
        	    	        })
        	    	        .catch(function () {
        	    	
        	    	        });
                    }
                });
            }
        });
        //*/
    },
    
	PAGE_SEARCH: function (caller, act, data) {
    	// 새로운 레코드 추가할 시 검색어 삭제
    	var filter = $.extend({}, caller.searchView0.getData());
    	
        axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0104G0S0",
            data: filter,
            callback: function (res) {
                caller.gridView0.setData(res);
            }
        });

        return false;
    },
    
    PAGE_SEARCH_G1: function(caller, act, data) {
    	axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0406G1S0",
            data: null,
            callback: function (res) {
            	caller.gridView1.setData(res);
            }
        });
    },
    
    // 탭닫기
    PAGE_CLOSE: function(caller, act, data) {
    	window.parent.fnObj.tabView.closeActiveTab();
    },
    
    ITEM_CLICK: function (caller, act, data) {
    	selectedRow = data;
    },
    
    ITEM_CLICK_G1: function(caller, act, data) {
    	
    }
});

/********************************************************************************************************************/

/******************************************* 페이지 처음 로딩시 호출 ******************************************************/
fnObj.pageStart = function () {
    this.pageButtonView.initView();
    this.searchView0.initView();
    this.gridView0.initView();
    this.gridView1.initView();
    
    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH_G1);
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
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH_G1);
            },
            "excel": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_EXCEL);
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
        	lineNumberColumnWidth: 30,
        	frozenColumnIndex: 0,
        	multipleSelect : true,
        	showRowSelector: true,
        	sortable: true,
            target: $('[data-ax5grid="gridView0"]'),
            columns: [
            	{key: "routId",			label: ADMIN("ax.admin.BM0104G0.routId"),		width: 80,		align: "center"},
            	{key: "interRoutId",	label: ADMIN("ax.admin.BM0104G0.interRoutId"),	width: 90,		align: "center"},
            	{key: "routNm",			label: ADMIN("ax.admin.BM0104G0.routNm"),		width: 130},
                {key: "shortRoutNm",	label: ADMIN("ax.admin.BM0104G0.shortRoutNm"),	width: 130},
                {key: "wayInfo",		label: ADMIN("ax.admin.BM0104G0.wayInfo"),		width: 130},
                {key: "dirInfo",		label: ADMIN("ax.admin.BM0104G0.dirInfo"),		width: 130},
                {key: "stStaNm",		label: ADMIN("ax.admin.BM0104G0.stStaNm"),		width: 160},
                {key: "edStaNm",		label: ADMIN("ax.admin.BM0104G0.edStaNm"),		width: 160},
                {key: "wayDivNm",		label: ADMIN("ax.admin.BM0104G0.wayDiv"),		width: 60,		align: "center"},
                {key: "userWayDivNm",	label: ADMIN("ax.admin.BM0104G0.userWayDiv"),	width: 120,		align: "center"},
                {key: "dvcName",		label: ADMIN("ax.admin.BM0104G0.dvcName"),		width: 100},
                {key: "line1Str",		label: ADMIN("ax.admin.BM0104G0.line1Str"),		width: 200},
                {key: "line2Str",		label: ADMIN("ax.admin.BM0104G0.line2Str"),		width: 200},
                {key: "line1Satstr",	label: ADMIN("ax.admin.BM0104G0.line1Satstr"),	width: 200},
                {key: "line2Satstr",	label: ADMIN("ax.admin.BM0104G0.line2Satstr"),	width: 200},
                {key: "line1Sunstr",	label: ADMIN("ax.admin.BM0104G0.line1Sunstr"),	width: 200},
                {key: "line2Sunstr",	label: ADMIN("ax.admin.BM0104G0.line2Sunstr"),	width: 200},
                {key: "updatedAt",		label: ADMIN("ax.admin.BM0104G0.updatedAt"),	width: 140,		align: "center"},
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
    	}
    },
    selectLastRow: function() {
    	if(this.target.list.length != 0) {
    		this.selectRow(this.target.list.length - 1);
    	}
    },
    selectRow: function(index) {
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
            sortable: true,
            showRowSelector: true,
            multipleSelect : true,
            target: $('[data-ax5grid="gridView1"]'),
            columns: [
            	{key: "rsvId",		label: ADMIN("ax.admin.BM0406G1.rsvYn"),	width: 70,	align: "center", formatter: function() {
            		if(this.item.rsvId != null)
            			return ADMIN("ax.admin.item.reservation");
                }},
                {key: "vhcId",		label: ADMIN("ax.admin.BM0406G1.vhcId"),	width: 65,	align: "center"},
                {key: "vhcNo",		label: ADMIN("ax.admin.BM0406G1.vhcNo"),	width: 90,	align: "center"},
                {key: "chasNo", 	label: ADMIN("ax.admin.BM0406G1.chasNo"),	width: 130},
                {key: "corpNm",		label: ADMIN("ax.admin.BM0406G1.corpId"),	width: 120,	align: "center"},
                {key: "areaNm",		label: ADMIN("ax.admin.BM0406G1.area"),		width: 100,	align: "center"},
                {key: "makerNm",	label: ADMIN("ax.admin.BM0406G1.maker"),	width: 80,	align: "center"},
                {key: "relsDate",	label: ADMIN("ax.admin.BM0406G1.relsDate"),	width: 80,	align: "center"},
                {key: "modelNm",	label: ADMIN("ax.admin.BM0406G1.modelNm"),	width: 100,	align: "center"},
                {key: "vhcKindNm",	label: ADMIN("ax.admin.BM0406G1.vhcKind"),	width: 80,	align: "center"},
                {key: "vhcTypeNm",	label: ADMIN("ax.admin.BM0406G1.vhcType"),	width: 70,	align: "center"},
                {key: "lfYnNm",		label: ADMIN("ax.admin.BM0406G1.lfYn"),		width: 70,	align: "center"},
                {key: "vhcFuelNm",	label: ADMIN("ax.admin.BM0406G1.vhcFuel"),	width: 50,	align: "center"},
                {key: "useYn",		label: ADMIN("ax.admin.BM0406G1.useYn"),	width: 70,	align: "center"},
                {key: "remark",		label: ADMIN("ax.admin.BM0406G1.remark"),	width: 100,	align: "center"},
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
    selectRow: function(index) {
    	var data = this.target.list[index];
    	
    	if(typeof data === "undefined") {
    		this.selectLastRow();
    	} else {
    		this.target.select(index);
        	ACTIONS.dispatch(ACTIONS.ITEM_CLICK_G1, data);
    	}
    },
    selectAll: function(flag) {
    	this.target.selectAll({selected: flag});
    }
});
