var fnObj = {}, CODE = {};

/***************************************** 전역 변수 초기화 ******************************************************/
isUpdate = false;
selectedRow = null;
selectedRowG1 = null;
selectType = null;
/*************************************************************************************************************/

/***************************************** 이벤트 처리 코드 ******************************************************/
var ACTIONS = axboot.actionExtend(fnObj, {
	PAGE_SEARCH: function (caller, act, data) {
    	// 새로운 레코드 추가할 시 검색어 삭제
    	var dataFlag = typeof data !== "undefined";
    	var filter = $.extend({}, caller.searchView0.getData());   	
    	
        axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0601F0S0",
            data: filter,
            callback: function (res) {
            	console.log(res.list[0].skyCondCode);
                caller.formView0.setData(res.list[0]);
                console.log(res);
                if($("#weatImage").val() == null){
                	$("#weatImg").append("<input type='image' id='weatImage' value='image' src='/assets/images/BM0601/"+res.list[0].skyCondCode+".png' style='padding-left:150px;' disabled='disabled'/>");
                	ACTIONS.dispatch(ACTIONS.RELOAD_G1);             
                }else{
                	ACTIONS.dispatch(ACTIONS.RELOAD_G1);
                	}
	            }
	        });
        
        return false;
    },
    
    PAGE_SEARCH_G2: function (caller, act, data) {
    	var dataFlag = typeof data !== "undefined";
    	var filter = $.extend({}, caller.searchView1.getData());
    	
    	if(selectType == "weat"){
        axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0601G2S1",
            data: filter,
            callback: function (res) {
                caller.gridView2.setData(res);         	               
	                if(selectedRowG1 != null) {
		                	caller.gridView2.selectRow(selectedRowG1.__index);
		                } else {
		                	caller.gridView2.selectFirstRow();
		                }
	                
	            }
	        });
    	}else{
    		axboot.ajax({
                type: "GET",
                url: "/api/v1/BM0601G2S2",
                data: filter,
                callback: function (res) {
                    caller.gridView2.setData(res);         	               
    	                if(selectedRowG1 != null) {
    		                	caller.gridView2.selectRow(selectedRowG1.__index);
    		                } else {
    		                	caller.gridView2.selectFirstRow();
    		                }
    	                
    	            }
    	        });
    	}

        return false;
    },
    
    PAGE_EXCEL: function(caller, act, data) {
    	if(selectedRow != null){   		
    		caller.gridView1.target.exportExcel(selectType + "data.xls");
    	}else if(selectedRowG1 !=null){
    		caller.gridView2.target.exportExcel(selectedRowG1.vhcNo + "data.xls");
    	}else{
    		axDialog.alert(LANG("ax.script.alert.requireselect"));
    	}
    },
    
    // gridView0항목 클릭 이벤트
    ITEM_CLICK: function (caller, act, data) {
    	selectedRow = data;
    	selectedRowG1 = null;
    },
    
 // gridView1 항목 클릭 이벤트
    ITEM_CLICK_G1: function(caller, act, data) {
    	isUpdate = true;
    	selectedRow = null;
    	selectedRowG1 = data;
    },
       
    RELOAD_G1: function(caller, act, data) {
    	var dataFlag = typeof data !== "undefined";
    	var selectWeat = $("select[name='weatAtmo']").val();
    	var filter = $.extend({}, caller.searchView0.getData());
    	
    	
    		
    	   //기상 목록
	    	axboot.ajax({
	            type: "GET",
	            url: "/api/v1/BM0601G1S0",
	            data: filter,
	            callback: function (res) {
	                caller.gridView1.initView();
	                caller.gridView1.setData(res);
	                
	                 {
	                	if(dataFlag) {
		                	caller.gridView1.selectIdRow(data);
		                } 
			                if(selectedRow != null) {
			                	caller.gridView1.selectRow(selectedRow.__index);
			                } else {
			                	caller.gridView1.selectFirstRow();
			                }		                
	                }
	            }
	        });
	    	
	    	//대기 목록
    		axboot.ajax({
                type: "GET",
                url: "/api/v1/BM0601G1S1",
                data: filter,
                callback: function (res) {
                    caller.gridView3.initView();
                    caller.gridView3.setData(res);
                    
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
    	   	
    	ACTIONS.dispatch(ACTIONS.PAGE_SEARCH_G2);
    },
    
    PAGE_CLOSE: function(caller, act, data) {
    	window.parent.fnObj.tabView.closeActiveTab();
    },
    
    OPEN_BM0601_MODAL: function(caller, act, data) {
    	axboot.modal.open({
            modalType: "BM0601",
            param: "",
            callback: function (data) {
            }
        });
    	//ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
    }, 
        
});
/********************************************************************************************************************/

/******************************************* 페이지 처음 로딩시 호출 ******************************************************/
fnObj.pageStart = function () {
	var _this = this;
	selectType = "weat";
	
    this.pageButtonView.initView();
    this.searchView0.initView();
    this.searchView1.initView();
    this.gridView1.initView();
    this.gridView2.initView();
    this.gridView3.initView();
    this.formView0.initView();
    
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
                ACTIONS.dispatch(ACTIONS.RELOAD_G1);
            },
            "excel": function () {
            	ACTIONS.dispatch(ACTIONS.PAGE_EXCEL);
            },
            "close": function() {
            	ACTIONS.dispatch(ACTIONS.PAGE_CLOSE);
            },
            "searchDate" : function(){
            	ACTIONS.dispatch(ACTIONS.PAGE_SEARCH_G2);
            },
            "setting" : function(){
            	ACTIONS.dispatch(ACTIONS.OPEN_BM0601_MODAL);
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
        
        //달력으로 검색하는 기능
        /*this.target.find('[data-ax5picker="date"]').ax5picker({
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
        });*/
        
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
        
    },
    getData: function () {
    	 return {
             pageNumber: this.pageNumber,
             pageSize: this.pageSize,
             filter: this.filter.val()
         }
    }
});

