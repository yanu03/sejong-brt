var fnObj = {}, CODE = {};

/***************************************** 전역 변수 초기화 ******************************************************/
var frozenColumnIndex = 5;
var startDateNm = ADMIN("ax.admin.AD0106G0.start.date");
var endDateNm = ADMIN("ax.admin.AD0106G0.end.date");
var dateWidth = 100;
/*************************************************************************************************************/

/***************************************** 이벤트 처리 코드 ******************************************************/
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
    	var filter = $.extend({}, caller.searchView0.getData());
    	
        axboot.ajax({
            type: "GET",
            url: "/api/v1/AD0106G0S0",
            data: filter,
            callback: function (res) {
            	caller.gridView0.setData(res);
            	ACTIONS.dispatch(ACTIONS.UPDATE_COLUMNS);
            },
            
        });

        return false;
    },
    
    PAGE_EXCEL: function(caller, act, data) {
    	caller.gridView0.target.exportExcel("차량별총광고현황_" + new Date().yyyymmdd() + ".xls");
    },
    
    // 탭닫기
    PAGE_CLOSE: function(caller, act, data) {
    	window.parent.fnObj.tabView.closeActiveTab();
    },
    
    UPDATE_COLUMNS: function(caller, act, data) {
    	var standardDate = new Date($("#date").val());
        for(var i = 0; i < 13; i++) {
        	var year = standardDate.getFullYear();
        	var month = standardDate.getMonth() + 1;
        	
        	caller.gridView0.target.updateColumn({
        		label: year + "년 " + month + "월",
        		align: "center",
        		columns:[
        			{key: "edMonth" + i,	label: endDateNm,		width: dateWidth,	align: "center"},
        			{key: "stMonth" + i,	label: startDateNm,		width: dateWidth,	align: "center"},
        		]
        	}, frozenColumnIndex + i);
        	standardDate.setMonth(month);
        }
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
        this.date = $("#date").val(new Date().yyyymmdd());
        
        this.target.find('[data-ax5picker="date"]').ax5picker({
            direction: "auto",
            content: {
                type: 'date',
                config: {
                	mode: "year",
                	selectMode: "month"
                },
                formatter: {
                	pattern: "date(month)"
                }
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
        
        var columns = [
            {key: "adRout",				label: ADMIN("ax.admin.AD0105G0.rout.no"),		width: 80,		align: "center"},
            {key: "adLvlNm",			label: ADMIN("ax.admin.AD0105G0.ad.lvl"),		width: 80,		align: "center"},
            {key: "vhcNo",				label: ADMIN("ax.admin.AD0106G0.vhc.no"),		width: 100,		align: "center"},
            {key: "adPosTypeNm",		label: ADMIN("ax.admin.AD0105G0.ad.pos.type"),	width: 100,		align: "center"},
        	{key: "adPosNm",			label: ADMIN("ax.admin.AD0105G0.ad.pos"),		width: 110,		align: "center"},
        ];
        
        // month 컬럼 초기화
        var standardDate = new Date($("#date").val());
        for(var i = 0; i < 13; i++) {
        	var year = standardDate.getFullYear();
        	var month = standardDate.getMonth() + 1;
        	columns.push({
        		label: year + "년 " + "O월",
        		align: "center",
        		columns:[
        			{key: "edMonth" + i,	label: endDateNm,		width: dateWidth,	align: "center"},
        			{key: "stMonth" + i,	label: startDateNm,		width: dateWidth,	align: "center"},
        		]
        	});
        	standardDate.setMonth(month);
        }
        
        this.target = axboot.gridBuilder({
        	lineNumberColumnWidth: 30,
        	frozenColumnIndex: frozenColumnIndex,
            target: $('[data-ax5grid="gridView0"]'),
            columns: columns,
            body: {
            	mergeCells:["adRout", "adLvlNm", "vhcNo", "adPosTypeNm"],
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
