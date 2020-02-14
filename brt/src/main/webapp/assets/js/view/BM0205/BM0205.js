var fnObj = {}, CODE = {};

/***************************************** 전역 변수 초기화 ******************************************************/
isUpdate = false;
selectedRow = null;
date = null;
/*************************************************************************************************************/

/***************************************** 이벤트 처리 코드 ******************************************************/
var ACTIONS = axboot.actionExtend(fnObj, {
	PAGE_SEARCH: function (caller, act, data) {
    	// 새로운 레코드 추가할 시 검색어 삭제
    	var dataFlag = typeof data !== "undefined";
    	var filter = $.extend({}, caller.searchView0.getData());
    	console.log(filter);
    	
        axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0205G0S0",
            data: filter,
            callback: function (res) {
            	console.log(res);
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
    
    RESERVATION_MODAL : function(caller, act , data){
    	if(selectedRow != null){
    		axboot.modal.open({
	            modalType: "RESERVATION",
	            param: "",
	            callback: function (result) {
	            	this.close();
	            	ACTIONS.dispatch(ACTIONS.INSERT_RESERVATION, {
	            		date: result
	            	});
	            }
	        });
    	}else{
    		alert(LANG("ax.script.requireselect"));
    	}
    },
        
    INSERT_RESERVATION: function(caller, act, data) {
    	var list = caller.gridView0.getData("selected");
        listRsv = data.date;
        var data = {};
        data.upList = list;
        data.rsvDate = listRsv;
        var fileValue = $("#dvcFileUp").val().split("\\");
        var attFile = fileValue[fileValue.length-1];
        for(var i = 0; i< data.upList.length; i++){
        	data.upList[i].attFile = attFile;
        }
        console.log("data입니다");
        console.log(data);
    	if(list.length > 0){
	            axboot.ajax({
	                type: "POST",
	                url: "/api/v1/BM0205Reservation",
	                data: JSON.stringify(data),
	                callback: function (res) {
	                }
	            });
    	return false;
    	}else{
    		 alert(LANG("ax.script.requireselect"));
    	}
    	
    	ACTIONS.dispatch(ACTIONS.UPDATE_FILE);
    },
    
    UPDATE_FILE : function(caller , act , data){
    	var fileCheck = $("input[name='dvcFileUp']")[0].files[0].name;
    	var list = caller.gridView0.getData("selected");
    	var formData = new FormData();
    	
    	formData.append("dvcFileUp" , $("input[name='dvcFileUp']")[0].files[0]);   	
    	
    	for(var i = 0; i < list.length;i++){
    		console.log(list[i]);
    		formData.append("upList[" + i + "].dvcId", list[i].dvcId);
    	}
    	
    	if(fileCheck != null){
    		
    		axboot.promise()
            .then(function (ok, fail, data) {
                axboot.ajax({
                    type: "POST",
                    url: "/api/v1/BM0205FileUp",
                    enctype: "multipart/form-data",
                    processData: false,
                    data: formData,
                    callback: function (res) {
                        ok(res);
                    },
                    options: {
                    	contentType:false
                    }
                });
            })
            .then(function (ok, fail, data) {
        		axToast.push(LANG("onadd"));
        		ACTIONS.dispatch(ACTIONS.PAGE_SEARCH, data.message);
                isUpdate = true;
            })
            .catch(function () {

            });
    		
    	}else{
    		alert(LANG("ax.script.requireselect"));
    	}
    },
      
    PAGE_EXCEL: function(caller, act, data) {
    	if(selectedRow != null){   		
    		caller.gridView0.target.exportExcel(selectedRow.dvcId + "data.xls");
    	}else {
    		alert(LANG("ax.script.requireselect"));
    	}
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
        	"reservation": function() {
        		ACTIONS.dispatch(ACTIONS.RESERVATION_MODAL);
        	},
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
        	showLineNumber: true,
        	showRowSelector: true,
        	multipleSelect : true,
            frozenColumnIndex: 0,
            target: $('[data-ax5grid="gridView0"]'),
            
            	 columns: [          		 
            		 {key: "vhcNo", label: ADMIN("ax.admin.BM0103F0.vhcNo"), sortable: true, width: 100},
            		 {key: "vhcKind", label: ADMIN("ax.admin.BM0103F0.vhcKind"), align:"center" ,width: 150},
                     {key: "vhcType", label: ADMIN("ax.admin.BM0103F0.vhcType"), align:"center" ,width: 150},
                     {key: "maker", label: ADMIN("ax.admin.BM0103F0.maker"), align:"center" , width: 170},
                     {key: "mngId", label: ADMIN("ax.admin.BM0205G0.mngid"), align:"center" , sortable: true, width: 170},
                     {key: "dvcId", label: ADMIN("ax.admin.BM0201F0.dvcid"), align:"center" , width: 170},
                     {key: "dvcKind", label: ADMIN("ax.admin.BM0201F0.dvckind"), align:"center" , sortable: true, width: 170},
                     {key: "modelNm", label: ADMIN("ax.admin.BM0202G2.modelnm"), align:"center" , sortable: true, width: 170},
                     {key: "instLoc", label: ADMIN("ax.admin.BM0201F0.instloc"), align:"center" , width: 170},
                 ],
            
            body: {
            	 mergeCells:["vhcNo"]  
                ,onClick: function () {
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