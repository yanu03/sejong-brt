var fnObj = {}, CODE = {};

/***************************************** 이벤트 처리 코드 ******************************************************/
var ACTIONS = axboot.actionExtend(fnObj, {
	KR_TTS_TEST: function(caller, act, data) {
		var element = $("[data-ax-path='krTts']");
		
		if(element.val() == "") {
			axDialog.alert("문구를 입력해주세요");
			element.focus();
			return false;
		}
    	
    	ACTIONS.dispatch(ACTIONS.SET_AUDIO, {
        	pText: element.val(),
        	nLanguage: 0,
        	nSpeakerId: 0,
        	chimeYn: 'N'
        });
	},
	
	EN_TTS_TEST: function(caller, act, data) {
		var element = $("[data-ax-path='enTts']");
		
		if(element.val() == "") {
			axDialog.alert("문구를 입력해주세요");
			element.focus();
			return false;
		}
    	
    	ACTIONS.dispatch(ACTIONS.SET_AUDIO, {
        	pText: element.val(),
        	nLanguage: 1,
        	nSpeakerId: 2,
        });
	},
	
	KR_TTS: function(caller, act, data) {
		var element = $("[data-ax-path='krTts']");
		
		if(element.val() == "") {
			axDialog.alert("문구를 입력해주세요");
			element.focus();
			return false;
		}
		
		ACTIONS.dispatch(ACTIONS.DOWNLOAD_VOICE, {
        	pText: element.val(),
        	nLanguage: 0,
        	nSpeakerId: 0,
        	chimeYn: 'N'
        });
	},
	
	EN_TTS: function(caller, act, data) {
		var element = $("[data-ax-path='enTts']");
		
		if(element.val() == "") {
			axDialog.alert("문구를 입력해주세요");
			element.focus();
			return false;
		}
		
		ACTIONS.dispatch(ACTIONS.DOWNLOAD_VOICE, {
        	pText: element.val(),
        	nLanguage: 1,
        	nSpeakerId: 2,
        });
	},
	
	DOWNLOAD_VOICE: function(caller, act, data) {
		var wavDownloadUrl = "/api/v1/getWavDownload?" + $.param(data);
		window.location.href = wavDownloadUrl;
	},
	
	SET_AUDIO: function(caller, act, data) {
    	var url = "/api/v1/filePreview?type=voice&" + $.param(data);
    	
		$("#jquery_jplayer_1").jPlayer("setMedia", {
    		mp3: url,
    	}).jPlayer("play");
    },
});
/********************************************************************************************************************/

/******************************************* 페이지 처음 로딩시 호출 ******************************************************/
fnObj.pageStart = function () {
    this.pageButtonView.initView();
    
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
    
    axboot.buttonClick(this, "data-btn-test", {
        "krTts": function () {
            ACTIONS.dispatch(ACTIONS.KR_TTS_TEST);
        },
        "enTts": function() {
        	ACTIONS.dispatch(ACTIONS.EN_TTS_TEST);
        },
    });
    
    axboot.buttonClick(this, "data-btn-download", {
        "krTts": function () {
            ACTIONS.dispatch(ACTIONS.KR_TTS);
        },
        "enTts": function() {
        	ACTIONS.dispatch(ACTIONS.EN_TTS);
        },
    });
};

fnObj.pageResize = function () {

};

/******************************************** 공통 버튼 클릭 이벤트 ******************************************************/
fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
        });
    }
});

/********************************************************************************************************************/
