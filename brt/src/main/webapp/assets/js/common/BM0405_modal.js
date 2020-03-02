var fnObj = {};
var isUpdate = false;
var playListPlayer;

var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_CLOSE: function (caller, act, data) {
        if (parent) {
            parent.axboot.modal.close();
        }
    },
    
    REFRESH_G3: function(caller, act, data) {
    	axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0405G3S0",
            data: {
            	vocDiv: $("#selectVoice").val()
            },
            callback: function (res) {
                caller.gridView3.setData(res);
            }
        })
    },
    
    
    // 편성 업데이트
    PAGE_UPDATE: function(caller, act, data) {
    	if(caller.formView0.validate()) {
    		var formData = caller.formView0.getData();
    		var playList = caller.gridView4.getData();
    		formData["playList"] = playList;
    		formData["lati"] = caller.parentData.lati;
    		formData["longi"] = caller.parentData.longi;
    		formData["seq"] = caller.parentData.seq;
    		
    		if(playList.length == 0) {
    			axDialog.alert("재생 목록을 추가해주세요");
    			return false;
    		}
    		
	    	axboot.promise()
		        .then(function (ok, fail, _data) {
		            axboot.ajax({
		                type: "POST",
		                url: "/api/v1/BM0405F0U0",
		                data: JSON.stringify(formData),
		                callback: function (res) {
		                    ok(res);
		                }
		            });
		        })
		        .then(function (ok, fail, data) {
		        	axToast.push(LANG("onsave"));
		        	if (parent && parent.axboot && parent.axboot.modal) {
	                    parent.axboot.modal.callback();
	                }
		        	//window.location.reload();
		        })
		        .catch(function () {
		
		        });
    	}
    },
    
    
    // 새로운 편성 삽입
    PAGE_SAVE: function (caller, act, data) {
    	if(caller.formView0.validate()) {
    		var formData = caller.formView0.getData();
    		var playList = caller.gridView4.getData();
    		formData["allPlayTm"] = caller.formView0.model.get("allPlayTm");
    		formData["routId"] = caller.parentData.routId;
    		formData["lati"] = caller.parentData.lati;
    		formData["longi"] = caller.parentData.longi;
    		formData["seq"] = caller.parentData.seq;
    		formData["nodeType"] = caller.parentData.nodeType;
    		formData["playList"] = playList;
    		
    		
    		if(playList.length == 0) {
    			axDialog.alert("재생 목록을 추가해주세요");
    			return false;
    		}

    		axboot.promise()
		        .then(function (ok, fail, _data) {
		            axboot.ajax({
		                type: "POST",
		                url: "/api/v1/BM0405F0I0",
		                data: JSON.stringify(formData),
		                callback: function (res) {
		                    ok(res);
		                }
		            });
		        })
		        .then(function (ok, fail, data) {
		        	axToast.push(LANG("onsave"));
		        	if (parent && parent.axboot && parent.axboot.modal) {
	                    parent.axboot.modal.callback();
	                }
		        	caller.parentData["orgaId"] = data.message;
		        	//window.location.reload();
		        })
		        .catch(function () {
		
		        });
		    //*/
    	}
    },
    
    // 편성 삭제
    PAGE_DELETE: function(caller, act, data) {
    	var _this = this;
    	
    	
		axDialog.confirm({
            msg: LANG("ax.script.deleteconfirm")
        }, function() {
            if (this.key == "ok") {
            	if(caller.parentData.orgaId) {
	            	axboot.promise()
				        .then(function (ok, fail, _data) {
				            axboot.ajax({
				                type: "POST",
				                url: "/api/v1/BM0405F0D0",
				                data: JSON.stringify({
				                	routId: caller.parentData.routId,
				                	orgaId: caller.parentData.orgaId
				                }),
				                callback: function (res) {
				                    ok(res);
				                }
				            });
				        })
				        .then(function (ok, fail, data) {
				        	if (parent && parent.axboot && parent.axboot.modal) {
			                    parent.axboot.modal.callback({
					        		isDelete: true
			                    });
			                }
				        	ACTIONS.dispatch(ACTIONS.PAGE_CLOSE);
				        })
				        .catch(function () {
				
				        });
            	} else {
            		if (parent && parent.axboot && parent.axboot.modal) {
	                    parent.axboot.modal.callback({
			        		isDelete: true
	                    });
	                }
		        	ACTIONS.dispatch(ACTIONS.PAGE_CLOSE);
            	}
            }
        });
    },
    
    // 재생 목록에 추가
    ADD_PLAY_LIST: function(caller, act, data) {
    	var row = caller.gridView3.getData("selected");
    	
    	if(row.length != 0) {
    		row = row[0];
    		
    		var allPlayTm = caller.formView0.model.get("allPlayTm");
    		caller.formView0.model.set("allPlayTm", allPlayTm + row.playTm);
    		
    		caller.gridView4.selectAll(false);
    		caller.gridView4.addRow(row);
    	} else {
    		axDialog.alert(LANG("ax.script.alert.requireselect"));
    	}
    },
    
    // 재생 목록에서 삭제
    DELETE_PLAY_LIST: function(caller, act, data) {
    	var row = caller.gridView4.getData("selected");
    	
    	if(row.length != 0) {
    		row = row[0];
    		var allPlayTm = caller.formView0.model.get("allPlayTm");
    		caller.formView0.model.set("allPlayTm", allPlayTm - row.playTm);
    		
    		caller.gridView4.delRow("selected");
    		
    	} else {
    		axDialog.alert(LANG("ax.script.alert.requireselect"));
    	}
    },
    
    // 팝업 오픈시 이미 저장된 편성일 경우 데이터 불러옴
    SET_DATA: function(caller, act, data) {
    	if(caller.parentData.orgaId != null && caller.parentData.orgaId != "") {
    		isUpdate = true;
    		
    		axboot.ajax({
                type: "GET",
                url: "/api/v1/BM0405F0S0",
                data: {
                	orgaId: caller.parentData.orgaId
                },
                callback: function (res) {
                	caller.formView0.model.setModel(res.map.orgaInfo);
            		caller.gridView4.setData(res.map.playList);
                }
            });
    	}
    },
    
    TEST_PLAY_LIST: function(caller, act, data) {
    	var list = caller.gridView4.getData();
    	var playList = [];
    	//var url = "/api/v1/getMp3Test?";
    	var url = "/api/v1/filePreview?type=savedVoice&";
    	
    	for(var i = 0; i < list.length; i++) {
    		var params = list[i];
    		
    		if(params.isDeadline == "Y") {
    			continue;
    		}
    		
    		if(list[i].playType == "WAV") {
    			playList.push({
    				mp3: url + $.param(list[i])
    			});
    		} else if(list[i].playType == "TTS") {
    			if(list[i].vocDiv == "CD025") {
        			params["vocType"] = "K";
        			playList.push({
        				mp3: url + $.param(params)
        			});
        			params["vocType"] = "E";
        			playList.push({
        				mp3: url + $.param(params)
        			});
        		} else {
        			params["vocType"] = "K";
        			playList.push({
        				mp3: url + $.param(params)
        			});
        		}
    		}
    	}
    	
    	playListPlayer.setPlaylist(playList);
    	playListPlayer.play(0);
    },
    
    G4_UP_ITEM: function(caller, act, data) {
    	var row = caller.gridView4.getData("selected");
    	var list = caller.gridView4.getData();
    	
    	if(row != null) {
    		axDialog.alert(LANG("ax.script.alert.requireselect"))
    		return false;
    	}
    	
    	list = arrayMove(list, row[0].__index, row[0].__index - 1);
    	caller.gridView4.setData(list);
    },
    
    G4_DOWN_ITEM: function(caller, act, data) {
    	var row = caller.gridView4.getData("selected");
    	var list = caller.gridView4.getData();
    	
    	if(row != null) {
    		axDialog.alert(LANG("ax.script.alert.requireselect"))
    		return false;
    	}
    	
    	list = arrayMove(list, row[0].__index, row[0].__index + 1);
    	caller.gridView4.setData(list);
    }
});

