
var fnObj = {}, CODE = {};

/***************************************** 전역 변수 초기화 ******************************************************/
var isUpdate = false;
var selectedRow = null;
/*************************************************************************************************************/

/***************************************** 이벤트 처리 코드 ******************************************************/
var ACTIONS = axboot.actionExtend(fnObj, {
	PAGE_SEARCH: function(caller, act, data) {
		ACTIONS.dispatch(ACTIONS.RELOAD_G0);
		ACTIONS.dispatch(ACTIONS.RELOAD_G1);
	},
	
    RELOAD_G0: function (caller, act, data) {
    	var filter = {
    		filter: $("#priceType").val()
    	};
    	
        axboot.ajax({
            type: "GET",
            url: "/api/v1/AD0103G0S0",
            data: filter,
            callback: function (res) {
                caller.gridView0.setData(res);
            }
        });

        return false;
    },
    
    RELOAD_G1: function (caller, act, data) {
    	// 새로운 레코드 추가할 시 검색어 삭제
    	var dataFlag = typeof data !== "undefined";
    	var filter = {
    		filter: $("#priceType").val()
    	};
    	
        axboot.ajax({
            type: "GET",
            url: "/api/v1/AD0103G1S0",
            data: filter,
            callback: function (res) {
                caller.gridView1.setData(res);
                
                if(res.list.length == 0) {
                	isUpdate = false;
                	selectedRow = null;
	                caller.formView0.clear();
	                caller.formView0.disable();
                } else {
                	caller.formView0.enable();
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
            }
        });

        return false;
    },
    
    PAGE_CONFIRMYN: function(caller, act, data) {
    	if(selectedRow == null) {
    		axDialog.alert("광고를 선택해주세요");
    		return false; 
    	}
    	
    	if(selectedRow.confirmYn == "Y") {
    		if(new Date() > new Date(selectedRow.adEdDate)) {
    			axDialog.alert("거래기간 동안만 확정해제가 가능합니다.");
    			return false;
    		}
    		
    		
    		axDialog.confirm({
        		msg: LANG("ax.script.contractconfirmn")
        	}, function() {
        		if(this.key == "ok"){
        			axboot.modal.open({
        	            modalType: "SECOND_PASSWORD",
        	            param: "",
        	            callback: function (data) {
        	            	this.close();
        	            	axboot.promise()
    	    		            .then(function (ok, fail, data) {
    	    		            	axboot.ajax({
    	    		                    type: "POST",
    	    		                    url: "/api/v1/AD0103G1U0",
    	    		                    data: JSON.stringify({
    	    		                    	instId: selectedRow.instId,
    	    		                    	confirmYn: "N"
    	    		                    }),
    	    		                    callback: function (res) {
    	    		                        ok(res);
    	    		                    }
    	    		                });
    	    		            })
    	    		            .then(function (ok) {
    	    		            	caller.formView0.clear();
    	    		            	axToast.push(LANG("confirmn.msg"));
    	    		                ACTIONS.dispatch(ACTIONS.RELOAD_G1, selectedRow.instId);
    	    		            })
    	    		            .catch(function () {
    	    		
    	    		            });
        	            }
        			});
        		}
        	});
    	} else if(selectedRow.confirmYn == "N") {
    		axDialog.confirm({
        		msg: LANG("ax.script.contractconfirm")
        	}, function() {
        		if(this.key == "ok"){
        			axboot.modal.open({
        	            modalType: "SECOND_PASSWORD",
        	            param: "",
        	            callback: function (data) {
        	            	this.close();
        	            	axboot.promise()
    	    		            .then(function (ok, fail, data) {
    	    		            	axboot.ajax({
    	    		                    type: "POST",
    	    		                    url: "/api/v1/AD0103G1U0",
    	    		                    data: JSON.stringify({
    	    		                    	instId: selectedRow.instId,
    	    		                    	confirmYn: "Y"
    	    		                    }),
    	    		                    callback: function (res) {
    	    		                        ok(res);
    	    		                    }
    	    		                });
    	    		            })
    	    		            .then(function (ok) {
    	    		            	caller.formView0.clear();
    	    		            	axToast.push(LANG("confirm.msg"));
    	    		                ACTIONS.dispatch(ACTIONS.RELOAD_G1, selectedRow.instId);
    	    		            })
    	    		            .catch(function () {
    	    		
    	    		            });
        	            }
        			});
        		}
        	});
    	}
    },
    
    PAGE_NEW: function (caller, act, data) {
    	isUpdate = false;
    	selectedRow = null;
    	caller.gridView0.selectAll(false);
    	caller.gridView1.selectAll(false);
        caller.formView0.clear();
        caller.formView0.enable();
        caller.formView0.validate(true);
    },
    
    PAGE_DELETE: function(caller, act, data) {
    	if(selectedRow == null) {
    		axDialog.alert(LANG("ax.script.alert.requireselect"));
    		return false;
    	}
    	
    	if(selectedRow.confirmYn == "Y") {
    		axDialog.alert("확정된 광고는 삭제가 불가능합니다.");
    		return false;
    	}
    	
    	axDialog.confirm({
            msg: LANG("ax.script.deleteconfirm")
        }, function() {
            if(this.key == "ok") {
            	axboot.promise()
	                .then(function (ok, fail, data) {
		            	axboot.ajax({
		                    type: "POST",
		                    url: "/api/v1/AD0103G1D0",
		                    data: JSON.stringify({instId: selectedRow.instId}),
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
            var list = caller.gridView0.getData("selected");
            formData["list"] = list;
            formData["priceType"] = $("#priceType").val();
            
            if(list.length == 0) {
            	axDialog.alert("차량을 선택해주세요");
            	return false;
            }
            
    		axboot.promise()
                .then(function (ok, fail, data) {
                    axboot.ajax({
                        type: "POST",
                        url: "/api/v1/AD0103F0I0",
                        data: JSON.stringify(formData),
                        callback: function (res) {
                            ok(res);
                        }
                    });
                })
                .then(function (ok, fail, data) {
                	axToast.push(LANG("onsave"));
            		ACTIONS.dispatch(ACTIONS.RELOAD_G1, data.message);
                    isUpdate = true;
                })
                .catch(function () {

                });
        }
    },
    
    PAGE_UPDATE: function(caller, act, data) {
    	if(selectedRow.confirmYn == "Y") {
    		axDialog.alert("확정된 광고는 수정이 불가능합니다.");
    		return false;
    	}
    	
        if (caller.formView0.validate()) {
            var formData = caller.formView0.getData();
            var list = caller.gridView0.getData("selected");
            formData["list"] = list;
            formData["priceType"] = $("#priceType").val();
            
            if(list.length == 0) {
            	axDialog.alert("차량을 선택해주세요");
            	return false;
            }
            
            axboot.promise()
                .then(function (ok, fail, data) {
                    axboot.ajax({
                    	type: "POST",
                        url: "/api/v1/AD0103F0U0",
                        data: JSON.stringify(formData),
                        callback: function (res) {
                            ok(res);
                        }
                    });
                })
                .then(function (ok, fail, data) {
            		axToast.push(LANG("onsave"));
            		ACTIONS.dispatch(ACTIONS.RELOAD_G1, selectedRow.instId);
                })
                .catch(function () {

                });
        }
    },
    
    // 탭닫기
    PAGE_CLOSE: function(caller, act, data) {
    	window.parent.fnObj.tabView.closeActiveTab();
    },
    
    ITEM_CLICK_G0: function(caller, act, data) {
    },
    
    ITEM_CLICK_G1: function(caller, act, data) {
    	isUpdate = true;
    	selectedRow = data;
    	caller.formView0.setData(data);
    	caller.gridView0.selectAll(false);
    	
    	if(selectedRow.confirmYn == "Y"){
    		caller.formView0.disable();

    	} else {
    		caller.formView0.enable();
    	}
    	
    	var filter = {
    		instId: selectedRow.instId,
    		priceType: $("#priceType").val()
    	};
    	
    	axboot.ajax({
            type: "GET",
            url: "/api/v1/AD0103G0S1",
            data: filter,
            callback: function (res) {
            	var gridList = caller.gridView0.getData();
            	var list = res.list;
            	
            	for(var i = 0; i < list.length; i++) {
            		for(var j = 0; j < gridList.length; j++) {
            			if(list[i].vhcId == gridList[j].vhcId && list[i].adLvl == gridList[j].adLvl && list[i].adPos == gridList[j].adPos) {
            				caller.gridView0.target.select(j);
            			}
            		}
            	}
            }
        });

        return false;
    },
    
    OPEN_BM0102_MODAL: function(caller, act, data) {
    	axboot.modal.open({
            modalType: "BM0102",
            param: "",
            callback: function (data) {
            	caller.formView0.model.set("custId", data.custId);
            	caller.formView0.model.set("custNm", data.custNm);
                this.close();
            }
        });
    },
    
    CALCULATE_AMT: function(caller, act, data) {
    	if(caller.gridView0.getData("selected").length == 0) {
    		axDialog.alert("차량부착위치를 선택해주세요");
    		return false;
    	}
    	
    	axDialog.confirm({
    		msg: "기존에 입력한 내용이 초기화 됩니다. 계속하시겠습니까?"
        }, function() {
            if (this.key == "ok") {
            	var list = caller.gridView0.getData("selected");
            	
            	var amt = 0;
            	
            	for(var i = 0; i < list.length; i++) {
            		amt += list[i].unitAmt;
            	}
            	
            	caller.formView0.model.set("adAmt", amt);
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
    
    ACTIONS.dispatch(ACTIONS.RELOAD_G0);
    ACTIONS.dispatch(ACTIONS.RELOAD_G1);
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
            "confirmyn": function() {
            	ACTIONS.dispatch(ACTIONS.PAGE_CONFIRMYN);
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
        
        $(document).on("change", "#priceType", function(e) {
        	ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
        });
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
        	multipleSelect : true,
        	showRowSelector: true,
            target: $('[data-ax5grid="gridView0"]'),
            columns: [
            	{key: "vhcNo",			label: ADMIN("ax.admin.AD0103G0.vhc.no"),			width: 100,	align: "center"},
            	{key: "adRout",			label: ADMIN("ax.admin.AD0103G0.route"),			width: 80,	align: "center"},
                {key: "adLvlNm",		label: ADMIN("ax.admin.AD0103G0.ad.lvl"),			width: 80,	align: "center"},
                {key: "adPosTypeNm",	label: ADMIN("ax.admin.AD0103G0.ad.pos.type"),		width: 80,	align: "center"},
                {key: "adPosNm",		label: ADMIN("ax.admin.AD0103G0.ad.pos"),			width: 115},
                {key: "unitAmt",		label: ADMIN("ax.admin.AD0103G0.unit.amt"),			width: 100,	align: "right",	formatter: "money"},
            ],
            body: {
            	mergeCells: ["vhcNo", "adRout", "adLvlNm", "adPosTypeNm"],
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
                {key: "instId",		label: ADMIN("ax.admin.AD0103G1.inst.id"),		sortable: true, width: 100,		align: "center"},
                {key: "instNm",		label: ADMIN("ax.admin.AD0103G1.inst.nm"),		sortable: true, width: 150},
                {key: "custNm",		label: ADMIN("ax.admin.AD0103G1.cust.id"),		sortable: true, width: 100,		align: "center"},
                {key: "adStDate",	label: ADMIN("ax.admin.AD0103G1.ad.st.date"),					width: 80,		align: "center"},
                {key: "adEdDate",	label: ADMIN("ax.admin.AD0103G1.ad.ed.date"),					width: 80,		align: "center"},
                {key: "adAmt",		label: ADMIN("ax.admin.AD0103G1.ad.amt"),						width: 80,		align: "right",		formatter: "money"},
                {key: "remark",		label: ADMIN("ax.admin.AD0103G1.remark"),						width: 150},
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
    		if(this.target.list[i].instId == id) {
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
        $('[data-ax5formatter]').ax5formatter();
        this.initEvent();
    },
    initEvent: function () {
        this.target.find('[data-ax5picker="date"]').ax5picker({
            direction: "auto",
            content: {
                type: 'date'
            }
        });
        
        axboot.buttonClick(this, "data-form-view-0-btn", {
            "selectBM0102": function() {
            	ACTIONS.dispatch(ACTIONS.OPEN_BM0102_MODAL);
            },
            "btnCalAmt": function() {
            	ACTIONS.dispatch(ACTIONS.CALCULATE_AMT);
            }
        });
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
    	this.target.find('[data-ax-path][data-key!=true],button').each(function(index, element) {
			$(element).attr("readonly", false).attr("disabled", false);
    	});
    	this.target.find(".cqc-calendar").parent().show();
    },
    disable: function() {
    	this.target.find('[data-ax-path][data-key!=true],button').each(function(index, element) {
    		$(element).attr("readonly", true).attr("disabled", true);
    	});
    	this.target.find(".cqc-calendar").parent().hide();
    },
    clear: function () {
        this.model.setModel(this.getDefaultData());
    }
});