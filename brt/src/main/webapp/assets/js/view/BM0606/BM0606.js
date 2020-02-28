var fnObj = {}, CODE = {};

/***************************************** 전역 변수 초기화 ******************************************************/
isUpdate = false;
selectedRow = null;

var selVdoId = null;
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
	                caller.formView0.clear();
	                caller.formView0.disable();
                } else {
                	caller.formView0.enable();
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

        return false;
    },
    PAGE_EXCEL: function(caller, act, data) {
    	caller.gridView0.target.exportExcel("data.xls");
    },
    
    PAGE_NEW: function (caller, act, data) {
    	isUpdate = false;
    	caller.gridView0.selectAll(false);
        caller.formView0.clear();
        caller.formView0.enable();
        caller.formView0.validate(true);
        caller.gridView1.selectAll(false);
        caller.gridView2.clear();
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
	                    url: "/api/v1/BM0606G0D0",
	                    data: JSON.stringify(grid.list[grid.selectedDataIndexs[0]]),
	                    callback: function (res) {
	                        ok(res);
	                    }
	                });
                })
                .then(function (ok) {
                	caller.formView0.clear();
                	axToast.push(LANG("ondelete"));
                    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                })
                .catch(function () {

                });
            }
        });
    },
    
    PAGE_SAVE: function (caller, act, data) {
    	
    	if(caller.formView0.validate()) {
    		var formData = caller.formView0.getData();
    		var playList = caller.gridView2.getData();
    		
    		formData["playList"] = playList;
    		
    		axboot.promise()
		        .then(function (ok, fail, _data) {
		            axboot.ajax({
		                type: "POST",
		                url: "/api/v1/BM0606G2I0",
		                data: JSON.stringify(formData),
		                callback: function (res) {
		                    ok(res);
		                }
		            });
		        })
		        .then(function (ok, fail, data) {
		        	axToast.push(LANG("onadd"));
		        	ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
		        })
		        .catch(function () {
		
		        });
    	}
    	
    	
    },
    
    PAGE_UPDATE: function(caller, act, data) {
    	
    	if(caller.formView0.validate()) {
    		var formData = caller.formView0.getData();
    		var playList = caller.gridView2.getData();
    		
    		formData["playList"] = playList;
    		
    		axboot.promise()
		        .then(function (ok, fail, _data) {
		            axboot.ajax({
		                type: "POST",
		                url: "/api/v1/BM0606G2U0",
		                data: JSON.stringify(formData),
		                callback: function (res) {
		                    ok(res);
		                }
		            });
		        })
		        .then(function (ok, fail, data) {
		        	axToast.push(LANG("onupdate"));
		        	ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
		        })
		        .catch(function () {
		        });
    	}
    },
    
    // 탭닫기
    PAGE_CLOSE: function(caller, act, data) {
    	window.parent.fnObj.tabView.closeActiveTab();
    },
    
    ITEM_CLICK: function (caller, act, data) {
    	isUpdate = true;
    	selectedRow = data;
        caller.formView0.setData(data);
        initGrid2(data);
    },
    
    OPEN_BM0301_MODAL: function(caller, act, data) {
    	axboot.modal.open({
            modalType: "BM0301",
            param: "",
            callback: function (data) {
            	// 운수사, 거래처 등을 선택한 후 이벤트 ex) input에 값을 넣어 주는 등의 로직을 작성하면됨
            	caller.formView0.model.set("conId", data.conId);
            	caller.formView0.model.set("conNm", data.conNm);
                this.close();
            }
        });
    },
    
    ADDBTN_CLICK: function(caller, act, data){
    	var row = caller.gridView1.getData("selected");

    	if(row.length != 0) {
    		row = row[0];

    		var allPlayTm = caller.formView0.model.get("allPlayTm");
    		caller.formView0.model.set("allPlayTm", allPlayTm + row.playTm);

    		caller.gridView2.selectAll(false);
    		caller.gridView2.addRow(row);
    	} else {
    		axDialog.alert(LANG("ax.script.alert.requireselect"));
    	}
    },
    DELBTN_CLICK: function(caller, act, data){
    	var row = caller.gridView2.getData("selected");

    	if(row.length != 0) {
    		row = row[0];
    		var allPlayTm = caller.formView0.model.get("allPlayTm");
    		caller.formView0.model.set("allPlayTm", allPlayTm - row.playTm);

    		caller.gridView2.delRow("selected");

    	} else {
    		axDialog.alert(LANG("ax.script.alert.requireselect"));
    	}
    },
    UPBTN_CLICK: function(caller, act, data){
    	var row = caller.gridView2.getData("selected");
    	var list = caller.gridView2.getData();
    	if(row == null) {
    		axDialog.alert(LANG("ax.script.alert.requireselect"))
    		return false;
    	}
    	
    	list = arrayMove(list, row[0].__index, row[0].__index - 1);
    	caller.gridView2.setData(list);
    },
    DNBTN_CLICK: function(caller, act, data){
    	var row = caller.gridView2.getData("selected");
    	var list = caller.gridView2.getData();
    	
    	if(row == null) {
    		axDialog.alert(LANG("ax.script.alert.requireselect"))
    		return false;
    	}
    	
    	list = arrayMove(list, row[0].__index, row[0].__index + 1);
    	caller.gridView2.setData(list);
    },
    PREVIEW_CLICK: function(caller, act, data){
    },
    GRID1_SEARCH: function (caller, act, data) {
    	// 새로운 레코드 추가할 시 검색어 삭제
    	var dataFlag = typeof data !== "undefined";
    	var filter = $.extend({}, caller.searchView0.getData());
    	
    	axboot.ajax({
    		type: "GET",
    		url: "/api/v1/BM0605G0S0",
    		data: filter,
    		callback: function (res) {
    			caller.gridView1.setData(res);
    			if(dataFlag) {
    				caller.gridView1.selectIdRow(data);
    			} else {
    				if(selectedRow != null) {
    					caller.gridView1.selectRow(selectedRow.__index);
    				} else {
    					caller.gridView1.selectFirstRow();
    				}
    			}
    		}
    	});

        return false;
    },
    GRID2_SEARCH: function (caller, act, data) {
    	// 새로운 레코드 추가할 시 검색어 삭제
    	var dataFlag = typeof data !== "undefined";
    	    	
    	axboot.ajax({
    		type: "POST",
    		url: "/api/v1/BM0606G2S0",
    		data: filter,
    		callback: function (res) {

    			caller.gridView1.setData(res);
    			if(dataFlag) {
    				caller.gridView1.selectIdRow(data);
    			} else {
    				if(selectedRow != null) {
    					caller.gridView1.selectRow(selectedRow.__index);
    				} else {
    					caller.gridView1.selectFirstRow();
    				}
    			}
    		}
    	});

        return false;
    },
    GRID_DBLCLICK: function(caller, act, data){
    	openModal606(data);
    	
    	axboot.ajax({
    		type: "POST",
    		url: "/api/v1/test",
    		callback: function (res) {
    		}
    	});
    },
    
});

