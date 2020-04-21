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
            url: "/api/v1/BM0101G0S0",
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
            if (parent && parent.axboot && parent.axboot.modal) {
                parent.axboot.modal.callback(list[0]);
            }
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
            frozenColumnIndex: 0,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
            	{key: "corpId", label: ADMIN("ax.admin.BM0101F0.corp.id"), width: 80},
                {key: "corpNm", label: ADMIN("ax.admin.BM0101F0.corp.name"), width: 80},
                {key: "corpNo", label: ADMIN("ax.admin.BM0101F0.corp.no"), width: 120},
                {key: "email", label: ADMIN("ax.admin.BM0101F0.email"), width: 120},
                {key: "phone", label: ADMIN("ax.admin.BM0101F0.phone"), width: 120},
                {key: "addr1", label: ADMIN("ax.admin.BM0101F0.addr1"), width: 120},
                {key: "fax", label: ADMIN("ax.admin.BM0101F0.fax"), width: 120},
                {key: "zipNo", label: ADMIN("ax.admin.BM0101F0.zip.no"), width: 70},
                {key: "addr2", label: ADMIN("ax.admin.BM0101F0.addr2"), width: 120},
                {key: "garage", label: ADMIN("ax.admin.BM0101F0.garage"), width: 70},
                {key: "remark", label: ADMIN("ax.admin.BM0101F0.remark"), width: 70},
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