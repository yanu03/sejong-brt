var fnObj = {}, CODE = {};
var updateList = [];
/***************************************** 전역 변수 초기화 ******************************************************/
isUpdate = false;
selectedRow = null;
/*************************************************************************************************************/

/***사용자 변수***/
uv_frontwidth = 348;
uv_frontheight = 64;
uv_sidewidth = 160;
uv_sideheight = 32;
uv_dvc_type = null;
uv_width = 0;
uv_height = 0;
frontCode = 'CD001';
sideCode = 'CD002';
/**************/

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
            url: "/api/v1/BM0104G0S0",
            data: filter,
            callback: function (res) {
                caller.gridView0.setData(res);
                
                if(res.list.length == 0) {
                	isUpdate = false;
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
        //loadSCH();
        return false;
    },
	PAGE_EXCEL: function(caller, act, data) {
    	caller.gridView0.target.exportExcel("data.xls");
    },
    
    PAGE_NEW: function (caller, act, data) {

    },
    
    PAGE_DELETE: function(caller, act, data) {

    },
    
    PAGE_SAVE: function (caller, act, data) {  

    },
    
    PAGE_UPDATE: function(caller, act, data) {
    	uv_dvc_type = $('#selectBox option:selected').val();

    	var formData = new FormData();
    	formData.append("dvcKindCd", uv_dvc_type);
    	formData.append("dvcName", selectedRow.dvcName);
    	if($("#bmpFile")[0].files[0]){
        	formData.append("attFile", $("#bmpFile")[0].files[0].name);
        }
    	
    	
    	axboot.promise()
        .then(function (ok, fail, data) {
        	axboot.ajax({
            	type: "POST",
            	enctype: "multipart/form-data",
            	processData: false,
                url: "/api/v1/BM0501G1U0",
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
        	axboot.promise().then(function(ok, fail, data){
        		var input = {};
        		input.voList = fnObj.gridView1.getData();
        		input.dvcKindCd = uv_dvc_type;
        		input.dvcName = selectedRow.dvcName;
        		axboot.ajax({
        			type: "POST",
                    url: "/api/v1/BM0501G1U1",
                    data: JSON.stringify(input),
                    callback: function (res) {
                        ok(res);
                    }
        		});
        	});
        	
    		axToast.push(LANG("onupdate"));
    		ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
        })
        .catch(function () {

        });
    },
    
    // 탭닫기
    PAGE_CLOSE: function(caller, act, data) {
    	window.parent.fnObj.tabView.closeActiveTab();
    },
    
    ITEM_CLICK: function (caller, act, data) {
    	selectedRow = data;
    	//loadSCH(data);
        caller.formView0.setData(data);
        caller.formView0.enable();
        $("#selectBox option:eq(0)").attr("selected", "selected");
        loadSCH();
    },

});


function editCase(input){
	switch(input){
	
		case 'effSpeed' :
			return {
				type: "number",
				disabled: function () { //클릭했을때 그 라우트아이디를 배열에 넣음, 나중에 저장할때 이 배열의 아이디를 받아서 리스트를 뽑아올거임
					return this.item.__index >= uv_height;
				},
				attributes: {
					'maxlength': 2,
				}
		};
		case 'showTime' :
			return {
				type: "number",
				disabled: function () { //클릭했을때 그 라우트아이디를 배열에 넣음, 나중에 저장할때 이 배열의 아이디를 받아서 리스트를 뽑아올거임
					return this.item.__index >= uv_height;
				},
				attributes: {
					'maxlength': 4
				}
		};
		case 'effType' :
			return {
			type: "select",
			config: {
				columnKeys: {
					optionValue: "CD", optionText: "NM"
				},
				options: [	{CD : "01번", NM: "01번"},
							{CD : "02번", NM: "02번"},
							{CD : "03번", NM: "03번"},
							{CD : "04번", NM: "04번"},
							{CD : "05번", NM: "05번"}]
			},
			disabled: function(){
				return this.item.__index >= uv_height;
			}
		};
	}
}

function styleEdit(){
	console.log(this.item);
	if(this.item.__index >= uv_height){
		return "grid-cell-gray";
	}
	else{
		return "";
	}
}

/**
 * gridView0
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
            	{key: "frameNo",			label: "프레임번호",			width: 100,																		styleClass: function(){return (this.item.__index >= uv_height) ?   "grid-cell-gray":"" }},
            	{key: "effType",			label: "효과",				width: 100, editor: editCase('effType'),	formatter: "money", align:"right",	styleClass: function(){return (this.item.__index >= uv_height) ?   "grid-cell-gray":"" }},
            	{key: "effSpeed",			label: "효과속도(1=10ms)",		width: 110, editor: editCase('effSpeed'), align:"right",						styleClass: function(){return (this.item.__index >= uv_height) ?   "grid-cell-gray":"" }},
                {key: "showTime",			label: "표출시간(1=10ms)",		width: 110, editor: editCase('showTime'), align:"right",						styleClass: function(){return (this.item.__index >= uv_height) ?   "grid-cell-gray":"" }}
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

var shortRoutNmEdit = {
		type: "text",
		disabled: function () { //클릭했을때 그 라우트아이디를 배열에 넣음, 나중에 저장할때 이 배열의 아이디를 받아서 리스트를 뽑아올거임
			if(!updateList.includes(this.item.routId)){
				updateList.push(this.item.routId);									
			}
		}
	};


/*이미지확인*/
$("input[id=bmpFile]").change(function(){
    
    var ext = $(this).val().split(".").pop().toLowerCase();
    
    if($.inArray(ext,["bmp", "BMP"]) == -1) {
        alert("bmp 파일만 업로드 가능합니다.");
        $("input[id=bmpFile]").val("");
        return;
    }
    
    /*var fileSize = this.files[0].size;
    var maxSize = 1024 * 1024;
    if(fileSize > maxSize) {
        alert("파일용량을 초과하였습니다.");
        return;
    }*/
    
    var file  = this.files[0];
    var _URL = window.URL || window.webkitURL;
    var img = new Image();
    
    img.src = _URL.createObjectURL(file);
    img.onload = function() {
        alert(img.width);
        alert(img.height);
        
    	if(uv_dvc_type == frontCode){
    		uv_height = img.height / uv_frontheight;
    	}else if(uv_dvc_type == sideCode){
    		uv_height = img.height / uv_sideheight;
    	}else{
    		console.log('error');
    	}
    	console.log(uv_dvc_type);
    	console.log(uv_height);
        /*if(img.width != 384 || img.height != 64) {
            alert("이미지 가로 684px, 세로 64px로 맞춰서 올려주세요.");
            $("input[id=bmpFile]").val("");
        } */
    }
});

/********************************************************************************************************************/

/******************************************* 페이지 처음 로딩시 호출 ******************************************************/
fnObj.pageStart = function () {
	selectBox();
	//this.gridView1.initView();
    this.pageButtonView.initView();
    this.gridView0.initView();
    this.formView0.initView();
	this.searchView0.initView();
    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
};

fnObj.pageResize = function () {

};
/********************************************************************************************************************/


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
            	{key: "routId",			label: ADMIN("ax.admin.BM0104G0.routId"),											width: 80},
            	{key: "routNm",			label: ADMIN("ax.admin.BM0104G0.routNm"),											width: 70},
                {key: "shortRoutNm",	label: ADMIN("ax.admin.BM0104G0.shortRoutNm"),	width: 130},
                {key: "wayInfo",		label: ADMIN("ax.admin.BM0104G0.wayInfo"),		width: 130},
                {key: "dirInfo",		label: ADMIN("ax.admin.BM0104G0.dirInfo"),		width: 130},
                {key: "stStaNm",		label: ADMIN("ax.admin.BM0104G0.stStaNm"),											width: 160},
                {key: "edStaNm",		label: ADMIN("ax.admin.BM0104G0.edStaNm"),											width: 160},
                {key: "wayDivNm",		label: ADMIN("ax.admin.BM0104G0.wayDiv"),											width: 60,	align: "center"},
                {key: "userWayDiv",		label: ADMIN("ax.admin.BM0104G0.userWayDiv"),	width: 120,	align: "center"},
                {key: "dvcName",		label: ADMIN("ax.admin.BM0104G0.dvcName"),											width: 90},
                {key: "line1Str",		label: ADMIN("ax.admin.BM0104G0.line1Str"),											width: 200},
                {key: "line2Str",		label: ADMIN("ax.admin.BM0104G0.line2Str"),											width: 200},
                {key: "line1Satstr",	label: ADMIN("ax.admin.BM0104G0.line1Satstr"),										width: 200},
                {key: "line2Satstr",	label: ADMIN("ax.admin.BM0104G0.line2Satstr"),										width: 200},
                {key: "line1Sunstr",	label: ADMIN("ax.admin.BM0104G0.line1Sunstr"),										width: 200},
                {key: "line2Sunstr",	label: ADMIN("ax.admin.BM0104G0.line2Sunstr"),										width: 200},
                {key: "updatedAt",		label: ADMIN("ax.admin.BM0104G0.updatedAt"),										width: 140},			
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
            "krTts": function () {
                ACTIONS.dispatch(ACTIONS.TEST_TTS, {
                	pText: _this.target.find("[data-ax-path='krTts']").val(),
                	nLanguage: 0,
                	nSpeakerId: 0,
                });
            },
            "enTts": function() {
            	ACTIONS.dispatch(ACTIONS.TEST_TTS, {
                	pText: _this.target.find("[data-ax-path='enTts']").val(),
                	nLanguage: 1,
                	nSpeakerId: 2,
                });
            },
            "wav": function() {
            	ACTIONS.dispatch(ACTIONS.TEST_WAV);
            }
        });
        
        axboot.buttonClick(this, "data-btn-common-txt", {
        	"krTts": function() {
        		ACTIONS.dispatch(ACTIONS.OPEN_COMMON_SENTENCE_MODAL, {
        			dataPath: "krTts"
        		});
        	},
        	"enTts": function() {
        		ACTIONS.dispatch(ACTIONS.OPEN_COMMON_SENTENCE_MODAL, {
        			dataPath: "enTts"
        		});
        	}
        })
        
        this.target.find("[data-ax-path='playType']").on("change", function(e) {
        	ACTIONS.dispatch(ACTIONS.CHANGE_PLAY_TYPE, {
        		playType: $(this).val()
        	})
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
        		alert(LANG("ax.script.form.validate", rs.error[0].jquery.attr("title")));
        	}
            rs.error[0].jquery.focus();
            return false;
        }
        return true;
    },
    enable: function() {
    	var _this = this;
    	this.target.find("[data-btn],[data-ax-path][data-key!=true]").each(function(index, element) {
    		$(element).attr("readonly", false).attr("disabled", false);
    	});
    	$("[data-ax-path='playType']").trigger("change");
    },
    disable: function() {
    	this.target.find('#wavFile,[data-btn],[data-ax-path][data-key!=true]').each(function(index, element) {
    		$(element).attr("readonly", true).attr("disabled", true);
    	});
    },
    clear: function () {
        this.model.setModel(this.getDefaultData());
        this.target.find('[data-ax-path="key"]').removeAttr("readonly");
    }
});

