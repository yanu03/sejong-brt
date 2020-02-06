var fnObj = {}, CODE = {};

/***************************************** 전역 변수 초기화 ******************************************************/
isUpdate = false;
selectedRow = null;
selectedRowG1 = null;
/*************************************************************************************************************/

/***************************************** 이벤트 처리 코드 ******************************************************/
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
    	// 새로운 레코드 추가할 시 검색어 삭제
    	var dataFlag = typeof data !== "undefined";
    	var filter = $.extend({}, caller.searchView0.getData());
    	var plusFilter ;
    	var plusRes;
    	
        axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0604G0S0",
            data: filter,
            callback: function (res) {               	        	
                	axboot.ajax({
                    	type: "GET",
                    	url : "/api/v1/BM0604G0S1",
                    	data : filter,
                    	callback : function(resOne){
                    		if(res.list[0] != null || typeof res.list[0] == "undefined"){
                    			for(var i = 0; i<res.list.length; i++){
                    				res.list[i].newsTitle = res.list[i].newsContents;
                    			}
                    			plusRes = res.list.length;
                    			for(var i = res.list.length; i<resOne.list.length; i++){
                    			res.list[i] = resOne.list[i-plusRes];
                    			}
                    		caller.gridView0.setData(res);
                    		}else{
                    			caller.gridView0.setData(resOne);
                    		}
                            	if(dataFlag) {
                            		console.log(dataFlag);
            	                	caller.gridView0.selectIdRow(data);
            	                } else {
            		                if(selectedRowG1 != null) {
            		                	caller.gridView1.selectRow(selectedRow.__index);
            		                } else {
            		                	caller.gridView1.selectFirstRow();
            		                }
            	                }
                    	}
                    })              
                axboot.ajax({
                	type: "GET",
                	url : "/api/v1/BM0604G1S0",
                	data : filter,
                	callback : function(res){
                		caller.gridView1.setData(res);
                	}
                })
            }
        });

        return false;
    },
    
    PAGE_EXCEL: function(caller, act, data) {
    	caller.gridView0.target.exportExcel("data.xls");
    },
    
    PAGE_UPDATE: function(caller, act, data) {
    			isUpdate = false;  	
    				var list = caller.gridView0.getData();
    				var checkData = {};
    				var useYnCount = 0;
    				
    				for(var i = 0; i<list.length; i++){
    					if(list[i].useYn == "true"){
    						useYnCount++;
    					}
    				}
    				checkData.upList = list; 
    				if(useYnCount < 20){
    					axboot.promise()
    					.then(function (ok, fail, data) {
    						axboot.ajax({
    							type: "POST",
    							url: "/api/v1/BM0604F0U0",
    							data: JSON.stringify(checkData),
    							callback: function (res) {
    								ok(res);
    							}
    						});
    					})
    					.then(function (ok, fail, data) {
    						axToast.push(LANG("onupdate"));
    						ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
    						isUpdate = true;
    					})
    					.catch(function () {
    						
    					});   					
    				}else{
    					axDialog.alert(LANG("ax.script.alert.usecheck"));
    				}
    },    
    // 탭닫기
    PAGE_CLOSE: function(caller, act, data) {
    	window.parent.fnObj.tabView.closeActiveTab();
    },
    
    ITEM_CLICK: function (caller, act, data) {
    	isUpdate = true;
    	selectedRow = data;
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
            "save": function () {
            	console.log("저장입니다.");
            	ACTIONS.dispatch(ACTIONS.PAGE_UPDATE);
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
            filter: this.filter.val()
        }
    },
    clear: function() {
    	this.filter.val("");
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
            	{key: "useYn",  label: ADMIN("ax.admin.BM0602G0.useyn"), sortable: true, editor:{type:"checkbox"}, width: 70},
                {key: "category", label: ADMIN("ax.admin.BM0603G0.category"), sortable: true,  width: 80},
                {key: "provNm", label: ADMIN("ax.admin.BM0604G0.provnm"), sortable: true,  width: 100},
                {key: "newsTitle", label: ADMIN("ax.admin.BM0603G0.newstitle"), width: 500},
                {key: "pubDt", label: ADMIN("ax.admin.BM0604G0.pubdate"), sortable: true, width: 150},
                {key: "remark", label: ADMIN("ax.admin.BM0602F0.remark"), width: 300},
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                    ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.item);
                }
            },
            onPageChange: function (pageNumber) {
                _this.setPageData({pageNumber: pageNumber});
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            }
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
    		if(this.target.list[i].conId == id) {
    			this.selectRow(i);
    			break;
    		}
    	}
    	
    	if(i == length) {
    		isUpdate = false;
    		fnObj.formView0.clear();
    		fnObj.formView0.disable();
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
            	{key: "vhcNo", label: ADMIN("ax.admin.BM0604G1.vhcno"), sortable: true, width: 150},
                {key: "proceRst", label: ADMIN("ax.admin.BM0604G1.procerst"), sortable: true, width: 100},
                {key: "sendDate", label: ADMIN("ax.admin.BM0604G1.senddate"), sortable: true, width: 190},
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                    ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.item);
                }
            },
            onPageChange: function (pageNumber) {
                _this.setPageData({pageNumber: pageNumber});
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            }
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
    		if(this.target.list[i].conId == id) {
    			this.selectRow(i);
    			break;
    		}
    	}
    	
    	if(i == length) {
    		isUpdate = false;
    		fnObj.formView0.clear();
    		fnObj.formView0.disable();
    	}
    },
    selectAll: function(flag) {
    	this.target.selectAll({selected: flag});
    }
});