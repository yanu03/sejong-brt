
var fnObj = {}, CODE = {};

/***************************************** 전역 변수 초기화 ******************************************************/
isUpdate = false;
selectedRow = null;
//글자수 최대
maxFlag = false;
/*************************************************************************************************************/

/***************************************** 이벤트 처리 코드 ******************************************************/
var ACTIONS = axboot.actionExtend(fnObj, {
	PAGE_HELP: function(caller, act, data) {
		axboot.modal.open({
            modalType: "TTS_HELP",
            param: "",
            callback: function (result) {
            
            }
		});
	},
	
	PAGE_SEARCH: function (caller, act, data) {
    	// 새로운 레코드 추가할 시 검색어 삭제
    	var dataFlag = typeof data !== "undefined";
    	var filter = $.extend({}, caller.searchView0.getData());
    	
        axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0402G0S0",
            data: filter,
            callback: function (res) {
                caller.gridView0.setData(res);
                
                if(res.list.length == 0) {
                	isUpdate = false;
                	selectedRow = null;
	                caller.formView0.clear();
	                caller.formView0.disable();
                } else {
                	if(dataFlag) {
	                	caller.gridView0.selectIdRow(data);
	                } else {
		                if(selectedRow != null) {
		                	caller.gridView0.selectRow(selectedRow.__index);
		                } else {
		                	caller.gridView0.selectFirstRow();
		                }
	                }
                }
            }
        });

        return false;
    },
	PAGE_EXCEL: function(caller, act, data) {
    	caller.gridView0.target.exportExcel("홍보음성 목록_" + new Date().yyyymmdd() + ".xls");
    },
    
    PAGE_NEW: function (caller, act, data) {
    	isUpdate = false;
    	selectedRow = null;
    	caller.gridView0.selectAll(false);
        caller.formView0.clear();
        caller.formView0.enable();
        caller.formView0.validate(true);
        
        // 미리듣기 초기화
        $("#jquery_jplayer_1").jPlayer("setMedia", {
    		mp3: null
    	});
    },
    
    PAGE_DELETE: function(caller, act, data) {
    	if(selectedRow == null) {
    		axDialog.alert(LANG("ax.script.alert.requireselect"));
    		return false;
    	}
    	
    	axboot.ajax({
			type: "GET",
			url: "/api/v1/checkVoiceOrganization",
		    data: {
		    	vocId: selectedRow.vocId,
		    },
		    callback: function (res) {
		        if(res.message == "true") {
		        	axDialog.alert(LANG("ax.script.check.organization"));
		        } else {
		        	axDialog.confirm({
		                msg: LANG("ax.script.deleteconfirm")
		            }, function() {
		                if (this.key == "ok") {
		                	axboot.promise()
		                    .then(function (ok, fail, data) {
		    	            	axboot.ajax({
		    	                    type: "POST",
		    	                    url: "/api/v1/BM0402G0D0",
		    	                    data: JSON.stringify(selectedRow),
		    	                    callback: function (res) {
		    	                        ok(res);
		    	                    }
		    	                });
		                    })
		                    .then(function (ok) {
		                    	caller.formView0.clear();
		                    	axToast.push(LANG("ondelete"));
		                        ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
		                    })
		                    .catch(function () {
	        				});
			               }
			           });
			    	}
			     }
			});
    },
    
    PAGE_SAVE: function (caller, act, data) {
		if(maxFlag){
	        if (caller.formView0.validate()) {
	        	var formData = new FormData(caller.formView0.target[0]);
	        	
	        	if(caller.formView0.model.get("playType") == "WAV") {
	    	    	var element = $("#wavFile");
	    	    	
	    	    	if(!element[0].files[0]){
	    	    		axDialog.alert(element.attr("title") + "을 선택해주세요");
	    	        	return false;
	    	        }
	        	}
	        	
	            axboot.promise()
	                .then(function (ok, fail, data) {
	                    axboot.ajax({
	                        type: "POST",
	                        url: "/api/v1/BM0402F0I0",
	                        enctype: "multipart/form-data",
	                        processData: false,
	                        data: formData,
	                        callback: function (res) {
	                            ok(res);
	                        },
	                        options: {
	                        	contentType:false
	                        }
	                    });
	                })
	                .then(function (ok, fail, data) {
	            		axToast.push(LANG("onsave"));
	            		ACTIONS.dispatch(ACTIONS.PAGE_SEARCH, data.message);
	                    isUpdate = true;
	                })
	                .catch(function () {
	
	                });
	            //*/
	        }			
		}else{
			axToast.push("실내전광판 문구 글자수를 확인하세요!");
		}
    },
    
    PAGE_UPDATE: function(caller, act, data) {
		if(maxFlag){
	        if (caller.formView0.validate()) {
	        	var formData = new FormData(caller.formView0.target[0]);
console.log(caller.formView0.target[0]);
	            axboot.promise()
	                .then(function (ok, fail, data) {
	                    axboot.ajax({
	                    	type: "POST",
	                        url: "/api/v1/BM0402F0U0",
	                        enctype: "multipart/form-data",
	                        processData: false,
	                        data: formData,
	                        callback: function (res) {
	                            ok(res);
	                        },
	                        options: {
	                        	contentType:false
	                        }
	                    });
	                })
	                .then(function (ok, fail, data) {
	            		axToast.push(LANG("onsave"));
	            		ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
	                })
	                .catch(function () {
	
	                });
	        }			
		}else{
			axToast.push("실내전광판 문구 글자수를 확인하세요!");
		}
    },
    
    // 탭닫기
    PAGE_CLOSE: function(caller, act, data) {
    	window.parent.fnObj.tabView.closeActiveTab();
    },
    
    ITEM_CLICK: function (caller, act, data) {
    	isUpdate = true;
    	selectedRow = data;
        caller.formView0.setData(data);
        caller.formView0.enable();
        
        // wav input file 클리어
        $("#wavFile").val(null);
        
        // 미리듣기 초기화
        $("#jquery_jplayer_1").jPlayer("setMedia", {
    		mp3: null
    	});
        
        if(data.playType == "WAV") {
        	ACTIONS.dispatch(ACTIONS.SET_AUDIO, data);
        	$("#wavFilename").text(data.vocId + "U.wav");
        } else {
        	$("#wavFilename").text("");
        }

		currentLength("A");
		currentLength("B");
    },
    
    CHANGE_PLAY_TYPE: function(caller, cat, data) {
    	if(data.playType == "TTS") {
    		// wav 파일 관련
    		_this.target.find("[data-ax-td-label='wavLabel']").removeClass("required");
    		_this.target.find("#wavFile").attr("readonly", true).attr("disabled", true).attr("data-ax-validate", null);
    		_this.target.find("[data-btn-test='wav']").attr("disabled", true);
    		
    		// TTS 입력관련
    		_this.target.find("[data-ax-td-label='krTtsLabel']").addClass("required");
    		_this.target.find("[data-ax-path='krTts']").attr("readonly", false).attr("data-ax-validate", "required");
    		
    		// TTS 미리듣기 기본문구 버튼 관련
    		_this.target.find("[data-btn-test='krTts']").attr("disabled", false);
    		_this.target.find("[data-btn-common-txt='krTts']").attr("disabled", false);
    		
    	} else if(data.playType == "WAV") {
    		// wav 파일 관련
    		_this.target.find("[data-ax-td-label='wavLabel']").addClass("required");
    		_this.target.find("#wavFile").attr("readonly", false).attr("disabled", false).attr("data-ax-validate", "required");
    		_this.target.find("[data-btn-test='wav']").attr("disabled", false);
    		
    		// TTS 입력관련
    		_this.target.find("[data-ax-td-label='krTtsLabel']").removeClass("required");
    		_this.target.find("[data-ax-path='krTts']").attr("readonly", true).attr("data-ax-validate", null);
    		
    		// TTS 미리듣기 기본문구 버튼 관련
    		_this.target.find("[data-btn-test='krTts']").attr("disabled", true);
    		_this.target.find("[data-btn-common-txt='krTts']").attr("disabled", true);
    	}
    },
    
    // WAV 미리듣기
    TEST_WAV: function(caller, act, data) {
    	var element = $("#wavFile");
    	
    	if(element[0].files[0]) {
	    	var blob = window.URL || window.webkitURL;
	    	var file = element[0].files[0];
	    	var fileURL = blob.createObjectURL(file);
	    	
	    	if(checkIe()) {
	    		var formData = new FormData(caller.formView0.target[0]);
	    		
	            axboot.promise()
	                .then(function (ok, fail, data) {
	                    axboot.ajax({
	                    	type: "POST",
	                        url: "/api/v1/uplaodWavTemp",
	                        enctype: "multipart/form-data",
	                        processData: false,
	                        data: formData,
	                        callback: function (res) {
	                            ok(res);
	                        },
	                        options: {
	                        	contentType:false
	                        }
	                    });
	                })
	                .then(function (ok, fail, data) {
	                	$("#jquery_jplayer_1").jPlayer("setMedia", {
	    	        		mp3: "/api/v1/filePreview?type=tempVoice",
	    	        	}).jPlayer("play");
	                })
	                .catch(function () {
	                });
	    	} else {
	    		$("#jquery_jplayer_1").jPlayer("setMedia", {
	        		wav: fileURL,
	        	}).jPlayer("play");
	    	}
    	} else {
    		if(isUpdate && selectedRow != null) {
    			ACTIONS.dispatch(ACTIONS.SET_AUDIO, selectedRow);
    		} else {
    			axDialog.alert(element.attr("title") + "을 선택해주세요");
    		}
    	}
    },
    
    // TTS 미리듣기
    TEST_TTS: function(caller, act, data) {
    	ACTIONS.dispatch(ACTIONS.SET_AUDIO, data);
    },
    
    // 플레이어에 오디오 파일 셋팅
    SET_AUDIO: function(caller, act, data) {
    	var url = "/api/v1/filePreview?type=voice&" + $.param(data);
    	
		$("#jquery_jplayer_1").jPlayer("setMedia", {
    		mp3: url,
    	}).jPlayer("play");
    },
    
    // 기본 문구 삽입 팝업 표출
    OPEN_COMMON_SENTENCE_MODAL: function(caller, act, data) {
    	var _this = this;
    	axboot.modal.open({
            modalType: "COMMON_SENTENCE",
            param: "",
            callback: function (result) {
            	this.close();
            	
            	axDialog.confirm({
		            msg: "기본문구 삽입시 작성된 내용이<br>기본문구로 초기화됩니다."
		        }, function() {
		            if (this.key == "ok") {
		            	caller.formView0.model.set(data.dataPath, result.dlCdNm);
		            }
		        });
            }
        });
    },
    
    // 계약팝업 료출
    OPEN_CONTRACT_MODEL: function(caller, act, data) {
    	var _this = this;
    	axboot.modal.open({
            modalType: "CONTRACT",
            param: "",
            callback: function (result) {
            	this.close();
            	
            	caller.formView0.model.set("conId", result.conId);
            	caller.formView0.model.set("conNm", result.conNm);
            	caller.formView0.model.set("playStDate", result.conStDate);
            	caller.formView0.model.set("playEdDate", result.conEdDate);
            }
        });
    }
});

