var fnObj = {}, CODE = {};

/***************************************** 전역 변수 초기화 ******************************************************/
/*************************************************************************************************************/

/***************************************** 이벤트 처리 코드 ******************************************************/
var ACTIONS = axboot.actionExtend(fnObj, {
	PAGE_SEARCH: function (caller, act, data) {
    	ACTIONS.dispatch(ACTIONS.RELOAD_G0);
    	ACTIONS.dispatch(ACTIONS.RELOAD_G1);
    	ACTIONS.dispatch(ACTIONS.RELOAD_G2);
    	ACTIONS.dispatch(ACTIONS.RELOAD_G3);
    	ACTIONS.dispatch(ACTIONS.RELOAD_G4);
    	ACTIONS.dispatch(ACTIONS.RELOAD_G5);
        return false;
    },
    
    PAGE_CLOSE: function(caller, act, data) {
    	window.parent.fnObj.tabView.closeActiveTab();
    },
    
    RELOAD_G0: function(caller, act, data) {
    	/** 차내장치 업데이트 **/
    	axboot.ajax({
            type: "GET",
            url: "/api/v1/SM0107G0S0",
            data: null,
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
            data: null,
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
            data: null,
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
            data: null,
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
            data: null,
            callback: function (res) {
                caller.gridView4.setData(res);
            }
        });
    },
    
    RELOAD_G5: function(caller, act, data) {
    	/** 화면설정예약 관리 **/
    	axboot.ajax({
            type: "GET",
            url: "/api/v1/SM0107G5S0",
            data: null,
            callback: function (res) {
                caller.gridView5.setData(res);
            }
        });
    },
    
    PAGE_RESERVATION_COMPLETE: function(caller, act, data) {
    	var tabId = $("[data-tab-active='true']").attr("data-tab-id");
    	
    	switch(tabId) {
    		case "firmwareUpdate":
    			ACTIONS.dispatch(ACTIONS.FIRMWARE_RSV_COMPLETE);
    			break;
    		case "voiceReservation":
    			ACTIONS.dispatch(ACTIONS.VOICE_RSV_COMPLETE);
    			break;
    		case "destiReservation":
    			ACTIONS.dispatch(ACTIONS.DESTI_RSV_COMPLETE);
    			break;
    		case "videoReservation":
    			ACTIONS.dispatch(ACTIONS.VIDEO_RSV_COMPLETE);
    			break;
    		case "screenReservation":
    			ACTIONS.dispatch(ACTIONS.SCREEN_RSV_COMPLETE);
    			break;
    		case "routerReservation":
    			ACTIONS.dispatch(ACTIONS.ROUTER_RSV_COMPLETE);
    			break;
    	}
    },
    
    FIRMWARE_RSV_COMPLETE: function(caller, act, data) {
    	var list = caller.gridView0.getData("selected");
    	
    	if(list.length == 0) {
    		axDialog.alert(LANG("alert.requireselect"));
    		return false;
    	}
    	
    	axDialog.confirm({
            msg: LANG("onreservation.complete.confirm")
        }, function() {
            if (this.key == "ok") {
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
            }
        });
    },
    
    VOICE_RSV_COMPLETE: function(caller, act, data) {
    	var list = caller.gridView1.getData("selected");
    	
    	if(list.length == 0) {
    		axDialog.alert(ADMIN("ax.script.alert.requireselect"));
    		return false;
    	}
    	
    	axDialog.confirm({
            msg: LANG("onreservation.complete.confirm")
        }, function() {
            if (this.key == "ok") {
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
            }
        });
    },
    
    DESTI_RSV_COMPLETE: function(caller, act, data) {
    	var list = caller.gridView2.getData("selected");
    	
    	if(list.length == 0) {
    		axDialog.alert(ADMIN("ax.script.alert.requireselect"));
    		return false;
    	}
    	
    	axDialog.confirm({
            msg: LANG("onreservation.complete.confirm")
        }, function() {
            if (this.key == "ok") {
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
            }
        });
    },
    
    VIDEO_RSV_COMPLETE: function(caller, act, data) {
    	var list = caller.gridView3.getData("selected");
    	
    	if(list.length == 0) {
    		axDialog.alert(ADMIN("ax.script.alert.requireselect"));
    		return false;
    	}
    	
    	axDialog.confirm({
            msg: LANG("onreservation.complete.confirm")
        }, function() {
            if (this.key == "ok") {
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
            }
        });
    },
    
    SCREEN_RSV_COMPLETE: function(caller, act, data) {
    	var list = caller.gridView4.getData("selected");
    	
    	if(list.length == 0) {
    		axDialog.alert(ADMIN("ax.script.alert.requireselect"));
    		return false;
    	}
    	
    	axDialog.confirm({
            msg: LANG("onreservation.complete.confirm")
        }, function() {
            if (this.key == "ok") {
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
            }
        });
    },
    

    ROUTER_RSV_COMPLETE: function(caller, act, data) {
    	var list = caller.gridView5.getData("selected");
    	
    	if(list.length == 0) {
    		axDialog.alert(ADMIN("ax.script.alert.requireselect"));
    		return false;
    	}
    	
    	axDialog.confirm({
            msg: LANG("onreservation.complete.confirm")
        }, function() {
            if (this.key == "ok") {
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
            }
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
    
    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
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
            frozenColumnIndex: 3,
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
            		 {key: "mngId",			label: ADMIN("ax.admin.SM0107.mng.id"),		width: 150,		align:"center"},
                     {key: "maker",			label: ADMIN("ax.admin.SM0107.maker"),		width: 90,		align:"center"},
                     {key: "dvcKind",		label: ADMIN("ax.admin.SM0107.dvc.kind"),		width: 130,		align:"center"},
                     {key: "modelNm",		label: ADMIN("ax.admin.SM0107.model.nm"),		width: 130,		align:"center"},
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
        	frozenColumnIndex: 3,
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
                {key: "chasNo", 	label: ADMIN("ax.admin.BM0406G1.chasNo"),	width: 130},
                {key: "corpNm",		label: ADMIN("ax.admin.BM0406G1.corpId"),	width: 120,		align: "center"},
                {key: "areaNm",		label: ADMIN("ax.admin.BM0406G1.area"),		width: 100,		align: "center"},
                {key: "makerNm",	label: ADMIN("ax.admin.BM0406G1.maker"),	width: 80,		align: "center"},
                {key: "relsDate",	label: ADMIN("ax.admin.BM0406G1.relsDate"),	width: 80,		align: "center"},
                {key: "modelNm",	label: ADMIN("ax.admin.BM0406G1.modelNm"),	width: 100,		align: "center"},
                {key: "vhcKindNm",	label: ADMIN("ax.admin.BM0406G1.vhcKind"),	width: 80,		align: "center"},
                {key: "vhcTypeNm",	label: ADMIN("ax.admin.BM0406G1.vhcType"),	width: 70,		align: "center"},
                {key: "lfYnNm",		label: ADMIN("ax.admin.BM0406G1.lfYn"),		width: 70,		align: "center"},
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
        	frozenColumnIndex: 3,
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
                {key: "chasNo", 	label: ADMIN("ax.admin.BM0406G1.chasNo"),	width: 130},
                {key: "corpNm",		label: ADMIN("ax.admin.BM0406G1.corpId"),	width: 120,		align: "center"},
                {key: "areaNm",		label: ADMIN("ax.admin.BM0406G1.area"),		width: 100,		align: "center"},
                {key: "makerNm",	label: ADMIN("ax.admin.BM0406G1.maker"),	width: 80,		align: "center"},
                {key: "relsDate",	label: ADMIN("ax.admin.BM0406G1.relsDate"),	width: 80,		align: "center"},
                {key: "modelNm",	label: ADMIN("ax.admin.BM0406G1.modelNm"),	width: 100,		align: "center"},
                {key: "vhcKindNm",	label: ADMIN("ax.admin.BM0406G1.vhcKind"),	width: 80,		align: "center"},
                {key: "vhcTypeNm",	label: ADMIN("ax.admin.BM0406G1.vhcType"),	width: 70,		align: "center"},
                {key: "lfYnNm",		label: ADMIN("ax.admin.BM0406G1.lfYn"),		width: 70,		align: "center"},
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
        	frozenColumnIndex: 3,
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
	       		{key: "mngId",			label: ADMIN("ax.admin.SM0107.mng.id"),			width: 150,		align:"center"},
                {key: "makerNm",		label: ADMIN("ax.admin.SM0107.maker"),			width: 90,		align:"center"},
                {key: "dvcKindNm",		label: ADMIN("ax.admin.SM0107.dvc.kind"),		width: 130,		align:"center"},
                {key: "modelNm",		label: ADMIN("ax.admin.SM0107.model.nm"),		width: 130,		align:"center"},
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
        	frozenColumnIndex: 3,
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
	       		{key: "mngId",			label: ADMIN("ax.admin.SM0107.mng.id"),			width: 150,		align:"center"},
                {key: "makerNm",		label: ADMIN("ax.admin.SM0107.maker"),			width: 90,		align:"center"},
                {key: "dvcKindNm",		label: ADMIN("ax.admin.SM0107.dvc.kind"),		width: 130,		align:"center"},
                {key: "modelNm",		label: ADMIN("ax.admin.SM0107.model.nm"),		width: 130,		align:"center"},
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

/** 차내장치 업데이트 관리 **/
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
            frozenColumnIndex: 3,
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
            		 {key: "mngId",			label: ADMIN("ax.admin.SM0107.mng.id"),		width: 150,		align:"center"},
                     {key: "makerNm",			label: ADMIN("ax.admin.SM0107.maker"),		width: 90,		align:"center"},
                     {key: "dvcKindNm",		label: ADMIN("ax.admin.SM0107.dvc.kind"),		width: 130,		align:"center"},
                     {key: "modelNm",		label: ADMIN("ax.admin.SM0107.model.nm"),		width: 130,		align:"center"},
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