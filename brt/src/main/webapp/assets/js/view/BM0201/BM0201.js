var fnObj = {}, CODE = {};

/***************************************** 전역 변수 초기화 ******************************************************/
isUpdate = false;
isCheck = true;
selectedRow = null;
selectedRowG1 = null;
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
                caller.gridView0.setData(res);
                
                if(res.list.length == 0) {
                	isUpdate = false;
                	selectedRow = null;
	                caller.formView0.clear();
	                caller.formView0.disable();
                } else {
                	caller.formView0.enable();
	                if(selectedRow != null) {
	                	caller.gridView0.selectRow(selectedRow.__index);
	                } else {
	                	caller.gridView0.selectFirstRow();
	                }
                }
            }
        });
        isCheck = true;
        return false;
    },
    

    PAGE_EXCEL: function(caller, act, data) {
    	caller.gridView1.target.exportExcel("장치 목록_" + new Date().yyyymmdd() + ".xls");
    },
    
    PAGE_NEW: function (caller, act, data) {
    	isUpdate = false;
    	isCheck = true;
    	caller.gridView1.selectAll(false);
        caller.formView0.clear();
        caller.formView0.enable();
        caller.formView0.validate(true);
    },
    
    PAGE_DELETE: function(caller, act, data) {
    	var grid = caller.gridView0.target;
    	var count;
    	
    	if(typeof grid.selectedDataIndexs[0] === "undefined") {
    		axDialog.alert(LANG("ax.script.alert.requireselect"));
    		return false;
    	}   
        	axboot.ajax({
                type: "GET",
                url: "/api/v1/BM0201G1S1",
                data:{dvcId : selectedRowG1.dvcId},
                callback: function (res) {

                	if(res.list.length == 0) {
                		axboot.ajax({
                            type: "GET",
                            url: "/api/v1/BM0201G1S2",
                            data:{dvcId : selectedRowG1.dvcId},
                            callback: function (res) {
                            	if(res.list.length == 0){
    			                	axDialog.confirm({
    			                    	msg: LANG("ax.script.deleteconfirm")
    			                    }, function() {          	          	
    			                    	if (this.key == "ok") {      	
    			                    		axboot.promise()
    			                    		.then(function (ok, fail, data) {
    			                    			axboot.ajax({
    			                    				type: "POST",
    			                    				url: "/api/v1/BM0201G1D0",
    			                    				data: JSON.stringify({dvcId : selectedRowG1.dvcId}),
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
        	                	}else{
        	                		axDialog.alert("장치이력이"+res.list.length+"건 있어서 삭제가 불가능합니다.");
        	                	}
                            }
                		});
                  }else{
                	  axDialog.alert("업데이트 예약이 걸려있는 장치는 삭제하실 수 없습니다.");
                  }
                }
            });
    	   	
    },
    
    PAGE_SAVE: function (caller, act, data) {
    	 if (caller.formView0.validate()) {
    		 var formData = caller.formView0.getData();
    		 formData["vhcId"] = selectedRow.vhcId;
             
    		 axboot.promise()
    		 	.then(function (ok, fail, data) {
	                axboot.ajax({
	                    type: "POST",
	                    url: "/api/v1/BM0201F0S1",
	                    data: JSON.stringify(formData),
	                    callback: function (res) {
	                        ok(res);
	                    }
	                });
	            })
	            .then(function (ok, fail, data) {
	            	if(data.message == "true"){
	            		axboot.promise()
	            			.then(function(ok, fail , data) {
	            				axboot.ajax({
	            					type: "POST",
	            					url: "/api/v1/BM0201F0I0",
	            					data: JSON.stringify(formData),
	            					callback: function (res) {
	            						ok(res);
	            					}
	            				});
	            			})
	            			.then(function (ok, fail, data) {
	            				ACTIONS.dispatch(ACTIONS.OPEN_BM0201_MODAL, data.message);
	            				axToast.push(LANG("onsave"));
	            				ACTIONS.dispatch(ACTIONS.RELOAD_G1, data.message);
	            				isUpdate = true;
	            			})
	            			.catch(function () {
	            				
	            			});
                 }else{
                	 axDialog.alert("관리ID는 중복으로 저장되지 않습니다.");
                 }
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
						url: "/api/v1/BM0201F0U0",
						data: JSON.stringify(formData),
						callback: function (res) {
							ok(res);
						}
					});
				})
				.then(function (ok, fail, data) {
					axToast.push(LANG("onsave"));
					ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
					isUpdate = true;
				})
				.catch(function () {
					
				});
		}
    },
    
    // 탭닫기
    PAGE_CLOSE: function(caller, act, data) {
    	window.parent.fnObj.tabView.closeActiveTab();
    },
    
    // gridView0항목 클릭 이벤트
    ITEM_CLICK: function (caller, act, data) {
    	selectedRow = data;
    	if(selectedRow.useYn == "N"){
    		caller.formView0.disable();
    		isCheck = false;
    	}else{
    		isCheck = true;
    		caller.formView0.enable();
    	}
    	ACTIONS.dispatch(ACTIONS.RELOAD_G1);
    },
    
    // gridView1 항목 클릭 이벤트
    ITEM_CLICK_G1: function(caller, act, data) {
    	isUpdate = true;
    	selectedRowG1 = data;
    	if(selectedRowG1.useYn == "N"){
    		caller.formView0.disable();
    		$("#maker").attr("readonly", true).attr("disabled", true);
    		$("#dvcKind").attr("readonly", true).attr("disabled", true);
    		$("#instLoc").attr("readonly", true).attr("disabled", true);
    	}else{
    		caller.formView0.enable();
    		$("#maker").attr("readonly", false).attr("disabled", false);
    		$("#dvcKind").attr("readonly", false).attr("disabled", false);
    		$("#instLoc").attr("readonly", false).attr("disabled", false);
    	}
    	caller.formView0.setData(data);
    },
    
    RELOAD_G1: function(caller, act, data) {
    	var dataFlag = typeof data !== "undefined";
    	
    	axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0201G1S0",
            data: {vhcId: selectedRow.vhcId},
            callback: function (res) {
                caller.gridView1.setData(res);
                
                if(res.list.length == 0) {
                	isUpdate = false;
	                caller.formView0.clear();
                	caller.formView0.disable();
                }
                
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
        });
    },   
    OPEN_BM0201_MODAL: function(caller, act, data) {
    	axboot.modal.open({
            modalType: "BM0201",
            param: "",
            sendData: function() {
            	return {
            		dvcId: data
            	};
            },
            callback: function (data) {
            	this.close();
            	ACTIONS.dispatch(ACTIONS.RELOAD_G1 , data);
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
            "new": function() {
            	if(isCheck){
            		ACTIONS.dispatch(ACTIONS.PAGE_NEW);
            	}else{
            		axDialog.alert("사용하지않는 차량의 장비는 추가 할 수 없습니다.");
            	}
            },
            "delete": function() {
            	if(isCheck){
            		ACTIONS.dispatch(ACTIONS.PAGE_DELETE);
            	}else{
            		axDialog.alert("사용하지않는 차량의 장비는 삭제 할 수 없습니다.");
            	}
            },
            "save": function () {
            	if(isCheck){
            	if(isUpdate) {
            		ACTIONS.dispatch(ACTIONS.PAGE_UPDATE);
            	} else {
            		ACTIONS.dispatch(ACTIONS.PAGE_SAVE);
            	}
            	}else{
            		axDialog.alert("사용하지않는 차량의 장비는 저장 할 수 없습니다.");
            	}
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
             filter: this.filter.val(),
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
            		 {key: "vhcId", label: ADMIN("ax.admin.BM0103F0.vhcId"), sortable: true, width: 70, align:"center"},
                     {key: "vhcNo", label: ADMIN("ax.admin.BM0103F0.vhcNo"), align:"center", width: 100},
                     {key: "chasNo", label: ADMIN("ax.admin.BM0103F0.chasNo"), width: 130, align:"center"},
                     {key: "corpNm", label: ADMIN("ax.admin.BM0101F0.corp.name"), width: 120, align:"center"},
                     {key: "area", label: ADMIN("ax.admin.BM0103F0.area"), align:"center", width: 120},
                     {key: "maker", label: ADMIN("ax.admin.BM0103F0.maker"), align:"center", width: 120},
                     {key: "relsDate", label: ADMIN("ax.admin.BM0103F0.relsDate"), sortable: true, width: 100, align:"center"},
                     {key: "modelNm", label: ADMIN("ax.admin.BM0103F0.modelNm"), align:"center", width: 100},
                     {key: "vhcKind", label: ADMIN("ax.admin.BM0103F0.vhcKind"), align:"center", width: 90},
                     {key: "vhcType", label: ADMIN("ax.admin.BM0103F0.vhcType"), align:"center", width: 80},
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
        	lineNumberColumnWidth: 30,
        	frozenColumnIndex: 0,
            target: $('[data-ax5grid="gridView1"]'),
            columns: [
            	{key: "useYn", label: ADMIN("ax.admin.BM0103F0.useYn"), sortable: true, align:"center", styleClass:function(){return (this.item.useYn === "Y") ? "grid-cell-red": "grid-cell-blue" } , width: 80},
            	{key: "dvcId", label: ADMIN("ax.admin.BM0201F0.dvcid"), align: "center", sortable: true, width: 80},
            	{key: "makerCd", label: ADMIN("ax.admin.BM0201F0.maker"), width: 100},
                {key: "dvcKindCd", label: ADMIN("ax.admin.BM0201F0.dvckind"), align: "center", sortable: true, width: 140},
                {key: "instLocCd", label: ADMIN("ax.admin.BM0201F0.instloc"), align: "center", width: 120},
                {key: "mngId", label: ADMIN("ax.admin.BM0201F0.mngid"), align: "center", width: 130},
                {key: "dvcIp", label: ADMIN("ax.admin.BM0201F0.dvcip"), align: "center" , width: 110},
                {key: "remark", label: ADMIN("ax.admin.BM0201F0.remark"), width: 200},
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
    		if(this.target.list[i].dvcId == id) {
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
        		axDialog.alert(LANG("ax.script.form.validate", rs.error[0].jquery.attr("title")));
        	}
            rs.error[0].jquery.focus();
            return false;
        }
        return true;
    },
    enable: function() {
    	this.target.find('[data-ax-path][data-key!=true]').each(function(index, element) {
    		$(element).attr("readonly", false);
    		$("#maker").attr("readonly", false).attr("disabled", false);
    		$("#dvcKind").attr("readonly", false).attr("disabled", false);
    		$("#instLoc").attr("readonly", false).attr("disabled", false);
    	});
    },
    disable: function() {
    	this.target.find('[data-ax-path][data-key!=true]').each(function(index, element) {
    		$(element).attr("readonly", true);
    		$("#maker").attr("readonly", true).attr("disabled", true);
    		$("#dvcKind").attr("readonly", true).attr("disabled", true);
    		$("#instLoc").attr("readonly", true).attr("disabled", true);
    	});
    },
    clear: function () {
        this.model.setModel(this.getDefaultData());
        this.target.find('[data-ax-path="key"]').removeAttr("readonly");
    }
});