/********************************************************************************************************************/

/******************************************* 페이지 처음 로딩시 호출 ******************************************************/
fnObj.pageStart = function () {
    this.pageButtonView.initView();
    this.searchView0.initView();
    this.gridView0.initView();
    this.formView0.initView();
    
    $("#jquery_jplayer_1").jPlayer({
		ready: function (event) {
		},
		swfPath: "/assets/js/jplayer",
		supplied: "wav, mp3",
		cssSelectorAncestor: "#jp_container_1",
		wmode: "window",
		useStateClassSkin: true,
		autoBlur: true,
		smoothPlayBar: true,
		keyEnabled: true,
		remainingDuration: true,
		toggleDuration: true
	});
    
    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
};

fnObj.pageResize = function () {

};
/********************************************************************************************************************/


/******************************************** 공통 버튼 클릭 이벤트 ******************************************************/
fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
        	"help": function() {
        		ACTIONS.dispatch(ACTIONS.PAGE_HELP);
        	},
            "search": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            },
            "excel": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_EXCEL);
            },
            "new": function() {
            	ACTIONS.dispatch(ACTIONS.PAGE_NEW);
            },
            "delete": function() {
            	ACTIONS.dispatch(ACTIONS.PAGE_DELETE);
            },
            "save": function () {
            	if(isUpdate) {
            		ACTIONS.dispatch(ACTIONS.PAGE_UPDATE);
            	} else {
            		ACTIONS.dispatch(ACTIONS.PAGE_SAVE);
            	}
            },
            "close": function() {
            	ACTIONS.dispatch(ACTIONS.PAGE_CLOSE);
            }
        });
    }
});

