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
            url: "/api/v1/BM0108G0S0",
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
        preview_Image();
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
	                    url: "/api/v1/BM0108G0D0",
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
            var formData = new FormData(caller.formView0.target[0]);
            if($("#employeeImg")[0].files[0]){
            	formData.append("attFile", $("#employeeImg")[0].files[0].name);
            }

                      
            axboot.promise()
                .then(function (ok, fail, data) {
                	axboot.ajax({
                    	type: "POST",
                    	enctype: "multipart/form-data",
                    	processData: false,
                        url: "/api/v1/BM0108F0I0",
                        data: formData,
                        callback: function (res) {
                            ok(res);
                        },
                        options: {
                        	contentType:false
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
    
    PAGE_UPDATE: function(caller, act, data) {
        if (caller.formView0.validate()) {
            var formData = new FormData(caller.formView0.target[0]);
            if($("#employeeImg")[0].files[0]){
            	formData.append("attFile", $("#employeeImg")[0].files[0].name);
            }

                      
            axboot.promise()
                .then(function (ok, fail, data) {
                	axboot.ajax({
                    	type: "POST",
                    	enctype: "multipart/form-data",
                    	processData: false,
                        url: "/api/v1/BM0108F0U0",
                        data: formData,
                        callback: function (res) {
                            ok(res);
                        },
                        options: {
                        	contentType:false
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
        
        $("#employeeImg").val("");
        
    	var url = "/api/v1/filePreview?type=image&eplyId=" + data.eplyId;
    	
    	$("#previewImg").attr("src", url);
    	
    },
    
    OPEN_BM0101_MODAL: function(caller, act, data) {
    	axboot.modal.open({
            modalType: "BM0101",
            param: "",
            callback: function (data) {
            	// 운수사, 거래처 등을 선택한 후 이벤트 ex) input에 값을 넣어 주는 등의 로직을 작성하면됨
            	caller.formView0.model.set("corpId", data.corpId);
            	caller.formView0.model.set("corpNm", data.corpNm);
                this.close();
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
            sortable: true,
            target: $('[data-ax5grid="gridView0"]'),
            columns: [
                {key: "eplyId", label: ADMIN("ax.admin.BM0108F0.eplyId"), width: 100},
                {key: "eplyNm", label: ADMIN("ax.admin.BM0108F0.eplyNm"), width: 80},
                {key: "phone", label: ADMIN("ax.admin.BM0108F0.phone"), width: 120},
                {key: "corpId", label: ADMIN("ax.admin.BM0108F0.corpId"), width: 120},
                {key: "busDiv", label: ADMIN("ax.admin.BM0108F0.busDiv"), width: 80},
                {key: "retireYn", label: ADMIN("ax.admin.BM0108F0.retireYn"), width: 80},
                {key: "eplyDate1", label: ADMIN("ax.admin.BM0108F0.eplyDate1"), width: 100},
                {key: "eplyDate2", label: ADMIN("ax.admin.BM0108F0.eplyDate2"), width: 100},
                {key: "licenNo", label: ADMIN("ax.admin.BM0108F0.licenNo"), width: 120},
                {key: "certiDate", label: ADMIN("ax.admin.BM0108F0.certiDate"), width: 100},
                {key: "attFile", label: ADMIN("ax.admin.BM0108F0.attFile"), width: 120},
                {key: "remark", label: ADMIN("ax.admin.BM0108F0.remark"), width: 150},
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
    		if(this.target.list[i].eplyId == id) {
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

        axboot.buttonClick(this, "data-form-view-0-btn", {
            "selectBM0101": function() {
            	ACTIONS.dispatch(ACTIONS.OPEN_BM0101_MODAL);
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

/********************************************************************************************************************/
/** 승무사원관리 전용 함수 **/
/********************************************************************************************************************/
//승무사원이미지가 있다면 파일 불러와서 미리보기(추가예정), 없다면 기본 이미지 미리보기
function preview_Image(){
	var path;
	path = "/assets/images/BM0108/EmployeeDefault.png";//default path
	document.getElementById('previewImg').src=path;
}

//승무사원이미지 변경시 미리보기
function preview_ChangeImage(input) {
    if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
    	$('#previewImg').attr('src', e.target.result);
        }
    	reader.readAsDataURL(input.files[0]);
    }
}

//파일 업로드 Form
function uploadFile(){
	
}
