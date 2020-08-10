var fnObj = {}, CODE = {};

/***************************************** 전역 변수 초기화 ******************************************************/
var buttonEvent = null;
/*************************************************************************************************************/

/***************************************** 이벤트 처리 코드 ******************************************************/
var ACTIONS = axboot.actionExtend(fnObj, {
	PAGE_INIT: function(caller, act, data) {
		buttonEvent =  {
			firmwareUpdate: {
				grid: caller.gridView0,
				refresh: ACTIONS.RELOAD_G0,
				reservationComplete: ACTIONS.FIRMWARE_RSV_COMPLETE,
				tabIndex: 0
			},
			voiceReservation: {
				grid: caller.gridView1,
				refresh: ACTIONS.RELOAD_G1,
				reservationComplete: ACTIONS.VOICE_RSV_COMPLETE,
				tabIndex: 1
			},
			destiReservation: {
				grid: caller.gridView2,
				refresh: ACTIONS.RELOAD_G2,
				reservationComplete: ACTIONS.DESTI_RSV_COMPLETE,
				tabIndex: 2
			},
			videoReservation: {
				grid: caller.gridView3,
				refresh: ACTIONS.RELOAD_G3,
				reservationComplete: ACTIONS.VIDEO_RSV_COMPLETE,
				tabIndex: 3
			},
			screenReservation: {
				grid: caller.gridView4,
				refresh: ACTIONS.RELOAD_G4,
				reservationComplete: ACTIONS.SCREEN_RSV_COMPLETE,
				tabIndex: 4
			},
			routerReservation: {
				grid: caller.gridView5,
				refresh: ACTIONS.RELOAD_G5,
				reservationComplete: ACTIONS.ROUTER_RSV_COMPLETE,
				tabIndex: 5
			}
		}
	},
	
	PAGE_SEARCH: function (caller, act, data) {
    	ACTIONS.dispatch(ACTIONS.RELOAD_G0);
    },
    
    PAGE_CLOSE: function(caller, act, data) {
    	window.parent.fnObj.tabView.closeActiveTab();
    },
    
    GRID_REFRESH: function(caller, act, data) {
    	var tabId = $("[data-tab-active='true']").attr("data-tab-id");
    	ACTIONS.dispatch(buttonEvent[tabId].refresh);
    },
    
    
    GRID_REFRESH_TAB_INDEX: function(caller, act, data) {
    	for(i in buttonEvent) {
    		if(buttonEvent[i].tabIndex == data.tabIndex) {
    			ACTIONS.dispatch(buttonEvent[i].refresh);
    			break;
    		}
    	}
    },
    
    PAGE_RESERVATION_COMPLETE: function(caller, act, data) {
    	var tabId = $("[data-tab-active='true']").attr("data-tab-id");
    	var list = buttonEvent[tabId].grid.getData("selected");
    	
    	if(list.length == 0) {
    		axDialog.alert(LANG("alert.requireselect"));
    		return false;
    	}
    	
    	for(var i = 0; i < list.length; i++) {
    		if(list[i].completeYn == "Y") {
    			axDialog.alert("예약종료된 예약은 종료할 수 없습니다.");
    			return false;
    		}
    	}
    	
    	axDialog.confirm({
            msg: LANG("onreservation.complete.confirm")
        }, function() {
            if (this.key == "ok") {
            	axboot.modal.open({
                    modalType: "SECOND_PASSWORD",
                    param: "",
                    callback: function (data) {
                        this.close();
                        ACTIONS.dispatch(buttonEvent[tabId].reservationComplete);
                    }
            	});
            }
        });
    },
    
    RELOAD_G0: function(caller, act, data) {
    	/** 차내장치 업데이트 **/
    	axboot.ajax({
            type: "GET",
            url: "/api/v1/SM0107G0S0",
            data: {
            	completeYn: $("#completeYn").val(),
            	date: $("#date").val()
            },
            callback: function (res) {
                caller.gridView0.setData(res);
            }
    	});
    },
    
    RELOAD_G1: function(caller, act, data) {
    	/** 음성예약 **/
    	axboot.ajax({
            type: "GET",
            url: "/api/v1/SM0107G1S0",
            data: {
            	completeYn: $("#completeYn").val(),
            	date: $("#date").val()
            },
            callback: function (res) {
                caller.gridView1.setData(res);
            }
        });
    },
    
    RELOAD_G2: function(caller, act, data) {
    	/** 행선지안내기 **/
    	axboot.ajax({
            type: "GET",
            url: "/api/v1/SM0107G2S0",
            data: {
            	completeYn: $("#completeYn").val(),
            	date: $("#date").val()
            },
            callback: function (res) {
                caller.gridView2.setData(res);
            }
        });
    },
    
    RELOAD_G3: function(caller, act, data) {
    	/** 편성영상예약 관리 **/
    	axboot.ajax({
            type: "GET",
            url: "/api/v1/SM0107G3S0",
            data: {
            	completeYn: $("#completeYn").val(),
            	date: $("#date").val()
            },
            callback: function (res) {
                caller.gridView3.setData(res);
            }
        });
    },
    
    RELOAD_G4: function(caller, act, data) {
    	/** 화면설정예약 관리 **/
    	axboot.ajax({
            type: "GET",
            url: "/api/v1/SM0107G4S0",
            data: {
            	completeYn: $("#completeYn").val(),
            	date: $("#date").val()
            },
            callback: function (res) {
                caller.gridView4.setData(res);
            }
        });
    },
    
    RELOAD_G5: function(caller, act, data) {
    	/** 전자노선도예약 관리 **/
    	axboot.ajax({
            type: "GET",
            url: "/api/v1/SM0107G5S0",
            data: {
            	completeYn: $("#completeYn").val(),
            	date: $("#date").val()
            },
            callback: function (res) {
                caller.gridView5.setData(res);
            }
        });
    },
    
    FIRMWARE_RSV_COMPLETE: function(caller, act, data) {
    	var list = caller.gridView0.getData("selected");
    	
    	axboot.promise()
	        .then(function (ok, fail, data) {
	        	axboot.ajax({
	            	type: "POST",
	                url: "/api/v1/SM0107G0U0",
	                data: JSON.stringify({
	                	list: list
	                }),
	                callback: function (res) {
	                    ok(res);
	                }
	            });
	        })
	        .then(function (ok, fail, data) {
	    		axToast.push(LANG("onreservation.complete"));
	    		ACTIONS.dispatch(ACTIONS.RELOAD_G0);
	        })
	        .catch(function () {
	
	        });
    },
    
    VOICE_RSV_COMPLETE: function(caller, act, data) {
    	var list = caller.gridView1.getData("selected");
    	
    	axboot.promise()
	        .then(function (ok, fail, data) {
	        	axboot.ajax({
	            	type: "POST",
	                url: "/api/v1/SM0107G1U0",
	                data: JSON.stringify({
	                	list: list
	                }),
	                callback: function (res) {
	                    ok(res);
	                }
	            });
	        })
	        .then(function (ok, fail, data) {
	    		axToast.push(LANG("onreservation.complete"));
	    		ACTIONS.dispatch(ACTIONS.RELOAD_G1);
	        })
	        .catch(function () {
	
	        });
    },
    
    DESTI_RSV_COMPLETE: function(caller, act, data) {
    	var list = caller.gridView2.getData("selected");

    	axboot.promise()
	        .then(function (ok, fail, data) {
	        	axboot.ajax({
	            	type: "POST",
	                url: "/api/v1/SM0107G2U0",
	                data: JSON.stringify({
	                	list: list
	                }),
	                callback: function (res) {
	                    ok(res);
	                }
	            });
	        })
	        .then(function (ok, fail, data) {
	    		axToast.push(LANG("onreservation.complete"));
	    		ACTIONS.dispatch(ACTIONS.RELOAD_G2);
	        })
	        .catch(function () {
	
	        });
    },
    
    VIDEO_RSV_COMPLETE: function(caller, act, data) {
    	var list = caller.gridView3.getData("selected");
    	
    	axboot.promise()
	        .then(function (ok, fail, data) {
	        	axboot.ajax({
	            	type: "POST",
	                url: "/api/v1/SM0107G3U0",
	                data: JSON.stringify({
	                	list: list
	                }),
	                callback: function (res) {
	                    ok(res);
	                }
	            });
	        })
	        .then(function (ok, fail, data) {
	    		axToast.push(LANG("onreservation.complete"));
	    		ACTIONS.dispatch(ACTIONS.RELOAD_G3);
	        })
	        .catch(function () {
	
	        });
    },
    
    SCREEN_RSV_COMPLETE: function(caller, act, data) {
    	var list = caller.gridView4.getData("selected");
    	
    	axboot.promise()
	        .then(function (ok, fail, data) {
	        	axboot.ajax({
	            	type: "POST",
	                url: "/api/v1/SM0107G4U0",
	                data: JSON.stringify({
	                	list: list
	                }),
	                callback: function (res) {
	                    ok(res);
	                }
	            });
	        })
	        .then(function (ok, fail, data) {
	    		axToast.push(LANG("onreservation.complete"));
	    		ACTIONS.dispatch(ACTIONS.RELOAD_G4);
	        })
	        .catch(function () {
	
	        });
    },
    

    ROUTER_RSV_COMPLETE: function(caller, act, data) {
    	var list = caller.gridView5.getData("selected");
    	
    	axboot.promise()
	        .then(function (ok, fail, data) {
	        	axboot.ajax({
	            	type: "POST",
	                url: "/api/v1/SM0107G5U0",
	                data: JSON.stringify({
	                	list: list
	                }),
	                callback: function (res) {
	                    ok(res);
	                }
	            });
	        })
	        .then(function (ok, fail, data) {
	    		axToast.push(LANG("onreservation.complete"));
	    		ACTIONS.dispatch(ACTIONS.RELOAD_G5);
	        })
	        .catch(function () {
	
	        });
    },
});
/********************************************************************************************************************/

