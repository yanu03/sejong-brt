var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_CLOSE: function (caller, act, data) {
        if (parent) {
            parent.axboot.modal.close();
        }
    },
    PAGE_CHOICE: function (caller, act, data) {
    	if(fnObj.reservationDate.getSelection() == "") {
    		axDialog.alert(LANG("ax.script.requiredate"));
    	} else {
    		if (parent && parent.axboot && parent.axboot.modal) {
                parent.axboot.modal.callback(new Date(fnObj.reservationDate.getSelection()[0]).yyyymmdd());
            }
    	}
    },
});

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    this.pageButtonView.initView();
    
    this.reservationDate = new ax5.ui.calendar({
        control: {
            left: '<i class="cqc-chevron-left"></i>',
            yearTmpl: '%s',
            monthTmpl: '%s',
            right: '<i class="cqc-chevron-right"></i>',
            yearFirst: true
        },
        target: document.getElementById("reservationDate"),
        displayDate: (new Date()),
        selectable: {
        	range: [{
        		from: new Date(),
        		to: new Date(2100, 12, 31)
        	}]
        }
    });

    this.reservationDate.setSelection([(new Date())]);
};

fnObj.pageResize = function () {

};

fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "choice": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_CHOICE);
            },
            "close": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_CLOSE);
            }
        });
    }
});

