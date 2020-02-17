var fnObj = {}, CODE = {};
var updateList = [];
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
            url: "/api/v1/BM0102G0S0",
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
	                    url: "/api/v1/BM0102G0D0",
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
        if (caller.formView0.validate()) {
            var formData = caller.formView0.getData();
            
            formData.append("mngrList", fnObj.gridView1.getData());
            console.log(formData);
            
            axboot.promise()
                .then(function (ok, fail, data) {
                    axboot.ajax({
                        type: "POST",
                        url: "/api/v1/BM0102F0I0",
                        data: JSON.stringify(formData),
                        callback: function (res) {
                            ok(res);
                        }
                    });
                })
                .then(function (ok, fail, data) {
                	
                	var input = fnObj.gridView1.getData();
                	for(var i=0; i<input.length; i++){
                		input[i].custId = fnObj.formView0.getData().custId;
                	}
                	axboot.promise()
                		.then(function (ok, fail, data){
                			axboot.ajax({
                				type: "POST",
                				url: "/api/v1/BM0102G1I0",
                				data: JSON.stringify(input),
                				callback: function (res){
                				}
                			});
                		});
                	
                	
            		axToast.push(LANG("onadd"));
            		ACTIONS.dispatch(ACTIONS.PAGE_SEARCH, data.message);
                    isUpdate = true;
                })
                .catch(function () {

                });
        }
    },
    
    PAGE_UPDATE: function(caller, act, data) {
        if (caller.formView0.validate()) {
            var formData = caller.formView0.getData();

            axboot.promise()
                .then(function (ok, fail, data) {
                    axboot.ajax({
                    	type: "POST",
                        url: "/api/v1/BM0102F0U0",
                        data: JSON.stringify(formData),
                        callback: function (res) {
                            ok(res);
                        }
                    });
                })
                .then(function (ok, fail, data) {
                	
                	var input = fnObj.gridView1.getData();
                	for(var i=0; i<input.length; i++){
                		input[i].custId = fnObj.formView0.getData().custId;
                	}
                	axboot.promise()
                		.then(function (ok, fail, data){
                			axboot.ajax({
                				type: "POST",
                				url: "/api/v1/BM0102G1I0",
                				data: JSON.stringify(input),
                				callback: function (res){
                				}
                			});
                		});
                	
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
        
            axboot.ajax({
            	type: "POST",
                url: "/api/v1/BM0102G1S0",
                data: JSON.stringify(selectedRow),
                callback: function (res) {
                	console.log(res);
                	fnObj.gridView1.setData(res);
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
    this.formView0.initView();
    numberOnly();
    btnAddMngr();
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
                ACTIONS.dispatch(ACTIONS.PAGE_EXCEL);
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
        	frozenColumnIndex: 0,
            //sortable: true,
            target: $('[data-ax5grid="gridView0"]'),
            columns: [
                {key: "custId",	label: "<font color=BF360C>" + ADMIN("ax.admin.BM0102F0.cust.id") + "</font>",		width: 80,	align: "center",	sortable: true},
                {key: "custNm",	label: "<font color=BF360C>" + ADMIN("ax.admin.BM0102F0.cust.name") + "</font>",	width: 80,						sortable: true},
                {key: "corpNo",	label: ADMIN("ax.admin.BM0102F0.corp.no"),											width: 100,	align: "right"},
                {key: "email",	label: ADMIN("ax.admin.BM0102F0.email"),											width: 120},
                {key: "phone",	label: ADMIN("ax.admin.BM0102F0.phone"),											width: 80,	align: "right"},
                {key: "addr1",	label: ADMIN("ax.admin.BM0102F0.addr1"),											width: 120},
                {key: "fax",	label: ADMIN("ax.admin.BM0102F0.fax"),												width: 180,	align: "right"},
                {key: "zipNo",	label: ADMIN("ax.admin.BM0102F0.zip.no"),											width: 70,	align: "right"},
                {key: "addr2",	label: ADMIN("ax.admin.BM0102F0.addr2"),											width: 120},
                {key: "remark",	label: ADMIN("ax.admin.BM0102F0.remark"),											width: 160},
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
    		if(this.target.list[i].custId == id) {
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
            //sortable: true,
            target: $('[data-ax5grid="gridView1"]'),
            columns: [
                {key: "mngrNm",	label: ADMIN("ax.admin.BM0102G1.mngrNm"),	width: 80,	align: "center",	editor: mgrList('mngrNm'),	sortable: true},
                {key: "phone",	label: ADMIN("ax.admin.BM0102G1.phone"),	width: 80,	align: "center",	editor: mgrList('phone')},
                {key: "email",	label: ADMIN("ax.admin.BM0102G1.email"),	width: 100,	align: "right",		editor: mgrList('email')},
                {key: "fax",	label: ADMIN("ax.admin.BM0102G1.fax"),		width: 80,	align: "center",	editor: mgrList('fax')},
                {key: "remark",	label: ADMIN("ax.admin.BM0102G1.remark"),	width: 120,	align: "right",		editor: mgrList('remark')},
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
    		if(this.target.list[i].seq == seq) {
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
        var _this = this;
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

var numberOnly = function(){
    $("input:text[numberOnly]").on("keyup", function() {
        $(this).val($(this).val().replace(/[^0-9]/g,""));
    });
}

function btnAddMngr(){
	$('[data-grid-control]').click(function(){
		switch(this.getAttribute("data-grid-control")){
		case "row-add":
			fnObj.gridView1.addRow({});
			break;
		case "row-del":
			fnObj.gridView1.delRow("selected");
			break;
		}
	});
}

function mgrList(input){
	switch(input){
		case('mngrNm'):
			return {
				type: "text",
				attributes: {
					'maxlength': 4
				}
			};
		case('phone'):
			return {
				type: "text",
				attributes: {
					'maxlength': 11
				}
			};
		case('email') :
			return {
				type: "text",
				attributes: {
					'maxlength': 50
				}
			};
		case('fax') :
			return {
				type: "text",
				attributes: {
					'maxlength': 11
				}
			};
		case('remark') :
			return {
				type: "text",
				attributes: {
					'maxlength': 200
				}
			};
	}
}	

