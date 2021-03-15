
var fnObj = {}, CODE = {};

/***************************************** 전역 변수 초기화 ******************************************************/
isUpdate = false;
selectedRow = null;

//최대 가능 리스트 사이즈
listMaxSize = 0;
//리스트 full 여부
listFull = false;
//현재 그리드 사이즈
listSize = 0;
//글자수 최대
maxFlag = false;
/*************************************************************************************************************/
$(function(){
	//maxList();
	
});

/***************************************** 이벤트 처리 코드 ******************************************************/
var ACTIONS = axboot.actionExtend(fnObj, {
	PAGE_SEARCH: function (caller, act, data) {
    	// 새로운 레코드 추가할 시 검색어 삭제
    	var dataFlag = typeof data !== "undefined";
    	var filter = $.extend({}, caller.searchView0.getData());
    	
        axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0610G0S0",
            data: filter,
            callback: function (res) {
				//리스트가 꽉 차면 안보여줄것임
				listSize = res.list.length;
                maxList();
				var newList = [];
				if(listFull){
					newList = res.list.slice(0,listSize);
					res.list = newList;					
				}
								
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
	                    url: "/api/v1/BM0610G0D0",
	                    data: JSON.stringify(grid.list[grid.selectedDataIndexs[0]]),
	                    callback: function (res) {
							maxList();
	                        ok(res);
	                    },
	                    options:{
	                    	onError: function(err){
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
        });
    },
    
    PAGE_SAVE: function (caller, act, data) {
		if(maxFlag){
	        if (caller.formView0.validate()) {
	            var formData = caller.formView0.getData();
	            
	            axboot.promise()
	                .then(function (ok, fail, data) {
	                    axboot.ajax({
	                        type: "POST",
	                        url: "/api/v1/BM0610F0I0",
	                        data: JSON.stringify(formData),
	                        callback: function (res) {
								maxList();
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
		}else{
			axToast.push("글자수를 확인하세요!");
		}
    },
    
    PAGE_UPDATE: function(caller, act, data) {
		if(maxFlag){
	        if (caller.formView0.validate()) {
	            var formData = caller.formView0.getData();
	            axboot.promise()
	                .then(function (ok, fail, data) {
	                    axboot.ajax({
	                    	type: "POST",
	                        url: "/api/v1/BM0610F0U0",
	                        data: JSON.stringify(formData),
	                        callback: function (res) {
								maxList();
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
		}else{
			axToast.push("글자수를 확인하세요!");
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
		maxFlag = true;
		currentLength("A");
		currentLength("B");
    },

	PAGE_HELP: function(caller, act, data) {
		axboot.modal.open({
            modalType: "ILD_HELP",
            param: "",
            callback: function (result) {
            
            }
		});
	},
	
    UPBTN_CLICK: function(caller, act, data){
    	var row = caller.gridView0.getData("selected");
    	var list = caller.gridView0.getData();
    	
		if(row == null) {
    		axDialog.alert(LANG("ax.script.alert.requireselect"))
    		return false;
    	}
    	
    	list = arrayMove(list, row[0].__index, row[0].__index - 1);
    	caller.gridView0.setData(list);
    },

    DNBTN_CLICK: function(caller, act, data){
    	var row = caller.gridView0.getData("selected");
    	var list = caller.gridView0.getData();
    	
    	if(row == null) {
    		axDialog.alert(LANG("ax.script.alert.requireselect"))
    		return false;
    	}
    	
    	list = arrayMove(list, row[0].__index, row[0].__index + 1);
    	caller.gridView0.setData(list);
    },

	UPDATE_SORT: function(caller, act, data){
		list = caller.gridView0.getData();
		for(var i=0; i<list.length; i++){
			list[i].seq = i+1;
		}
		
		var formData = new FormData();
		formData.voList = list;
        axboot.promise()
            .then(function (ok, fail, data) {
                axboot.ajax({
                	type: "POST",
                    url: "/api/v1/BM0610G0U1",
                    data: JSON.stringify(formData),
                    callback: function (res) {
	                	ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
						//maxList();
                        //ok(res);
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

});

/********************************************************************************************************************/

/******************************************* 페이지 처음 로딩시 호출 ******************************************************/
fnObj.pageStart = function () {
    this.pageButtonView.initView();
    this.searchView0.initView();
    this.gridView0.initView();
    this.formView0.initView();
    numberOnly();
    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
};

fnObj.pageResize = function () {

};
/********************************************************************************************************************/


/******************************************** 공통 버튼 클릭 이벤트 ******************************************************/
fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
	       	"help": function() {
        		ACTIONS.dispatch(ACTIONS.PAGE_HELP);
        	},
            "search": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            },
            "excel": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_EXCEL);
            },
            "new": function() {	
				if(!listFull){
        	    	ACTIONS.dispatch(ACTIONS.PAGE_NEW);
				}else{
					axToast.push("리스트 개수 초과!");
				} 
            },
            "delete": function() {
            	ACTIONS.dispatch(ACTIONS.PAGE_DELETE);
            },
            "save": function () {
            	if(isUpdate) {
            		ACTIONS.dispatch(ACTIONS.PAGE_UPDATE);
            	} else {
					if(!listFull){
	            		ACTIONS.dispatch(ACTIONS.PAGE_SAVE);						
					}else{
						axToast.push("리스트 개수 초과!");
					} 
            	}
            },
            "close": function() {
            	ACTIONS.dispatch(ACTIONS.PAGE_CLOSE);
            },
            "upItem": function(){
            	ACTIONS.dispatch(ACTIONS.UPBTN_CLICK);
            },
            "downItem": function(){
            	ACTIONS.dispatch(ACTIONS.DNBTN_CLICK);
            },
			"updateSort": function(){
				ACTIONS.dispatch(ACTIONS.UPDATE_SORT);
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
            //sortable: true,
            target: $('[data-ax5grid="gridView0"]'),
            columns: [
                {key: "ildId",	label: ADMIN("ax.admin.BM0610G0.ildId"),	width: 100,	align: "center",	sortable: true},
                {key: "ildNm",	label: ADMIN("ax.admin.BM0610G0.ildNm"),	width: 120,	align: "right",		sortable: true},
                {key: "seq", 	label: ADMIN("ax.admin.BM0610G0.seq"),		width: 70,	align: "center",	sortable: true},
                {key: "txtA",	label: ADMIN("ax.admin.BM0610G0.txtA"),		width: 200,	align: "right"},
                {key: "txtB",	label: ADMIN("ax.admin.BM0610G0.txtB"),		width: 200,	align: "right"},
                {key: "remark",	label: ADMIN("ax.admin.BM0610G0.remark"),	width: 250, align: "right"},
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
    		if(this.target.list[i].ildId == id) {
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

/***************************************************** */
function maxList(){
	axboot.promise()
        .then(function (ok, fail, data) {
            axboot.ajax({
            	type: "POST",
                url: "/api/v1/getMax",
                callback: function (res) {
					listMaxSize = res.message;
					
					if(listSize >= listMaxSize){
						listFull = true;
					}
                }
            });
        })
        .then(function (ok, fail, data) {
        })
        .catch(function () {

        }
	);
}

var aFlag = true;
var bFlag = true;

function currentLength(data){
	var txt;
	if(data == 'A'){
		txt = $('#txtA').val();
		var lenA = getByteLen(txt);
		$('#txtALen').html(lenA + " / 120 bytes");

		if(lenA > 120){
			aFlag = false;
			var newA = cutByteLen(txt, 120);
			document.getElementById('txtALen').style.color='red';
			$('#txtA').val(newA);
		}else{
			aFlag = true;
			document.getElementById('txtALen').style.color='';
		}
		if(aFlag && bFlag){
			maxFlag = true;
		}else{
			maxFlag = false;
		}
	}else if(data == 'B'){
		txt = $('#txtB').val();
		var lenB = getByteLen(txt);
		$('#txtBLen').html(lenB + " / 120 bytes");

		if(lenB > 120){
			bFlag = false;
			var newB = cutByteLen(txt, 120);
			document.getElementById('txtBLen').style.color='red';
			$('#txtB').val(newB);
		}else{
			bFlag = true;
			document.getElementById('txtBLen').style.color='';
		}
		if(aFlag && bFlag){
			maxFlag = true;
		}else{
			maxFlag = false;
		}
	}
}

function getByteLen(str){
    var l = 0;
    for (var i=0; i<str.length; i++) l += (str.charCodeAt(i) > 128) ? 2 : 1;
    return l;
}

function cutByteLen(str, len) {
    var l = 0;
    for (var i=0; i<str.length; i++) {
        l += (str.charCodeAt(i) > 128) ? 2 : 1;
        if (l > len){
			return str.substring(0,i);
		}
    }
    return str;
}