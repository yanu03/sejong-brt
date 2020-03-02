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
    	
    	/** 차내장치 업데이트 **/
    	axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0205G0S0",
            data: filter,
            callback: function (res) {
                caller.gridView0.setData(res);             
	            	if(dataFlag) {
	                	caller.gridView0.selectIdRow(data);
	                } else {
		                if(selectedRow != null) {
		                	caller.gridView0.selectRow(selectedRow.__index);
		                } else {
		                	//caller.gridView0.selectFirstRow();
		                }
	                }
	            }
	     });
    	
    	/** 음성예약 **/
    	axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0406G1S0",
            data: filter,
            callback: function (res) {
                caller.gridView1.setData(res);
                
                if(res.list.length != 0) {
                	if(dataFlag) {
	                	caller.gridView1.selectIdRow(data);
	                } else {
		                if(selectedRow != null) {
		                	caller.gridView1.selectRow(selectedRow.__index);
		                } else {
		                	//caller.gridView1.selectFirstRow();
		                }
	                }
                }
            }
        });
    	
    	/** 행선지안내기 **/
    	axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0503G1S0",
            data: filter,
            callback: function (res) {
                caller.gridView2.setData(res);
                
                if(res.list.length != 0) {
                	if(dataFlag) {
	                	caller.gridView2.selectIdRow(data);
	                } else {
		                if(selectedRow != null) {
		                	caller.gridView2.selectRow(selectedRow.__index);
		                } else {
		                	//caller.gridView2.selectFirstRow();
		                }
	                }
                }
            }
        });
    	
    	/** 편성영상예약 관리 **/
    	axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0607G1S0",
            data: filter,
            callback: function (res) {
                caller.gridView3.setData(res);
                
                if(res.list.length != 0) {
                	if(dataFlag) {
	                	caller.gridView3.selectIdRow(data);
	                } else {
		                if(selectedRow != null) {
		                	caller.gridView3.selectRow(selectedRow.__index);
		                } else {
		                	//caller.gridView3.selectFirstRow();
		                }
	                }
                }
            }
        });
    	
    	/** 화면설정예약 관리 **/
    	axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0609G1S0",
            data: filter,
            callback: function (res) {
                caller.gridView4.setData(res);
                
                if(res.list.length != 0) {
                	if(dataFlag) {
	                	caller.gridView4.selectIdRow(data);
	                } else {
		                if(selectedRow != null) {
		                	caller.gridView4.selectRow(selectedRow.__index);
		                } else {
		                	//caller.gridView4.selectFirstRow();
		                }
	                }
                }
            }
        });
        

        return false;
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
    this.gridView2.initView();
    this.gridView3.initView();
    this.gridView4.initView();
    
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


/** 차내장치 업데이트 관리 **/
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
        	lineNumberColumnWidth: 30,
            frozenColumnIndex: 1,
            target: $('[data-ax5grid="gridView0"]'),
            	 columns: [          		 
            		 {key: "vhcNo", label: ADMIN("ax.admin.BM0103F0.vhcNo"), sortable: true, width: 100},
            		 {key: "completeYn", label: ADMIN("ax.admin.BM0205G0.completeyn"), sortable: true, align:"center" ,width: 100},
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

/** 음성예약 관리 **/
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
            sortable: true,
            showRowSelector: true,
            multipleSelect : true,
            target: $('[data-ax5grid="gridView1"]'),
            columns: [
            	{key: "rsvId",		label: ADMIN("ax.admin.BM0406G1.rsvYn"),	width: 70,	align: "center", formatter: function() {
            		if(this.item.rsvId != null)
            			return ADMIN("ax.admin.item.reservation");
                }},
                {key: "vhcId",		label: ADMIN("ax.admin.BM0406G1.vhcId"),	width: 65,	align: "center"},
                {key: "vhcNo",		label: ADMIN("ax.admin.BM0406G1.vhcNo"),	width: 90,	align: "center"},
                {key: "chasNo", 	label: ADMIN("ax.admin.BM0406G1.chasNo"),	width: 130},
                {key: "corpNm",		label: ADMIN("ax.admin.BM0406G1.corpId"),	width: 120,	align: "center"},
                {key: "areaNm",		label: ADMIN("ax.admin.BM0406G1.area"),		width: 100,	align: "center"},
                {key: "makerNm",	label: ADMIN("ax.admin.BM0406G1.maker"),	width: 80,	align: "center"},
                {key: "relsDate",	label: ADMIN("ax.admin.BM0406G1.relsDate"),	width: 80,	align: "center"},
                {key: "modelNm",	label: ADMIN("ax.admin.BM0406G1.modelNm"),	width: 100,	align: "center"},
                {key: "vhcKindNm",	label: ADMIN("ax.admin.BM0406G1.vhcKind"),	width: 80,	align: "center"},
                {key: "vhcTypeNm",	label: ADMIN("ax.admin.BM0406G1.vhcType"),	width: 70,	align: "center"},
                {key: "lfYnNm",		label: ADMIN("ax.admin.BM0406G1.lfYn"),		width: 70,	align: "center"},
                {key: "vhcFuelNm",	label: ADMIN("ax.admin.BM0406G1.vhcFuel"),	width: 50,	align: "center"},
                {key: "useYn",		label: ADMIN("ax.admin.BM0406G1.useYn"),	width: 70,	align: "center"},
                {key: "remark",		label: ADMIN("ax.admin.BM0406G1.remark"),	width: 100,	align: "center"},
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
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
    selectRow: function(index) {
    	var data = this.target.list[index];
    	
    	if(typeof data === "undefined") {
    		this.selectLastRow();
    	} else {
    		this.target.select(index);
    	}
    },
    selectAll: function(flag) {
    	this.target.selectAll({selected: flag});
    }
});

