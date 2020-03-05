var fnObj = {};
var selectedRow = null;
var isUpdate = false;

var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
    	// 새로운 레코드 추가할 시 검색어 삭제
    	var dataFlag = typeof data !== "undefined";
    	var filter = $.extend({}, caller.searchView0.getData());
    	
        axboot.ajax({
            type: "GET",
            url: ["users"],
            data: caller.searchView0.getData(),
            callback: function (res) {
            	caller.gridView0.setData(res);
                
                if(res.list.length == 0) {
                	isUpdate = false;
                	selectedRow = null;
	                caller.formView0.clear();
	                caller.formView0.disable();
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
        
        return false;
    },
    
    PAGE_EXCEL: function(caller, act, data) {
    	caller.gridView0.target.exportExcel("data.xls");
    },
    
    PAGE_NEW: function (caller, act, data) {
    	isUpdate = false;
    	selectedRow = null;
    	caller.gridView0.selectAll(false);
        caller.formView0.clear();
        caller.formView0.enable();
        caller.formView0.validate(true);
        
        caller.formView0.target.find("[data-ax-td-label='passwordLabel']").addClass("required");
        caller.formView0.target.find("[data-ax-path='userPs']").attr("data-ax-validate", "required");
    },
    
    PAGE_DELETE: function(caller, act, data) {
    	if(selectedRow == null) {
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
	                    url: "/api/v1/users/delete",
	                    data: JSON.stringify(selectedRow),
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
    
    PAGE_UPDATE: function(caller, act, data) {
    	if(caller.formView0.validate()) {
    		var formData = caller.formView0.getData();
    		
    		if(formData.scdPsUseYn == "Y") {
    			if((formData.scdPs == null  || formData.scdPs == "") &&  formData.extScdPs == "N") {
    				axDialog.alert(COL("user.scd.check"));
            		return false;    
    			}
    		}
    		
    		axboot.promise()
	            .then(function (ok, fail, data) {
	            	axboot.ajax({
	                	type: "POST",
	                    url: "/api/v1/users/update",
	                    data: JSON.stringify(formData),
	                    callback: function (res) {
	                        ok(res);
	                    }
	                });
	            })
	            .then(function (ok, fail, data) {
	        		axToast.push(LANG("onsave"));
	        		ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
	            })
	            .catch(function () {
	
	            });
    	}
    },
    
    PAGE_SAVE: function (caller, act, data) {
        if (caller.formView0.validate()) {
        	var formData = caller.formView0.getData();
        	
        	if(formData.scdPsUseYn == "Y") {
        		if(formData.scdPs == null || formData.scdPs == "") {
        			axDialog.alert(COL("user.scd.check"));
            		return false;        			
        		}
        	}
        	
        	
        	axboot.promise()
	            .then(function (ok, fail, data) {
	            	axboot.ajax({
	                	type: "POST",
	                    url: "/api/v1/users/duplicate",
	                    data: JSON.stringify(formData),
	                    callback: function (res) {
	                        ok(res);
	                    }
	                });
	            })
	            .then(function (ok, fail, data) {
	            	if(data.message == "true") {
	            		axboot.promise()
			                .then(function (ok, fail, data) {
			                    axboot.ajax({
			                        type: "POST",
			                        url: "/api/v1/users/save",
			                        data: JSON.stringify(formData),
			                        callback: function (res) {
			                            ok(res);
			                        }
			                    });
			                })
			                .then(function (ok, fail, data) {
			            		axToast.push(LANG("onsave"));
			            		ACTIONS.dispatch(ACTIONS.PAGE_SEARCH, data.message);
			                    isUpdate = true;
			                })
			                .catch(function () {
		
			                });
	            	} else {
	            		axDialog.alert("중복된 아이디가 있습니다.")
	            	}
	            	
	            })
	            .catch(function () {
	
	            });
        }
    },
    
    ITEM_CLICK: function (caller, act, data) {
    	selectedRow = data;
        caller.formView0.setData(data);
        caller.formView0.target.find("[data-ax-td-label='passwordLabel']").removeClass("required");
        caller.formView0.target.find("[data-ax-path='userPs']").attr("data-ax-validate", null);
    },
});

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    var _this = this;

    axboot
        .call({
            type: "GET",
            url: ["commonCodes"],
            data: {groupCd: "USER_ROLE", useYn: "Y"},
            callback: function (res) {
                var userRole = [];
                res.list.forEach(function (n) {
                    userRole.push({
                        value: n.code, text: n.name + "(" + n.code + ")",
                        roleCd: n.code, roleNm: n.name,
                        data: n
                    });
                });
                this.userRole = userRole;
            }
        })
        .done(function () {
            _this.pageButtonView.initView();
            _this.searchView0.initView();
            _this.gridView0.initView();
            _this.formView0.initView();

            ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
        });
};

fnObj.pageResize = function () {

};


fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "excel": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_EXCEL);
            },
            "search": function () {
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
            }
        });
    }
});

//== view 시작
/**
 * searchView
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
 * gridView
 */
fnObj.gridView0 = axboot.viewExtend(axboot.gridView, {
    initView: function () {

        var _this = this;
        this.target = axboot.gridBuilder({
        	showLineNumber: true,
        	lineNumberColumnWidth: 30,
            target: $('[data-ax5grid="gridView0"]'),
            columns: [
                {key: "userCd",		label: COL("user.id"),					width: 120},
                {key: "userNm",		label: COL("user.name"),				width: 120, align: "left"},
                {key: "email",		label: COL("user.email"),				width: 160},
                {key: "hpNo",		label: COL("user.hp"),					width: 120},
                {key: "useYn",		label: COL("ax.admin.use.or.not")}
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                    ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.list[this.dindex]);
                }
            }
        });
    },
    setData: function (_data) {
        this.target.setData(_data);
    },
    getData: function () {
        return this.target.getData();
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
    		if(this.target.list[i].userCd == id) {
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
        return $.extend({}, axboot.formView.defaultData, {
            compCd: "S0001",
            scdPsUseYn: "N",
            roleList: [],
            authList: []
        });
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
        
        if(data.extScdPs == "Y") {
        	$("[data-ax-path='scdPs']").attr("placeholder", "••••••");
        } else {
        	$("[data-ax-path='scdPs']").attr("placeholder", "");
        }

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
    	var _this = this;
    	this.target.find("[data-ax-path]").each(function(index, element) {
    		if($(element).data("key") && isUpdate) {
    			$(element).attr("readonly", true);
    		} else {
    			$(element).attr("readonly", false).attr("disabled", false);
    		}
    	});
    },
    disable: function() {
    	this.target.find('[data-ax-path]').each(function(index, element) {
    		$(element).attr("readonly", true).attr("disabled", true);
    	});
    },
    clear: function () {
        this.model.setModel(this.getDefaultData());
        this.target.find('[data-ax-path="key"]').removeAttr("readonly");
    }
});
