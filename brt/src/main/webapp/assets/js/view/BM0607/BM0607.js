var fnObj = {}, CODE = {};

/***************************************** 전역 변수 초기화 ******************************************************/
isUpdate = false;
selectedRow = null;

var Y = "예약중";
var N = "예약가능";
/*************************************************************************************************************/

/***************************************** 이벤트 처리 코드 ******************************************************/
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
    	// 새로운 레코드 추가할 시 검색어 삭제
    	var dataFlag = typeof data !== "undefined";
    	var filter = $.extend({}, caller.searchView0.getData());
    	
    	axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0606G0S0",
            data: filter,
            callback: function (res) {
            	caller.gridView0.setData(res);
                
                if(res.list.length == 0) {
                	isUpdate = false;
                } else {
                	if(dataFlag) {
	                	caller.gridView0.selectIdRow(data);
	                } else {
		                if(selectedRow != null) {
		                	caller.gridView0.selectRow(selectedRow.__index);
		                } else {
		                	caller.gridView0.selectFirstRow();
		                }
	                }
                }
            }
        });
    	
    	axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0607G1S0",
            callback: function (res) {
            	//res.list[0].selecton_disable=true;
            	
            	for(var i = 0; i < res.list.length; i++){
            		if(res.list[i].rsvId != null){
            			res.list[i].isChecked = Y;
            			//$('.tr-'+i).attr('data-ax5grid-disable-selection', true);
            		}else{
            		}
            	}
            	caller.gridView1.setData(res);
            }
        });
    	
        return false;
    },
    
    PAGE_EXCEL: function(caller, act, data) {
    	caller.gridView0.target.exportExcel("data.xls");
    },
    
    PAGE_NEW: function (caller, act, data) {
    	caller.gridView0.selectAll(false);
    },
    
    PAGE_DELETE: function(caller, act, data) {
    	var grid = caller.gridView0.target;
    	
    	if(typeof grid.selectedDataIndexs[0] === "undefined") {
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
	                    url: "/api/v1/BM0602G0D0",
	                    data: JSON.stringify({provId : selectedRow.provId}),
	                    callback: function (res) {
	                        ok(res);
	                    }
	                });
                })
                .then(function (ok) {
                	axToast.push(LANG("ondelete"));
                    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                })
                .catch(function () {
                });
            }   	
        });   	
    },
    
    PAGE_SAVE: function (caller, act, data) {
    	ACTIONS.dispatch(ACTIONS.OPEN_RESERVATION_MODAL);
    },
    
    // 탭닫기
    PAGE_CLOSE: function(caller, act, data) {
    	window.parent.fnObj.tabView.closeActiveTab();
    },
    
    OPEN_RESERVATION_MODAL: function(caller, act, data) {
    	axboot.modal.open({
            modalType: "RESERVATION",
            param: "",
            callback: function (data) {
            	reservation(data);
            }
        });
    },
    
    ITEM_CLICK: function (caller, act, data) {
    	selectedRow = data;
    },
    PAGE_RESERVATION: function(caller, act, data) {
    	if(selectedRow == null) {
    		axDialog.alert("편성을 선택해주세요");
    		return false;
    	}
    	
    	var vehicleList = caller.gridView1.getData("selected");
    	
    	if(vehicleList.length == 0) {
    		axDialog.alert("장비를 선택해주세요");
    		return false;
    	}
    	
    	for(var i = 0; i < vehicleList.length; i++) {
    		if(vehicleList[i].possible != null) {
    			axDialog.alert("예약중인 장비는 중복예약이 되지 않습니다.")
    			return false;
    		}
    	}
    	
		axboot.modal.open({
            modalType: "RESERVATION",
            param: "",
            callback: function (result) {
            	this.close();
            	
            	var rsvDate = result;
            	var orgaId = selectedRow.orgaId;
            	
            	
            	var data = {
            		rsvDate: rsvDate,
            		orgaId: orgaId,
            		voList: vehicleList
            	}
            	axboot.promise()
	    	        .then(function (ok, fail, _data) {
	    	            axboot.ajax({
	    	                type: "POST",
	    	                url: "/api/v1/BM0607G1I0",
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
            sortable: true,
            target: $('[data-ax5grid="gridView0"]'),
            columns: [
                {key: "orgaId",		label: "<font color=BF360C>" + ADMIN("ax.admin.BM0606G0.orgaId") + "</font>",		width: 100},
                {key: "orgaNm",		label: "<font color=BF360C>" + ADMIN("ax.admin.BM0606G0.orgaNm") + "</font>",		width: 120},
                {key: "vdoCnt",		label: "<font color=BF360C>" + ADMIN("ax.admin.BM0606G0.vdoCnt") + "</font>",		width: 80,	align: "right"},
                {key: "ttTime",		label: "<font color=BF360C>" + ADMIN("ax.admin.BM0606G0.ttTime") + "</font>",		width: 120,	align: "right"},
                {key: "remark",		label: ADMIN("ax.admin.BM0606G0.remark"),		width: 80},
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
    		if(this.target.list[i].orgaId == id) {
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
 * formView0
 */
fnObj.gridView1 = axboot.viewExtend(axboot.gridView, {
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
            target: $('[data-ax5grid="gridView1"]'),
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

function clickRowSelector(){
	$('.checkBox').on('click', function(){
		var data = fnObj.gridView1.getData();
		for(var i = 0; i < data.length; i++){
    		if(data[i].rsvId != null){
    			$('.tr-'+i).attr('data-ax5grid-disable-selection', true);
    		}else{
    		}
    	}
	});
}