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
    
});

var CODE = {};

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    var _this = this;
    this.parentData = parent.axboot.modal.getData();
    _this.pageButtonView.initView();
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

function preview(getData){
	$('#background').attr("src", "");
	$('#land').attr("src", "");
	$('#nextstopbg').attr("src", "");
	
	var input = getData.input;
	var data = input;
	
	if(input == null || input == undefined){
		if(getData.file1){
			console.log(getData.file1);
			console.log(getData.file1.files[0]);
			previewBeforeInsert(getData.file1, background);			
		}
		if(getData.file2){
			previewBeforeInsert(getData.file2, land);
		}
		if(getData.file3){
			previewBeforeInsert(getData.file3, nextstopbg);
		}
	}else{
		//전체이미지 2125 * 1200
		var backUrl = "/api/v1/filePreview?type=png&setId=" + data.setId + "&fileType=background";
		//정류장안내 이미지 2125 * 1195
		var landUrl = "/api/v1/filePreview?type=png&setId=" + data.setId + "&fileType=land";
		//아래쪽이미지 2125 * 1195
		var stopUrl = "/api/v1/filePreview?type=png&setId=" + data.setId + "&fileType=nextstopbg";	
		$('#background').attr("src", backUrl);
		$('#land').attr("src", landUrl);
		$('#nextstopbg').attr("src", stopUrl);
	}
}

function previewBeforeInsert(input, id){
	
	/*미완성
	console.log(input);
	if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function (e) {
        	$('#' + id).attr('src', e.target.result);
        }
       	
        reader.readAsDataURL(input.files[0]);
    }*/
}