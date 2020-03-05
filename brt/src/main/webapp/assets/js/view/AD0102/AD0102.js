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
            url: "/api/v1/BM0201G0S0",
            data: filter,
            callback: function (res) {
            	console.log(res);
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
            	axDialog.alert("장치 목록을 선택해주세요");
            }
    	}
    },
    
    PAGE_SAVE: function (caller, act, data) {
    	console.log("save");
    	var list = caller.gridView1.getData();
    	var checkData = {};
    	checkData.upList = list;
    	checkData.vhcId = selectedRow.vhcId;
    	console.log(checkData);
    	
            axboot.promise()
                .then(function (ok, fail, data) {
                    axboot.ajax({
                        type: "POST",
                        url: "/api/v1/AD0102G1I0",
                        data: JSON.stringify(checkData),
                        callback: function (res) {
                            ok(res);
                        }
                    });
                })
                .then(function (ok, fail, data) {
            		axToast.push(LANG("onsave"));
            		ACTIONS.dispatch(ACTIONS.PAGE_SEARCH , data.message);
                   isUpdate = true;
                })
                .catch(function () {

                });
   	 console.log("끝");
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
            url: "/api/v1/AD0102G1S0",
            data: {vhcId: selectedRow.vhcId},
            callback: function (res) {
                console.log(res);
                console.log(dataFlag);
                caller.gridView1.setData(res);
                	if(dataFlag) {
	                	caller.gridView1.selectIdRow(data);
	                	console.log(data);
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
            "save": function () {
            	ACTIONS.dispatch(ACTIONS.PAGE_SAVE);
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
            		 {key: "useYn", label: ADMIN("ax.admin.BM0103F0.useYn"), sortable: true, align:"center", styleClass:function(){return (this.item.useYn === "Y") ? "grid-cell-red": "grid-cell-blue" } , width: 80},
            		 {key: "vhcId", label: ADMIN("ax.admin.BM0103F0.vhcId"), sortable: true, width: 70},
                     {key: "vhcNo", label: ADMIN("ax.admin.BM0103F0.vhcNo"), align:"center", width: 120},
                     {key: "chasNo", label: ADMIN("ax.admin.BM0103F0.chasNo"), width: 150},
                     {key: "corpNm", label: ADMIN("ax.admin.BM0101F0.corp.name"), width: 120},
                     {key: "area", label: ADMIN("ax.admin.BM0103F0.area"), align:"center", width: 120},
                     {key: "maker", label: ADMIN("ax.admin.BM0103F0.maker"), align:"center", width: 120},
                     {key: "relsDate", label: ADMIN("ax.admin.BM0103F0.relsDate"), sortable: true, width: 120},
                     {key: "modelNm", label: ADMIN("ax.admin.BM0103F0.modelNm"), align:"center", width: 120},
                     {key: "vhcKind", label: ADMIN("ax.admin.BM0103F0.vhcKind"), align:"center", width: 100},
                     {key: "vhcType", label: ADMIN("ax.admin.BM0103F0.vhcType"), align:"center", width: 100},
                     {key: "lfYn", label: ADMIN("ax.admin.BM0103F0.lfYn"), align:"center", width: 70},
                     {key: "vhcFuel", label: ADMIN("ax.admin.BM0103F0.vhcFuel"), align:"center", width: 70},
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
            	{key: "adPosYn",  label: ADMIN("ax.admin.AD0102G1.adpos"), sortable: true, align: "center", editor:{type:"checkbox"}, width: 70},
                {key: "txtVal1", label: ADMIN("ax.admin.AD0102G1.txtval1"), align: "center", sortable: true,  width: 120},
                {key: "dlCdNm", label: ADMIN("ax.admin.AD0102G1.dlcdnm"), align: "center", sortable: true,  width: 168},
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