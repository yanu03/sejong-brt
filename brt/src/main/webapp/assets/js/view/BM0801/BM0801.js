var fnObj = {}, CODE = {};

/***************************************** 전역 변수 초기화 ******************************************************/
isUpdate = false;
selectedRow = null;
/*************************************************************************************************************/

/***************************************** 이벤트 처리 코드 ******************************************************/
var ACTIONS = axboot.actionExtend(fnObj, {
	PAGE_SEARCH: function (caller, act, data) {
    	// 새로운 레코드 추가할 시 검색어 삭제
    	var dataFlag = typeof data !== "undefined";
    	var filter = $.extend({}, caller.searchView0.getData());
    	var resCount = 0;
    	var resOneCount = 0;
    	console.log(filter);
    	
        axboot.ajax({
            type: "GET",
            url: "/api/v1/BM0801G0S0",
            data: filter,
            callback: function (res) {
            	console.log(res);
            	if(res.list.length > 0){
            	  for(var i = 0; i < res.list.length; i++){
            		  if(res.list[i].vocId){
            			  res.list[i].promotionTy = "음성광고";
            			  res.list[i].promotionNm = res.list[i].vocNm;
            			  res.list[i].suppAmt = res.list[i].suppAmt + res.list[i].vatAmt;
            		  }
            	  }
            	  axboot.ajax({
            		  type:"GET",
            		  url:"/api/v1/BM0801G0S1",
            		  data: filter,
            		  callback:function(resOne){
            			  console.log(resOne);
            			  if(resOne.list.length != 0){
            				  resCount = res.list.length + resOne.list.length;
            				  for(var i = res.list.length; i<resCount; i++){
            					  console.log(resOneCount);
            					  res.list[i] = resOne.list[resOneCount];
            					  res.list[i].promotionTy = "영상광고";
            					  res.list[i].promotionNm = resOne.list[resOneCount].vdoNm;
            					  res.list[i].suppAmt = resOne.list[resOneCount].suppAmt + resOne.list[resOneCount].vatAmt;
            					  console.log(res);
            					  resOneCount ++;
            				  }
            			  }
            		  }
            	  })
            	}
            	console.log(res);
                caller.gridView0.setData(res);
	               
	                if(selectedRow != null) {
		                	caller.gridView0.selectRow(selectedRow.__index);
		                } else {
		                	caller.gridView0.selectFirstRow();
		                }
	            }
	        });

        return false;
    },
   
    PAGE_EXCEL: function(caller, act, data) {
    	if(selectedRow != null){   		
    		caller.gridView0.target.exportExcel(selectedRow.dvcId + "data.xls");
    	}else {
    		alert("장치 목록을 선택해주세요");
    	}
    },
    
    PAGE_CLOSE: function(caller, act, data) {
    	window.parent.fnObj.tabView.closeActiveTab();
    },
    
    // gridView0항목 클릭 이벤트
    ITEM_CLICK: function (caller, act, data) {
    	selectedRow = data;
    },
    
});
/********************************************************************************************************************/

/******************************************* 페이지 처음 로딩시 호출 ******************************************************/
fnObj.pageStart = function () {
	var _this = this;
	
    this.pageButtonView.initView();
    this.searchView0.initView();
    this.gridView0.initView();
    
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
            "close": function() {
            	ACTIONS.dispatch(ACTIONS.PAGE_CLOSE);
            },
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
        
        this.target.find('[data-ax5picker="date"]').ax5picker({
            direction: "auto",
            content: {
                type: 'date'
            }
        });
        
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
            target: $('[data-ax5grid="gridView0"]'),
            	 columns: [
            		 {key: "promotionNm", label: ADMIN("ax.admin.BM0801G0.promotionnm"), align:"center" , sortable: true, width: 120},
            		 {key: "promotionTy", label: ADMIN("ax.admin.BM0801G0.promotiontype"), align:"center" , width: 120},
                     {key: "custNm", label: ADMIN("ax.admin.BM0801G0.custnm"), align:"center" , sortable: true, width: 150},
                     {key: "playStDate", label: ADMIN("ax.admin.BM0801G0.sd"), align:"right", sortable: true, width: 120},
                     {key: "playEdDate", label: ADMIN("ax.admin.BM0801G0.ed"), align:"right", sortable: true, width: 120},
                     {key: "playTm", label: ADMIN("ax.admin.BM0801G0.exposure.time"), align:"right", width: 100},
                     {key: "suppAmt", label: ADMIN("ax.admin.BM0801G0.suppamt"), formatter:"money" ,align:"right", width: 100},
                     {key: "remark", label: ADMIN("ax.admin.BM0801G0.remark"), width: 500},
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
    		if(this.target.list[i].dvcId == id) {
    			this.selectRow(i);
    			break;
    		}
    	}
    	
    	if(i == length) {
    		isUpdate = false;
    	}
    },
    selectAll: function(flag) {
    	this.target.selectAll({selected: flag});
    }
});