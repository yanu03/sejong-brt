var fnObj = {}, CODE = {};

/***************************************** 전역 변수 초기화 ******************************************************/
isUpdate = false;
selectedRow = null;
selectedRowG1 = null;
selectedLoc = null;
/*************************************************************************************************************/

/***************************************** 이벤트 처리 코드 ******************************************************/
var ACTIONS = axboot.actionExtend(fnObj, {
	PAGE_SEARCH: function (caller, act, data) {
    	// 새로운 레코드 추가할 시 검색어 삭제
    	var dataFlag = typeof data !== "undefined";
    	var filter = $.extend({}, caller.searchView0.getData());
    	
        axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0802G0S0",
            data: filter,
            callback: function (res) {
                caller.gridView0.setData(res);             
	               
	                if(selectedRow != null) {
		                	caller.gridView0.selectRow(selectedRow.__index);
		                } else {
		                	caller.gridView0.selectFirstRow();
		                }
	                
	            }
	        });

        return false;
    },
   //아직 고쳐야함
    PAGE_EXCEL: function(caller, act, data) {
    	caller.gridView1.target.exportExcel("운행이력 목록_" + new Date().yyyymmdd() + ".xls");
    },
    // gridView0항목 클릭 이벤트
    ITEM_CLICK: function (caller, act, data) {
    	selectedRow = data;
    	selectedRowG1 = null;
    	ACTIONS.dispatch(ACTIONS.RELOAD_G1);
    },
    
 // gridView1 항목 클릭 이벤트
    ITEM_CLICK_G1: function(caller, act, data) {
    	isUpdate = true;
    	selectedRow = null;
    	selectedRowG1 = data;
    },
    
    RELOAD_G1: function(caller, act, data) {
    	var dataFlag = typeof data !== "undefined";
    	console.log("vhcId");
    	console.log(selectedRow.vhcId);
    	axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0802G1S0",
            data: {vhcId: selectedRow.vhcId},
            callback: function (res) {
            	for(var i =0; i<res.list.length; i++){
            		if(res.list[i].lati == "0E-8"){
            			res.list[i].lati = "0";
            		}
            		if(res.list[i].longi == "0E-8"){
            			res.list[i].longi = "0";
            		}
            	}
            	
                caller.gridView1.setData(res);
              
                	if(dataFlag) {
	                	caller.gridView1.selectIdRow(data);
	                } 
            }
        });    	
    	
    },
    
    PAGE_CLOSE: function(caller, act, data) {
    	window.parent.fnObj.tabView.closeActiveTab();
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
            		 {key: "vhcNo", label: ADMIN("ax.admin.BM0802G0.vhcno"), sortable: true, align:"center" , width: 100},
            		 {key: "chasNo", label: ADMIN("ax.admin.BM0802G0.chasno"), align:"center", sortable: true, width: 120},
                     {key: "modelNm", label: ADMIN("ax.admin.BM0802G0.modelnm"), align:"center", sortable: true, width: 120},
                     {key: "vhcKind", label: ADMIN("ax.admin.BM0802G0.vhckind"), align:"center", sortable: true, width: 120},
                     {key: "vhcType", label: ADMIN("ax.admin.BM0802G0.vhctype"), align:"center", sortable: true, width: 120},
                     {key: "lfYn", label: ADMIN("ax.admin.BM0802G0.lfyn"), align:"center",width: 120},
                     {key: "vhcFuel", label: ADMIN("ax.admin.BM0802G0.vhcfuel"), align:"center", width: 100},
                     {key: "maker", label: ADMIN("ax.admin.BM0802G0.maker"), align:"center", width: 120},
                     {key: "area", label: ADMIN("ax.admin.BM0802G0.area"), align:"center", width: 120},
                     {key: "remark", label: ADMIN("ax.admin.BM0802G0.remark"), align:"center", width: 250},
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
    		if(this.target.list[i].vhcId == id) {
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
            	{key: "lati", label: ADMIN("ax.admin.BM0802G1.lati"),align:"right", sortable: true, width: 120},
            	{key: "longi", label: ADMIN("ax.admin.BM0802G1.longi"), align:"right", sortable: true, width: 120},
            	{key: "spd", label: ADMIN("ax.admin.BM0802G1.spd"), align:"right", sortable: true, width: 120},
            	{key: "heading", label: ADMIN("ax.admin.BM0802G1.heading"), align:"right", width: 120},
                {key: "sendDate", label: ADMIN("ax.admin.BM0802G1.regi.date"), align:"center", sortable: true, width: 150},
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
        	ACTIONS.dispatch(ACTIONS.ITEM_CLICK_G1, data);
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