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

uv_frontwidthz = 0;
uv_frontheightz = 0;
uv_sidewidthz = 0;
uv_sideheightz = 0;

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
        //loadSCH();
        return false;
    },
    
    PAGE_UPDATE: function(caller, act, data) {
    	
    	var formDataF = new FormData();
    	formDataF.append("dvcKind", "F");
    	formDataF.append("dvcName", "LOGO");
  
    	if($("#bmpFileF")[0].files[0]){
        	formDataF.append("attFile", $("#bmpFileF")[0].files[0]);
        }
    	
    	axboot.promise()
        .then(function (ok, fail, data) {
        	axboot.ajax({
            	type: "POST",
            	enctype: "multipart/form-data",
            	processData: false,
                url: "/api/v1/BM0502G1U0",
                data: formDataF,
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
        		input.voList = fnObj.gridView0.getData();
        		input.dvcKind = "F";
        		input.dvcName = "LOGO";
        		axboot.ajax({
        			type: "POST",
                    url: "/api/v1/BM0502G1U1",
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
    	/////////////////
      	var formDataS = new FormData();
    	formDataS.append("dvcKind", "S");
    	formDataS.append("dvcName", "LOGO");
    	if($("#bmpFileS")[0].files[0]){
        	formDataS.append("attFile", $("#bmpFileS")[0].files[0]);
        }
    	
    	axboot.promise()
        .then(function (ok, fail, data) {
        	axboot.ajax({
            	type: "POST",
            	enctype: "multipart/form-data",
            	processData: false,
                url: "/api/v1/BM0502G1U0",
                data: formDataS,
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
        		input.dvcKind = "S";
        		input.dvcName = "LOGO";
        		axboot.ajax({
        			type: "POST",
                    url: "/api/v1/BM0502G1U1",
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
    	var element = document.getElementById("previewImgF");
    	var seq = data.__index + 1;
    	
        //loadSCH();
    },
    
    ITEM_CLICK2: function (caller, act, data) {
    	var element = document.getElementById("previewImg");
    	var seq = data.__index + 1;
    },

});

function styleEdit(){
	if(this.item.__index >= uv_height){
		return "grid-cell-gray";
	}
	else{
		return "grid-cell-black";
	}
}

function editCaseFront(input){
	switch(input){
	
		case 'effSpeed' :
			return {
				type: "number",
				disabled: function () { //클릭했을때 그 라우트아이디를 배열에 넣음, 나중에 저장할때 이 배열의 아이디를 받아서 리스트를 뽑아올거임
					return this.item.__index >= uv_frontheightz;
				},
				attributes: {
					'maxlength': 2,
				}
		};
		case 'showTime' :
			return {
				type: "number",
				disabled: function () { //클릭했을때 그 라우트아이디를 배열에 넣음, 나중에 저장할때 이 배열의 아이디를 받아서 리스트를 뽑아올거임
					return this.item.__index >= uv_frontheightz;
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
				options: [	{CD : "화면그대로 표출", NM: "화면그대로 표출"},
					{CD : "왼쪽으로 쉬프트하면서 밀어내기", NM: "왼쪽으로 쉬프트하면서 밀어내기"},
					{CD : "오른쪽으로 쉬프트하면서 밀어내기", NM: "오른쪽으로 쉬프트하면서 밀어내기"},
					{CD : "위로 쉬프트하면서 밀어내기", NM: "위로 쉬프트하면서 밀어내기"},
					{CD : "아래로 쉬프트하면서 밀어내기", NM: "아래로 쉬프트하면서 밀어내기"}]
			},
			disabled: function(){
				return this.item.__index >= uv_frontheightz;
			}
		};
	}
}

function editCaseSide(input){
	switch(input){
	
		case 'effSpeed' :
			return {
				type: "number",
				disabled: function () { //클릭했을때 그 라우트아이디를 배열에 넣음, 나중에 저장할때 이 배열의 아이디를 받아서 리스트를 뽑아올거임
					return this.item.__index >= uv_sideheightz;
				},
				attributes: {
					'maxlength': 2,
				}
		};
		case 'showTime' :
			return {
				type: "number",
				disabled: function () { //클릭했을때 그 라우트아이디를 배열에 넣음, 나중에 저장할때 이 배열의 아이디를 받아서 리스트를 뽑아올거임
					return this.item.__index >= uv_sideheightz;
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
				options: [	{CD : "화면그대로 표출", NM: "화면그대로 표출"},
					{CD : "왼쪽으로 쉬프트하면서 밀어내기", NM: "왼쪽으로 쉬프트하면서 밀어내기"},
					{CD : "오른쪽으로 쉬프트하면서 밀어내기", NM: "오른쪽으로 쉬프트하면서 밀어내기"},
					{CD : "위로 쉬프트하면서 밀어내기", NM: "위로 쉬프트하면서 밀어내기"},
					{CD : "아래로 쉬프트하면서 밀어내기", NM: "아래로 쉬프트하면서 밀어내기"}]
			},
			disabled: function(){
				return this.item.__index >= uv_sideheightz;
			}
		};
	}
}

function styleEditFront(){
	if(this.item.__index >= uv_frontheightz){
		return "grid-cell-gray";
	}
	else{
		return "";
	}
}

function styleEditSide(){
	if(this.item.__index >= uv_sideheightz){
		return "grid-cell-gray";
	}
	else{
		return "";
	}
}

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
        	showLineNumber: true,
        	showRowSelector: false,
        	lineNumberColumnWidth: 30,
        	rowSelectorColumnWidth: 30,
        	frozenColumnIndex: 0,
            sortable: false,
            target: $('[data-ax5grid="gridView0"]'),
            header: {
            	align: "center",
            	columnHeight: 28
            	},
            columns: [
            	{key: "frameNo",			label: "프레임번호",			width: 100,																		styleClass: function(){return (this.item.__index >= uv_frontheightz) ?   "grid-cell-gray":"" }},
            	{key: "effType",			label: "효과",				width: 100, editor: editCaseFront('effType'),  align:"right",					styleClass: function(){return (this.item.__index >= uv_frontheightz) ?   "grid-cell-gray":"" }},
            	{key: "effSpeed",			label: "효과속도(1=10ms)",		width: 110, editor: editCaseFront('effSpeed'), align:"right",					styleClass: function(){return (this.item.__index >= uv_frontheightz) ?   "grid-cell-gray":"" }},
                {key: "showTime",			label: "표출시간(1=10ms)",		width: 110, editor: editCaseFront('showTime'), align:"right",					styleClass: function(){return (this.item.__index >= uv_frontheightz) ?   "grid-cell-gray":"" }}
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
            		ACTIONS.dispatch(ACTIONS.ITEM_CLICK2, this.item);
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
    		ACTIONS.dispatch(ACTIONS.ITEM_CLICK2, data);
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
            	{key: "frameNo",			label: "프레임번호",			width: 100,																		styleClass: function(){return (this.item.__index >= uv_sideheightz) ?   "grid-cell-gray":"" }},
            	{key: "effType",			label: "효과",				width: 100, editor: editCaseSide('effType'), align:"right",						styleClass: function(){return (this.item.__index >= uv_sideheightz) ?   "grid-cell-gray":"" }},
            	{key: "effSpeed",			label: "효과속도(1=10ms)",		width: 110, editor: editCaseSide('effSpeed'), align:"right",					styleClass: function(){return (this.item.__index >= uv_sideheightz) ?   "grid-cell-gray":"" }},
                {key: "showTime",			label: "표출시간(1=10ms)",		width: 110, editor: editCaseSide('showTime'), align:"right",					styleClass: function(){return (this.item.__index >= uv_sideheightz) ?   "grid-cell-gray":"" }}
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
            		ACTIONS.dispatch(ACTIONS.ITEM_CLICK2, this.item);
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
    		ACTIONS.dispatch(ACTIONS.ITEM_CLICK2, data);
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
$("input[id=bmpFileF]").change(function(){
    
    var ext = $(this).val().split(".").pop().toLowerCase();
    
    if($.inArray(ext,["bmp", "BMP"]) == -1) {
        alert("bmp 파일만 업로드 가능합니다.");
        $("input[id=bmpFileF]").val("");
        return;
    }
    
    var file  = this.files[0];
    var _URL = window.URL || window.webkitURL;
    var img = new Image();
    
    img.src = _URL.createObjectURL(file);
    img.onload = function() {
        uv_frontheightz = img.height / uv_frontheight + 1;
        preview_ChangeImage("src", "previewImgF");
    }
});


$("input[id=bmpFileS]").change(function(){
    
    var ext = $(this).val().split(".").pop().toLowerCase();
    
    if($.inArray(ext,["bmp", "BMP"]) == -1) {
        alert("bmp 파일만 업로드 가능합니다.");
        $("input[id=bmpFileS]").val("");
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
    	uv_sideheightz = img.height / uv_sideheight + 1;
        preview_ChangeImage("src", "previewImgS");
        //alert(img.width);
        //alert(img.height);
        
    }
});

/********************************************************************************************************************/

/******************************************* 페이지 처음 로딩시 호출 ******************************************************/
fnObj.pageStart = function () {
    this.pageButtonView.initView();
    this.gridView0.initView();
    this.gridView1.initView();
    this.formView0.initView();
    this.formView1.initView();
	this.searchView0.initView();
	loadSCH();
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
           		ACTIONS.dispatch(ACTIONS.PAGE_UPDATE);
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

/**
 * formView0
 */
fnObj.formView1 = axboot.viewExtend(axboot.formView, {
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
        })
        
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


function loadSCH(){
	var inputF = {};
	var inputS = {};
	inputF.dvcKind = "F";
	inputS.dvcKind = "S";
	
	loadBmpF();
	loadBmpS();
	

	axboot.ajax({
		type: "POST",
		data: JSON.stringify(inputF),
		url: "/api/v1/BM0502F0S0",
		callback: function (res) {
			fnObj.gridView0.setData(res);
		}
	});
	
	axboot.ajax({
		type: "POST",
		data: JSON.stringify(inputS),
		url: "/api/v1/BM0502F0S0",
		callback: function (res) {
			fnObj.gridView1.setData(res);
		}
	});	
}


function loadBmpF(){
	var url = "/api/v1/filePreview?type=BMPLOGO&dvcKindCd=F&dvcName=LOGO";

	$("#previewImgF").attr("src", url);
	fnObj.gridView0.initView();
	
	$('#previewImgF').each(function(){
		$(this).load(function(){
			uv_frontheightz = this.height / uv_frontheight;
		});
	});
	
	
	setTimeValFront(uv_frontheightz);
}

function loadBmpS(){
	var url = "/api/v1/filePreview?type=BMPLOGO&dvcKindCd=S&dvcName=LOGO";

	$("#previewImgS").attr("src", url);
	fnObj.gridView1.initView();
	
	$('#previewImgS').each(function(){
		$(this).load(function(){
			uv_sideheightz = this.height / uv_sideheight;
			
			setTimeValSide(uv_sideheightz);
		});
	});
	
}

function preview_ChangeImage(input, id) {
    if (input.files && input.files[0]) {
    var reader = new FileReader();

    
    reader.onload = function (e) {
    	$('#' + id).attr('src', e.target.result);
        }
    	reader.readAsDataURL(input.files[0]);
    }
    setTimeValFront(uv_frontheightz);
    setTimeValSide(uv_sideheightz);
}

function setTimeValFront(uv_height){
	var d = fnObj.gridView0.getData();
	var list = new Array;
	if(uv_height > 0){
		for(var i=0; i < d.length; i++){
			if(d[i].__index >= uv_height){
				d[i].effSpeed = '00';
				d[i].showTime = '0000';
				list.push(d[i]);
			}else{
				list.push(d[i]);
			}
		}
		fnObj.gridView0.setData(list);
	}
}

function setTimeValSide(uv_height){
	var d = fnObj.gridView1.getData();
	var list = new Array;
	if(uv_height > 0){
		for(var i=0; i < d.length; i++){
			if(d[i].__index >= uv_height){
				d[i].effSpeed = '00';
				d[i].showTime = '0000';
				list.push(d[i]);
			}else{
				list.push(d[i]);
			}
		}
		fnObj.gridView1.setData(list);
	}
}