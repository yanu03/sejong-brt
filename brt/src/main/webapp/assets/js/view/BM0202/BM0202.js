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
    
    PAGE_SEARCH_G2: function (caller, act, data) {

    	var dataFlag = typeof data !== "undefined";
    	var gridData = caller.gridView1.getData();
    	gridData["dvcId"] = selectedRowG1.dvcId;
    	var gridDvcId = gridData["dvcId"];
    	var filterG2 = $.extend({}, caller.searchView1.getData());
    	filterG2.gridDvcId = gridDvcId;
    	
        axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0202G2S1",
            data: filterG2,
            callback: function (res) {
                caller.gridView2.setData(res);         
	               
	                if(selectedRow != null) {
		                	caller.gridView2.selectRow(selectedRow.__index);
		                } else {
		                	caller.gridView2.selectFirstRow();
		                }
	                
	            }
	        });

        return false;
    },
    
    PAGE_DELETE: function(caller, act, data) {
    	var grid = caller.gridView1.target;
    	
    	if(typeof grid.selectedDataIndexs[0] === "undefined") {
    		axDialog.alert(LANG("ax.script.alert.requireselect"));
    		return false;
    	}
    	
    	if(selectedRowG2 != null){
    	axDialog.confirm({
            msg: LANG("ax.script.deleteconfirm")
        }, function() {
      	
            if (this.key == "ok") {
            	axboot.promise()
                .then(function (ok, fail, data) {
	            	axboot.ajax({
	                    type: "POST",
	                    url: "/api/v1/BM0202G2D0",
	                    data: JSON.stringify({seq : selectedRowG2.seq}),
	                    callback: function (res) {
	                        ok(res);
	                    }
	                });
                })
                .then(function (ok) {
                	axToast.push(LANG("ondelete"));
                })
               .catch(function () {

                });
            	ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            }
        });
    	}else{
    		axDialog.alert("삭제하실 장치이력이 없습니다.");
    	}
    },
    
    PAGE_EXCEL: function(caller, act, data) {
    	if(selectedRow != null){   		
    		caller.gridView2.target.exportExcel(selectedRow.conId + "data.xls");
    	}else {
    		axDialog.alert("장치목록을 선택해주세요.");
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
    	isPlus = false;
    	selectedRowG1 = data;
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
                 {
                	if(dataFlag) {
	                	caller.gridView1.selectIdRow(data);
	                } 
		                if(selectedRowG1 != null) {
		                	caller.gridView1.selectRow(selectedRowG1.__index);
		                } else {
		                	caller.gridView1.selectFirstRow();
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
            		useYn = false;
            	}else{
            		for(var i = 0; i < res.list.length; i++){
            			if(res.list[i].workType == "폐기"){
            				useYn = true;
            				console.log("여기");
            				break;
            			}else{
            				useYn = false;
            			}
            		}
            	}
                
                	if(dataFlag) {
	                	caller.gridView2.selectIdRow(data);
	                	
	                }if(selectedRowG2 != null) {
	                	caller.gridView2.selectRow(selectedRowG2.__index);
	                } else {
	                	caller.gridView2.selectFirstRow();
	                }	                
	                caller.gridView2.setData(res);
            }
        });
    },
    OPEN_BM0202_MODAL_NEW: function(caller, act, data) {
    	var formData = caller.gridView1.getData();
    	formData["dvcId"] = selectedRowG1.dvcId;
    	formData["dvcKind"] = selectedRowG1.dvcKind;

    	var formDataDvcId = formData["dvcId"];
    	var formDataDvcKind = formData["dvcKind"];
    	
    		axboot.modal.open({
    			modalType: "BM0202",
    			param: "",
    			header:false,
    			sendData : function (){
    				return {
    					"dvcId" : formDataDvcId,
    					"dvcKind" : formDataDvcKind,
    				};
    			},
    			callback: function (data) {
    				selectedRowG1.dvcId = formDataDvcId;
    				ACTIONS.dispatch(ACTIONS.RELOAD_G1 , data);
    			}
    		});   	
    },
    
    OPEN_BM0202_MODAL_UPDATE: function(caller, act, data) {
    	var formData = caller.gridView1.getData();
    	var formDataHist = caller.gridView2.getData();
    	formData["dvcId"] = selectedRowG1.dvcId;
    	formData["dvcKind"] = selectedRowG1.dvcKind;
    	if(selectedRowG2 != null){
    	formDataHist["devSerialNo"] = selectedRowG2.devSerialNo;
    	formDataHist["aplyDate"] = selectedRowG2.aplyDate;
    	formDataHist["modelNm"] = selectedRowG2.modelNm;
    	//dl_cd_nm 값 -> code값으로 변경 (modal의 select box값을 변환시켜주기 위해)
    	formDataHist["workType"] = selectedRowG2.workTypeCd;
    	formDataHist["workAmt"] = selectedRowG2.workAmt;
    	formDataHist["remark"] = selectedRowG2.remark;
    	formDataHist["seq"] = selectedRowG2.seq;
    	
    	if(selectedRowG2 != null){
    		axboot.modal.open({
    			modalType: "BM0202",
    			param: "",
    			header:false,
    			sendData : function (){
    				return {
    					"dvcId" : formData["dvcId"],
    					"dvcKind" : formData["dvcKind"],
    					"devSerialNo" : formDataHist["devSerialNo"],
    					"aplyDate" : formDataHist["aplyDate"],
    					"modelNm" : formDataHist["modelNm"],
    					"workType" : formDataHist["workType"],
    					"workAmt" : formDataHist["workAmt"],
    					"remark" : formDataHist["remark"],
    					"seq"    : formDataHist["seq"]
    				};
    			},
    			callback: function (data) {
    				ACTIONS.dispatch(ACTIONS.RELOAD_G1 , data);
    			}
    		});
    	}else{
    		axDialog.alert(LANG("ax.script.requireselect"));
    	}
    	}else{
    		axDialog.alert("장치 이력이 없습니다 장치이력을 추가해주세요.");
    	}
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
            "searchDate" : function(){
            	ACTIONS.dispatch(ACTIONS.PAGE_SEARCH_G2);
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
        this.target.attr("onsubmit", "return ACTIONS.dispatch(ACTIONS.PAGE_SEARCH_G2);");
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
            		 {key: "vhcId", label: ADMIN("ax.admin.BM0103F0.vhcId"), sortable: true, width: 70},
                     {key: "vhcNo", label: ADMIN("ax.admin.BM0103F0.vhcNo"), align: "center", width: 120},
                     {key: "chasNo", label: ADMIN("ax.admin.BM0103F0.chasNo"), width: 150},
                     {key: "corpNm", label: ADMIN("ax.admin.BM0101F0.corp.name"), width: 120},
                     {key: "area", label: ADMIN("ax.admin.BM0103F0.area"), align: "center", width: 120},
                     {key: "maker", label: ADMIN("ax.admin.BM0103F0.maker"), align: "center", width: 120},
                     {key: "relsDate", label: ADMIN("ax.admin.BM0103F0.relsDate"), sortable: true, width: 120},
                     {key: "modelNm", label: ADMIN("ax.admin.BM0103F0.modelNm"), align: "center", width: 120},
                     {key: "vhcKind", label: ADMIN("ax.admin.BM0103F0.vhcKind"), align: "center", width: 100},
                     {key: "vhcType", label: ADMIN("ax.admin.BM0103F0.vhcType"), align: "center", width: 100},
                     {key: "lfYn", label: ADMIN("ax.admin.BM0103F0.lfYn"), align: "center", width: 70},
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
            	{key: "devSerialNo", label: ADMIN("ax.admin.BM0202G2.devserialno"), align: "center", sortable: true, width: 100},
            	{key: "modelNm", label: ADMIN("ax.admin.BM0202G2.modelnm"), align: "center", width: 80},
                {key: "workType", label: ADMIN("ax.admin.BM0202G2.worktype"), align: "center" ,sortable: true, width: 80},
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