/********************************************************************************************************************/

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
                {key: "vocId", label: ADMIN("ax.admin.BM0402F0.voc.id"), width: 80, sortable: true, align: "center"},
                {key: "conNm", label: ADMIN("ax.admin.BM0401G0.con.nm"), width: 130, sortable: true},
                {key: "vocNm", label: ADMIN("ax.admin.BM0402F0.voc.nm"), width: 210, sortable: true},
                {key: "playType", label: ADMIN("ax.admin.BM0402F0.play.type"), width: 80, align: "center"},
                {key: "playTm", label: ADMIN("ax.admin.BM0402F0.play.time"), width: 80, align: "center"},
                {key: "playDate", label: ADMIN("ax.admin.BM0402F0.play.date"), width: 150, align: "center"},
                {key: "krTts", label: ADMIN("ax.admin.BM0402F0.kr.tts"), width: 200},
				{key: "txtA", label: ADMIN("ax.admin.BM0402F0.txtA"), width: 200},
				{key: "txtB", label: ADMIN("ax.admin.BM0402F0.txtB"), width: 200},
                {key: "remark", label: ADMIN("ax.admin.BM0402F0.remark"), width: 200},
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                    ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.item);
                }
            },
        });
        
        axboot.buttonClick(this, "data-form-view-0-btn", {
            "selectContract": function() {
            	ACTIONS.dispatch(ACTIONS.OPEN_CONTRACT_MODEL);
            }
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
    addRow: function (data) {
    	if(typeof data === "undefined") {
    		this.target.addRow({__created__: true}, "last");
    	} else {
    		data["__created__"] = true;
            this.target.addRow(data, "last");
    	}
    },
    selectFirstRow: function() {
    	if(this.target.list.length != 0) {
    		this.selectRow(0);
    	} else {
    		isUpdate = false;
    	}
    },
    selectLastRow: function() {
    	if(this.target.list.length != 0) {
    		this.selectRow(this.target.list.length - 1);
    	} else {
    		isUpdate = false;
    	}
    },
    selectRow: function(index) {
    	isUpdate = true;
    	var data = this.target.list[index];
    	
    	if(typeof data === "undefined") {
    		this.selectLastRow();
    	} else {
    		this.target.select(index);
        	ACTIONS.dispatch(ACTIONS.ITEM_CLICK, data);
    	}
    },
    selectIdRow: function(id) {
    	var i;
    	var length = this.target.list.length;
    	for(i = 0; i < length; i++) {
    		if(this.target.list[i].vocId == id) {
    			this.selectRow(i);
    			break;
    		}
    	}
    	
    	if(i == length) {
    		isUpdate = false;
    		fnObj.formView0.clear();
    		fnObj.formView0.disable();
    	}
    },
    selectAll: function(flag) {
    	this.target.selectAll({selected: flag});
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

        this.target.find('[data-ax5picker="date"]').ax5picker({
            direction: "auto",
            content: {
                type: 'date'
            }
        });
        
        axboot.buttonClick(this, "data-btn-test", {
            "krTts": function () {
                ACTIONS.dispatch(ACTIONS.TEST_TTS, {
                	pText: _this.target.find("[data-ax-path='krTts']").val(),
                	nLanguage: 0,
                	nSpeakerId: 0,
                });
            },
            "enTts": function() {
            	ACTIONS.dispatch(ACTIONS.TEST_TTS, {
                	pText: _this.target.find("[data-ax-path='enTts']").val(),
                	nLanguage: 1,
                	nSpeakerId: 2,
                });
            },
            "wav": function() {
            	ACTIONS.dispatch(ACTIONS.TEST_WAV);
            }
        });
        
        axboot.buttonClick(this, "data-btn-common-txt", {
        	"krTts": function() {
        		ACTIONS.dispatch(ACTIONS.OPEN_COMMON_SENTENCE_MODAL, {
        			dataPath: "krTts"
        		});
        	},
        	"enTts": function() {
        		ACTIONS.dispatch(ACTIONS.OPEN_COMMON_SENTENCE_MODAL, {
        			dataPath: "enTts"
        		});
        	}
        })
        
        this.target.find("[data-ax-path='playType']").on("change", function(e) {
        	ACTIONS.dispatch(ACTIONS.CHANGE_PLAY_TYPE, {
        		playType: $(this).val()
        	})
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
    enable: function() {
    	var _this = this;
    	this.target.find("[data-btn],[data-ax-path][data-key!=true]").each(function(index, element) {
    		$(element).attr("readonly", false).attr("disabled", false);
    	});
    	$("[data-ax-path='playType']").trigger("change");
    	this.target.find(".cqc-calendar").parent().show();
    },
    disable: function() {
    	this.target.find('#wavFile,[data-btn],[data-ax-path][data-key!=true]').each(function(index, element) {
    		$(element).attr("readonly", true).attr("disabled", true);
    	});
    	this.target.find(".cqc-calendar").parent().hide();
    },
    clear: function () {
        this.model.setModel(this.getDefaultData());
        this.target.find('[data-ax-path="key"]').removeAttr("readonly");
    }
});


var aFlag = true;
var bFlag = true;

function currentLength(data){
	var txt;
	if(data == 'A'){
		txt = $('#txtA').val();
		var lenA = getByteLen(txt);
		$('#txtALen').html(lenA + " / 120 bytes");

		if(lenA > 120){
			aFlag = false;
			var newA = cutByteLen(txt, 120);
			document.getElementById('txtALen').style.color='red';
			$('#txtA').val(newA);
		}else{
			aFlag = true;
			document.getElementById('txtALen').style.color='';
		}
		if(aFlag && bFlag){
			maxFlag = true;
		}else{
			maxFlag = false;
		}
	}else if(data == 'B'){
		txt = $('#txtB').val();
		var lenB = getByteLen(txt);
		$('#txtBLen').html(lenB + " / 120 bytes");

		if(lenB > 120){
			bFlag = false;
			var newB = cutByteLen(txt, 120);
			document.getElementById('txtBLen').style.color='red';
			$('#txtB').val(newB);
		}else{
			bFlag = true;
			document.getElementById('txtBLen').style.color='';
		}
		if(aFlag && bFlag){
			maxFlag = true;
		}else{
			maxFlag = false;
		}
	}
}


function getByteLen(str){
    var l = 0;
    for (var i=0; i<str.length; i++) l += (str.charCodeAt(i) > 128) ? 2 : 1;
    return l;
}

function cutByteLen(str, len) {
    var l = 0;
    for (var i=0; i<str.length; i++) {
        l += (str.charCodeAt(i) > 128) ? 2 : 1;
        if (l > len){
			return str.substring(0,i);
		}
    }
    return str;
}