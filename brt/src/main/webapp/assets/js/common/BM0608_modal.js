var fnObj = {};
var paramData = parent.axboot.modal.getData();

var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_CLOSE: function (caller, act, data) {
        if (parent) {
            parent.axboot.modal.close();
        }
    },
    
    PAGE_SEARCH: function (caller, act, data) {
    },
    
    PAGE_SAVE: function (caller, act, data) {
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
	
    preview();
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

function preview(){
	$("#videoPreview").val("");
	$("#imagePreview").val("");

	var url = "/api/v1/filePreview?type=video&vdoId=" + paramData.vdoId + "&fileType=" + paramData.fileType;
	changeFiletype(paramData.fileType);

	if(paramData.fileType == "AV001"){
		$('#videoPreview').attr("src", url);
	}else{
		$('#imagePreview').attr("src", url);
	}
}

function changeFiletype(input){
	togglePreview(input);
}

function togglePreview(input){
	if(input == 'AV002'){
		$('#vdoFile').val('');
		$('#videoPreview').attr('src', '');
		$('#videoPreview').hide();
		$('#imagePreview').show();
		$('#imgPlayTm').attr('disabled', false);
	}else if(input == 'AV001'){
		$('#vdoFile').val('');
		$('#imagePreview').hide();
		$('#videoPreview').show();
		$('#imgPlayTm').val('');
		$('#imgPlayTm').attr('disabled', true);
	}else{
		$('#imgPlayTm').val('');
		$('#videoPreview').attr('src', '');
	}
}