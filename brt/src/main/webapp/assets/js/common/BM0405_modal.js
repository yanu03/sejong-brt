var fnObj = {};
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
    
    PAGE_SAVE: function (caller, act, data) {
    	if(caller.formView0.validate()) {
    		var formData = caller.formView0.getData();
    		var playList = caller.gridView4.getData();
    		formData["nodeNm"] = formData.orgaNm;
    		formData["allPlayTm"] = caller.formView0.model.get("allPlayTm");
    		formData["playList"] = playList;
    		
    		if(playList.length == 0) {
    			axDialog.alert("재생 목록을 추가해주세요");
    			return false;
    		}
    		
    		if (parent && parent.axboot && parent.axboot.modal) {
                parent.axboot.modal.callback({
                	formData: formData,
                });
            }
    	}
    },
    
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
    
    SET_DATA: function(caller, act, data) {
    	if(data.orgaNm) {
    		caller.formView0.model.set("orgaNm", data.orgaNm);
    		caller.formView0.model.set("remark", data.remark);
    		caller.gridView4.setData(data.playList);
    	}
    },
    
    TEST_PLAY_LIST: function(caller, act, data) {
    	var list = caller.gridView4.getData();
    	var playList = [];
    	var url = "/api/v1/getMp3Test?";
    	
    	for(var i = 0; i < list.length; i++) {
    		var params = list[i];
    		
    		if(list[i].playType == "WAV") {
    			playList.push({
    				mp3: url + $.param(list[i])
    			});
    		} else if(list[i].playType == "TTS") {
    			if(list[i].vocDiv == "CD025") {
        			params["vocType"] = "KR";
        			playList.push({
        				mp3: url + $.param(params)
        			});
        			params["vocType"] = "EN";
        			playList.push({
        				mp3: url + $.param(params)
        			});
        		} else {
        			params["vocType"] = "KR";
        			playList.push({
        				mp3: url + $.param(params)
        			});
        		}
    		}
    	}
    	
    	console.log(playList);
    	
    	playListPlayer.setPlaylist(playList);
    	playListPlayer.play(0);
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
    /*
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
	});*/
    
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
    ACTIONS.dispatch(ACTIONS.SET_DATA, this.parentData);
};

fnObj.pageResize = function () {

};

fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "search": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            },
            "save": function () {
        		ACTIONS.dispatch(ACTIONS.PAGE_SAVE);
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
            target: $('[data-ax5grid="gridView4"]'),
            columns: [
            	{key: "vocNm", label: ADMIN("ax.admin.BM0405F0.voc.nm"), width: 100},
				{key: "vocDivNm", label: ADMIN("ax.admin.BM0405F0.voc.div"), width: 100},
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
    	console.log(allPlayTm);
    }
});
