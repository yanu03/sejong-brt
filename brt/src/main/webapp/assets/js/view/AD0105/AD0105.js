var fnObj = {}, CODE = {};

/***************************************** 전역 변수 초기화 ******************************************************/
/*************************************************************************************************************/

/***************************************** 이벤트 처리 코드 ******************************************************/
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
    	var filter = $.extend({}, caller.searchView0.getData());
    	
        axboot.ajax({
            type: "GET",
            url: "/api/v1/AD0105G0S0",
            data: filter,
            callback: function (res) {
            	caller.gridView0.setData(res);
            },
            
        });

        return false;
    },
    
    PAGE_EXCEL: function(caller, act, data) {
    	caller.gridView0.target.exportExcel("차량별일광고현황_" + new Date().yyyymmdd() + ".xls");
    },
    
    // 탭닫기
    PAGE_CLOSE: function(caller, act, data) {
    	window.parent.fnObj.tabView.closeActiveTab();
    },
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
        this.date = $("#date");
        
        this.target.find('[data-ax5picker="date"]').ax5picker({
            direction: "auto",
            content: {
                type: 'date'
            }
        });
    },
    getData: function () {
        return {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            date: this.date.val()
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
            target: $('[data-ax5grid="gridView0"]'),
            columns: [
                {key: "adRout",				label: ADMIN("ax.admin.AD0105G0.rout.no"),				width: 100,	align: "center"},
                {key: "adLvlNm",			label: ADMIN("ax.admin.AD0105G0.ad.lvl"),				width: 100,	align: "center"},
                {key: "adPosTypeNm",		label: ADMIN("ax.admin.AD0105G0.ad.pos.type"),			width: 100,	align: "center"},
            	{key: "adPosNm",			label: ADMIN("ax.admin.AD0105G0.ad.pos"),				width: 110,	align: "center"},
                {key: "countAllVehicle", 	label: ADMIN("ax.admin.AD0105G0.count.all.vehicle"),	width: 110,	align: "center"},
                {key: "countInstVehicle",	label: ADMIN("ax.admin.AD0105G0.count.inst.vehicle"),	width: 90,	align: "center"},
                {key: "countPInstVehicle",	label: ADMIN("ax.admin.AD0105G0.count.pinst.vehicle"),	width: 150, align: "center", formatter: function() {
                	return this.item.countAllVehicle - this.item.countInstVehicle;
                }},
            ],
            body: {
            	mergeCells:["adRout", "adLvlNm", "adPosTypeNm"],
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
    selectAll: function(flag) {
    	this.target.selectAll({selected: flag});
    }
});