fnObj.pageStart = function () {
	this.parentData = parent.axboot.modal.getData();
    this.pageButtonView.initView();
    this.searchView.initView();
    this.gridView3.initView();
    this.gridView4.initView();
    this.formView0.initView();
    
    $("#selectVoice").on("change", function(e) {
    	ACTIONS.dispatch(ACTIONS.REFRESH_G3);
    });
    
    playListPlayer = new jPlayerPlaylist({
		jPlayer: "#jquery_jplayer_0",
		cssSelectorAncestor: "#jp_container_0"
	}, [], {
		playlistOptions: {
			enableRemoveControls: true
		},
		swfPath: "/assets/js/jplayer",
		supplied: "mp3, wav",
		useStateClassSkin: true,
		autoBlur: false,
		smoothPlayBar: true,
		keyEnabled: true,
		remainingDuration: true,
		toggleDuration: true
	});

    ACTIONS.dispatch(ACTIONS.REFRESH_G3);
    ACTIONS.dispatch(ACTIONS.SET_DATA);
};

fnObj.pageResize = function () {

};

fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "save": function () {
            	if(isUpdate) {
            		ACTIONS.dispatch(ACTIONS.PAGE_UPDATE);
            	} else {
            		ACTIONS.dispatch(ACTIONS.PAGE_SAVE);
            	}
            },
            "delete": function() {
            	ACTIONS.dispatch(ACTIONS.PAGE_DELETE);
            },
            "close": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_CLOSE);
            },
            "addPlayList": function() {
            	ACTIONS.dispatch(ACTIONS.ADD_PLAY_LIST);
            },
            "deletePlayList": function() {
            	ACTIONS.dispatch(ACTIONS.DELETE_PLAY_LIST);
            },
            "upItem": function() {
            	ACTIONS.dispatch(ACTIONS.G4_UP_ITEM);
            },
            "downItem": function() {
            	ACTIONS.dispatch(ACTIONS.G4_DOWN_ITEM);
            },
            "test": function() {
            	ACTIONS.dispatch(ACTIONS.TEST_PLAY_LIST);
            }
        });
    }
});

