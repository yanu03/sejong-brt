
var fnObj = {}, CODE = {};

/***************************************** 전역 변수 초기화 ******************************************************/
isUpdate = false;
selectedRow = null;
/*************************************************************************************************************/

/***************************************** 이벤트 처리 코드 ******************************************************/
var ACTIONS = axboot.actionExtend(fnObj, {
	PAGE_RESERVATION: function(caller, act, data) {
    	if(selectedRow == null) {
    		axDialog.alert(LANG("ax.script.alert.requireselect"));
    		return false;
    	}
    	
        axboot.ajax({
            type: "GET",
            url: "/api/v1/checkVoiceReservation",
            data: {
        		vocId: selectedRow.vocId,
            },
            callback: function (res) {
                if(res.message == "true") {
	        		// 예약적용일때
        			axboot.modal.open({
        	            modalType: "RESERVATION",
        	            param: "",
        	            callback: function (result) {
        	            	this.close();
        	            	ACTIONS.dispatch(ACTIONS.INSERT_RESERVATION, {
        	            		date: result
        	            	});
        	            }
        	        });
	        	} else {
	        		axDialog.alert(LANG("ax.script.check.organization"));
	        	}
            }
        });
    },
    
    INSERT_RESERVATION: function(caller, act, data) {
    	axboot.promise()
	        .then(function (ok, fail, _data) {
	            axboot.ajax({
	                type: "POST",
	                url: "/api/v1/voiceReservation",
	                data: JSON.stringify({
	            		vocId: selectedRow.vocId,
	            		rsvDate: data.date
	                }),
	                callback: function (res) {
	                    ok(res);
	                }
	            });
	        })
	        .then(function (ok, fail, data) {
	        })
	        .catch(function () {
	
	        });
    },
    
	PAGE_SEARCH: function (caller, act, data) {
    	// 새로운 레코드 추가할 시 검색어 삭제
    	var dataFlag = typeof data !== "undefined";
    	var filter = $.extend({}, caller.searchView0.getData());
    	
        axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0404G0S0",
            data: filter,
            callback: function (res) {
                caller.gridView0.setData(res);
                
                if(res.list.length == 0) {
                	isUpdate = false;
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
    	caller.gridView0.target.exportExcel("data.xls");
    },
    
    PAGE_DELETE: function(caller, act, data) {
    	var grid = caller.gridView0.target;
    	
    	if(typeof grid.selectedDataIndexs[0] === "undefined") {
    		axDialog.alert(LANG("ax.script.alert.requireselect"));
    		return false;
    	}
    	
    	axDialog.confirm({
            msg: LANG("ax.script.deleteconfirm")
        }, function() {
            if (this.key == "ok") {
            	axboot.promise()
                .then(function (ok, fail, data) {
	            	axboot.ajax({
	                    type: "POST",
	                    url: "/api/v1/BM0404G0D0",
	                    data: JSON.stringify(grid.list[grid.selectedDataIndexs[0]]),
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
    },

    PAGE_SAVE: function (caller, act, data) {  
        if (caller.formView0.validate()) {
        	var formData = new FormData(caller.formView0.target[0]);
        	formData.set("routId", selectedRow.routId);
        	
        	if(caller.formView0.model.get("playType") == "WAV") {
    	    	var element = $("#wavFile");
    	    	
    	    	if(!element[0].files[0]){
    	        	alert(element.attr("title") + "을 선택해주세요");
    	        	return false;
    	        }
        	}
        	
            axboot.promise()
                .then(function (ok, fail, data) {
                    axboot.ajax({
                        type: "POST",
                        url: "/api/v1/BM0404F0I0",
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
            		axToast.push(LANG("onadd"));
            		ACTIONS.dispatch(ACTIONS.PAGE_SEARCH, data.message);
                    isUpdate = true;
                })
                .catch(function () {

                });
            //*/
        }
    },
    
    PAGE_UPDATE: function(caller, act, data) {
        if (caller.formView0.validate()) {
        	var formData = new FormData(caller.formView0.target[0]);
        	formData.set("routId", selectedRow.routId);
        	
            axboot.promise()
                .then(function (ok, fail, data) {
                    axboot.ajax({
                    	type: "POST",
                        url: "/api/v1/BM0404F0U0",
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
            		axToast.push(LANG("onupdate"));
            		ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                })
                .catch(function () {

                });
        }
    },
    
    // 탭닫기
    PAGE_CLOSE: function(caller, act, data) {
    	window.parent.fnObj.tabView.closeActiveTab();
    },
    
    ITEM_CLICK: function (caller, act, data) {
    	if(typeof data.vocId === "undefined") {
    		isUpdate = false;
    	} else {
    		isUpdate = true;
    	}
    	
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
        }
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
    		alert(element.attr("title") + "을 선택해주세요");
    	}
    },
    
    // TTS 미리듣기
    TEST_TTS: function(caller, act, data) {
    	if(data.pText != "")
    		ACTIONS.dispatch(ACTIONS.SET_AUDIO, data);
    },
    
    // 플레이어에 오디오 파일 셋팅
    SET_AUDIO: function(caller, act, data) {
    	var url = "/api/v1/filePreview?type=voice&" + $.param(data);
    	
		$("#jquery_jplayer_1").jPlayer("setMedia", {
    		mp3: url,
    	});
    	
    	// WAV 미리듣기가 아닐경우 자동 재생
    	if(typeof data.vocId === "undefined") {
			$("#jquery_jplayer_1").jPlayer("play");
		}
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
        	"reservation": function() {
        		ACTIONS.dispatch(ACTIONS.PAGE_RESERVATION);
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
        	frozenColumnIndex: 0,
            sortable: true,
            target: $('[data-ax5grid="gridView0"]'),
            columns: [
            	{key: "routId", label: ADMIN("ax.admin.BM0104G0.routId"), width: 80},
                {key: "routNm", label: ADMIN("ax.admin.BM0104G0.routNm"), width: 180},
                {key: "playType", label: ADMIN("ax.admin.BM0404F0.play.type"), width: 120},
                {key: "playTm", label: ADMIN("ax.admin.BM0404F0.play.time"), width: 80},
                {key: "playDate", label: ADMIN("ax.admin.BM0404F0.play.date"), width: 150},
                {key: "krTts", label: ADMIN("ax.admin.BM0404F0.kr.tts"), width: 120},
                {key: "remark", label: ADMIN("ax.admin.BM0404F0.remark"), width: 120},
                {key: "routUpdatedAt", label: ADMIN("ax.admin.BM0104G0.updatedAt"), width: 160},
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                    ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.item);
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
    		if(this.target.list[i].routId == id) {
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
        	playStDate: new Date().yyyymmdd(),
        	playEdDate: "9999-12-31"
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
        		alert(LANG("ax.script.form.validate", rs.error[0].jquery.attr("title")));
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
    },
    disable: function() {
    	this.target.find('#wavFile,[data-btn],[data-ax-path][data-key!=true]').each(function(index, element) {
    		$(element).attr("readonly", true).attr("disabled", true);
    	});
    },
    clear: function () {
        this.model.setModel(this.getDefaultData());
        this.target.find('[data-ax-path="key"]').removeAttr("readonly");
    }
});