/******************************************* 페이지 처음 로딩시 호출 ******************************************************/
fnObj.pageStart = function () {
	var _this = this;
	
    this.pageButtonView.initView();
    this.gridView0.initView();
    this.gridView1.initView();
    this.gridView2.initView();
    this.gridView3.initView();
    this.gridView4.initView();
    this.gridView5.initView();
    
    $("#date").val(new Date().yyyymmdd());
    $('[data-ax5picker="date"]').ax5picker({
        direction: "auto",
        content: {
            type: 'date',
            config: {
            	mode: "year",
            	selectMode: "month"
            },
            formatter: {
            	pattern: "date(month)"
            }
        }
    });
    
    ACTIONS.dispatch(ACTIONS.PAGE_INIT);
    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
    
    $("[data-ax5layout='tabView0']").ax5layout({
    	onOpenTab: function() {
    		ACTIONS.dispatch(ACTIONS.GRID_REFRESH_TAB_INDEX, {
    			tabIndex: this.activePanelIndex
    		});
    	}
    });
    
    $(document).on("change", "#completeYn", function(e) {
    	ACTIONS.dispatch(ACTIONS.GRID_REFRESH);
    });
};

fnObj.pageResize = function () {

};

/********************************************************************************************************************/


/******************************************** 공통 버튼 클릭 이벤트 ******************************************************/
fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "reservationComplete": function() {
            	ACTIONS.dispatch(ACTIONS.PAGE_RESERVATION_COMPLETE);
            },
            "search": function() {
            	ACTIONS.dispatch(ACTIONS.GRID_REFRESH);
            },
            "close": function() {
            	ACTIONS.dispatch(ACTIONS.PAGE_CLOSE);
            },
        });
    }
});
/********************************************************************************************************************/