//== view 시작
/**
 * searchView
 */
fnObj.searchView = axboot.viewExtend(axboot.searchView, {
    initView: function () {
        this.target = $(document["searchView0"]);
        this.target.attr("onsubmit", "return ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);");
        this.filter = $("#filter");
    },
    setPageNumber: function (pageNumber) {
        this.pageNumber = pageNumber;
        ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
    },
    getData: function () {
        return {
            filter: this.filter.val()
        }
    }
});

/**
 * gridView3
 */
fnObj.gridView3 = axboot.viewExtend(axboot.gridView, {
    initView: function () {
        var _this = this;

        this.target = axboot.gridBuilder({
            showLineNumber: false,
            frozenColumnIndex: 0,
            target: $('[data-ax5grid="gridView3"]'),
            columns: [
            	{key: "vocNm", label: ADMIN("ax.admin.BM0405F0.voc.nm"), width: 95},
				{key: "playType", label: ADMIN("ax.admin.BM0405F0.play.type"), width: 95},
            ],
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
});

/**
 * gridView4
 */
fnObj.gridView4 = axboot.viewExtend(axboot.gridView, {
    initView: function () {
        var _this = this;

        this.target = axboot.gridBuilder({
            showLineNumber: true,
            frozenColumnIndex: 0,
            lineNumberColumnWidth: 30,
            target: $('[data-ax5grid="gridView4"]'),
            columns: [
            	{key: "vocNm", label: ADMIN("ax.admin.BM0405F0.voc.nm"), width: 100,
            		styleClass: function() {
            			return (this.item.isDeadline === "Y") ? "grid-cell-color-gray" : "";
            		}},
				{key: "vocDivNm", label: ADMIN("ax.admin.BM0405F0.voc.div"), width: 100,
					styleClass: function() {
            			return (this.item.isDeadline === "Y") ? "grid-cell-color-gray" : "";
            		}},
            ],
            footSum: [
            	[
            		{label: "총 재생시간", colspan: 1, align: "center"},
            		{key: "playTm", collector: function() {
            			var value = 0;
            			
            			this.list.forEach(function(n) {
            				value += n.playTm;
            			});
            			
            			return secondToTime(value);
            		}}
            	]
            ]
        });
    },
    
    addRow: function (data) {
    	if(typeof data === "undefined") {
    		this.target.addRow({__created__: true}, "last");
    	} else {
    		data["__created__"] = true;
            this.target.addRow(data, "last");
    	}
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
    },
});

/**
 * formView0
 */
fnObj.formView0 = axboot.viewExtend(axboot.formView, {
	getDefaultData: function () {
        return $.extend({}, axboot.formView.defaultData, {
        	allPlayTm: 0
        });
    },
    initView: function () {
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
        		alert(LANG("ax.script.form.validate", rs.error[0].jquery.attr("title")));
        	}
            rs.error[0].jquery.focus();
            return false;
        }
        return true;
    },
    clear: function () {
        this.model.setModel(this.getDefaultData());
    },
    refreshSummary: function() {
    	var allPlayTm = this.model.get("allPlayTm");
    }
});