fnObj.formView0 = axboot.viewExtend(axboot.formView, {
    getDefaultData: function () {
        return $.extend({}, axboot.formView.defaultData, {});
    },
    initView: function () {
        this.target = $("#formView0");
        this.model = new ax5.ui.binder();
        this.model.setModel(this.getDefaultData(), this.target);
        this.modelFormatter = new axboot.modelFormatter(this.model); // 모델 포메터 시작
        this.initEvent();
           
    },
    initEvent: function () {
    	//기상 이력 grid
    	$('[data-tab-label="0"]').click(function(){
    		console.log("기상");
    		selectType = "weat";
    		ACTIONS.dispatch(ACTIONS.PAGE_SEARCH_G2);
    	})
    	
    	//대기 이력 grid
    	$('[data-tab-label="1"]').click(function(){
    		console.log("대기");
    		selectType = "atmo";
    		ACTIONS.dispatch(ACTIONS.PAGE_SEARCH_G2);
    	})
    },
    
    getData: function () {
        var data = this.modelFormatter.getClearData(this.model.get()); // 모델의 값을 포멧팅 전 값으로 치환.
        return $.extend({}, data);
    },
    setData: function (data) {

        if (typeof data === "undefined") data = this.getDefaultData();
        data = $.extend({}, data);

        this.model.setModel(data);
        this.modelFormatter.formatting(); // 입력된 값을 포메팅 된 값으로 변경
    },
    validate: function (flag) {
        var rs = this.model.validate();
        if (rs.error) {
        	if(!flag) {
        		alert(LANG("ax.script.form.validate", rs.error[0].jquery.attr("title")));
        	}
            rs.error[0].jquery.focus();
            return false;
        }
        return true;
    },
    enable: function() {
    	this.target.find('[data-ax-path][data-key!=true]').each(function(index, element) {
    		$(element).attr("readonly", false);
    	});
    },
    disable: function() {
    	this.target.find('[data-ax-path][data-key!=true]').each(function(index, element) {
    		$(element).attr("readonly", true);
    	});
    },
    clear: function () {
        this.model.setModel(this.getDefaultData());
        this.target.find('[data-ax-path="key"]').removeAttr("readonly");
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
	            	{key: "renewDt", label: ADMIN("ax.admin.BM0601F0.renewdt"), sortable: true, width: 150},
	            	{key: "notiDt", label: ADMIN("ax.admin.BM0601F0.notiDt"), sortable: true, width: 150},
	            	{key: "skyCond", label: ADMIN("ax.admin.BM0601F0.skycond"), align:"center",width: 100},
	                {key: "tempc", label: ADMIN("ax.admin.BM0601F0.tempc"), align:"right", width: 70},
	                {key: "tempMini", label: ADMIN("ax.admin.BM0601F0.tempmini"),align:"right", width: 70},
	                {key: "tempHigh", label: ADMIN("ax.admin.BM0601F0.temphigh"), align:"right", width: 70},
	                {key: "humi", label: ADMIN("ax.admin.BM0601F0.humi"), align:"right", width: 50},
	                {key: "rainPro", label: ADMIN("ax.admin.BM0601F0.rainpro"), align:"right", width: 70},
	                {key: "rainFall", label: ADMIN("ax.admin.BM0601F0.rainfall"), align:"right", width: 60},
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
    		console.log("데이터없음");
    	} else {
    		console.log("데이터있음");
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
        	lineNumberColumnWidth: 30,
        	frozenColumnIndex: 0,
            target: $('[data-ax5grid="gridView2"]'),
            columns: [
            	{key: "vhcNo", label: ADMIN("ax.admin.BM0103F0.vhcNo"), align:"center", sortable: true, width: 200},
            	{key: "sendDate", label: ADMIN("ax.admin.BM0601G1.senddate"), align:"center",width: 200},
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
 * gridView3
 */
fnObj.gridView3 = axboot.viewExtend(axboot.gridView, {
    page: {
        pageNumber: 0,
        pageSize: 10
    },
      
    initView: function () {
        var _this = this;

        	this.target = axboot.gridBuilder({
        		lineNumberColumnWidth: 30,
	        	frozenColumnIndex: 0,
	            target: $('[data-ax5grid="gridView3"]'),
	            columns: [	            	
	            	{key: "renewDt", label: ADMIN("ax.admin.BM0601F0.renewdt"), sortable: true, width: 150},
	            	{key: "measDt", label: ADMIN("ax.admin.BM0601F0.measdt"), sortable: true, width: 150},
	            	{key: "dustc", label: ADMIN("ax.admin.BM0601F0.dustc"), align:"right", width: 120},
	                {key: "sdc", label: ADMIN("ax.admin.BM0601F0.sdc"), align:"right", width: 120},
	                {key: "cmc", label: ADMIN("ax.admin.BM0601F0.cmc"), align:"right", width: 120},
	                {key: "ozonec", label: ADMIN("ax.admin.BM0601F0.ozonec"), align:"right", width: 120},
	                {key: "ndc", label: ADMIN("ax.admin.BM0601F0.ndc"), align:"right", width: 120},	                	                
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
    		console.log("데이터없음");
    	} else {
    		console.log("데이터있음");
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