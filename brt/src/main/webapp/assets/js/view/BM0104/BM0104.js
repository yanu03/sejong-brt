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
    	caller.gridView0.target.exportExcel("노선목록.xls");
    },
    
    PAGE_NEW: function (caller, act, data) {
    	isUpdate = false;
    	caller.gridView0.selectAll(false);
    },
    
    PAGE_SAVE: function (caller, act, data) {
        if (caller.formView0.validate()) {
            var formData = caller.formView0.getData();

            axboot.promise()
                .then(function (ok, fail, data) {
                    axboot.ajax({
                        type: "POST",
                        url: "/api/v1/BM0103F0I0",
                        data: JSON.stringify(formData),
                        callback: function (res) {
                            ok(res);
                        }
                    });
                })
                .then(function (ok, fail, data) {
            		axToast.push(LANG("onadd"));
            		ACTIONS.dispatch(ACTIONS.PAGE_SEARCH, data.message);
                    isUpdate = true;
                })
                .catch(function () {

                });
        }
    },
    
    PAGE_UPDATE: function(caller, act, data) {
    	var length = fnObj.gridView0.getData().length;
    	var allData = fnObj.gridView0.getData();
    	var lastList = [];
    	
    	for(i=0; i < updateList.length; i++){
    		for(j = 0; j < length; j++) {
    			if(allData[j].routId == updateList[i]) {
    				lastList.push(allData[j]);
    				break;
    			}
    		}
    	}
    	if(lastList.length > 0){
    		
	    	axboot.promise()
	        .then(function (ok, fail, data) {
	            axboot.ajax({
	                type: "POST",
	                url: "/api/v1/BM0104G0U1",
	                data: JSON.stringify(lastList),
	                callback: function (res) {
	                    console.log(res);
	                }
	            });
	        })
	        .then(function (ok, fail, data) {
	    		axToast.push(LANG("onadd"));
	    		ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
	        })
	        .catch(function () {
	        });
    	}
    	//초기화
    	updateList = [];
    	lastList = [];
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
    }
});

/********************************************************************************************************************/

/******************************************* 페이지 처음 로딩시 호출 ******************************************************/
fnObj.pageStart = function () {
	var _this = this;
	
    this.pageButtonView.initView();
    this.searchView0.initView();
    this.gridView0.initView();
    
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
            "interface": function() {
            	ACTIONS.dispatch(ACTIONS.OPEN_BM0104_MODAL);
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
            sortable: true,
            target: $('[data-ax5grid="gridView0"]'),
            columns: [
            	{key: "routId",			label: ADMIN("ax.admin.BM0104G0.routId"),											width: 80},
            	{key: "routNm",			label: ADMIN("ax.admin.BM0104G0.routNm"),											width: 70},
                {key: "shortRoutNm",	label: "<font color=0000FF>" + ADMIN("ax.admin.BM0104G0.shortRoutNm") + "</font>",	width: 130,	editor: shortRoutNmEdit},
                {key: "wayInfo",		label: "<font color=0000FF>" + ADMIN("ax.admin.BM0104G0.wayInfo") + "</font>",		width: 130,	editor: shortRoutNmEdit},
                {key: "dirInfo",		label: "<font color=0000FF>" + ADMIN("ax.admin.BM0104G0.dirInfo") + "</font>",		width: 130,	editor: shortRoutNmEdit},
                {key: "stStaNm",		label: ADMIN("ax.admin.BM0104G0.stStaNm"),											width: 160},
                {key: "edStaNm",		label: ADMIN("ax.admin.BM0104G0.edStaNm"),											width: 160},
                {key: "wayDivNm",		label: ADMIN("ax.admin.BM0104G0.wayDiv"),											width: 60,								align: "center"},
                {key: "userWayDiv",		label: "<font color=0000FF>" + ADMIN("ax.admin.BM0104G0.userWayDiv") + "</font>",	width: 120, editor: userWayEdit,		align: "center"},
                //{key: "turnDivNm",		label: ADMIN("ax.admin.BM0104G0.turnDiv"),											width: 100},
                {key: "updatedAt",		label: ADMIN("ax.admin.BM0104G0.updatedAt"),										width: 140,								align: "center"},
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