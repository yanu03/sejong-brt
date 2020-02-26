var fnObj = {};

isUpdate = false;


var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_CLOSE: function (caller, act, data) {
        if (parent) {
            parent.axboot.modal.close();
        }
    },
    
    PAGE_SEARCH: function (caller, act, data) {   	
    	caller.formView0.setData(parent.axboot.modal.getData());
    	var formData = caller.formView0.getData();
    	if(formData["aplyDate"] != null){
    		isUpdate = true;
    		console.log("true");
    	}
    },
    
    
    PAGE_SAVE: function (caller, act, data) {
        if (caller.formView0.validate()) {
            var formData = caller.formView0.getData();
            var formDataCheck = formData["dvcId"];
            axboot.promise()
         	.then(function (ok, fail, data) {
                axboot.ajax({
                    type: "POST",
                    url: "/api/v1/BM0202M0S0", //이부분하는중이었다.
                    data: JSON.stringify({dvcId : formDataCheck , workType : formData["workType"]}),
                    callback: function (res) {
                        ok(res);
                        console.log(res);
                    }
                });
            })
              .then(function (ok, fail, data) {
               console.log(data.message);
               if(data.message == "true"){
            	axboot.promise()
                .then(function (ok, fail, data) {
                    axboot.ajax({
                        type: "POST",
                        url: "/api/v1/BM0201M0I0",
                        data: JSON.stringify(formData),
                        callback: function (res) {
                            ok(res);
                        }
                    });
                })
                .then(function (ok, fail, data) {
            		axToast.push(LANG("onadd"));
            		if (parent && parent.axboot && parent.axboot.modal) {
	                    parent.axboot.modal.callback();
	                }
            		ACTIONS.dispatch(ACTIONS.PAGE_CLOSE, data.message);
            		
                    isUpdate = true;
                })
                .catch(function () {

                });
               }else{
            	   axDialog.alert(LANG("ax.script.alert.firstconfirm"));
               }
              })
        }
    },
    
    PAGE_UPDATE : function(caller , act , data) {
    	isUpdate = false;
    			var formData = caller.formView0.getData();
    			axboot.promise()
    			.then(function (ok , fail , data){
    				axboot.ajax({
    					type : "POST",
    					url : "/api/v1/BM0202G2U0",
    					data : JSON.stringify(formData),
    					callback : function(res){
    						ok(res);
    					}
    				});
    			})
    			.then(function(ok , fail , data){
    				axToast.push(LANG("onupdate"));
    				if (parent && parent.axboot && parent.axboot.modal) {
	                    parent.axboot.modal.callback();
	                }
    				ACTIONS.dispatch(ACTIONS.PAGE_CLOSE, data.message);
					isUpdate = true;
    			})
    			.catch(function () {
					
				});
    		
	},
   
    ITEM_CLICK: function (caller, act, data) {
    },
});

var CODE = {};

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    var _this = this;
    
    _this.pageButtonView.initView();
    _this.searchView0.initView();
    _this.formView0.initView();
    
    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
};

fnObj.pageResize = function () {

};

fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "save": function () {
            	if(isUpdate){
            	ACTIONS.dispatch(ACTIONS.PAGE_UPDATE);
            	}else{
                ACTIONS.dispatch(ACTIONS.PAGE_SAVE);
            	}
            },
            "close": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_CLOSE);
            }
        });
    }
});

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

/**
 * formView
 */
fnObj.formView0 = axboot.viewExtend(axboot.formView, {

    getDefaultData: function () {
        return $.extend({}, axboot.formView.defaultData, {});
    },
    initView: function () {
        this.target = $("#formView0");
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
        console.log("data1");
        console.log(data);
        var workData = data.workType;
        data = $.extend({}, data);
        console.log(data);

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
