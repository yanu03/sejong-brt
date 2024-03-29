var fnObj = {}, CODE = {};

/***************************************** 전역 변수 초기화 ******************************************************/
isUpdate = false;
selectedRow = null;
selectedRowG1 = null;
/*************************************************************************************************************/

/***************************************** 이벤트 처리 코드 ******************************************************/
var ACTIONS = axboot.actionExtend(fnObj, {
	/*
	PAGE_SEARCH: function (caller, act, data) {
    	// 새로운 레코드 추가할 시 검색어 삭제
    	var dataFlag = typeof data !== "undefined";
    	var filter = $.extend({}, caller.searchView0.getData());
    	
        axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0301G0S0",
            data: filter,
            callback: function (res) {
                caller.gridView0.setData(res);
                
                if(res.list.length ==0){
                	caller.gridView1.clear();
                	caller.gridView2.clear();
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
    //*/
    ///*
	PAGE_SEARCH: function (caller, act, data) {
		// 새로운 레코드 추가할 시 검색어 삭제
		var dataFlag = typeof data !== "undefined";
		var filter = caller.searchView0.getData().filter;
		var conEnd = $('#conEnd').val();
		var data = {
				filter : filter,
				conEd : conEnd
		};
		axboot.ajax({
			type: "GET",
			url: "/api/v1/BM0302G0S0",
			data: data,
			callback: function (res) {
				caller.gridView0.setData(res);

				if(res.list.length == 0) {
					isUpdate = false;
					caller.gridView1.clear();

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
    //*/
    PAGE_EXCEL: function(caller, act, data) {
    	caller.gridView2.target.exportExcel("영상 목록_" + new Date().yyyymmdd() + ".xls");
    },
    
    // gridView0항목 클릭 이벤트
    ITEM_CLICK: function (caller, act, data) {
    	selectedRow = data;
    	fnObj.gridView2.clear();
    	fnObj.gridView3.clear();
    	ACTIONS.dispatch(ACTIONS.RELOAD_G1);
    },
    
 // gridView1 항목 클릭 이벤트
    ITEM_CLICK_G1: function(caller, act, data) {
    	isUpdate = true;
    	selectedRow = null;
    	selectedRowG1 = data;
    },
    
    ITEM_CLICK_G2: function(caller, act, data) {
    	selectedRow = null;
    	selectedRowG1 = null;
    	selectedRowG2 = data;
    },
    
    RELOAD_G1: function(caller, act, data) {
    	var dataFlag = typeof data !== "undefined";
    	var listLength;
    	var list = new Array();
    	var vocList = {};
    	var vdoList = {};
    	
    	vocList.page = {};
    	vocList.list = new Array();
    	
    	vdoList.page = {};
    	vdoList.list = new Array();
    	
    	var count = 0;
    	var countOne = 0;
    	
    	axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0303G1S0",
            data: {conId: selectedRow.conId},
            callback: function (res) {
            	if(res.list[0].altDiv != "신규"){
            		caller.gridView1.setData(res);            			
            		
            	}else if(res.list[0].altDiv == "신규") {
                	isUpdate = false;
                	caller.gridView1.clear();
                } else {
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
            	axboot.ajax({
            		type: "GET",
            		url: "/api/v1/BM0303G2S0",
            		data: {conId: selectedRow.conId},
            		callback: function (resOne) {
            			if(resOne.list.length != 0){
            				for(var i = 0; i< resOne.list.length; i++){
            					if(resOne.list[i].vocId != null){
            						resOne.list[i].vocType = "음성";
            						vocList.list[count] = resOne.list[i];
            						count++;
            					}else{
            						resOne.list[i].vdoType = "영상";
            						vdoList.list[countOne] = resOne.list[i];
            						countOne++;
            					}
            				}
            				
            				if(vocList.list.length != 0){
            					caller.gridView3.setData(vocList);
            				}
            				if(vdoList.list.length != 0){
            					caller.gridView2.setData(vdoList);
            				}
            			}
            			
            		}
            	});
            }
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
    this.gridView2.initView();
    this.gridView3.initView();
    onChangeFunc();
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
            sortable: true,
            target: $('[data-ax5grid="gridView0"]'),
            
            	 columns: [   
            		 {key: "altDiv", label: ADMIN("ax.admin.BM0302F0.altdiv"), align: "center", sortable: true , width: 70, styleClass:function(){return (this.item.altDiv === "계약만료") ? "grid-cell-gray":"" }},
            		 //{key: "confirmYn",	label: ADMIN("ax.admin.BM0301F0.confirmyn"),sortable: true, align: "center", width: 70 , styleClass:function(){return (this.item.confirmYn === "확정") ? "grid-cell-red":"grid-cell-blue" }},
                 	 {key: "conNo",		label: ADMIN("ax.admin.BM0301F0.conno"),	sortable: true, align: "center", width: 120},                
                     {key: "conNm",		label: ADMIN("ax.admin.BM0301F0.connm"),	width: 120},
                     {key: "conFstDate",label: ADMIN("ax.admin.BM0301F0.confd"),	sortable: true, align: "center", type: "date" , width: 120},
                     {key: "conStDate",	label: ADMIN("ax.admin.BM0301F0.consd"),	sortable: true, align: "center", type: "date" , width: 120},
                     {key: "conEdDate",	label: ADMIN("ax.admin.BM0301F0.coned"),	sortable: true, align: "center", type: "date" , width: 120},
                     {key: "custNm",	label: ADMIN("ax.admin.BM0102F0.cust.name"),sortable: true,	width: 120},
                     {key: "suppAmt",	label: ADMIN("ax.admin.BM0301F0.suppamt"),	align: "right", width: 120, formatter:"money"},
                     {key: "vatAmt",	label: ADMIN("ax.admin.BM0301F0.vatamt"),	align: "right", width: 120, formatter:"money"},
                     {key: "remark",	label: ADMIN("ax.admin.BM0301F0.remark"),	width: 200},
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
    		if(this.target.list[i].conId == id) {
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
        	frozenColumnIndex: 2,
            sortable: true,
            target: $('[data-ax5grid="gridView1"]'),
            columns: [
            	{key: "confirmYn", label:ADMIN("ax.admin.BM0301F0.confirmyn"), align: "center" , sortable: true, width: 70 , styleClass:function(){return (this.item.confirmYn === "확정") ? "grid-cell-red": "grid-cell-blue" }},
            	{key: "altDiv", label: ADMIN("ax.admin.BM0302F0.altdiv"), align: "center" , sortable: true, width: 70},
            	{key: "custNm", label: ADMIN("ax.admin.BM0301F0.custnm"), align: "center" ,width: 120},
                {key: "altConDate", label: ADMIN("ax.admin.BM0302F0.altcd"), sortable: true, align: "center", width: 120},
                {key: "conStDate", label: ADMIN("ax.admin.BM0302F0.altsd") , sortable: true, align: "center", width: 120},
                {key: "conEdDate", label:ADMIN("ax.admin.BM0302F0.alted"), sortable: true, align: "center", width: 120},
                {key: "suppAmt", label: ADMIN("ax.admin.BM0301F0.suppamt"), formatter:"money",align: "right", width: 100},
                {key: "vatAmt", label: ADMIN("ax.admin.BM0301F0.vatamt"), formatter:"money" , align: "right", width: 100},
                {key: "remark", label: ADMIN("ax.admin.BM0301F0.remark"), width: 200},
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
    		if(this.target.list[i].seq == id) {
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

// 영상, 음성 데이터와 연계해서 grid 뿌려줘야함
fnObj.gridView2 = axboot.viewExtend(axboot.gridView, {
    page: {
        pageNumber: 0,
        pageSize: 10
    },
    initView: function () {
        var _this = this;
        	this.target = axboot.gridBuilder({
        		lineNumberColumnWidth: 30,
        		frozenColumnIndex: 1,
        		target: $('[data-ax5grid="gridView2"]'),
        		columns: [
        			{key: "vdoType", label: ADMIN("ax.admin.BM0303G2.type"), sortable: true, align:"center" ,width: 80},
        			{key: "attFile", label: ADMIN("ax.admin.BM0303G2.vdoname"), align:"left" , width: 250},
        			{key: "playStDate", label: ADMIN("ax.admin.BM0303G2.playstdate"), sortable: true, align:"center" , width: 120},
        			{key: "playEdDate", label: ADMIN("ax.admin.BM0303G2.playeddate"), sortable: true, align:"center" , width: 120},
        			{key: "playTm", label: ADMIN("ax.admin.BM0303G2.playtm"), sortable: true, align:"right" , width: 80},
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
        	ACTIONS.dispatch(ACTIONS.ITEM_CLICK_G1, data);
    	}
    },
    selectIdRow: function(id) {
    	var i;
    	var length = this.target.list.length;
    	for(i = 0; i < length; i++) {
    		if(this.target.list[i].seq == id) {
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

fnObj.gridView3 = axboot.viewExtend(axboot.gridView, {
    page: {
        pageNumber: 0,
        pageSize: 10
    },
    initView: function () {
        var _this = this;
        	this.target = axboot.gridBuilder({
        		lineNumberColumnWidth: 30,
        		frozenColumnIndex: 1,
        		target: $('[data-ax5grid="gridView3"]'),
        		columns: [
        			{key: "vocType", label: ADMIN("ax.admin.BM0303G2.type"), sortable: true, align:"center" ,width: 80},
        			{key: "attFile", label: ADMIN("ax.admin.BM0303G2.vocname"), align:"left" , width: 250},
        			{key: "playStDate", label: ADMIN("ax.admin.BM0303G2.playstdate"), sortable: true, align:"center" , width: 120},
        			{key: "playEdDate", label: ADMIN("ax.admin.BM0303G2.playeddate"), sortable: true, align:"center" , width: 120},
        			{key: "playTm", label: ADMIN("ax.admin.BM0303G2.playtm"), sortable: true, align:"right" , width: 80},
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
        	ACTIONS.dispatch(ACTIONS.ITEM_CLICK_G1, data);
    	}
    },
    selectIdRow: function(id) {
    	var i;
    	var length = this.target.list.length;
    	for(i = 0; i < length; i++) {
    		if(this.target.list[i].seq == id) {
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

/** 추가 함수 **/
/** onChange시 동작 함수 모음 **/
function onChangeFunc(){
	selectGrid0();
}

/** Grid0 셀렉트박스 변경 시 Grid0 그리드 표출 변경 **/
function selectGrid0(){
	$('#conEnd').on('change', function(){
		ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
	});
}
