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
            url: "/api/v1/BM0104G0S0",
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
	                	caller.formView0.interRout(selectedRow);
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
    	caller.gridView0.target.exportExcel("노선목록.xls");
    },
    
    PAGE_NEW: function (caller, act, data) {
    	isUpdate = false;
    	caller.gridView0.selectAll(false);
        caller.formView0.clear();
        caller.formView0.enable();
        //caller.formView0.interRout();

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
        	if(selectedRow.count > 1){
        		axDialog.alert("삭제 실패. 노선경로 데이터가 있는지 확인하세요.");
        		return false;
        	}else{
	            if (this.key == "ok") {
	            	axboot.promise()
	                .then(function (ok, fail, data) {
		            	axboot.ajax({
		                    type: "POST",
		                    url: "/api/v1/BM0104F0D0",
		                    data: JSON.stringify(grid.list[grid.selectedDataIndexs[0]]),
		                    callback: function (res) {
		                    	if(res.message == "error"){
		                    		axDialog.alert("삭제 실패");
		                    	}else{
		                    		ok(res);	                    		
		                    	}
		                    },
		                    options:{
		                    	onError: function(err){
		                    		axDialog.alert("삭제 실패. 노선경로 데이터가 있는지 확인하세요.");
		                    	}
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
        	}
        });
    },
    
    PAGE_SAVE: function (caller, act, data) {
        if (caller.formView0.validate()) {
            var formData = caller.formView0.getData();
            axboot.promise()
                .then(function (ok, fail, data) {
                    axboot.ajax({
                        type: "POST",
                        url: "/api/v1/BM0104F0I0",
                        data: JSON.stringify(formData),
                        callback: function (res) {
                        	/*
                        	if(res.message == "error"){
                        		axDialog.alert("중복된 노선ID가 있습니다. 확인 후 저장하세요.");
                        	}else{
                        	}
                        	*/
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
        }
    },
    
    PAGE_UPDATE: function(caller, act, data) {
        if (caller.formView0.validate()) {
            var formData = caller.formView0.getData();
            axboot.promise()
                .then(function (ok, fail, data) {
                    axboot.ajax({
                    	type: "POST",
                        url: "/api/v1/BM0104F0U0",
                        data: JSON.stringify(formData),
                        callback: function (res) {
                        	/*
                        	if(res.message == "error"){
                        		axDialog.alert("중복된 노선ID가 있습니다. 확인 후 업데이트하세요");
                        	}else{
                        	}*/
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
    
    // 탭닫기
    PAGE_CLOSE: function(caller, act, data) {
    	window.parent.fnObj.tabView.closeActiveTab();
    },
    
    OPEN_BM0104_MODAL: function(caller, act, data) {
    	axboot.modal.open({
            modalType: "BM0104",
            param: "",
            callback: function (data) {
                this.close();
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            }
        });
    },
    
    PAGE_EXCELFORM: function(caller, act, data){
    	location.href = "/api/v1/downloadExcel?type=routNode";
    },
    
    ITEM_CLICK: function (caller, act, data) {
    	isUpdate = true;
    	selectedRow = data;
    	caller.formView0.interRout(selectedRow);
        caller.formView0.setData(data);
        
    },
    
    PAGE_EXCELIMPORT: function(caller, act, data){
    	axboot.modal.open({
            modalType: "FILE_UPLOAD",
            param: "",
            callback: function (data) {
                this.close();
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
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
            "excelform": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_EXCELFORM);
            },
            "excel": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_EXCEL);
            },
            "excelimport": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_EXCELIMPORT);
            },
            "new": function() {
            	ACTIONS.dispatch(ACTIONS.PAGE_NEW);
            },
            "interface": function() {
            	ACTIONS.dispatch(ACTIONS.OPEN_BM0104_MODAL);
            },
            "delete": function() {
            	ACTIONS.dispatch(ACTIONS.PAGE_DELETE);
            },
            "save": function () {
            	if(isUpdate){
            		ACTIONS.dispatch(ACTIONS.PAGE_UPDATE);            		
            	}else{
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


var userWayEdit = {
		type: "select",
		config: {
			columnKeys: {
				optionValue: "CD", optionText: "NM"
			},
			options: [ {CD: "2", NM: "상행"}, {CD: "1", NM: "하행"}, {CD: "3", NM: "왕복"} ]

		},
		disabled: function () { //클릭했을때 그 라우트아이디를 배열에 넣음, 나중에 저장할때 이 배열의 아이디를 받아서 리스트를 뽑아올거임
			if(!updateList.includes(this.item.routId)){
				updateList.push(this.item.routId);									
			}
		}

};

var shortRoutNmEdit = {
	type: "text",
	disabled: function () { //클릭했을때 그 라우트아이디를 배열에 넣음, 나중에 저장할때 이 배열의 아이디를 받아서 리스트를 뽑아올거임
		if(!updateList.includes(this.item.routId)){
			updateList.push(this.item.routId);									
		}
	}
};

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
            	{key: "routId",			label: ADMIN("ax.admin.BM0104G0.routId"),											width: 80,	sortable: true},
            	{key: "interRoutId",			label: ADMIN("ax.admin.BM0104G0.interRoutId"),								width: 80,	sortable: true},
            	{key: "routNm",			label: ADMIN("ax.admin.BM0104G0.routNm"),											width: 70,	sortable: true},
                {key: "shortRoutNm",	label: "<font color=0000FF>" + ADMIN("ax.admin.BM0104G0.shortRoutNm") + "</font>",	width: 100,	sortable: true},
                {key: "wayInfo",		label: "<font color=0000FF>" + ADMIN("ax.admin.BM0104G0.wayInfo") + "</font>",		width: 130},
                {key: "dirInfo",		label: "<font color=0000FF>" + ADMIN("ax.admin.BM0104G0.dirInfo") + "</font>",		width: 130},
                {key: "stStaNm",		label: ADMIN("ax.admin.BM0104G0.stStaNm"),											width: 160},
                {key: "edStaNm",		label: ADMIN("ax.admin.BM0104G0.edStaNm"),											width: 160},
                {key: "wayDivNm",		label: ADMIN("ax.admin.BM0104G0.wayDiv"),											width: 60,			align: "center"},
                {key: "userWayDivNm",	label: "<font color=0000FF>" + ADMIN("ax.admin.BM0104G0.userWayDiv") + "</font>",	width: 120,		align: "center"},
                //{key: "turnDivNm",	label: ADMIN("ax.admin.BM0104G0.turnDiv"),width: 100},
                {key: "dvcName",		label: ADMIN("ax.admin.BM0104G0.dvcName"),											width: 90},
                {key: "line1Str",		label: ADMIN("ax.admin.BM0104G0.line1Str"),											width: 200},
                {key: "line2Str",		label: ADMIN("ax.admin.BM0104G0.line2Str"),											width: 200},
                {key: "line1Satstr",	label: ADMIN("ax.admin.BM0104G0.line1Satstr"),										width: 200},
                {key: "line2Satstr",	label: ADMIN("ax.admin.BM0104G0.line2Satstr"),										width: 200},
                {key: "line1Sunstr",	label: ADMIN("ax.admin.BM0104G0.line1Sunstr"),										width: 200},
                {key: "line2Sunstr",	label: ADMIN("ax.admin.BM0104G0.line2Sunstr"),										width: 200},
                {key: "routShapeNm",	label: "노선 모양",																	width: 70, align: "center"},
                {key: "updatedAt",		label: ADMIN("ax.admin.BM0104G0.updatedAt"),										width: 140,	sortable: true},
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
    	}
    },
    selectLastRow: function() {
    	if(this.target.list.length != 0) {
    		this.selectRow(this.target.list.length - 1);
    	} else {
    	}
    },
    selectRow: function(index) {
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
    		if(this.target.list[i].routId == id) {
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
		$('#wayDiv').attr("readonly", false).attr("disabled", false);
		$('#routNm').attr("readonly", false).attr("disabled", false);
		$('#stStaNm').attr("readonly", false).attr("disabled", false);
		$('#edStaNm').attr("readonly", false).attr("disabled", false);
		$('#wayInfo').attr("readonly", false).attr("disabled", false);
    },
    disable: function() {
    	this.target.find('[data-ax-path][data-key!=true]').each(function(index, element) {
    		$(element).attr("readonly", true).attr("disabled", true);
    	});
    },
    interRout: function(data) {
    	if(/[a-zA-Z]/.test(data.routId.substr(0,1))){
    		$('#wayDiv').attr("readonly", false).attr("disabled", false);
    		$('#routNm').attr("readonly", false).attr("disabled", false);
    		$('#stStaNm').attr("readonly", false).attr("disabled", false);
    		$('#edStaNm').attr("readonly", false).attr("disabled", false);
    		
    	}else{
    		$('#wayDiv').attr("readonly", true).attr("disabled", true);
    		$('#routNm').attr("readonly", true).attr("disabled", true);
    		$('#stStaNm').attr("readonly", true).attr("disabled", true);
    		$('#edStaNm').attr("readonly", true).attr("disabled", true);
    	}

		/** 2020 07 02 전자노선도 표시 위해
		900번 노선일때 방면정보 ReadOnly, Disabled 처리 **/
		if(data.routNm == '900'){
			$('#wayInfo').attr("readonly", true).attr("disabled", true);
		}
		else{
			$('#wayInfo').attr("readonly", false).attr("disabled", false);
		}

    },
    clear: function () {
        this.model.setModel(this.getDefaultData());
        this.target.find('[data-ax-path="key"]').removeAttr("readonly");
        $('#wayDiv').attr("readonly", false).attr("disabled", false);
    }
});
/****************************************************/

var returnCD = function(){
	axboot.promise()
    .then(function (ok, fail, data) {
    	axboot.ajax({
        	type: "POST",
            url: "/api/v1/BM0103F0U0",
            data: JSON.stringify(formData),
            callback: function (res) {
                ok(res);
            }
        });
    })
    .then(function (ok, fail, data) {
    	return null;
    })
    .catch(function () {

    });
}