function openModal606(input){
	axboot.modal.open({
        modalType: "BM0606",
        param: "",
        sendData: function(){
        	return input;
        },
        callback: function (data) {
        	// 운수사, 거래처 등을 선택한 후 이벤트 ex) input에 값을 넣어 주는 등의 로직을 작성하면됨
            this.close();
        }
    });
}
/********************************************************************************************************************/

/******************************************* 페이지 처음 로딩시 호출 ******************************************************/
fnObj.pageStart = function () {
	var _this = this;
	
    this.pageButtonView.initView();
    this.searchView0.initView();
    this.gridView0.initView();
    this.gridView1.initView();
    this.gridView2.initView();
    ACTIONS.dispatch(ACTIONS.GRID1_SEARCH);
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
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            },
            "excel": function () {
            	selectedRow = null;
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            },
            "new": function() {
            	ACTIONS.dispatch(ACTIONS.PAGE_NEW);
            },
            "delete": function() {
            	ACTIONS.dispatch(ACTIONS.PAGE_DELETE);
            },
            "save": function () {
            	if(isUpdate) {
            		ACTIONS.dispatch(ACTIONS.PAGE_UPDATE);
            	} else {
            		ACTIONS.dispatch(ACTIONS.PAGE_SAVE);
            	}
            },
            "close": function() {
            	ACTIONS.dispatch(ACTIONS.PAGE_CLOSE);
            },
            "addPlayList": function(){
            	ACTIONS.dispatch(ACTIONS.ADDBTN_CLICK);
            },
            "deletePlayList": function(){
            	ACTIONS.dispatch(ACTIONS.DELBTN_CLICK);
            },
            "upItem": function(){
            	ACTIONS.dispatch(ACTIONS.UPBTN_CLICK);
            },
            "downItem": function(){
            	ACTIONS.dispatch(ACTIONS.DNBTN_CLICK);
            },
            "previewItem": function(){
            	ACTIONS.dispatch(ACTIONS.PREVIEW_CLICK);
            }
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
        	frozenColumnIndex: 0,
            sortable: true,
            target: $('[data-ax5grid="gridView0"]'),
            columns: [
                {key: "orgaId",		label: ADMIN("ax.admin.BM0606G0.orgaId"),		width: 80,	align: "center"},
                {key: "orgaNm",		label: ADMIN("ax.admin.BM0606G0.orgaNm"),		width: 120,	align: "left"},
                {key: "vdoCnt",		label: ADMIN("ax.admin.BM0606G0.vdoCnt"),		width: 80,	align: "right"},
                {key: "ttTime",		label: ADMIN("ax.admin.BM0606G0.ttTime"),		width: 120,	align: "right"},
                {key: "remark",		label: ADMIN("ax.admin.BM0606G0.remark"),		width: 80,	align: "left"},
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
    		fnObj.formView0.clear();
    		fnObj.formView0.disable();
    	}
    },
    selectAll: function(flag) {
    	this.target.selectAll({selected: flag});
    }
});

