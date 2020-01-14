(function () {
    if (axboot && axboot.def) {

        axboot.def["DEFAULT_TAB_LIST"] = [
            {menuId: "00-dashboard", id: "dashboard", progNm: '홈', menuNm: '홈', progPh: '/jsp/dashboard.jsp', url: '/jsp/dashboard.jsp?progCd=dashboard', status: "on", fixed: true}
        ];

        axboot.def["API"] = {
            "users": "/api/v1/users",
            "commonCodes": "/api/v1/commonCodes",
            "programs": "/api/v1/programs",
            "menu": "/api/v2/menu",
            "manual": "/api/v1/manual",
            "errorLogs": "/api/v1/errorLogs",
            "files": "/api/v1/files",
            "samples": "/api/v1/samples",
        };

        axboot.def["MODAL"] = {
            "ZIPCODE": {
                width: 500,
                height: 500,
                iframe: {
                    url: "/jsp/common/zipcode.jsp"
                }
            },
            "SAMPLE-MODAL": {
                width: 500,
                height: 500,
                iframe: {
                    url: "/jsp/_samples/modal.jsp"
                },
                header: false
            },
            "COMMON_CODE_MODAL": {
                width: 600,
                height: 400,
                iframe: {
                    url: "/jsp/system/system-config-common-code-modal.jsp"
                },
                header: false
            },
            "BM0101": {
            	width: 400,
            	height: 450,
            	iframe: {
            		url: "/jsp/common/BM0101_modal.jsp"
            	},
            	header: false
            },
            "BM0102": {
            	width: 400,
            	height: 450,
            	iframe: {
            		url: "/jsp/common/BM0102_modal.jsp"
            	},
            	header: false
            },
            "BM0104": {
            	width: 634,
            	height: 450,
            	iframe: {
            		url: "/jsp/common/BM0104_modal.jsp"
            	},
            	header: false
            },
            "BM0201": {
            	width: 400,
            	height: 450,
            	iframe: {
            		url: "/jsp/common/BM0201_modal.jsp"
            	},
            	header: false
            },
        };
    }


    var preDefineUrls = {
        "manual_downloadForm": "/api/v1/manual/excel/downloadForm",
        "manual_viewer": "/jsp/system/system-help-manual-view.jsp"
    };
    axboot.getURL = function (url) {
        if (ax5.util.isArray(url)) {
            if (url[0] in preDefineUrls) {
                url[0] = preDefineUrls[url[0]];
            }
            return url.join('/');

        } else {
            return url;
        }
    }


})();