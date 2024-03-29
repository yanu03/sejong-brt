var fnObj = {}, CODE = {};

/***************************************** 전역 변수 초기화 ******************************************************/
isUpdate = false;
selectedRow = null;
/*************************************************************************************************************/

/***************************************** 이벤트 처리 코드 ******************************************************/
var ACTIONS = axboot.actionExtend(fnObj, {
	PAGE_SEARCH: function (caller, act, data) {
    	var filter = $.extend({}, caller.searchView0.getData());
    	
        axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0204G0S0",
            data: filter,
            callback: function (res) {
                	caller.gridView0.setData(res);             
	            }
	        });

        return false;
    },
   
    PAGE_EXCEL: function(caller, act, data) {
		caller.gridView0.target.exportExcel("OBE 목록_" + new Date().yyyymmdd() + ".xls");
    },
    
    PAGE_CLOSE: function(caller, act, data) {
    	window.parent.fnObj.tabView.closeActiveTab();
    },
    
    // gridView0항목 클릭 이벤트
    ITEM_CLICK: function (caller, act, data) {
    	selectedRow = data;
    },
    
});
/********************************************************************************************************************/

/******************************************* 페이지 처음 로딩시 호출 ******************************************************/
fnObj.pageStart = function () {
	var _this = this;
	
    this.pageButtonView.initView();
    this.searchView0.initView();
    this.gridView0.initView();
    
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
        	lineNumberColumnWidth: 30,
            frozenColumnIndex: 0,
            target: $('[data-ax5grid="gridView0"]'),
            	 columns: [
            		 {key: "mngId", label: ADMIN("ax.admin.BM0204G0.obeid"), align:"center" , sortable: true, width: 100},
                     {key: "vhcNo", label: ADMIN("ax.admin.BM0103F0.vhcNo"), align:"center" , sortable: true, width: 100},
                     {key: "corpNm", label: ADMIN("ax.admin.BM0101F0.corp.name"), align:"center" , width: 150},
                     {key: "gps", label: ADMIN("ax.admin.BM0204G0.gps"), align:"center" , width: 100 , styleClass:function(){return (this.item.gps === "정상") ?  "grid-cell-red":"grid-cell-blue" }},
                     {key: "lati", label: ADMIN("ax.admin.BM0204G0.lati"), align:"right", width: 100},
                     {key: "longi", label: ADMIN("ax.admin.BM0204G0.longi"), align:"right", width: 100},
                     {key: "spd", label: ADMIN("ax.admin.BM0204G0.spd"), align:"right", width: 100},
                     {key: "heading", label: ADMIN("ax.admin.BM0204G0.heading"), align:"right", width: 100},
                     {key: "sendDate", label: ADMIN("ax.admin.BM0204G0.send.date"), align:"center", width: 150},
                     {key: "remark", label: ADMIN("ax.admin.BM0103F0.remark"), width: 400},
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
    		if(this.target.list[i].dvcId == id) {
    			this.selectRow(i);
    			break;
    		}
    	}
    	
    	if(i == length) {
    		isUpdate = false;
    	}
    },
    selectAll: function(flag) {
    	this.target.selectAll({selected: flag});
    }
});