/** 전체 영상 목록 그리드 **/
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
            //sortable: true,
            target: $('[data-ax5grid="gridView1"]'),
            columns: [
                {key: "vdoId",		label: ADMIN("ax.admin.BM0606G1.vdoId"),		width: 100},
                {key: "conNm",		label: ADMIN("ax.admin.BM0606G1.conNm"),		width: 100},
                {key: "fileTypeNm",	label: ADMIN("ax.admin.BM0606G1.fileTypeNm"),	width: 100},
                {key: "playTm",		label: ADMIN("ax.admin.BM0606G1.playTm"),		width: 100,	align:"right"},
                {key: "playStDate",	label: ADMIN("ax.admin.BM0606G1.playStDate"),	width: 100},
                {key: "playEdDate",	label: ADMIN("ax.admin.BM0606G1.playEdDate"),	width: 100},
                
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                    
                },
                onDBLClick: function(){
                	ACTIONS.dispatch(ACTIONS.GRID_DBLCLICK, this.item);
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

/** 편성 영상 목록 그리드 **/
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
                {key: "vdoId",		label: ADMIN("ax.admin.BM0606G1.vdoId"),		width: 100},
                {key: "conNm",		label: ADMIN("ax.admin.BM0606G1.conNm"),		width: 100},
                {key: "fileTypeNm",	label: ADMIN("ax.admin.BM0606G1.fileTypeNm"),	width: 100},
                {key: "playTm",		label: ADMIN("ax.admin.BM0606G1.playTm"),		width: 100,	align:"right"},
                {key: "playStDate",	label: ADMIN("ax.admin.BM0606G1.playStDate"),	width: 100},
                {key: "playEdDate",	label: ADMIN("ax.admin.BM0606G1.playEdDate"),	width: 100},
            ],
            footSum: [
            	[
            		{label: "총 재생시간", colspan: 1, align: "center"},
            		{key: "playTm", collector: function() {
            			var value = 0;
            			
            			this.list.forEach(function(n) {
            				value += n.playTm;
            			});
            			
            			return secondToTime(value);
            		}}
            	]
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                    //ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.item);
                },
                onDBLClick: function(){
                	ACTIONS.dispatch(ACTIONS.GRID_DBLCLICK, this.item);
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
    	}
    },
    selectRow: function(index) {
    	isUpdate = true;
    	var data = this.target.list[index];
    	
    	if(typeof data === "undefined") {
    		this.selectLastRow();
    	} else {
    		this.target.select(index);
        	//ACTIONS.dispatch(ACTIONS.ITEM_CLICK, data);
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

/**
 * formView0
 */
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

        axboot.buttonClick(this, "data-form-view-0-btn", {
            "selectBM0301": function() {
            	ACTIONS.dispatch(ACTIONS.OPEN_BM0301_MODAL);
            }
        });
        
        this.target.find('[data-ax5picker="date"]').ax5picker({
            direction: "auto",
            content: {
                type: 'date'
            }
        });

    },
    initEvent: function () {
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
    		$('#addlist').attr("readonly", false).attr("disabled", false);
    		$('#rmvlist').attr("readonly", false).attr("disabled", false);
    		$('#uplist').attr("readonly", false).attr("disabled", false);
    		$('#dnlist').attr("readonly", false).attr("disabled", false);
    	});
    },
    disable: function() {
    	this.target.find('[data-ax-path][data-key!=true]').each(function(index, element) {
    		$(element).attr("readonly", true);
    		$('#addlist').attr("readonly", true).attr("disabled", true);
    		$('#rmvlist').attr("readonly", true).attr("disabled", true);
    		$('#uplist').attr("readonly", true).attr("disabled", true);
    		$('#dnlist').attr("readonly", true).attr("disabled", true);
    		fnObj.gridView2.clear();
    	});
    },
    clear: function () {
        this.model.setModel(this.getDefaultData());
        this.target.find('[data-ax-path="key"]').removeAttr("readonly");
    }
});

/********************************************************************************************************************/
/** 영상편성 전용 **/
/********************************************************************************************************************/
function initGrid2(data, caller){
	var dataFlag = typeof data !== "undefined";
	
	axboot.ajax({
		type: "POST",
		url: "/api/v1/BM0606G2S0",
		data: JSON.stringify(data),
		callback: function (res) {
			for(var i=0; i<res.list.length; i++){
				res.list[i].txt
							= 	"영상명 : "		+ res.list[i].vdoNm +
								"\n계약명 : "		+ res.list[i].conNm +
								"\n파일종류 : "	+ res.list[i].fileTypeNm +
								"\n재생시간(초) : "+ res.list[i].playTm +
								"\n재생기간 : "	+ res.list[i].playStDate + "~" + res.list[i].playEdDate;
			}
			fnObj.gridView2.setData(res);
			if(dataFlag) {
				fnObj.gridView2.selectIdRow(data);
			} else {
				if(selectedRow != null) {
					fnObj.gridView2.selectRow(selectedRow.__index);
				} else {
					fnObj.gridView2.selectFirstRow();
				}
			}
		}
	});

    return false;
}