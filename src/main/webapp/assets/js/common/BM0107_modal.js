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
            url: "/api/v1/BM0107G0S0",
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
        	axDialog.alert(LANG("ax.script.interfaceConfirm"));
            /*if (parent && parent.axboot && parent.axboot.modal) {
                parent.axboot.modal.callback(list[0]);
            }*/
        	axboot.ajax({
                type: "POST",
                url: "/api/v1/BM0107G0U0",
                data: JSON.stringify(list),
                callback: function (res) {
                	if(res.list.length > 0){
                		axDialog.alert("갱신 성공");
                		ACTIONS.dispatch(ACTIONS.PAGE_CLOSE);
                	}
                	else{
                		axDialog.alert("갱신 실패");
                	}
                }
            });
            return false;
        } else {
        	axDialog.alert(LANG("ax.script.requireselect"));
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
            frozenColumnIndex: 0,
            sortable: true,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
            	{key: "routId", label: ADMIN("ax.admin.BM0104GO.modal.routId"), width: 80},
                {key: "routNm", label: ADMIN("ax.admin.BM0104GO.modal.routNm"), width: 60},
                {key: "stStaNm", label: ADMIN("ax.admin.BM0104GO.modal.stStaNm"), width: 180},
                {key: "edStaNm", label: ADMIN("ax.admin.BM0104GO.modal.edStaNm"), width: 180}
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