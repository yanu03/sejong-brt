<%@ page import="com.chequer.axboot.core.utils.RequestUtils" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<%

%>
<ax:set key="pageName" value="File Browser"/>
<ax:set key="page_auto_height" value="true"/>
<ax:set key="axbody_class" value="baseStyle"/>

<ax:layout name="modal">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" />
        <ax:script-lang key="ax.admin" var="ADMIN" />
        <script type="text/javascript" src="<c:url value='/assets/js/common/reservation_modal.js' />"></script>
    </jsp:attribute>
    <jsp:attribute name="header">
        <h3 class="title">
            <i class="cqc-browser"></i>
            	예약적용
        </h3>
    </jsp:attribute>
    <jsp:body>
	    <ax:page-buttons>
	    	<button type="button" class="btn btn-fn1" data-page-btn="choice"><ax:lang id="ax.admin.sample.modal.button.choice"/></button>
	    	<button type="button" class="btn btn-default" data-page-btn="close"><ax:lang id="ax.admin.sample.modal.button.close"/></button>
        </ax:page-buttons>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="*" style="padding-right: 0px;">
                <div id="reservationDate" style="
		                width:300px;
		                border:1px solid #ccc;
		                border-radius: 5px;
		                padding: 5px;
		                overflow: hidden;">
		
				</div>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>