var fnObj = {}, CODE = {};
var updateList = [];
/***************************************** 전역 변수 초기화 ******************************************************/
isUpdate = false;
selectedRow = null;
/*************************************************************************************************************/



/***************************************** 이벤트 처리 코드 ******************************************************/
var ACTIONS = axboot.actionExtend(fnObj, {
	PAGE_RESERVATION: function(caller, act, data) {

    },
    
    INSERT_RESERVATION: function(caller, act, data) {

    },
    
	PAGE_SEARCH: function (caller, act, data) {
    	// 새로운 레코드 추가할 시 검색어 삭제
    	var dataFlag = typeof data !== "undefined";
    	var filter = $.extend({}, caller.searchView0.getData());
    	
        axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0608G0S0",
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
        selectedRow = null;
        clearFiles();
        var list = makeData();
        caller.gridView1.setData(list);
        
        $("#bgFilename").text("");
        $("#landFilename").text("");
        $("#nextBgFilename").text("");
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
	                    url: "/api/v1/BM0608G0D0",
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
    	if(caller.formView0.validate()){
	    	var formData = new FormData(caller.formView0.target[0]);
	    	
	    	if($("#background")[0].files[0]){
	        	formData.append("background", $("#background")[0].files[0]);
	        }
	    	if($("#land")[0].files[0]) {
	        	formData.append("land", $("#land")[0].files[0]);
	        }
	    	if($("#nextstopbg")[0].files[0]){
	        	formData.append("nextstopbg", $("#nextstopbg")[0].files[0]);
	        }
	    	
	    	if($("#background")[0].files[0] == undefined){
	    		axDialog.alert("전체배경 파일을 업로드하세요");
	    		return false;
	    	}
	    	
	    	if($("#land")[0].files[0] == undefined){
	    		axDialog.alert("정류장안내 파일을 업로드하세요");
	    		return false;
	    	}
	    	
	    	if($("#nextstopbg")[0].files[0] == undefined){
	    		axDialog.alert("이번정류장 파일을 업로드하세요");
	    		return false;
	    	}
	    	var d = fnObj.gridView1.getData();

	    	var fontColor = "";
	    	for(var i = 0; i < d.length; i++){
	    		if(i < d.length - 1){
	    			fontColor+=d[i].color+",";    			
	    		}else{
	    			fontColor+=d[i].color;
	    		}
	    	}
	    	
	    	var f = caller.formView0.getData();

	    	formData.append("setId", f.setId);
	    	formData.append("setNm", f.setNm);
	    	if(f.remark != undefined){
	    		formData.append("remark", f.remark);	    		
	    	}
	    	formData.append("fontColor", fontColor);
	    	
	    	axboot.promise()
	        .then(function (ok, fail, data) {
	        	axboot.ajax({
	            	type: "POST",
	            	enctype: "multipart/form-data",
	            	processData: false,
	                url: "/api/v1/BM0608F0I0",
	                data: formData,
	                callback: function (res) {
	                    ok(res);
	                },
	                options: {
	                	contentType:false
	                }
	            });
	        })
	        .then(function (ok) {
	        	//파일업로드하고 진행
        		axToast.push(LANG("onsave"));
        		ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
	        })
	        .catch(function () {
	
	        });
    	}
    },
     
    PAGE_UPDATE: function(caller, act, data) {
    	if(caller.formView0.validate()){
	    	var formData = new FormData(caller.formView0.target[0]);
	    	
	    	if($("#background")[0].files[0]){
	        	formData.append("background", $("#background")[0].files[0]);
	        }
	    	if($("#land")[0].files[0]) {
	        	formData.append("land", $("#land")[0].files[0]);
	        }
	    	if($("#nextstopbg")[0].files[0]){
	        	formData.append("nextstopbg", $("#nextstopbg")[0].files[0]);
	        }
	    	
	    	var d = fnObj.gridView1.getData();

	    	var fontColor = "";
	    	for(var i = 0; i < d.length; i++){
	    		if(i < d.length - 1){
	    			fontColor+=d[i].color+",";    			
	    		}else{
	    			fontColor+=d[i].color;
	    		}
	    	}
	    	
	    	var f = caller.formView0.getData();

	    	formData.append("setId", f.setId);
	    	formData.append("setNm", f.setNm);
	    	formData.append("remark", f.remark);
	    	formData.append("fontColor", fontColor);
	    	
	    	axboot.promise()
	        .then(function (ok, fail, data) {
	        	axboot.ajax({
	            	type: "POST",
	            	enctype: "multipart/form-data",
	            	processData: false,
	                url: "/api/v1/BM0608F0U0",
	                data: formData,
	                callback: function (res) {
	                    ok(res);
	                },
	                options: {
	                	contentType:false
	                }
	            });
	        })
	        .then(function (ok) {
	        	//파일업로드하고 진행
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
    
    ITEM_CLICK: function (caller, act, data) {
    	isUpdate = true;
    	selectedRow = data;
        caller.formView0.setData(data);

        var setId = data.setId;
        
        var frame = makeData();
        clearFiles();
        var arr = data.fontColor.split(',');
        for(var i=0; i< arr.length; i++){
        	frame[i].color = arr[i];
        }

        caller.gridView1.setData(frame);
        
        $("#bgFilename").text("background.png");
        $("#landFilename").text("land.png");
        $("#nextBgFilename").text("nextstopbg.png");
        
    },
    
    CHANGE_ALL: function (caller, act, data) {
    	var frame = makeData();
    	var color = $('#fontAll').val();
    	
    	if(color.length != 9 || color.substr(0, 1) != '#'){
    		axDialog.alert("ARGB 양식을 맞춰주세요");
    		return false;
    	}    	
    	else{
    		for(var i=0; i<frame.length; i++){
    			frame[i].color = color;
    		}
    		
    		caller.gridView1.setData(frame);
    	}
    },
    
    PREVIEW: function (caller, act, data){
    	var input = selectedRow;
    	//var formData = new FormData(caller.formView0.target[0]);
    	var formData = {};
    	formData.input = input;
    	formData.file1 = $("#background")[0];
    	formData.file2 = $("#land")[0];
    	formData.file3 = $("#nextstopbg")[0];
    	
    	//formData.append("input", input);
    	
    	//formData.append("file1", $("#background")[0].files[0]);
    	//formData.append("file2", $("#land")[0].files[0]);
    	//formData.append("file3", $("#nextstopbg")[0].files[0]);
    	
    	axboot.modal.open({
            modalType: "BM0608",
            param: "",
            sendData: function(){
            	return formData;
            },
            callback: function (data) {
            	// 운수사, 거래처 등을 선택한 후 이벤트 ex) input에 값을 넣어 주는 등의 로직을 작성하면됨
                this.close();
            }
        });
    }

    
});

function fileVal(){	
	$("input[id=background]").change(function(){
	    var ext = $(this).val().split(".").pop().toLowerCase();
	    
	    if($.inArray(ext,["png", "PNG", ""]) == -1) {
	    	axDialog.alert("png 파일만 업로드 가능합니다.");
	        $("input[id=background]").val("");
	        return;
	    }else if($.inArray(ext,["png", "PNG", ""]) == 2) {
	    	$("input[id=background]").val("");
	        return;
	    }
	});
	
	$("input[id=land]").change(function(){
	    var ext = $(this).val().split(".").pop().toLowerCase();
	    
	    if($.inArray(ext,["png", "PNG", ""]) == -1) {
	    	axDialog.alert("png 파일만 업로드 가능합니다.");
	        $("input[id=land]").val("");
	        return;
	    }else if($.inArray(ext,["png", "PNG", ""]) == 2) {
	    	$("input[id=land]").val("");
	        return;
	    }
	});
	
	$("input[id=nextstopbg]").change(function(){
	    var ext = $(this).val().split(".").pop().toLowerCase();
	    
	    if($.inArray(ext,["png", "PNG", ""]) == -1) {
	    	axDialog.alert("png 파일만 업로드 가능합니다.");
	        $("input[id=nextstopbg]").val("");
	        return;
	    }else if($.inArray(ext,["png", "PNG", ""]) == 2) {
	    	$("input[id=nextstopbg]").val("");
	        return;
	    }
	});
}
/********************************************************************************************************************/

/******************************************* 페이지 처음 로딩시 호출 ******************************************************/
fnObj.pageStart = function () {
    this.pageButtonView.initView();
    this.gridView0.initView();
    this.formView0.initView();
    this.gridView1.initView();
	this.searchView0.initView();
	fileVal();
    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
    clickUserBtn();
};

fnObj.pageResize = function () {

};
/********************************************************************************************************************/
function clickUserBtn(){
	$('#chAllColor').on('click', function(){
		ACTIONS.dispatch(ACTIONS.CHANGE_ALL);
	});
}

/******************************************** 공통 버튼 클릭 이벤트 ******************************************************/
fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
        	"reservation": function() {
        		ACTIONS.dispatch(ACTIONS.PAGE_RESERVATION);
        	},
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
            },
            "preview": function(){
            	ACTIONS.dispatch(ACTIONS.PREVIEW);
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
            target: $('[data-ax5grid="gridView0"]'),
            columns: [
            	{key: "setId",	label: ADMIN("ax.admin.BM0608F0.setId"),	width: 80,	align: "center"},
            	{key: "setNm",	label: ADMIN("ax.admin.BM0608F0.setNm"),	width: 100,	align: "left"},
                {key: "remark",	label: ADMIN("ax.admin.BM0608F0.remark"),	width: 130,	align: "left"},
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                    ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.item);
                }
            },
        });
        
        axboot.buttonClick(this, "data-form-view-0-btn", {
            "selectContract": function() {
            	ACTIONS.dispatch(ACTIONS.OPEN_CONTRACT_MODEL);
            }
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
    		if(this.target.list[i].vocId == id) {
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
        });
    },
    initView: function () {
    	_this = this;
        this.target = $("#formView0");
        this.model = new ax5.ui.binder();
        this.model.setModel(this.getDefaultData(), this.target);
        this.modelFormatter = new axboot.modelFormatter(this.model); // 모델 포메터 시작
        this.initEvent();

        this.target.find('[data-ax5picker="date"]').ax5picker({
            direction: "auto",
            content: {
                type: 'date'
            }
        });
        
        axboot.buttonClick(this, "data-btn-test", {
        });
        
        axboot.buttonClick(this, "data-btn-common-txt", {
        });
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
    	var _this = this;
    	this.target.find("[data-ax-path][data-key!=true]").each(function(index, element) {
    		$(element).attr("readonly", false);
    		$('#chAllColor').attr("readonly", false).attr("disabled", false);
    		$('.pngFile').attr("readonly", false).attr("disabled", false);
    		$('#previewBtn').attr("readonly", false).attr("disabled", false);
    	});
    },
    disable: function() {
    	this.target.find('[data-ax-path][data-key!=true]').each(function(index, element) {
    		$(element).attr("readonly", true);
    		$('#chAllColor').attr("readonly", true).attr("disabled", true);
    		$('.pngFile').attr("readonly", true).attr("disabled", true);
    		$('#previewBtn').attr("readonly", true).attr("disabled", true);
    		fnObj.gridView1.setData([{}]);
    	});
    },
    clear: function () {
        this.model.setModel(this.getDefaultData());
        this.target.find('[data-ax-path="key"]').removeAttr("readonly");
    }
});

