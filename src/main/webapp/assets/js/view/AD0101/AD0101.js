var fnObj = {}, CODE = {};

/***************************************** 전역 변수 초기화 ******************************************************/
var selectedRow = null;
/*************************************************************************************************************/

/***************************************** 이벤트 처리 코드 ******************************************************/
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
    	// 새로운 레코드 추가할 시 검색어 삭제
    	var dataFlag = typeof data !== "undefined";
    	var filter = $.extend({}, caller.searchView0.getData());
        axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0103G0S0",
            data: filter,
            callback: function (res) {
            	caller.gridView0.setData(res);
                
                if(res.list.length == 0) {
                	selectedRow = null;
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
            },
            
        });

        return false;
    },
    
    PAGE_SAVE: function (caller, act, data) {
    	var formData = {
    		vhcId: selectedRow.vhcId,
    		posList: caller.gridView1.getData("selected")
    	};
    	
        axboot.promise()
            .then(function (ok, fail, data) {
                axboot.ajax({
                    type: "POST",
                    url: "/api/v1/AD0101G1I0",
                    data: JSON.stringify(formData),
                    callback: function (res) {
                        ok(res);
                    }
                });
            })
            .then(function (ok, fail, data) {
        		axToast.push(LANG("onsave"));
        		ACTIONS.dispatch(ACTIONS.PAGE_SEARCH, selectedRow.vhcId);
            })
            .catch(function () {
            });
    },
    
    // 탭닫기
    PAGE_CLOSE: function(caller, act, data) {
    	window.parent.fnObj.tabView.closeActiveTab();
    },
    
    ITEM_CLICK: function (caller, act, data) {
    	selectedRow = data;
    	ACTIONS.dispatch(ACTIONS.RELOAD_G1);
    },
    
    RELOAD_G1: function(caller, act, data) {
    	axboot.ajax({
            type: "GET",
            url: "/api/v1/AD0101G1S0",
            data: {vhcId: selectedRow.vhcId},
            callback: function (res) {
            	caller.gridView1.setData(res);
            	var list = res.list;
            	
            	for(var i = 0; i < list.length; i++) {
            		if(list[i].isPos == 'Y') {
            			caller.gridView1.target.select(i);
            		}
            	}
            	
            },
        });
    }
});

/********************************************************************************************************************/

/******************************************* 페이지 처음 로딩시 호출 ******************************************************/
fnObj.pageStart = function () {
	var _this = this;
	
    this.pageButtonView.initView();
    this.searchView0.initView();
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
            "search": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            },
            "save": function () {
        		ACTIONS.dispatch(ACTIONS.PAGE_SAVE);
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
            target: $('[data-ax5grid="gridView0"]'),
            columns: [
                {key: "vhcId",		label: ADMIN("ax.admin.BM0103F0.vhcId"),		width: 65,	align: "center",		sortable: true},
                {key: "vhcNo",		label: ADMIN("ax.admin.BM0103F0.vhcNo"),		width: 90,	align: "center",		sortable: true},
                {key: "adRout",		label: "운행노선",									width: 70,	align: "center"},
            	{key: "adLvlNm",	label: "광고등급",									width: 70,	align: "center"},
                {key: "chasNo", 	label: ADMIN("ax.admin.BM0103F0.chasNo"),		width: 130,	align: "center"},
                {key: "corpNm",		label: ADMIN("ax.admin.BM0103F0.corpId"),		width: 120,	align: "center"},
                {key: "areaNm",		label: ADMIN("ax.admin.BM0103F0.area"),			width: 110, align: "center"},
                {key: "makerNm",	label: ADMIN("ax.admin.BM0103F0.maker"),		width: 90,	align: "center"},
                {key: "relsDate",	label: ADMIN("ax.admin.BM0103F0.relsDate"),		width: 80,	align: "center"},
                {key: "modelNm",	label: ADMIN("ax.admin.BM0103F0.modelNm"),		width: 100,	align: "center"},
                {key: "vhcKindNm",	label: ADMIN("ax.admin.BM0103F0.vhcKind"),		width: 80,	align: "center"},
                {key: "vhcTypeNm",	label: ADMIN("ax.admin.BM0103F0.vhcType"),		width: 70,	align: "center"},
                {key: "lfYnNm",		label: ADMIN("ax.admin.BM0103F0.lfYn"),			width: 120,	align: "center"},
                {key: "vhcFuelNm",	label: ADMIN("ax.admin.BM0103F0.vhcFuel"),		width: 50,	align: "center"},
                {key: "useYn",		label: ADMIN("ax.admin.BM0103F0.useYn"),		width: 70,	align: "center"},
                {key: "remark",		label: ADMIN("ax.admin.BM0103F0.remark"),		width: 100},
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
    		if(this.target.list[i].vhcId == id) {
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
        	multipleSelect : true,
        	showRowSelector: true,
            target: $('[data-ax5grid="gridView1"]'),
            columns: [
                {key: "adPosType",		label: ADMIN("ax.admin.AD0101G1.ad.type"),		width: 65,	align: "center"},
                {key: "adPosNm",		label: ADMIN("ax.admin.AD0101G1.ad.loc"),		width: 120,	},
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
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
    selectAll: function(flag) {
    	this.target.selectAll({selected: flag});
    }
});