/** 표출예약 관리 **/
fnObj.gridView2 = axboot.viewExtend(axboot.gridView, {
    page: {
        pageNumber: 0,
        pageSize: 10
    },
    initView: function () {
        var _this = this;

        this.target = axboot.gridBuilder({
        	frozenColumnIndex: 3,
            showLineNumber: true,
            showRowSelector: true,
            multipleSelect :true,
            sortable: true,
            target: $('[data-ax5grid="gridView2"]'),
            columns: [
            	{key: "possible",	label: "예약여부",		width: 100},
            	{key: "vhcId",		label: "차량ID",		width: 100},
                {key: "vhcNo",		label: "차량번호",		width: 100},
                {key: "vhcKindNm",	label: "장치종류",		width: 150},
                {key: "instLocNm",	label: "장치위치",		width: 100},
                {key: "mngId",		label: "관리ID",		width: 150},
            ],
            body: {
            	 onClick: function () {
                     this.self.select(this.dindex);
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

/** 편성영상예약 관리 **/
fnObj.gridView3 = axboot.viewExtend(axboot.gridView, {
    page: {
        pageNumber: 0,
        pageSize: 10
    },
    
    initView: function () {
        var _this = this;
        
        this.target = axboot.gridBuilder({
        	frozenColumnIndex: 3,
            showLineNumber: true,
            showRowSelector: true,
            multipleSelect :true,
            sortable: true,
            target: $('[data-ax5grid="gridView3"]'),
            columns: [
            	{key: "possible",	label: "예약여부",								width: 100},
            	{key: "vhcId",		label: "차량ID",								width: 100},
                {key: "vhcNo",		label: ADMIN("ax.admin.BM0607G1.vhcNo"),	width: 100},
                {key: "vhcKindNm",	label: "장치종류",								width: 150},
                {key: "instLocNm",	label: "장치위치",								width: 100},
                {key: "mngId",		label: "관리ID",								width: 150},
            ],
            header:{
            	selector: false,
            },
            body: {
            	mergeCells:["vhcId", "vhcNo"],
            	
                onClick: function () {
                    this.self.select(this.dindex);

                    
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
    		if(this.target.list[i].vdoId == id) {
    			this.selectRow(i);
    			break;
    		}
    	}
    	
    	if(i == length) {
    	}
    },
    selectAll: function(flag) {
    	this.target.selectAll({selected: flag});
    }
});

/** 화면설정예약 관리 **/
fnObj.gridView4 = axboot.viewExtend(axboot.gridView, {
    page: {
        pageNumber: 0,
        pageSize: 10
    },
    
    initView: function () {
        var _this = this;
        
        this.target = axboot.gridBuilder({
        	frozenColumnIndex: 3,
            showLineNumber: true,
            showRowSelector: true,
            multipleSelect :true,
            sortable: true,
            target: $('[data-ax5grid="gridView4"]'),
            columns: [
            	{key: "possible",	label: "예약여부",		width: 100},
            	{key: "vhcId",		label: "차량ID",		width: 100},
                {key: "vhcNo",		label: "차량번호",		width: 100},
                {key: "vhcKindNm",	label: "장치종류",		width: 150},
                {key: "instLocNm",	label: "장치위치",		width: 100},
                {key: "mngId",		label: "관리ID",		width: 150},
            ],
            header:{
            	selector: false,
            },
            body: {
            	mergeCells:["vhcId", "vhcNo"],
            	
                onClick: function () {
                    this.self.select(this.dindex);

                    
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
    		if(this.target.list[i].vdoId == id) {
    			this.selectRow(i);
    			break;
    		}
    	}
    	
    	if(i == length) {
    	}
    },
    selectAll: function(flag) {
    	this.target.selectAll({selected: flag});
    }
});