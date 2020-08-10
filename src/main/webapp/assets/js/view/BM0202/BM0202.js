var fnObj = {}, CODE = {};

/***************************************** 전역 변수 초기화 ******************************************************/
isUpdate = false;
isPlus=false;
useYn=false;
selectedRow = null;
selectedRowG1 = null;
selectedRowG2 = null;
/*************************************************************************************************************/

/***************************************** 이벤트 처리 코드 ******************************************************/
var ACTIONS = axboot.actionExtend(fnObj, {
	PAGE_SEARCH: function (caller, act, data) {
    	// 새로운 레코드 추가할 시 검색어 삭제
    	var dataFlag = typeof data !== "undefined";
    	var filter = $.extend({}, caller.searchView0.getData());
    	
        axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0201G0S0",
            data: filter,
            callback: function (res) {
                caller.gridView0.setData(res);
                
                if(res.list.length == 0) {
                	selectedRow = null;
	                caller.gridView1.clear();
	                caller.gridView2.clear();
                } else {
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
    
    PAGE_EXCEL: function(caller, act, data) {
    	caller.gridView2.target.exportExcel("이력 목록_" + new Date().yyyymmdd() + ".xls");
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
    	isPlus = false;
    	selectedRowG1 = data;
    	selectedRowG2 = null;
    	ACTIONS.dispatch(ACTIONS.RELOAD_G2);
    },
    
 // gridView2 항목 클릭 이벤트
    ITEM_CLICK_G2: function(caller, act, data) {
    	isUpdate = true;
    	selectedRowG2 = data;
    	if(selectedRowG2.workType == "폐기"){
    		isPlus = true;
    	}else{
    		isPlus = false;
    	}
    },
    
    RELOAD_G1: function(caller, act, data) {
    	var dataFlag = typeof data !== "undefined";
    	
    	axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0201G1S0",
            data: {vhcId: selectedRow.vhcId},
            callback: function (res) {
                caller.gridView1.setData(res);
                if(res.list.length == 0) {
                	selectedRowG1 = null;
                	caller.gridView1.clear();
                	caller.gridView2.clear();
                }
                else {
                	if(dataFlag) {
	                	caller.gridView1.selectIdRow(data);
	                } else {
		                if(selectedRowG1 != null) {
		                	caller.gridView1.selectRow(selectedRowG1.__index);
		                } else {
		                	caller.gridView1.selectFirstRow();
		                }
	                }
	                
                }
            }
        });
    },
    
    RELOAD_G2: function(caller, act, data) {
    	var dataFlag = typeof data !== "undefined";
    	axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0202G2S0",
            data: {dvcId: selectedRowG1.dvcId},
            callback: function (res) {
            	if(res.list.length == 0){
            		selectedRowG2 = null;
            		useYn = false;
            	} else {
            		for(var i = 0; i < res.list.length; i++){
            			if(res.list[i].workType == "폐기"){
            				useYn = true;
            				break;
            			}else{
            				useYn = false;
            			}
            		}
            	}
                caller.gridView2.setData(res);
            }
        });
    },
    
    OPEN_BM0202_MODAL_NEW: function(caller, act, data) {
    	if(selectedRowG1 == null) {
    		axDialog.alert(ADMIN("ax.admin.BM0202G2.alert"));
    		return false;
    	}
    	
		axboot.modal.open({
			modalType: "BM0202",
			param: "",
			header:false,
			sendData : function (){
				return {
					"dvcId" : selectedRowG1.dvcId,
					"dvcKind" : selectedRowG1.dvcKind,
				};
			},
			callback: function (data) {
				ACTIONS.dispatch(ACTIONS.RELOAD_G1 , data);
			}
		});   	
    },
    
    OPEN_BM0202_MODAL_UPDATE: function(caller, act, data) {
    	if(selectedRowG1 == null) {
    		axDialog.alert(ADMIN("ax.admin.BM0202G2.alert"));
    		return false;
    	}
    	
    	if(selectedRowG2 == null) {
    		axDialog.alert(LANG("ax.script.alert.requireselect"));
    		return false;
    	}
    	
		axboot.modal.open({
			modalType: "BM0202",
			param: "",
			header:false,
			sendData : function (){
				return {
					"dvcId" : selectedRowG1.dvcId,
					"dvcKind" : selectedRowG1.dvcKind,
					"devSerialNo" : selectedRowG2.devSerialNo,
					"aplyDate" : selectedRowG2.aplyDate,
					"modelNm" : selectedRowG2.modelNm,
					"workType" : selectedRowG2.workTypeCd,
					"workAmt" : selectedRowG2.workAmt,
					"remark" : selectedRowG2.remark,
					"seq"    : selectedRowG2.seq
				};
			},
			callback: function (data) {
				ACTIONS.dispatch(ACTIONS.RELOAD_G1 , data);
			}
		});
    },
    
    PAGE_DELETE: function(caller, act, data) {
    	if(selectedRowG1 == null) {
    		axDialog.alert(ADMIN("ax.admin.BM0202G2.alert"));
    		return false;
    	}
    	
    	if(selectedRowG2 == null) {
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
		                    url: "/api/v1/BM0202G2D0",
		                    data: JSON.stringify({
		                    	dvcId: selectedRowG1.dvcId,
		                    	seq: selectedRowG2.seq
		                    }),
		                    callback: function (res) {
		                        ok(res);
		                    }
		                });
	                })
	                .then(function (ok) {
	                	axToast.push(LANG("ondelete"));
	                	ACTIONS.dispatch(ACTIONS.RELOAD_G2);
	                })
	               .catch(function () {
	
	                });
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
    this.searchView1.initView();
    this.gridView0.initView();
    this.gridView1.initView();
    this.gridView2.initView();
    
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
            "dvcHistDelete": function() {
            	if(useYn){
            		axDialog.alert("폐기된 장치는 추가가 불가합니다.");
            	}else{
            	if(isPlus){
            		axDialog.alert("폐기된 장치는 삭제가 불가합니다.");
            	}else{
            		ACTIONS.dispatch(ACTIONS.PAGE_DELETE);
            	}
            	}
            },
            "close": function() {
            	ACTIONS.dispatch(ACTIONS.PAGE_CLOSE);
            },
            "dvcHistSave" : function(){
            	if(useYn){
            		axDialog.alert("폐기된 장치는 추가가 불가합니다.");
            	}else{
            		if(isPlus){
            			axDialog.alert("폐기된 장치는 추가가 불가합니다.");
            		}else{
            			ACTIONS.dispatch(ACTIONS.OPEN_BM0202_MODAL_NEW);
            		}
            	}
            },
            "dvcHistUpdate" : function(){
            	if(useYn){
            		axDialog.alert("폐기된 장치는 추가가 불가합니다.");
            	}else{
            	if(isPlus){
            		axDialog.alert("폐기된 장치는 수정이 불가합니다.");
            	}else{
            		ACTIONS.dispatch(ACTIONS.OPEN_BM0202_MODAL_UPDATE);
            	}
            	}
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
 * searchView1
 */
fnObj.searchView1 = axboot.viewExtend(axboot.searchView, {
    initView: function () {
        this.target = $(document["searchView1"]);
        this.target.attr("onsubmit", "return ACTIONS.dispatch(ACTIONS.RELOAD_G2);");
        this.filter = $("#filterG2");
        
        this.target.find('[data-ax5picker="date"]').ax5picker({
            direction: "auto",
            content: {
                type: 'date' , 
                config : {
            		mode : "year" , selectMode : "month"
                },
            formatter : {
            	pattern : 'data(month)'
            	}
            }
        });
        
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
            		 {key: "useYn", label: ADMIN("ax.admin.BM0103F0.useYn"), align: "center", sortable: true, styleClass:function(){return (this.item.useYn === "Y") ? "grid-cell-red": "grid-cell-blue" } , width: 80},
            		 {key: "vhcId", label: ADMIN("ax.admin.BM0103F0.vhcId"), align: "center", sortable: true, width: 70},
                     {key: "vhcNo", label: ADMIN("ax.admin.BM0103F0.vhcNo"), align: "center", sortable: true, width: 100},
                     {key: "chasNo", label: ADMIN("ax.admin.BM0103F0.chasNo"), align: "center", width: 150},
                     {key: "corpNm", label: ADMIN("ax.admin.BM0101F0.corp.name"), align: "center", width: 120},
                     {key: "area", label: ADMIN("ax.admin.BM0103F0.area"), align: "center", width: 120},
                     {key: "maker", label: ADMIN("ax.admin.BM0103F0.maker"), align: "center", width: 100},
                     {key: "relsDate", label: ADMIN("ax.admin.BM0103F0.relsDate"), align: "center", width: 100},
                     {key: "modelNm", label: ADMIN("ax.admin.BM0103F0.modelNm"), align: "center", width: 100},
                     {key: "vhcKind", label: ADMIN("ax.admin.BM0103F0.vhcKind"), align: "center", width: 100},
                     {key: "vhcType", label: ADMIN("ax.admin.BM0103F0.vhcType"), align: "center", width: 90},
                     {key: "lfYn", label: ADMIN("ax.admin.BM0103F0.lfYn"), align: "center", width: 120},
                     {key: "vhcFuel", label: ADMIN("ax.admin.BM0103F0.vhcFuel"), align: "center", width: 70},
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
        	frozenColumnIndex: 0,
            target: $('[data-ax5grid="gridView1"]'),
            columns: [
            	{key: "useYn", label: ADMIN("ax.admin.BM0103F0.useYn"), sortable: true, align:"center", styleClass:function(){return (this.item.useYn === "Y") ? "grid-cell-red": "grid-cell-blue" } , width: 80},
            	{key: "dvcId", label: ADMIN("ax.admin.BM0201F0.dvcid"), align: "center", sortable: true, width: 80},
            	{key: "makerCd", label: ADMIN("ax.admin.BM0201F0.maker"), sortable: true, width: 120},
                {key: "dvcKindCd", label: ADMIN("ax.admin.BM0201F0.dvckind"), sortable: true, width: 120},
                {key: "instLocCd", label: ADMIN("ax.admin.BM0201F0.instloc"), width: 100},
                {key: "mngId", label: ADMIN("ax.admin.BM0201F0.mngid"), align: "center", width: 130},
                {key: "dvcIp", label: ADMIN("ax.admin.BM0201F0.dvcip"), align: "right", width: 110},
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

/**
 * gridView2
 */

fnObj.gridView2 = axboot.viewExtend(axboot.gridView, {
    page: {
        pageNumber: 0,
        pageSize: 10
    },
    initView: function () {
        var _this = this;
        this.target = axboot.gridBuilder({
        	frozenColumnIndex: 0,
            target: $('[data-ax5grid="gridView2"]'),
            columns: [
            	{key: "aplyDate", label: ADMIN("ax.admin.BM0202G2.aplydate"), sortable: true, width: 80},
            	{key: "workType", label: ADMIN("ax.admin.BM0202G2.worktype"), align: "center" ,sortable: true, width: 80},
            	{key: "devSerialNo", label: ADMIN("ax.admin.BM0202G2.devserialno"), align: "center", width: 100},
            	{key: "modelNm", label: ADMIN("ax.admin.BM0202G2.modelnm"), align: "center", width: 80},
                {key: "workAmt", label: ADMIN("ax.admin.BM0202G2.workamt"), align: "right", formatter:"money" ,width: 80},
                {key: "remark", label: ADMIN("ax.admin.BM0202G2.remark"), width: 200},
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                    ACTIONS.dispatch(ACTIONS.ITEM_CLICK_G2, this.item);
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
        	ACTIONS.dispatch(ACTIONS.ITEM_CLICK_G2, data);
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