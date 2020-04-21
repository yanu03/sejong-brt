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
    this.parentData = parent.axboot.modal.getData();
	
    preview(this.parentData);
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

function preview(data){

	$("#videoPreview").val("");
	$("#imagePreview").val("");
	var url = "/api/v1/filePreview?type=video&vdoId=" + data.vdoId + "&fileType=" + data.fileType;
	
	//영상
	if(data.fileType == "AV001"){
		$('#imagePreview').hide();
		$('#videoPreview').show();
		$('#videoPreview').attr("src", url);
	}
	//이미지
	else if(data.fileType == "AV002"){
		$('#videoPreview').hide();
		$('#imagePreview').show();
		$('#imagePreview').attr("src", url);
	}
}
