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

		axboot.ajax({
			type: "GET",
			url: "/api/v1/BM0605G0S0",
			data: filter,
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
		caller.gridView0.target.exportExcel("data.xls");
	},

	PAGE_NEW: function (caller, act, data) {
		isUpdate = false;
		$("#videoPreview").attr("src", "");
		$("#imagePreview").attr("src", "");
		caller.gridView0.selectAll(false);
		caller.formView0.clear();
		caller.formView0.enable();
		caller.formView0.validate(true);
		togglePreview("AV001");
	},

	PAGE_DELETE: function(caller, act, data) {
		var grid = caller.gridView0.target;
		var msg = "";
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
						url: "/api/v1/BM0605G0D0",
						data: JSON.stringify(grid.list[grid.selectedDataIndexs[0]]),
						callback: function (res) {
							msg = res.message;
							ok(res);
						}
					});
				})
				.then(function (ok) {
					if(msg == "true"){
						caller.formView0.clear();
						//axToast.push(LANG("ondelete"));
						axDialog.alert(LANG("ondelete"));
					}else{
						axDialog.alert("편성이 있는 영상입니다. 영상편성에서 제거해 주세요.");
					}
					ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);						
				})
				.catch(function () {

				});
			}
		});
	},

	PAGE_SAVE: function (caller, act, data) {

		if (caller.formView0.validate()) {
			if($('#fileType').val() == "AV002" && $('#imgPlayTm').val() < 1){
				axDialog.alert("이미지재생시간은 1초이상 입력해주세요.");
				return false;
			}
			var formData = new FormData(caller.formView0.target[0]);
			if($("#vdoFile")[0].files[0]){
				formData.append("vdoFile", $("#vdoFile")[0].files[0].name);
			}
			
			var msg = "";
			axboot.promise()
			.then(function (ok, fail, data) {
				axboot.ajax({
					type: "POST",
					enctype: "multipart/form-data",
					processData: false,
					url: "/api/v1/BM0605F0I0",
					data: formData,
					callback: function (res) {
						setTimeout(ok(res), 1500);
						msg = res.message;
					},
					options: {
						contentType:false
					}
				});
			})
			.then(function (ok, fail, data) {
				axToast.push(LANG("onsave"));
				ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
				caller.gridView0.selectLastRow();
			})
			.catch(function () {

			});
		}
	},

	PAGE_UPDATE: function(caller, act, data) {
		if (caller.formView0.validate()) {
			var formData = new FormData(caller.formView0.target[0]);
			
			if($('#fileType').val() == "AV002" && $('#imgPlayTm').val() < 1){
				axDialog.alert("이미지재생시간은 1초이상 입력해주세요.");
				return false;
			}
			
			if($("#vdoFile")[0].files[0]){
				formData.append("vdoFile", $("#vdoFile")[0].files[0].name);
			}


			axboot.promise()
			.then(function (ok, fail, data) {
				axboot.ajax({
					type: "POST",
					enctype: "multipart/form-data",
					processData: false,
					url: "/api/v1/BM0605F0U0",
					data: formData,
					callback: function (res) {
						setTimeout(ok(res), 1500);
					},
					options: {
						contentType:false
					}
				});
			})
			.then(function (ok, fail, data) {
				axToast.push(LANG("onsave"));
				ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
				caller.gridView0.selectRow(selectedRow.__index);
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
		isUpdate = true;
		selectedRow = data;
		caller.formView0.setData(data);

		$("#videoPreview").val("");
		$("#imagePreview").val("");

		var url = "/api/v1/filePreview?type=video&vdoId=" + data.vdoId + "&fileType=" + data.fileType;
		changeFiletype(data.fileType);

		if(data.fileType == "AV001"){
			$('#videoPreview').attr("src", url);
		}else{
			$('#imagePreview').attr("src", url);
		}

	},

	OPEN_BM0301_MODAL: function(caller, act, data) {
		axboot.modal.open({
			modalType: "CONTRACT",
			param: "",
			header:false,
			callback: function (data) {
				// 운수사, 거래처 등을 선택한 후 이벤트 ex) input에 값을 넣어 주는 등의 로직을 작성하면됨
				caller.formView0.model.set("conId", data.conId);
				caller.formView0.model.set("conNm", data.conNm);
            	caller.formView0.model.set("playStDate", data.conStDate);
            	caller.formView0.model.set("playEdDate", data.conEdDate);
				this.close();
			}
		});
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
	fileTypeOnChange();
	togglePreview('AV002');
	onChangeFile();
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
				ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
			},
			"excel": function () {
				selectedRow = null;
				ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
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
			lineNumberColumnWidth: 30,
			frozenColumnIndex: 0,
			sortable: true,
			target: $('[data-ax5grid="gridView0"]'),
			columns: [
				{key: "vdoId",		label: ADMIN("ax.admin.BM0605G0.vdoId"),		width: 80,	align: "center"},
				{key: "conNm",		label: ADMIN("ax.admin.BM0605G0.conNm"),		width: 120,	align: "left"},
				{key: "vdoNm",		label: ADMIN("ax.admin.BM0605G0.vdoNm"),		width: 250,	align: "left"},
				{key: "fileTypeNm",	label: ADMIN("ax.admin.BM0605G0.fileType"),		width: 80,	align: "center"},
				//{key: "attFile",	label: ADMIN("ax.admin.BM0605F0.attFile"),		width: 80},
				{key: "playStDate",	label: ADMIN("ax.admin.BM0605G0.playStDate"),	width: 100,	align: "center"},
				{key: "playEdDate",	label: ADMIN("ax.admin.BM0605G0.playEdDate"),	width: 100,	align: "center"},
				{key: "playTm",		label: ADMIN("ax.admin.BM0605G0.playTm"),		width: 120, align: "right"},
				{key: "imgPlayTm",	label: ADMIN("ax.admin.BM0605G0.imgPlayTm"),	width: 100, align: "right"},
				{key: "remark",		label: ADMIN("ax.admin.BM0605G0.remark"),		width: 150, align: "left"},
				{key: "updatedAt",	label: ADMIN("ax.admin.BM0605G0.updatedAt"),	width: 130},
				],
				body: {
					onClick: function () {
						
						togglePreview();
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
			if(this.target.list[i].vdoId == id) {
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

		axboot.buttonClick(this, "data-form-view-0-btn", {
			"selectBM0301": function() {
				ACTIONS.dispatch(ACTIONS.OPEN_BM0301_MODAL);
			}
		});

		this.target.find('[data-ax5picker="date"]').ax5picker({
			direction: "auto",
			content: {
				type: 'date'
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
			$("#videoPreview").attr("src", "");
			$("#imagePreview").attr("src", "");
			
		});
	},
	clear: function () {
		this.model.setModel(this.getDefaultData());
		this.target.find('[data-ax-path="key"]').removeAttr("readonly");
	}
});

/********************************************************************************************************************/
/** 승무사원관리 전용 함수 **/
/********************************************************************************************************************/

//승무사원이미지가 있다면 파일 불러와서 미리보기(추가예정), 없다면 기본 이미지 미리보기
function preview_Image(){
	var path;
	path = "/assets/videos/BM0605/Default.png";//default path
	document.getElementById('preview').src=path;
}

function fileTypeOnChange(){
	$('#fileType').on('change', function(){
		var input = $('#fileType').val();
		togglePreview(input);
	});
}

function onChangeFile(){
	$('#vdoFile').on('change', function(){
		
    var ext = $(this).val().split(".").pop().toLowerCase();
		if($('#fileType').val() == 'AV001'){
			if($.inArray(ext,["mp4", "mp4"]) == -1) {
				axDialog.alert("mp4 파일만 업로드 가능합니다.");
				$("input[id=vdoFile]").val("");
				$('#videoPreview').attr('src', '');
				return;
			}		
		}else{
			if($.inArray(ext,["jpg", "JPG"]) == -1) {
				axDialog.alert("JPG 파일만 업로드 가능합니다.");
				$("input[id=vdoFile]").val("");
				$('#imagePreview').attr('src', '');
				return;
			}
		}
	});
}

function togglePreview(input){
	if(input == 'AV002'){
		$('#vdoFile').val('');
		$('#videoPreview').attr('src', '');
		$('#videoPreview').hide();
		$('#imagePreview').show();
		$('#imgPlayTm').attr('disabled', false);
		$('#imgPlayTm').attr("data-ax-validate", "required");
		
	}else if(input == 'AV001'){
		$('#vdoFile').val('');
		$('#imagePreview').hide();
		$('#videoPreview').show();
		$('#imgPlayTm').val('');
		$('#imgPlayTm').attr('disabled', true);
		$('#imgPlayTm').removeAttr("data-ax-validate");

	}else{
		$('#imgPlayTm').val('');
		$('#videoPreview').attr('src', '');
	}
	//file clear 필요함
}

function changeFiletype(input){
	togglePreview(input);
}
//미리보기

function preview_Change(input) {
	//파일유형의 값을 받아와서 이미지이면 image:로 넣고 비디오면 video로 넣음
	if (input.files && input.files[0]) {
		switch($('#fileType').val()){
		case "AV001":
			$("#videoPreview").attr("src", URL.createObjectURL(input.files[0]));
			break;
		case "AV002":
			$('#imagePreview').attr('src', e.target.result);
			break;
		}
	}
}