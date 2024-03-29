<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${PAGE_REMARK}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" />
        <ax:script-lang key="ax.admin" var="ADMIN" />
        <script type="text/javascript" src="<c:url value='/assets/js/view/SM0107/SM0107.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons>
        	<button type="button" class="btn btn-info" data-page-btn="reservationComplete"><ax:lang id="ax.admin.item.reservation.complete"/></button>
        </ax:page-buttons>
        
        <div role="page-header">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                    	<ax:td label='ax.admin.SM0107.rsv.complete' width="230px">
                            <ax:SM0105 groupCd="COMPLETE_YN" id="completeYn" dataPath="completeYn" style="display: inline-block; width: 100px;"/>
                        </ax:td>
                        <ax:td label='ax.admin.SM0107.search.date' width="300px">
                        	<div class="input-group" data-ax5picker="date">
                                <input type="text" id="date" class="form-control" data-ax5formatter="date" placeholder="<ax:lang id="ax.admin.date.format.month"/>">
                                <span class="input-group-addon"><i class="cqc-calendar"></i></span>
                            </div>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            <div class="H3"></div>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="*" style="padding-right: 10px; height:100%;">
            	<ax:tab-layout name="tabView0">
           			<ax:tab-panel label="차내장치 업데이트 관리" tabId="firmwareUpdate" scroll="scroll" active="true" style="height:95%; padding-bottom:5px;">
			            <div data-ax5grid="gridView0" data-fit-height-content="gridView0"></div>
				    </ax:tab-panel>
				    
				    <ax:tab-panel label="음성예약 관리" tabId="voiceReservation" scroll="scroll" style="height:95%; padding-bottom:5px;">
			            <div data-ax5grid="gridView1" data-fit-height-content="gridView1"></div>
				    </ax:tab-panel>
				    
				    <ax:tab-panel label="행선지 안내기 표출예약 관리" tabId="destiReservation" scroll="scroll" style="height:95%; padding-bottom:5px;">
			            <div data-ax5grid="gridView2" data-fit-height-content="gridView2"></div>
				    </ax:tab-panel>
				    
				    <ax:tab-panel label="편성영상예약 관리" tabId="videoReservation" scroll="scroll" style="height:95%; padding-bottom:5px;">
			            <div data-ax5grid="gridView3" data-fit-height-content="gridView3"></div>
				    </ax:tab-panel>
				    
				    <ax:tab-panel label="승객용안내기 화면설정예약 관리" tabId="screenReservation" scroll="scroll" style="height:95%; padding-bottom:5px;">
			            <div data-ax5grid="gridView4" data-fit-height-content="gridView4"></div>
				    </ax:tab-panel>
				    
				    <ax:tab-panel label="전자노선도 화면설정예약 관리" tabId="routerReservation" scroll="scroll" style="height:95%; padding-bottom:5px;">
			            <div data-ax5grid="gridView5" data-fit-height-content="gridView5"></div>
				    </ax:tab-panel>
				</ax:tab-layout>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>