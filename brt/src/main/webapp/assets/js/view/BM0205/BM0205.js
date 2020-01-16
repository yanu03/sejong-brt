var fnObj = {}, CODE = {};

/***************************************** 전역 변수 초기화 ******************************************************/
isUpdate = false;
selectedRow = null;
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
    
    
    PAGE_RESERVATION: function(caller, act, data) {
    	if(selectedRow == null) {
    		axDialog.alert(LANG("ax.script.alert.requireselect"));
    		return false;
    	}
    	
        axboot.ajax({
            type: "GET",
            url: "/api/v1/checkDvcReservation",
            data: {
        		dvcId: selectedRow.dvcId,
            },
            callback: function (res) {
                if(res.message == "true") {
	        		// 예약적용일때
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
	        	} else {
	        		axDialog.alert(LANG("ax.script.check.organization"));
	        	}
            }
        });
    },
    
    
    INSERT_RESERVATION: function(caller, act, data) {
    	axboot.promise()
	        .then(function (ok, fail, _data) {
	            axboot.ajax({
	                type: "POST",
	                url: "/api/v1/BM0205Reservation",
	                data: JSON.stringify({
	            		dvcId: selectedRow.dvcId,
	            		modelNm : selectedRow.modelNm
	                }),
	                callback: function (res) {
	                    ok(res);
	                }
	            });
	        })
	        .then(function (ok, fail, data) {
	        })
	        .catch(function () {
	
	        });
    },
    
   
    PAGE_EXCEL: function(caller, act, data) {
    	if(selectedRow != null){   		
    		caller.gridView0.target.exportExcel(selectedRow.dvcId + "data.xls");
    	}else {
    		alert("장치 목록을 선택해주세요");
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
        		ACTIONS.dispatch(ACTIONS.PAGE_RESERVATION);
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
            sortable: true,
            target: $('[data-ax5grid="gridView0"]'),
            
            	 columns: [          		 
            		 {key: "vhcNo", label: ADMIN("ax.admin.BM0103F0.vhcNo"), width: 100},
            		 {key: "vhcKind", label: ADMIN("ax.admin.BM0103F0.vhcKind"), width: 120},
                     {key: "vhcType", label: ADMIN("ax.admin.BM0103F0.vhcType"), width: 120},
                     {key: "maker", label: ADMIN("ax.admin.BM0103F0.maker"), width: 150},
                     {key: "dvcKind", label: ADMIN("ax.admin.BM0201F0.dvckind"), width: 150},
                     {key: "dvcType", label: ADMIN("ax.admin.BM0201F0.dvctype"), width: 150},
                     {key: "modelNm", label: ADMIN("ax.admin.BM0202G2.modelnm"), width: 150},
                     {key: "instLoc", label: ADMIN("ax.admin.BM0201F0.instloc"), width: 150},
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