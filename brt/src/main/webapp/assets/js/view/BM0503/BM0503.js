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
    	
        axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0503G0S0",
            data: filter,
            callback: function (res) {
                caller.gridView0.setData(res);             
	            }
	        });
        
        axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0503G1S0",
            callback: function (res) {
                caller.gridView1.setData(res);             
	            }
	        });

        return false;
    },
    
    // gridView0항목 클릭 이벤트
    ITEM_CLICK: function (caller, act, data) {
    	selectedRow = data;
    	selectedRowG1 = null;
    },
    
    PAGE_CLOSE: function(caller, act, data) {
    	window.parent.fnObj.tabView.closeActiveTab();
    },
    
    PAGE_RESERVATION: function(caller, act, data) {
    	var routList = caller.gridView0.getData("selected");
    	
    	if(routList.length == 0) {
    		axDialog.alert("편성을 선택해주세요");
    		return false;
    	}
    	
    	var vehicleList = caller.gridView1.getData("selected");
    	var allList = caller.gridView1.getData();
    	
    	if(vehicleList.length == 0) {
    		axDialog.alert("장비를 선택해주세요");
    		return false;
    	}
    	
    	for(var i = 0; i < allList.length; i++) {
    		if(allList[i].possible != null) {
    			axDialog.alert("업데이트가 완료되지 않은 장비가 있습니다. 예약이 불가합니다.")
    			return false;
    		}
    	}
    	
		axboot.modal.open({
            modalType: "RESERVATION",
            param: "",
            callback: function (result) {
            	this.close();
            	
            	var rsvDate = result;
            	var routNameList = new Array();

            	for(var i=0; i<routList.length; i++){
            		routNameList.push({dvcName:routList[i].dvcName});
            	}
            	
            	var dataList = new Array();
            	
            	//for(var i=0; i<routList.length; i++){
            		var data = {
            				rsvDate: rsvDate,
            				rsvList: routNameList,
            				vhcList: vehicleList
            		//}
            		
            	}
            	axboot.promise()
	    	        .then(function (ok, fail, _data) {
	    	            axboot.ajax({
	    	                type: "POST",
	    	                url: "/api/v1/BM0503G1I0",
	    	                data: JSON.stringify(data),
	    	                callback: function (res) {
	    	                    ok(res);
	    	                }
	    	            });
	    	        })
	    	        .then(function (ok, fail, data) {
	    	        	axToast.push(LANG("ax.script.alert.reservation"));
	    	        	ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
	    	        })
	    	        .catch(function () {
	    	        	
	    	        });
            }
        });
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
            "close": function() {
            	ACTIONS.dispatch(ACTIONS.PAGE_CLOSE);
            },
        	"reservation": function() {
        		ACTIONS.dispatch(ACTIONS.PAGE_RESERVATION);
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
        	showRowSelector: true,
        	multipleSelect : true,
        	lineNumberColumnWidth: 30,
            target: $('[data-ax5grid="gridView0"]'),
            	 columns: [
            		 {key: "routId",		label: "노선ID", sortable: true, width: 100,	align: "center"},
            		 {key: "interRoutId",	label: "연계노선ID", sortable: true, width: 100,	align: "left"},
            		 {key: "routNm",		label: "노선명", sortable: true, width: 150,	align: "left"},
            		 {key: "dvcName",		label: "행선지용 명칭", sortable: true, width: 150,	align: "left"},
            		 {key: "userWayDivNm",	label: "상하행(사용자)", width: 100,	align: "center"},
            		 {key: "dvcType",		label: "장치유형", width: 130, align: "left"},
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
        	showRowSelector: true,
        	multipleSelect : true,
        	lineNumberColumnWidth: 30,
            target: $('[data-ax5grid="gridView1"]'),
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