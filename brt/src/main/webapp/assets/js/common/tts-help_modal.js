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
            url: "/api/v1/selectTtsHelp",
            data: null,
            callback: function (res) {
            	caller.gridView0.setData(res);
            }
        });
        return false;
    },
});

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    this.pageButtonView.initView();
    this.gridView0.initView();
    
    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
};

fnObj.pageResize = function () {

};

fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "close": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_CLOSE);
            }
        });
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
        	showLineNumber: true,
        	lineNumberColumnWidth: 30,
        	frozenColumnIndex: 0,
            target: $('[data-ax5grid="gridView0"]'),
            columns: [
                {key: "tag", label: ADMIN("ax.admin.tts.help.tag"), width: 120, sortable: true},
                {key: "description", label: ADMIN("ax.admin.tts.help.tag.desc"), width: 140, sortable: true},
                {key: "minMax", label: ADMIN("ax.admin.tts.help.value.min.max"), width: 80, align: "center"},
                {key: "example", label: ADMIN("ax.admin.tts.help.example"), width: 270},
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

    selectAll: function(flag) {
    	this.target.selectAll({selected: flag});
    }
});
