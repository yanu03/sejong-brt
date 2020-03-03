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
            url: "/api/v1/BM0203G0S0",
            data: filter,
            callback: function (res) {
                caller.gridView0.setData(res);
                
                if(res.list.length == 0) {
	                caller.gridView1.clear();
                }else{
	                if(selectedRow != null) {
		                	caller.gridView0.selectRow(selectedRow.__index);
		                } else {
		                	caller.gridView0.selectFirstRow();
		                }
                }
	            }
	        });

        return false;
    },
   //아직 고쳐야함
    PAGE_EXCEL: function(caller, act, data) {
    	if(selectedRow != null){   		
    		caller.gridView0.target.exportExcel("차량목록"+selectedRow.vhcId + "data.xls");
    	}else {
            if(selectedRowG1 != null){
            	caller.gridView1.target.exportExcel("장치목록"+selectedRowG1.dvcId + "data.xls");
            }else{ 		
    		alert("장치 목록을 선택해주세요");
            }
    	}
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
    	axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0203G1S0",
            data: {vhcId: selectedRow.vhcId},
            callback: function (res) {
                caller.gridView1.setData(res);
              
             //버스이미지 및 정상 비정상 이미지 넣는곳
             /*if(res.list[0].txtVal1 != null){
                for(var i = 0; i < res.list.length; i++){                	
                	var dvcCond;
                	if(typeof res.list[i].txtVal1 !== "undefined"){
                		if(res.list[i].dvcCond == "정상"){
                			dvcCond = "#00FF00";
                		}else{
                			if(typeof res.list[i].dvcCond !== "undefined"){
                				dvcCond = "#DC143C";            				
                			}else{
                				dvcCond = "##00ff0000";
                			}
                		}
                $("#check").append("<div id='busCheck' style='background-color:"+dvcCond+"; width:22px;height:22px; border-radius:11px; position: absolute; left:"+res.list[i].txtVal1+"px; top:"+res.list[i].txtVal2+"px;]'/>");
                		}else{
                			alert(LANG("ax.script.requireselect"));
                		}
                	}              	
               }*/
                	if(dataFlag) {
	                	caller.gridView1.selectIdRow(data);
	                } 
		                /*if(selectedRowG1 != null) {
		                	caller.gridView1.selectRow(selectedRowG1.__index);
		                } else {
		                	caller.gridView1.selectFirstRow();
		                }*/
            }
        });    	
    	
    },
    
    PAGE_CLOSE: function(caller, act, data) {
    	window.parent.fnObj.tabView.closeActiveTab();
    },
    
    GRID_COLOR : function(caller, act , data){
    	$("#dvcCond").css({
    		"background-color" : "red"
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
            frozenColumnIndex: 1,
            target: $('[data-ax5grid="gridView0"]'),
            	 columns: [
            		 {key: "dlCdNm", label: ADMIN("ax.admin.BM0203G0.dvccond"), sortable: true, align:"center" , width: 80 ,styleClass:function(){return (this.item.dlCdNm === "정상") ?   "grid-cell-red":"grid-cell-blue" }},
            		 {key: "vhcId", label: ADMIN("ax.admin.BM0103F0.vhcId"), align:"center", sortable: true, width: 80},
                     {key: "vhcNo", label: ADMIN("ax.admin.BM0103F0.vhcNo"), align:"center", sortable: true, width: 120},
                     {key: "chasNo", label: ADMIN("ax.admin.BM0103F0.chasNo"), align:"center", sortable: true, width: 120},
                     {key: "corpNm", label: ADMIN("ax.admin.BM0101F0.corp.name"), sortable: true, width: 120},
                     {key: "area", label: ADMIN("ax.admin.BM0103F0.area"), width: 120},
                     {key: "maker", label: ADMIN("ax.admin.BM0103F0.maker"), width: 120},
                     {key: "relsDate", label: ADMIN("ax.admin.BM0103F0.relsDate"), align:"center", width: 120},
                     {key: "modelNm", label: ADMIN("ax.admin.BM0103F0.modelNm"), width: 120},
                     {key: "vhcKind", label: ADMIN("ax.admin.BM0103F0.vhcKind"), align:"center", width: 120},
                     {key: "vhcType", label: ADMIN("ax.admin.BM0103F0.vhcType"), align:"center", width: 120},
                     {key: "lfYn", label: ADMIN("ax.admin.BM0103F0.lfYn"), align:"center", width: 80},
                     {key: "vhcFuel", label: ADMIN("ax.admin.BM0103F0.vhcFuel"), align:"center", width: 80},
                     {key: "useYn", label: ADMIN("ax.admin.BM0103F0.useYn"), width: 80},
                     {key: "remark", label: ADMIN("ax.admin.BM0103F0.remark"), width: 200},
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
        	lineNumberColumnWidth: 30,
        	frozenColumnIndex: 1,
            target: $('[data-ax5grid="gridView1"]'),
            columns: [
            	{key: "dvcCond", label: ADMIN("ax.admin.BM0203G0.dvccond"), id:"dvcCond",align:"center", sortable: true, width: 80 , styleClass:function(){return (this.item.dvcCond === "정상") ?   "grid-cell-red":"grid-cell-blue" }},
            	{key: "instLoc", label: ADMIN("ax.admin.BM0201F0.instloc"), sortable: true, width: 100},
            	{key: "dvcId", label: ADMIN("ax.admin.BM0201F0.dvcid"), align:"center", sortable: true, width: 80},
            	{key: "maker", label: ADMIN("ax.admin.BM0201F0.maker"), width: 100},
                {key: "dvcKind", label: ADMIN("ax.admin.BM0201F0.dvckind"), sortable: true, width: 130},
                {key: "mngId", label: ADMIN("ax.admin.BM0201F0.mngid"), align:"center", width: 150},
                {key: "dvcIp", label: ADMIN("ax.admin.BM0201F0.dvcip"), width: 150},
                {key: "remark", label: ADMIN("ax.admin.BM0201F0.remark"), width: 200},
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