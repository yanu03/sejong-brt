var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_CLOSE: function (caller, act, data) {
        if (parent) {
            parent.axboot.modal.close();
        }
    },
    
    CHECK_PASSWORD: function(caller, act, data) {
    	var user = $("#scdPs").val();
    	if(user != ""){
    		axboot.promise()
    		.then(function (ok, fail, data) {
    			axboot.ajax({
    				type: "POST",
    				url: "/api/v1/users/checkScdPs",
    				data: JSON.stringify({scdPs : user}),
    				callback: function (res) {
    					if(res.message == "false"){
    						axDialog.alert("비밀번호가 틀렸습니다.");
    					} else {
    						if (parent && parent.axboot && parent.axboot.modal) {
    							parent.axboot.modal.callback();
    						}
    					}
    				}
    			});
    		});
    	} else {
    		axDialog.alert("비밀번호를 입력하세요.");
    	}
    	return false;
    },
});

var CODE = {};

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    var _this = this;
    _this.pageButtonView.initView();
    _this.formView0.initView();
};

fnObj.pageResize = function () {

};

fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {         
            "close": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_CLOSE);
            },
            "checkButton" : function(){
            	ACTIONS.dispatch(ACTIONS.CHECK_PASSWORD);
            }
        });
    }
});

//== view 시작
/**
 * formView
 */
fnObj.formView0 = axboot.viewExtend(axboot.formView, {

    getDefaultData: function () {
        return $.extend({}, axboot.formView.defaultData, {});
    },
    initView: function () {
        this.target = $("#formView0");
        this.target.attr("onsubmit", "return ACTIONS.dispatch(ACTIONS.CHECK_PASSWORD);");
        this.user = $("#scdPs");
        
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
        data = $.extend({}, data.list[0]);

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