//== view 시작

/** 차내장치 업데이트 관리 **/
fnObj.gridView0 = axboot.viewExtend(axboot.gridView, {
    page: {
        pageNumber: 0,
        pageSize: 10
    },
    initView: function () {
        var _this = this;

        this.target = axboot.gridBuilder({
        	showLineNumber: true,
            showRowSelector: true,
            multipleSelect: true,
        	lineNumberColumnWidth: 30,
            frozenColumnIndex: 5,
            target: $('[data-ax5grid="gridView0"]'),
            	 columns: [          		 
            		 {key: "vhcNo",			label: ADMIN("ax.admin.SM0107.vhc.no"),			width: 100,		align:"center",		sortable: true},
            		 {key: "completeYn",	label: ADMIN("ax.admin.reservation.status"),	width: 70,		align:"center",		formatter: function() {
            			 if(this.item.completeYn == "N")
            					return ADMIN("ax.admin.item.reservation");
     	       			else if(this.item.completeYn == "Y")
     	       				return ADMIN("ax.admin.item.reservation.complete")
     	       			else
     	       				return "";
            		 }},
            		 {key: "rsvDate",		label: ADMIN("ax.admin.reservation.date"),		width: 80,		align:"center",		sortable: true},
            		 {key: "proceRst",		label: ADMIN("ax.admin.SM0107.proce.rst"),		width: 80,		align:"center",		sortable: true},
            		 {key: "sendDate",		label: ADMIN("ax.admin.SM0107.send.date"),		width: 140,		align:"center"},
            		 {key: "mngId",			label: ADMIN("ax.admin.SM0107.mng.id"),		width: 150,		align:"center"},
                     {key: "maker",			label: ADMIN("ax.admin.SM0107.maker"),		width: 90,		align:"center"},
                     {key: "dvcKind",		label: ADMIN("ax.admin.SM0107.dvc.kind"),		width: 130,		align:"center"},
                     {key: "instLoc",		label: ADMIN("ax.admin.SM0107.inst.loc"),		width: 130,		align:"center"},
                 ],
            
            body: {
            	 mergeCells:["vhcNo"],
            	 onClick: function () {
                    this.self.select(this.dindex);
                }
            },
        });
    },
    getData: function (_type) {
        var list = [];
        var _list = this.target.getList(_type);

        if (_type == "modified" || _type == "deleted") {
            list = ax5.util.filter(_list, function () {
                return this.key;
            });
        } else {
            list = _list;
        }
        return list;
    },
    selectAll: function(flag) {
    	this.target.selectAll({selected: flag});
    }
});

