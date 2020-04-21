var fnObj = {}, CODE = {};

/***************************************** 전역 변수 초기화 ******************************************************/
isUpdate = false;
selectedRow = null;
selectedRowG1 = null;
selectedRowG2 = null;
/*************************************************************************************************************/

/***************************************** 이벤트 처리 코드 ******************************************************/
var ACTIONS = axboot.actionExtend(fnObj, {
	PAGE_SEARCH: function (caller, act, data) {
		// 새로운 레코드 추가할 시 검색어 삭제
		var dataFlag = typeof data !== "undefined";
		//var filter = $.extend({}, caller.searchView0.getData());
		var filter = caller.searchView0.getData().filter;
		var conEnd = $('#conEnd').val();
		var data = {
				filter : filter,
				conEd : conEnd
		};
		axboot.ajax({
			type: "GET",
			url: "/api/v1/BM0302G0S0",
			data: data,
			callback: function (res) {
				caller.gridView0.setData(res);

				if(res.list.length == 0) {
					isUpdate = false;
					caller.formView0.clear();
					caller.formView0.disable();
					caller.gridView1.clear();

				} else {
					caller.formView0.enable();
					if(selectedRow != null) {
						caller.gridView0.selectRow(selectedRow.__index);
					} else {
						caller.gridView0.selectFirstRow();
					}
				}
			}
		});

		return false;
	},

	PAGE_EXCEL: function(caller, act, data) {
		caller.gridView1.target.exportExcel("변경계약 목록_" + new Date().yyyymmdd() + ".xls");
	},

	PAGE_NEW: function (caller, act, data) {
		isUpdate = false;    	
		var formData = caller.gridView1.getData();

		var data = {
				conId : selectedRow.conId,
				confirmYn : selectedRow.confirmYn,
				conStDate : selectedRow.conStDate
				,suppAmt : selectedRow.suppAmt
				,vatAmt : selectedRow.vatAmt
		};
		
		if(formData.length != 0){
			for(var i =0; i< formData.length; i++){
				if(formData[i].confirmYn == "미확정"){
					axDialog.alert("확정되지 않은 계약이 있으면 추가하실수 없습니다.");
					break;
				}else{
					if(formData["altDiv"] == "종료"){
						axDialog.alert({
							msg: LANG("ax.script.alert.altDelete")
						});
					}else{
						caller.gridView1.selectAll(false);
						caller.formView0.clear();
						caller.formView0.setData(data);
						caller.formView0.enable();
						//caller.formView0.validate(true);       		
					}
				}
			}
		}else{
			caller.gridView1.selectAll(false);
			caller.formView0.clear();
			caller.formView0.setData(data);
			caller.formView0.enable();
			//caller.formView0.validate(true);
			//validate가 왜 필요한지....?? 추가버튼 클릭시 변경계약시작일이 나왔다사라지는문제 생김
		}
	},

	PAGE_DELETE: function(caller, act, data) {
		var grid = caller.gridView0.target;
		var confirmYn = $('#confirmYn').val();

		if(typeof grid.selectedDataIndexs[0] === "undefined") {
			axDialog.alert(LANG("ax.script.alert.requireselect"));
			return false;
		}

		if(confirmYn == "미확정") {
			axDialog.confirm({
				msg: LANG("ax.script.deleteconfirm")
			}, function() {
				if (this.key == "ok") {
					axboot.promise()
					.then(function (ok, fail, data) {
						axboot.ajax({
							type: "POST",
							url: "/api/v1/BM0302G1D0",
							data: JSON.stringify({conId : selectedRow.conId , seq : selectedRowG1.seq}),
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
		}else{
			axDialog.alert({
				msg: LANG("ax.script.contractdelete")
			});
			console.log("else문");
		}
	},

	PAGE_SAVE: function (caller, act, data) {
		if (caller.formView0.validate()) {
			var formData = caller.formView0.getData();
			formData["conId"] = selectedRow.conId;
			formData["conNm"] = selectedRow.conNm;
			formData["conNo"] = selectedRow.conNo;

			axboot.promise()
			.then(function (ok, fail, data) {
				axboot.ajax({
					type: "POST",
					url: "/api/v1/BM0302F0S0",
					data: JSON.stringify(formData),
					callback: function (res) {
						ok(res);
					}
				});
			})          
			.then(function (ok, fail, data) {
				if(data.message == "true"){
					axboot.promise()
					.then(function(ok, fail , data) {
						axboot.ajax({
							type: "POST",
							url: "/api/v1/BM0302F0I0",
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
				}else{

				}
			})
			.catch(function() {

			});
		}
	},

	PAGE_UPDATE: function(caller, act, data) {
		isUpdate = false;   	
		var confirmYn = $('#confirmYn').val();
		if(confirmYn == "미확정"){
			confirmYn = "N";
		}
		if(confirmYn == "N"){
			if (caller.formView0.validate()) {
				var formData = caller.formView0.getData();
				formData["conNm"] = selectedRow.conNm;
				formData["confirmYn"] = "N";
				formData["conNo"] = selectedRow.conNo;

				axboot.promise()
				.then(function (ok, fail, data) {
					axboot.ajax({
						type: "POST",
						url: "/api/v1/BM0302F0U0",
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

	//////////////////////////////// 확정

	PAGE_CONFIRMYN : function (caller, act, data) {
		isUpdate = false; 
		var confirmYn = $('#confirmYn').val();
		var gridData = caller.gridView1.getData();


		if(gridData[0].seq == selectedRowG1.seq){
			if(confirmYn == "미확정"){
				axDialog.alert("계약기간을 변경하실 경우 , 영상 , 음성 재생시간을 재편성해주시기 바랍니다.");
				axDialog.confirm({
					msg: LANG("ax.script.contractconfirm")
				}, function() {
					if(this.key == "ok"){
						if (caller.formView0.validate()) {

							//2차비밀번호 modal
							axboot.modal.open({
								modalType: "SECOND_PASSWORD",
								param: "",
								callback: function (data) {
									this.close();
									axboot.promise()
									.then(function (ok, fail, data) {
										axboot.ajax({
											type: "POST",
											url: "/api/v1/BM0302F0U1",
											data: JSON.stringify({seq : selectedRowG1.seq}),
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
							});
						}	    			
					}
				});
			}else{
				axDialog.confirm({
					msg: LANG("ax.script.contractconfirmn")
				}, function(){
					if(this.key == "ok"){
						if (caller.formView0.validate()){
							//2차비밀번호 modal
							axboot.modal.open({
								modalType: "SECOND_PASSWORD",
								param: "",
								callback: function (data) {
									this.close();
									axboot.promise()
									.then(function (ok, fail, data) {
										axboot.ajax({
											type: "POST",
											url: "/api/v1/BM0302F0U2",
											data: JSON.stringify({seq : selectedRowG1.seq}),
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
							});
						}
					}
				}
				);
			}
		}else{
			axDialog.alert("지난 변경계약은 확정,확정해제가 되지않습니다.");
		}
	},

	// 탭닫기
	PAGE_CLOSE: function(caller, act, data) {
		window.parent.fnObj.tabView.closeActiveTab();
	},

	// gridView0항목 클릭 이벤트
	ITEM_CLICK: function (caller, act, data) {
		selectedRow = data;
		ACTIONS.dispatch(ACTIONS.RELOAD_G1);
	},

	// gridView1 항목 클릭 이벤트
	ITEM_CLICK_G1: function(caller, act, data) {
		isUpdate = true;
		selectedRowG1 = data;
		if(selectedRowG1 == null){
			selectedRow = data;
		}
		caller.formView0.setData(data);
		if(selectedRowG1.confirmYn == "확정" || selectedRowG1.altDiv == "종료"){
			caller.formView0.disable();
		}else{
			caller.formView0.enable();
		}
	},

	RELOAD_G1: function(caller, act, data) {
		var dataFlag = typeof data !== "undefined";

		if(selectedRow != null){
			axboot.ajax({
				type: "GET",
				url: "/api/v1/BM0302G1S0",
				data: {conId: selectedRow.conId},
				callback: function (res) {
					if(res.list[0].altDiv != null){
						caller.gridView1.setData(res);            			
					} 

					if(res.list[0].altDiv == null) {
						isUpdate = false;
						if(selectedRow.confirmYn == "Y"){
							selectedRow.confirmYn = "확정";
						}
						caller.formView0.setData(selectedRow);
						caller.formView0.disable();
						caller.gridView1.clear();

					} else {
						if(dataFlag) {
							caller.gridView1.selectIdRow(data);
						} else {
							if(selectedRowG1 != null) {
								caller.gridView1.selectRow(selectedRowG1.__index);
							} else {
								caller.gridView1.selectFirstRow();
							}
						}
					}

				}
			});
		}else{
			caller.gridView0.clear();
		}
	}
});
/********************************************************************************************************************/

/******************************************* 페이지 처음 로딩시 호출 ******************************************************/
fnObj.pageStart = function () {
	var _this = this;

	this.pageButtonView.initView();
	this.searchView0.initView();
	this.gridView0.initView();
	this.gridView1.initView();
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
			lineNumberColumnWidth: 30,
			frozenColumnIndex: 1,
			target: $('[data-ax5grid="gridView0"]'),            
			columns: [         		                 	
				{key: "altDiv", label: ADMIN("ax.admin.BM0302F0.altdiv"), align: "center", sortable: true , width: 70, styleClass:function(){return (this.item.altDiv === "계약만료") ? "grid-cell-gray":"" }},
				{key: "conId", label: ADMIN("ax.admin.BM0301F0.conid"), align: "center", sortable: true, width: 100},
				{key: "conNo", label: ADMIN("ax.admin.BM0301F0.conno"), sortable: true, width: 120},
				{key: "custNm", label: ADMIN("ax.admin.BM0301F0.custnm"),width: 120},
				{key: "conStDate", label: ADMIN("ax.admin.BM0301F0.consd"), sortable: true, align: "center", width: 100},
				{key: "conEdDate", label: ADMIN("ax.admin.BM0301F0.coned"), sortable: true, align: "center", width: 100},
				{key: "conNm", label: ADMIN("ax.admin.BM0301F0.connm"), width: 150},              
				{key: "suppAmt", label: ADMIN("ax.admin.BM0301F0.suppamt"), formatter:"money" , align: "right", width: 100},
				{key: "vatAmt", label: ADMIN("ax.admin.BM0301F0.vatamt"), formatter:"money" , align: "right", width: 100},
				{key: "remark", label: ADMIN("ax.admin.BM0301F0.remark"), width: 300},
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
 * gridView1
 */
fnObj.gridView1 = axboot.viewExtend(axboot.gridView, {
	page: {
		pageNumber: 0,
		pageSize: 10
	},
	initView: function () {
		var _this = this;
		var layout$ = $('[data-ax5layout="ax1"]');
		layout$.ax5layout();

		this.target = axboot.gridBuilder({
			lineNumberColumnWidth: 30,
			frozenColumnIndex: 2,            
			target: $('[data-ax5grid="gridView1"]'),
			columns: [
				{key: "confirmYn", label:ADMIN("ax.admin.BM0301F0.confirmyn"), align: "center" , sortable: true, width: 70 , styleClass:function(){return (this.item.confirmYn === "확정") ? "grid-cell-red": "grid-cell-blue" }},
				{key: "altDivCd", label: ADMIN("ax.admin.BM0302F0.altdiv") , align: "center" , sortable: true, width: 70},
				{key: "custNm", label: ADMIN("ax.admin.BM0301F0.custnm"), align: "center" ,width: 120},
				{key: "altConDate", label: ADMIN("ax.admin.BM0302F0.altcd"), sortable: true, align: "center", width: 120},
				{key: "conStDate", label: ADMIN("ax.admin.BM0302F0.altsd") , sortable: true, align: "center", width: 120},
				{key: "conEdDate", label: ADMIN("ax.admin.BM0302F0.alted"), sortable: true, align: "center", width: 120},
				{key: "suppAmt", label: ADMIN("ax.admin.BM0301F0.suppamt"), formatter:"money",align: "right", width: 100},
				{key: "vatAmt", label: ADMIN("ax.admin.BM0301F0.vatamt"), formatter:"money" , align: "right", width: 100},
				{key: "remark", label: ADMIN("ax.admin.BM0301F0.remark"), width: 200},
				],
				body: {
					onClick: function () {
						this.self.select(this.dindex);
						ACTIONS.dispatch(ACTIONS.ITEM_CLICK_G1, this.item);
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
			ACTIONS.dispatch(ACTIONS.ITEM_CLICK_G1, data);
		}
	},
	selectIdRow: function(id) {
		var i;
		var length = this.target.list.length;
		for(i = 0; i < length; i++) {
			if(this.target.list[i].seq == id) {
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
		this.target.find('[data-ax-path][data-key!=true]').each(function(index, element) {
			$(element).attr("readonly", false);
			$(element).attr("disabled", false);
		});
		$('#altDiv').attr("readonly", false).attr("disabled", false);
		//$('.input-group-addon').show();
		$('#edCal').show();
		$('#chCal').show();
	},
	disable: function() {
		this.target.find('[data-ax-path][data-key!=true]').each(function(index, element) {
			$(element).attr("readonly", true);
			$(element).attr("disabled", true);

		});
		$('#altDiv').attr("readonly", true).attr("disabled", true);
		$('.input-group-addon').hide();
		//$('#edCal').hide();
		//$('#chCal').hide();
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
	$('#conEnd').on('change', function(){
		ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
	});
}

