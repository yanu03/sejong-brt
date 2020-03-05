var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_CLOSE: function (caller, act, data) {
        if (parent) {
            parent.axboot.modal.close();
        }
    },
    PAGE_SAVE: function (caller, act, data) {
    	if (caller.formView0.validate()) {
        	var formData = caller.formView0.getData();
        	
        	if(formData.newPassword != formData.newConfirmPassword) {
        		axDialog.alert("새비밀번호가 일치하지 않습니다.")
        		return false;
        	}
        	
        	axboot.promise()
	            .then(function (ok, fail, data) {
	            	axboot.ajax({
	            		type: "POST",
	                    url: "/api/v1/users/changePs",
	                    data: JSON.stringify(formData),
	                    callback: function (res) {
	                        ok(res);
	                    }
	                });
	            })
	            .then(function (ok, fail, data) {
	            	if(data.message == "true") {
    		        	if (parent && parent.axboot && parent.axboot.modal) {
    	                    parent.axboot.modal.callback();
    	                }
                	} else {
                		axDialog.alert("기존 비밀번호가 일치하지 않습니다.");
                	}
	            })
	            .catch(function () {
	
	            });
    	}
    },
});

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    this.pageButtonView.initView();
    this.formView0.initView();
};

fnObj.pageResize = function () {

};

fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "save": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SAVE);
            },
            "close": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_CLOSE);
            }
        });
    }
});

/**
 * formView0
 */
fnObj.formView0 = axboot.viewExtend(axboot.formView, {
    getDefaultData: function () {
        return $.extend({}, axboot.formView.defaultData, {
        });
    },
    initView: function () {
    	_this = this;
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
    clear: function () {
        this.model.setModel(this.getDefaultData());
    }
});