function fontColorEditor(){
	return {
		type: "text",
		attributes: {
			"maxlength": 9
		}
	}
}

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
        	showLineNumber: true,
        	showRowSelector: false,
        	lineNumberColumnWidth: 30,
        	rowSelectorColumnWidth: 30,
        	frozenColumnIndex: 0,
            sortable: false,
            target: $('[data-ax5grid="gridView1"]'),
            header: {
            	align: "center",
            	columnHeight: 28
            	},
            columns: [
            	{key: "col1",	label: "위치",	width: 100},
            	{key: "col2",	label: "위치",	width: 100},
            	{key: "color",	label: "폰트 색",	width: 100, editor: fontColorEditor()},
            ],
            body: {
            	mergeCells: ["col1"],
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
    	}
    },
    selectAll: function(flag) {
    	this.target.selectAll({selected: flag});
    }
});


function clearFiles(){
	$('#background').val('');
	$('#land').val('');
	$('#nextstopbg').val('');
}

function makeData(){

	var black	= "#FF000000";

	var list = new Array();
	list.push({col1: ADMIN("ax.admin.BM0608G1.c1"), col2: ADMIN("ax.admin.BM0608G1.c1r1"), color: black});
	list.push({col1: ADMIN("ax.admin.BM0608G1.c1"), col2: ADMIN("ax.admin.BM0608G1.c1r2"), color: black});
	list.push({col1: ADMIN("ax.admin.BM0608G1.c1"), col2: ADMIN("ax.admin.BM0608G1.c1r3"), color: black});
	list.push({col1: ADMIN("ax.admin.BM0608G1.c1"), col2: ADMIN("ax.admin.BM0608G1.c1r4"), color: black});
	list.push({col1: ADMIN("ax.admin.BM0608G1.c2"), col2: ADMIN("ax.admin.BM0608G1.c2r1"), color: black});
	list.push({col1: ADMIN("ax.admin.BM0608G1.c3"), col2: ADMIN("ax.admin.BM0608G1.c3r1"), color: black});
	list.push({col1: ADMIN("ax.admin.BM0608G1.c3"), col2: ADMIN("ax.admin.BM0608G1.c3r2"), color: black});
	list.push({col1: ADMIN("ax.admin.BM0608G1.c4"), col2: ADMIN("ax.admin.BM0608G1.c4r1"), color: black});
	list.push({col1: ADMIN("ax.admin.BM0608G1.c4"), col2: ADMIN("ax.admin.BM0608G1.c4r2"), color: black});
	list.push({col1: ADMIN("ax.admin.BM0608G1.c4"), col2: ADMIN("ax.admin.BM0608G1.c4r3"), color: black});
	list.push({col1: ADMIN("ax.admin.BM0608G1.c4"), col2: ADMIN("ax.admin.BM0608G1.c4r4"), color: black});
	list.push({col1: ADMIN("ax.admin.BM0608G1.c5"), col2: ADMIN("ax.admin.BM0608G1.c5r1"), color: black});
	list.push({col1: ADMIN("ax.admin.BM0608G1.c5"), col2: ADMIN("ax.admin.BM0608G1.c5r2"), color: black});
	list.push({col1: ADMIN("ax.admin.BM0608G1.c5"), col2: ADMIN("ax.admin.BM0608G1.c5r3"), color: black});
	list.push({col1: ADMIN("ax.admin.BM0608G1.c5"), col2: ADMIN("ax.admin.BM0608G1.c5r4"), color: black});
	list.push({col1: ADMIN("ax.admin.BM0608G1.c5"), col2: ADMIN("ax.admin.BM0608G1.c5r5"), color: black});
	list.push({col1: ADMIN("ax.admin.BM0608G1.c5"), col2: ADMIN("ax.admin.BM0608G1.c5r6"), color: black});
	list.push({col1: ADMIN("ax.admin.BM0608G1.c5"), col2: ADMIN("ax.admin.BM0608G1.c5r7"), color: black});
	list.push({col1: ADMIN("ax.admin.BM0608G1.c6"), col2: ADMIN("ax.admin.BM0608G1.c6r1"), color: black});
	list.push({col1: ADMIN("ax.admin.BM0608G1.c6"), col2: ADMIN("ax.admin.BM0608G1.c6r2"), color: black});
	list.push({col1: ADMIN("ax.admin.BM0608G1.c6"), col2: ADMIN("ax.admin.BM0608G1.c6r3"), color: black});
	list.push({col1: ADMIN("ax.admin.BM0608G1.c6"), col2: ADMIN("ax.admin.BM0608G1.c6r4"), color: black});
	list.push({col1: ADMIN("ax.admin.BM0608G1.c6"), col2: ADMIN("ax.admin.BM0608G1.c6r5"), color: black});
	list.push({col1: ADMIN("ax.admin.BM0608G1.c6"), col2: ADMIN("ax.admin.BM0608G1.c6r6"), color: black});
	list.push({col1: ADMIN("ax.admin.BM0608G1.c7"), col2: ADMIN("ax.admin.BM0608G1.c7r1"), color: black});
	list.push({col1: ADMIN("ax.admin.BM0608G1.c7"), col2: ADMIN("ax.admin.BM0608G1.c7r2"), color: black});
	
	return list;
}