function selectBox(){
	var options = [];
	axboot.ajax({
		type: "GET",
		url: "/api/v1/BM0501G2S0",
		callback: function (res) {
			for(var i=0; i<res.list.length; i++){
				options.push({value: res.list[i].dlCd, text : res.list[i].dlCdNm});				
			}
			console.log(options.length);
			console.log(options.size);

			$('[data-ax5select]').ax5select({
				options: options,
				onChange: function(){
					loadSCH();
					uv_dvc_type = $('[data-ax5select="selectType"]').ax5select("getValue")[0].value;
				}
			});
		}
	});
}

function loadSCH(){
	//var dvcKindCd = $('#selectBox option:selected').val();
	uv_dvc_type = $('#selectBox option:selected').val();
	var foo = {};
	//foo.dvcKindCd = dvcKindCd;
	foo.dvcKindCd = uv_dvc_type;
	var input = Object.assign(foo, selectedRow);
	loadBmp();

	axboot.ajax({
		type: "POST",
		data: JSON.stringify(input),
		url: "/api/v1/BM0501F0S0",
		callback: function (res) {
			fnObj.gridView1.setData(res);
		}
	});	
}


function loadBmp(){
	uv_dvc_type = $('#selectBox option:selected').val();
	var url = "/api/v1/filePreview?type=BMP&dvcKindCd=" + uv_dvc_type + "&dvcName="+selectedRow.dvcName;
	console.log(url);
	$('#previewHidden').attr("src", url);
	$("#previewImg").attr("src", url);
	
	$('#previewImg').each(function(){
		$(this).load(function(){
			uv_height = this.naturalHeight / uv_frontheight;
			console.log(this.naturalWidth);
			console.log(this.naturalHeight);
		});
	});
	fnObj.gridView1.initView();
}