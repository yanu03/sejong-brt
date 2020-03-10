var fnObj = {}, CODE = {};

/***************************************** 전역 변수 초기화 ******************************************************/
var selectedRow = null;
/*************************************************************************************************************/

/***************************************** 이벤트 처리 코드 ******************************************************/
var ACTIONS = axboot.actionExtend(fnObj, {
	PAGE_SEARCH: function (caller, act, data) {
		var dataFlag = typeof data !== "undefined";
    	var filter = $.extend({}, caller.searchView0.getData());

        axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0801G0S0",
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
            }
        });
        
        return false;
    },
    
    RELOAD_G1: function(caller, act, data) {
    	axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0801G1S0",
            data: {conId: data},
            callback: function (res) {
                caller.gridView1.setData(res);
            }
        });
    },
   
    PAGE_EXCEL: function(caller, act, data) {
		caller.gridView0.target.exportExcel("홍보집계_" + new Date().yyyymmdd() + ".xls");
    },
    
    PAGE_UPDATE_LOG: function(caller, act, data) {
    	axDialog.confirm({
            msg: "갱신하시겠습니까?"
        }, function() {
        	if (this.key == "ok") {
        		axboot.promise()
	    	        .then(function (ok, fail, data) {
	    	        	axboot.ajax({
	    	                type: "POST",
	    	                url: "/api/v1/insertAdLog",
	    	                data: null,
	    	                callback: function (res) {
	                    		ok(res);	                    		
	    	                }
	    	            });
	    	        })
	    	        .then(function (ok) {
	    	            ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
	    	        })
	    	        .catch(function () {
	    	        });
        	}
        });
    },
    
    PAGE_CLOSE: function(caller, act, data) {
    	window.parent.fnObj.tabView.closeActiveTab();
    },
    
    // gridView0항목 클릭 이벤트
    ITEM_CLICK: function (caller, act, data) {
    	selectedRow = data;
    	ACTIONS.dispatch(ACTIONS.RELOAD_G1, data.conId);
    },
    
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
            	selectedRow = null;
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            },
            "interface": function() {
            	ACTIONS.dispatch(ACTIONS.PAGE_UPDATE_LOG);
            },
            "excel": function () {
            	ACTIONS.dispatch(ACTIONS.PAGE_EXCEL);
            },
            "close": function() {
            	ACTIONS.dispatch(ACTIONS.PAGE_CLOSE);
            },
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
            target: $('[data-ax5grid="gridView0"]'),
            	 columns: [
            		 {key: "vhcNo", label: ADMIN("ax.admin.BM0801G0.vhc.no"), sortable: true, width: 100, align: "center"},
            		 {key: "conId", label: ADMIN("ax.admin.BM0801G0.con.id"), sortable: true, width: 80, align: "center"},
                     {key: "conNm", label: ADMIN("ax.admin.BM0801G0.con.nm"), sortable: true, align:"left", width: 140},
                     {key: "countTotal", label: ADMIN("ax.admin.BM0801G0.count.total"), width: 100, align: "center"},
                     {key: "countVoice", label: ADMIN("ax.admin.BM0801G0.count.voice"),width: 100, align: "center"},
                     {key: "countImage", label: ADMIN("ax.admin.BM0801G0.count.image"),width: 100, align: "center"},
                     {key: "countVideo", label: ADMIN("ax.admin.BM0801G0.count.video"),width: 100, align: "center"},
                 ],
            
            body: {
            	mergeCells: ["vhcNo"],
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
    		if(this.target.list[i].conId == id) {
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
            frozenColumnIndex: 0,
            target: $('[data-ax5grid="gridView1"]'),
            	 columns: [
            		 {key: "playDate", label: ADMIN("ax.admin.BM0801G1.play.date"), sortable: true, width: 140, align: "center"},
            		 {key: "id", label: ADMIN("ax.admin.BM0801G1.id"), width: 80, align: "center"},
                     {key: "adType", label: ADMIN("ax.admin.BM0801G1.ad.type"), width: 80, align: "center"},
                     {key: "adNm", label: ADMIN("ax.admin.BM0801G1.ad.nm"), width: 120},
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