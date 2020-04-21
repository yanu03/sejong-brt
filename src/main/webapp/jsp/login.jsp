<%@ page import="com.tracom.brt.domain.init.DatabaseInitService" %>
<%@ page import="com.chequer.axboot.core.context.AppContextManager" %>
<%@ page import="com.tracom.brt.utils.SessionUtils" %>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<%boolean initialized = AppContextManager.getBean(DatabaseInitService.class).initialized();

    String lastNavigatedPage = null;

    if (SessionUtils.isLoggedIn()) {
        lastNavigatedPage = "/jsp/main.jsp";
    }

    if (initialized) {
        request.setAttribute("redirect", lastNavigatedPage);
    } else {
        request.setAttribute("redirect", "/setup");
    }%>

<c:if test="${redirect!=null}">
    <c:redirect url="${redirect}"/>
</c:if>

<ax:set key="axbody_class" value="login"/>

<ax:layout name="empty">
    <jsp:attribute name="css">
<style>
    *{margin:0; padding:0; box-sizing:border-box !important;}
	.ir_wa {display:block;overflow:hidden;position:relative;z-index:-10;width:100%;height:100%} 
	.ir_pm {display:block;overflow:hidden; text-indent:200%; white-space:nowrap }
	.blind {display:block;overflow:hidden;position:absolute;top:-1000em;left:0}
	
	  
	html {
	    width: 100%;
	    height: 100%;
	    display: table;
	}
	body {
	    display: table-cell;
	    vertical-align: middle;
	    background: url("/assets/images/login/login-bg.jpg") no-repeat center;
	    background-size: cover;
	}
	
	.login-wrap {
	    width: 360px;
	    margin: 0 auto;
	}
	.login-wrap h1{
	    width: 246px;
	    height: 115px;
	    background: url("/assets/images/login/h1-logo.png") no-repeat;
	    margin: 0 auto;
	    margin-bottom: 20px;
	}
	.login-wrap input, .login-wrap button {
	    width: 360px;
	    height: 50px;
	    border: none;
	    border-radius: 5px;
	    vertical-align:middle;
	    margin-top: 10px;
	    font-size: 16px;
	}
	input#userCd {
	    padding-left: 50px;
	    background: #ffffff url("/assets/images/login/ico-id.png") no-repeat 20px 50%;
	}
	input#userPs {
	    padding-left: 50px;
	    background: #ffffff url("/assets/images/login/ico-pass.png") no-repeat 18px 50%;
	}
	button.btn-login {
	    background: #0055bb;
	    color: #ffffff;
	    height: 60px;
	    font-size: 20px;
	    font-weight: 600;
	    margin-top: 20px;
	    cursor: pointer;
	}
	.copyright {
	    margin-top: 10px;
	    color: #ffffff;
	    text-align: center;
}
</style>
    </jsp:attribute>
    <jsp:attribute name="js">
        <script>
            axboot.requireSession('${config.sessionCookie}');
        </script>
    </jsp:attribute>

    <jsp:attribute name="script">
        <script type="text/javascript">
            var fnObj = {
                pageStart: function () {

                },
                login: function () {
                    axboot.ajax({
                        method: "POST",
                        url: "/api/login",
                        data: JSON.stringify({
                            "userCd": $("#userCd").val(),
                            "userPs": $("#userPs").val()
                        }),
                        callback: function (res) {
                            if (res && res.error) {
                                if (res.error.message == "Unauthorized") {
                                    alert("로그인에 실패 하였습니다. 계정정보를 확인하세요");
                                }
                                else {
                                    alert(res.error.message);
                                }
                                return;
                            }
                            else {
                                location.reload();
                            }
                        },
                        options: {
                            nomask: false, apiType: "login"
                        }
                    });
                    return false;
                }
            };
        </script>
    </jsp:attribute>


    <jsp:body>

	<div class="login-wrap">
		<h1 class="ir_pm">세종도시교통공사</h1>
		<form name="login-form" method="post" action="/api/login" onsubmit="return fnObj.login();" autocomplete="off">
            <label for="userCd" class="blind">아이디</label>
            <input type="text" id="userCd" style="color:black;" placeholder="아이디를 입력해 주세요"images/>
            <label for="userPs" class="blind">패스워드</label>
            <input type="password" id="userPs" style="color:black;" placeholder="비밀번호를 입력해 주세요"images/>
            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
            <button type="submit" class="btn-login">Log in</button>
        </form>
    </div>
    
    <p class="copyright">Copyright © 세종도시교통공사 | <strong>BRT(전기.굴절) 관리 시스템</strong></p>
<!-- 
        <ax:flex-layout valign="middle" align="center" style="width:100%;height:100%;">
            <div>
                <img src="${pageContext.request.contextPath}${config.logo.login}" class="img-logo" />
            </div>

            <div class="panel">
                <div class="panel-heading"><ax:lang id="ax.admin.login.guide.message"/></div>
                <div class="panel-body">
                    <form name="login-form" class="" method="post" action="/api/login" onsubmit="return fnObj.login();" autocomplete="off">


                        <div class="form-group">
                            <label for="userCd"><i class="cqc-new-message"></i> <ax:lang id="ax.admin.id"/></label>
                            <ax:input id="userCd" clazz="ime-false" />
                        </div>

                        <div class="form-group">
                            <label for="userPs"><i class="cqc-key"></i> <ax:lang id="ax.admin.password"/></label>
                            <ax:input type="password" id="userPs" clazz="ime-false" />
                        </div>

                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>

                        <div class="ax-padding-box" style="text-align: right;">
                            <button type="submit" class="btn">&nbsp;&nbsp;<ax:lang id="ax.admin.login"/>&nbsp;&nbsp;</button>
                        </div>

                    </form>
                </div>
                
                <ul class="list-group">
                    <li class="list-group-item">
                        ${config.copyrights}
                    </li>
                </ul>
            </div>
        </ax:flex-layout>
 -->
    </jsp:body>

</ax:layout>