var fnObj = {}, CODE = {};

/***************************************** 전역 변수 초기화 ******************************************************/
isUpdate = false;
selectedRow = null;
var a;
/*************************************************************************************************************/

/***************************************** 이벤트 처리 코드 ******************************************************/
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
    	// 새로운 레코드 추가할 시 검색어 삭제
    	var dataFlag = typeof data !== "undefined";
    	var filter = $.extend({}, caller.searchView0.getData());
    	var conStat = $('#conStat').val();
    	
    	var data = {filter : filter
    			, conStat : conStat};
    	
        axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0301G0S0",
            data: data,
            callback: function (res) {
                caller.gridView0.setData(res);
                
                if(res.list.length == 0) {
                	isUpdate = false;
	                caller.formView0.clear();
	                caller.formView0.disable();
                } else {
                	caller.formView0.enable();
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
    	caller.gridView0.target.exportExcel("계약 목록_" + new Date().yyyymmdd() + ".xls");
    },
    
    PAGE_NEW: function (caller, act, data) {
    	isUpdate = false;
    	caller.gridView0.selectAll(false);
        caller.formView0.clear();
        caller.formView0.enable();
        caller.formView0.validate(true);
    },
    
    /*
    PAGE_DELETE: function(caller, act, data) {
    	var grid = caller.gridView0.target;
    	var confirmYn = $('#confirmYn').val();
    	var vocCount = 0;
    	var vdoCount = 0;

    	
    	if(typeof grid.selectedDataIndexs[0] === "undefined") {
    		axDialog.alert(LANG("ax.script.alert.requireselect"));
    		return false;
    	}
    	
    	axDialog.confirm({
            msg: LANG("ax.script.deleteconfirm")
        }, function() {
        	if(confirmYn == "미확정") {  		
        	  if (this.key == "ok") {
        		  axboot.promise()
        		  .then(function (ok, fail, data) {
        			 axboot.ajax({
        		    		type: "GET",
        		    		url: "/api/v1/BM0301G0S1",
        		    		data:{conId : selectedRow.conId},
        		    		callback: function (res) {
        		    			if(res.list.length != 0){
        		    				if(res.list[0].vocId != "0" && res.list[0].vdoId != "0"){
        		    					for(var i = 0; i<res.list.length; i++){
        		    						if(res.list[i].vocId != "0"){
        		    							vocCount++;
        		    						}else if(res.list[i].vdoId != "0"){
        		    							vdoCount++;
        		    						}
        		    					}
        		    					axDialog.alert("음성광고:"+vocCount+"건, 영상광고:"+vdoCount+"건이 계약되어있어 삭제가 불가능합니다.");
        		    				}
        		    				else{
        		    					axboot.ajax({
        		    						type: "POST",
        		    						url: "/api/v1/BM0301G0D0",
        		    						data: JSON.stringify(grid.list[grid.selectedDataIndexs[0]]),
        		    						callback: function (res) {
        		    							ok(res);
        		    						}
        		    					});
        		    				}
        		    		  }
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
        }else{
        	axDialog.alert({
                msg: LANG("ax.script.contractdelete")
            });
        }
        });
    	
    },
    */
    /**delete 변경**/
    //TODO: 삭제 전 확인해서 count가 있으면 안지울거고, count가 0이면 지울것임
    //지금은 좀 뭔가 이상해
    PAGE_DELETE: function(caller, act, data) {
    	var grid = caller.gridView0.target;
    	var confirmYn = $('#confirmYn').val();
    	var vocCount = 0;
    	var vdoCount = 0;

    	
    	if(typeof grid.selectedDataIndexs[0] === "undefined") {
    		axDialog.alert(LANG("ax.script.alert.requireselect"));
    		return false;
    	}
    	
    	axDialog.confirm({
            msg: LANG("ax.script.deleteconfirm")
        }, function() {
        	if(confirmYn == "미확정") {  		
        	  if (this.key == "ok") {
        		  axboot.promise()
        		  .then(function (ok, fail, data) {
        			 axboot.ajax({
        		    		type: "GET",
        		    		url: "/api/v1/BM0301G0S1",
        		    		data:{conId : selectedRow.conId},
        		    		callback: function (res) {
        		    			if(res.list.length != 0){
        		    				if(res.list[0].vocId != "0" && res.list[0].vdoId != "0"){
        		    					for(var i = 0; i<res.list.length; i++){
        		    						if(res.list[i].vocId != "0"){
        		    							vocCount++;
        		    						}else if(res.list[i].vdoId != "0"){
        		    							vdoCount++;
        		    						}
        		    					}
        		    					axDialog.alert("음성광고:"+vocCount+"건, 영상광고:"+vdoCount+"건이 계약되어있어 삭제가 불가능합니다.");
        		    				}
        		    				else{
        		    					axboot.ajax({
        		    						type: "POST",
        		    						url: "/api/v1/BM0301G0D0",
        		    						data: JSON.stringify(grid.list[grid.selectedDataIndexs[0]]),
        		    						callback: function (res) {
        		    							ok(res);
        		    						}
        		    					});
        		    				}
        		    		  }
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
        }else{
        	axDialog.alert({
                msg: LANG("ax.script.contractdelete")
            });
        }
        });
    	
    },
    /**delete end**/
    
    
    
    PAGE_SAVE: function (caller, act, data) {
    	 if (caller.formView0.validate()) {
             var formData = caller.formView0.getData(); 
             axboot.promise()
                 .then(function (ok, fail, data) {
                     axboot.ajax({
                         type: "POST",
                         url: "/api/v1/BM0301F0I0",
                         data: JSON.stringify(formData),
                         callback: function (res) {
                             ok(res);
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
         }
    },
    
    PAGE_UPDATE: function(caller, act, data) {
    	isUpdate = false;   	
    	var confirmYn = $('#confirmYn').val();
    		if(confirmYn == "미확정"){
    			if (caller.formView0.validate()) {
    				var formData = caller.formView0.getData();
    				formData["confirmYn"] = "N";
    				
    				axboot.promise()
    				.then(function (ok, fail, data) {
    					axboot.ajax({
    						type: "POST",
    						url: "/api/v1/BM0301F0U0",
    						data: JSON.stringify(formData),
    						callback: function (res) {
    							ok(res);
    						}
    					});
    				})
    				.then(function (ok, fail, data) {
    					axToast.push(LANG("onsave"));
    					ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
    					isUpdate = true;
    				})
    				.catch(function () {
    					
    				});
    			}
    		}else{
    			axDialog.alert({
	                msg: LANG("ax.script.contractupdate")
	            });
    		}  	
    },
    
    // 확정
    PAGE_CONFIRMYN : function (caller, act, data) {
    	isUpdate = false; 
    	var confirmYn = $('#confirmYn').val();
    	
    	if(confirmYn == "미확정"){
	    	axDialog.confirm({
	    		msg: LANG("ax.script.contractconfirm")
	    	}, function() {
	    		if(this.key == "ok"){
	    			
	    			//2차비밀번호 modal
		    			axboot.modal.open({
		    	            modalType: "SECOND_PASSWORD",
		    	            param: "",
		    	            callback: function (data) {
		    	            	if (caller.formView0.validate()) {
		    	            		var formData = caller.formView0.getData();    					
		    	            		axboot.promise()
		    	            		.then(function (ok, fail, data) {
		    	            			axboot.ajax({
		    	            				type: "POST",
		    	            				url: "/api/v1/BM0301F0U1",
		    	            				data: JSON.stringify(formData),
		    	            				callback: function (res) {
		    	            					ok(res);
		    	            				}
		    	            			});
		    	            		})
		    	            		.then(function (ok, fail, data) {
		    	            			axToast.push(LANG("onsave"));
		    	            			ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
		    	            			isUpdate = true;
		    	            		})
		    	            		.catch(function () {   						
		    	            		});
		    	            	}
		    	                this.close();
		    	            }
		    	        });
	    		}
			});
	    }else{
	    	//확정된 변경계약이 있는 계약은 확정해제 하지 못합니다.
	    	
	    	axDialog.confirm({
	    		msg: LANG("ax.script.contractconfirmn")
	    	}, function(){
	    		if(this.key == "ok"){
	    			if (caller.formView0.validate()){
	    				var formData = caller.formView0.getData();
	    				//2차비밀번호 modal
	    				axboot.modal.open({
		    	            modalType: "SECOND_PASSWORD",
		    	            param: "",
		    	            callback: function (data) {
		    	            	if (caller.formView0.validate()) {
		    	            		var formData = caller.formView0.getData();    					
		    	            		axboot.promise()
		    	    				.then(function (ok, fail, data) {
		    	    				axboot.ajax({
		    							type: "POST",
		    							url: "/api/v1/BM0301F0U2",
		    							data: JSON.stringify(formData),
		    							callback: function (res) {
		    								ok(res);
		    								ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
		    								isUpdate = true;
		    							}
		    						});
		    	    				})
		    	            		.then(function (ok, fail, data) {
		    	            			axToast.push(LANG("onsave"));
		    	            			ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
		    	            			isUpdate = true;
		    	            		})
		    	            		.catch(function () {   						
		    	            		});
		    	            	}
		    	                this.close();
		    	            }
		    	        });
	    			}
	    		}
	    	}
	    	);
	    }				   
    },
    
    // 탭닫기
    PAGE_CLOSE: function(caller, act, data) {
    	window.parent.fnObj.tabView.closeActiveTab();
    },
    
    OPEN_BM0102_MODAL: function(caller, act, data) {
    	axboot.modal.open({
            modalType: "BM0102",
            param: "",
            callback: function (data) {
            	// 운수사, 거래처 등을 선택한 후 이벤트 ex) input에 값을 넣어 주는 등의 로직을 작성하면됨
            	caller.formView0.model.set("custId", data.custId);
            	caller.formView0.model.set("custNm", data.custNm);
                this.close();
            }
        });
    },
    
    ITEM_CLICK: function (caller, act, data) {
    	isUpdate = true;
    	selectedRow = data;
    	if(selectedRow.confirmYn == "확정"){
    		caller.formView0.disable();

    	}else{
    		caller.formView0.enable();
    	}
        caller.formView0.setData(data);
    }
});
/********************************************************************************************************************/

/******************************************* 페이지 처음 로딩시 호출 ******************************************************/
fnObj.pageStart = function () {
	var _this = this;
	
    this.pageButtonView.initView();
    this.searchView0.initView();
    this.gridView0.initView();
    this.formView0.initView();
    onChangeFunc();
    
    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
};

fnObj.pageResize = function () {

};

/********************************************************************************************************************/


/******************************************** 공통 버튼 클릭 이벤트 ******************************************************/
fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "search": function () {
            	selectedRow = null;
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
            },
            
            "confirmyn" : function(){     	 
            	 ACTIONS.dispatch(ACTIONS.PAGE_CONFIRMYN);
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
            filter: this.filter.val()
        }
    },
    clear: function() {
    	this.filter.val("");
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
        	lineNumberColumnWidth: 30,
            frozenColumnIndex: 1,
            target: $('[data-ax5grid="gridView0"]'),
            header: {align: 'center'},
            columns: [
            	{key: "confirmYn",	label: ADMIN("ax.admin.BM0301F0.confirmyn"),sortable: true, align: "center", width: 70 , styleClass:function(){return (this.item.confirmYn === "확정") ? "grid-cell-red":"grid-cell-blue" }},
            	{key: "conId", 		label: ADMIN("ax.admin.BM0301F0.conid"), 	align: "center", sortable: true, width: 100},
            	{key: "conNo",		label: ADMIN("ax.admin.BM0301F0.conno"),	sortable: true, align: "center", width: 120},                
                {key: "conNm",		label: ADMIN("ax.admin.BM0301F0.connm"),    width: 120},
                {key: "conFstDate", label: ADMIN("ax.admin.BM0301F0.confd"),	sortable: true, align: "center", type: "date" , width: 120},
                {key: "conStDate",	label: ADMIN("ax.admin.BM0301F0.consd"),	sortable: true, align: "center", type: "date" , width: 120},
                {key: "conEdDate",	label: ADMIN("ax.admin.BM0301F0.coned"),	sortable: true, align: "center", type: "date" , width: 120},
                {key: "custNm",		label: ADMIN("ax.admin.BM0102F0.cust.name"),sortable: true, width: 120},
                {key: "suppAmt",	label: ADMIN("ax.admin.BM0301F0.suppamt"),	align: "right", width: 120, formatter:"money"},
                {key: "vatAmt",		label: ADMIN("ax.admin.BM0301F0.vatamt"),	align: "right", width: 120, formatter:"money"},
                {key: "remark",		label: ADMIN("ax.admin.BM0301F0.remark"),	width: 200},
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                    ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.item);
                }
            },
            onPageChange: function (pageNumber) {
                _this.setPageData({pageNumber: pageNumber});
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            }
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
    		if(this.target.list[i].conId == id) {
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

        axboot.buttonClick(this, "data-form-view-0-btn", {
            "selectBM0102": function() {
            	ACTIONS.dispatch(ACTIONS.OPEN_BM0102_MODAL);
            }
        });
    },
    initEvent: function () {
        
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
		this.target.find('[data-ax-path][data-key!=true]').each(function(index, element) {
			$(element).attr("readonly", false);
			$(element).attr("disabled", false);
			$('#selectButton').attr("disabled", false);
			$('.input-group-addon').show();
		});
	},
	disable: function() {
		this.target.find('[data-ax-path][data-key!=true]').each(function(index, element) {
			$(element).attr("readonly", true);
			$(element).attr("disabled", true);
			$('#selectButton').attr("disabled", true);
			$('.input-group-addon').hide();
			
		});
    },
    clear: function () {
        this.model.setModel(this.getDefaultData());
        this.target.find('[data-ax-path="key"]').removeAttr("readonly");
    }
});

/** 추가 함수 **/
/** onChange시 동작 함수 모음 **/
function onChangeFunc(){
	selectGrid0();
}

/** Grid0 셀렉트박스 변경 시 Grid0 그리드 표출 변경 **/
function selectGrid0(){
	$('#conStat').on('change', function(){
		ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
	});
}