/** 음성예약 관리 **/
fnObj.gridView1 = axboot.viewExtend(axboot.gridView, {
    page: {
        pageNumber: 0,
        pageSize: 10
    },
    
    initView: function () {
        var _this = this;
        
        this.target = axboot.gridBuilder({
        	lineNumberColumnWidth: 30,
        	frozenColumnIndex: 5,
            showRowSelector: true,
            multipleSelect : true,
            target: $('[data-ax5grid="gridView1"]'),
            columns: [
            	{key: "vhcNo",		label: ADMIN("ax.admin.SM0107.vhc.no"),			width: 100,		align: "center",	sortable: true},
            	{key: "completeYn",	label: ADMIN("ax.admin.reservation.status"),	width: 70,		align: "center",	formatter: function() {
            		if(this.item.completeYn == "N")
       					return ADMIN("ax.admin.item.reservation");
	       			else if(this.item.completeYn == "Y")
	       				return ADMIN("ax.admin.item.reservation.complete")
	       			else
	       				return "";
                }},
                {key: "rsvDate",	label: ADMIN("ax.admin.reservation.date"),	width: 80,		align:"center",		sortable: true},
                {key: "proceRst",	label: ADMIN("ax.admin.SM0107.proce.rst"),	width: 80,		align:"center",		sortable: true},
                {key: "sendDate",	label: ADMIN("ax.admin.SM0107.send.date"),	width: 140,		align:"center"},
                {key: "chasNo", 	label: ADMIN("ax.admin.BM0406G1.chasNo"),	width: 130},
                {key: "corpNm",		label: ADMIN("ax.admin.BM0406G1.corpId"),	width: 120,		align: "center"},
                {key: "areaNm",		label: ADMIN("ax.admin.BM0406G1.area"),		width: 100,		align: "center"},
                {key: "makerNm",	label: ADMIN("ax.admin.BM0406G1.maker"),	width: 80,		align: "center"},
                {key: "relsDate",	label: ADMIN("ax.admin.BM0406G1.relsDate"),	width: 80,		align: "center"},
                {key: "modelNm",	label: ADMIN("ax.admin.BM0406G1.modelNm"),	width: 100,		align: "center"},
                {key: "vhcKindNm",	label: ADMIN("ax.admin.BM0406G1.vhcKind"),	width: 80,		align: "center"},
                {key: "vhcTypeNm",	label: ADMIN("ax.admin.BM0406G1.vhcType"),	width: 70,		align: "center"},
                {key: "lfYnNm",		label: ADMIN("ax.admin.BM0406G1.lfYn"),		width: 120,		align: "center"},
                {key: "vhcFuelNm",	label: ADMIN("ax.admin.BM0406G1.vhcFuel"),	width: 50,		align: "center"},
                {key: "useYn",		label: ADMIN("ax.admin.BM0406G1.useYn"),	width: 70,		align: "center"},
                {key: "remark",		label: ADMIN("ax.admin.BM0406G1.remark"),	width: 100,		align: "center"},
            ],
            body: {
            	mergeCells:["vhcNo"],
                onClick: function () {
                    this.self.select(this.dindex);
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
});

/** 표출예약 관리 **/
fnObj.gridView2 = axboot.viewExtend(axboot.gridView, {
    page: {
        pageNumber: 0,
        pageSize: 10
    },
    initView: function () {
        var _this = this;

        this.target = axboot.gridBuilder({
        	lineNumberColumnWidth: 30,
        	frozenColumnIndex: 5,
            showLineNumber: true,
            showRowSelector: true,
            multipleSelect :true,
            target: $('[data-ax5grid="gridView2"]'),
            columns: [
            	{key: "vhcNo",			label: ADMIN("ax.admin.SM0107.vhc.no"),			width: 100,		align:"center",		sortable: true},
	       		{key: "completeYn",		label: ADMIN("ax.admin.reservation.status"),	width: 70,		align:"center",		formatter: function() {
	       			if(this.item.completeYn == "N")
	       				return ADMIN("ax.admin.item.reservation");
	       			else if(this.item.completeYn == "Y")
	       				return ADMIN("ax.admin.item.reservation.complete")
	       			else
	       				return "";
	       		}},
	       		{key: "rsvDate",	label: ADMIN("ax.admin.reservation.date"),	width: 80,		align:"center",		sortable: true},
	       		{key: "proceRst",	label: ADMIN("ax.admin.SM0107.proce.rst"),	width: 80,		align:"center",		sortable: true},
	       		{key: "sendDate",	label: ADMIN("ax.admin.SM0107.send.date"),	width: 140,		align:"center"},
	       		{key: "mngId",		label: ADMIN("ax.admin.SM0107.mng.id"),		width: 150,		align:"center"},
	       		{key: "maker",		label: ADMIN("ax.admin.SM0107.maker"),		width: 90,		align:"center"},
	       		{key: "dvcKind",	label: ADMIN("ax.admin.SM0107.dvc.kind"),	width: 130,		align:"center"},
                {key: "instLoc",	label: ADMIN("ax.admin.SM0107.inst.loc"),	width: 130,		align:"center"},
            ],
            body: {
            	mergeCells:["rsvId", "vhcNo"],
            	onClick: function () {
            		// 항목 클릭시 같은 차량 항목도 선택됨
            		for(var i = 0; i < this.list.length; i++) {
            			if(this.item.vhcNo == this.list[i].vhcNo)
            				this.self.select(this.list[i].__index);
            		}
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
});

/** 편성영상예약 관리 **/
fnObj.gridView3 = axboot.viewExtend(axboot.gridView, {
    page: {
        pageNumber: 0,
        pageSize: 10
    },
    
    initView: function () {
        var _this = this;
        
        this.target = axboot.gridBuilder({
        	lineNumberColumnWidth: 30,
        	frozenColumnIndex: 5,
            showLineNumber: true,
            showRowSelector: true,
            multipleSelect :true,
            target: $('[data-ax5grid="gridView3"]'),
            columns: [
            	{key: "vhcNo",			label: ADMIN("ax.admin.SM0107.vhc.no"),			width: 100,		align:"center",		sortable: true},
	       		{key: "completeYn",		label: ADMIN("ax.admin.reservation.status"),	width: 70,		align:"center",		formatter: function() {
	       			if(this.item.completeYn == "N")
	       				return ADMIN("ax.admin.item.reservation");
	       			else if(this.item.completeYn == "Y")
	       				return ADMIN("ax.admin.item.reservation.complete")
	       			else
	       				return "";
	       		}},
	       		{key: "rsvDate",		label: ADMIN("ax.admin.reservation.date"),		width: 80,		align:"center",		sortable: true},
	       		{key: "proceRst",		label: ADMIN("ax.admin.SM0107.proce.rst"),		width: 80,		align:"center",		sortable: true},
	       		{key: "sendDate",		label: ADMIN("ax.admin.SM0107.send.date"),		width: 140,		align:"center"},
	       		{key: "mngId",			label: ADMIN("ax.admin.SM0107.mng.id"),			width: 150,		align:"center"},
                {key: "makerNm",		label: ADMIN("ax.admin.SM0107.maker"),			width: 90,		align:"center"},
                {key: "dvcKindNm",		label: ADMIN("ax.admin.SM0107.dvc.kind"),		width: 130,		align:"center"},
                {key: "instLocNm",		label: ADMIN("ax.admin.SM0107.inst.loc"),		width: 130,		align:"center"},
            ],
            header:{
            	selector: false,
            },
            body: {
            	mergeCells:["vhcId", "vhcNo"],
                onClick: function () {
                    this.self.select(this.dindex);
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
});

/** 화면설정예약 관리 **/
fnObj.gridView4 = axboot.viewExtend(axboot.gridView, {
    page: {
        pageNumber: 0,
        pageSize: 10
    },
    
    initView: function () {
        var _this = this;
        
        this.target = axboot.gridBuilder({
        	lineNumberColumnWidth: 30,
        	frozenColumnIndex: 5,
            showLineNumber: true,
            showRowSelector: true,
            multipleSelect :true,
            target: $('[data-ax5grid="gridView4"]'),
            columns: [
            	{key: "vhcNo",			label: ADMIN("ax.admin.SM0107.vhc.no"),			width: 100,		align:"center",		sortable: true},
	       		{key: "completeYn",		label: ADMIN("ax.admin.reservation.status"),	width: 70,		align:"center",		formatter: function() {
	       			if(this.item.completeYn == "N")
	       				return ADMIN("ax.admin.item.reservation");
	       			else if(this.item.completeYn == "Y")
	       				return ADMIN("ax.admin.item.reservation.complete")
	       			else
	       				return "";
	       		}},
	       		{key: "rsvDate",		label: ADMIN("ax.admin.reservation.date"),		width: 80,		align:"center",		sortable: true},
	       		{key: "proceRst",		label: ADMIN("ax.admin.SM0107.proce.rst"),		width: 80,		align:"center",		sortable: true},
	       		{key: "sendDate",		label: ADMIN("ax.admin.SM0107.send.date"),		width: 140,		align:"center"},
	       		{key: "mngId",			label: ADMIN("ax.admin.SM0107.mng.id"),			width: 150,		align:"center"},
                {key: "makerNm",		label: ADMIN("ax.admin.SM0107.maker"),			width: 90,		align:"center"},
                {key: "dvcKindNm",		label: ADMIN("ax.admin.SM0107.dvc.kind"),		width: 130,		align:"center"},
                {key: "instLocNm",		label: ADMIN("ax.admin.SM0107.inst.loc"),		width: 130,		align:"center"},
            ],
            header:{
            	selector: false,
            },
            body: {
            	mergeCells:["vhcId", "vhcNo"],
                onClick: function () {
                    this.self.select(this.dindex);
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
    
});

/** 전자노선도 관리 **/
fnObj.gridView5 = axboot.viewExtend(axboot.gridView, {
    page: {
        pageNumber: 0,
        pageSize: 10
    },
    initView: function () {
        var _this = this;

        this.target = axboot.gridBuilder({
        	showLineNumber: true,
            showRowSelector: true,
            multipleSelect: true,
        	lineNumberColumnWidth: 30,
            frozenColumnIndex: 5,
            target: $('[data-ax5grid="gridView5"]'),
            	 columns: [          		 
            		 {key: "vhcNo",			label: ADMIN("ax.admin.SM0107.vhc.no"),			width: 100,		align:"center",		sortable: true},
            		 {key: "completeYn",	label: ADMIN("ax.admin.reservation.status"),	width: 70,		align:"center",		formatter: function() {
            			 if(this.item.completeYn == "N")
            					return ADMIN("ax.admin.item.reservation");
     	       			else if(this.item.completeYn == "Y")
     	       				return ADMIN("ax.admin.item.reservation.complete")
     	       			else
     	       				return "";
            		 }},
            		 {key: "rsvDate",		label: ADMIN("ax.admin.reservation.date"),		width: 80,		align:"center",		sortable: true},
            		 {key: "proceRst",		label: ADMIN("ax.admin.SM0107.proce.rst"),		width: 80,		align:"center",		sortable: true},
            		 {key: "sendDate",		label: ADMIN("ax.admin.SM0107.send.date"),		width: 140,		align:"center"},
            		 {key: "mngId",			label: ADMIN("ax.admin.SM0107.mng.id"),			width: 150,		align:"center"},
                     {key: "makerNm",		label: ADMIN("ax.admin.SM0107.maker"),			width: 90,		align:"center"},
                     {key: "dvcKindNm",		label: ADMIN("ax.admin.SM0107.dvc.kind"),		width: 130,		align:"center"},
                     {key: "instLocNm",		label: ADMIN("ax.admin.SM0107.inst.loc"),		width: 130,		align:"center"},
                 ],
            
            body: {
            	 mergeCells:["vhcNo"],
            	 onClick: function () {
                    this.self.select(this.dindex);
                }
            },
        });
    },
    getData: function (_type) {
        var list = [];
        var _list = this.target.getList(_type);

        if (_type == "modified" || _type == "deleted") {
            list = ax5.util.filter(_list, function () {
                return this.key;
            });
        } else {
            list = _list;
        }
        return list;
    },
    selectAll: function(flag) {
    	this.target.selectAll({selected: flag});
    }
});