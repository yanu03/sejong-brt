var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_CLOSE: function (caller, act, data) {
        if (parent) {
            parent.axboot.modal.close();
        }
    },
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0104G1S0",
            data: caller.searchView.getData(),
            callback: function (res) {
                caller.gridView01.setData(res);
            }
        });
        return false;
    },
    PAGE_CHOICE: function (caller, act, data) {
        var list = caller.gridView01.getData("selected");
        
        if (list.length > 0) {
        	alert(LANG("ax.script.interfaceConfirm"));
        	axboot.ajax({
                type: "POST",
                url: "/api/v1/BM0104G0U0",
                data: JSON.stringify(list),
                callback: function (res) {
                	if(res.message.length > 0){
                		alert(res.message);
                		if (parent && parent.axboot && parent.axboot.modal) {
                            parent.axboot.modal.callback(list[0]);
                		}
                	}else{
                		alert("갱신된 노선이 없습니다.");                		
                	}
                }
            });
            return false;
        } else {
            alert(LANG("ax.script.requireselect"));
        }
    },
    ITEM_CLICK: function (caller, act, data) {
    },
});

var CODE = {};

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    var _this = this;
    
    _this.pageButtonView.initView();
    _this.searchView.initView();
    _this.gridView01.initView();

    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
};

fnObj.pageResize = function () {

};

fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "search": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            },
            "choice": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_CHOICE);
            },
            "close": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_CLOSE);
            }
        });
    }
});

//== view 시작
/**
 * searchView
 */
fnObj.searchView = axboot.viewExtend(axboot.searchView, {
    initView: function () {
        this.target = $(document["searchView0"]);
        this.target.attr("onsubmit", "return ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);");
        this.filter = $("#filter");
    },
    setPageNumber: function (pageNumber) {
        this.pageNumber = pageNumber;
        ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
    },
    getData: function () {
        return {
            filter: this.filter.val()
        }
    }
});

/**
 * gridView
 */
fnObj.gridView01 = axboot.viewExtend(axboot.gridView, {
    initView: function () {
        var _this = this;

        this.target = axboot.gridBuilder({
            showLineNumber: true,
            showRowSelector: true,
            multipleSelect: true,
            lineNumberColumnWidth: 30,
            frozenColumnIndex: 0,
            sortable: true,
            target: $('[data-ax5grid="gridview01"]'),
            columns: [
            	{key: "", label: ADMIN("ax.admin.BM0406G1.vhcId"), width: 80},
                {key: "", label: ADMIN("ax.admin.BM0406G1.vhcNo"), width: 60},
                {key: "", label:"1월", width: 60},
                {key: "", label:"2월", width: 60},
                {key: "", label:"3월", width: 60},
                {key: "", label:"4월", width: 60},
                {key: "", label:"5월", width: 60},
                {key: "", label:"6월", width: 60},
                {key: "", label:"7월", width: 60},
                {key: "", label:"8월", width: 60},
                {key: "", label:"9월", width: 60},
                {key: "", label:"10월", width: 60},
                {key: "", label:"11월", width: 60},
                {key: "", label:"12월", width: 60},
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                    ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.item);
                }
            }
        });
    }
});