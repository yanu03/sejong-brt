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
        <script type="text/javascript" src="<c:url value='/assets/js/view/SM0108/SM0108.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td>
                            <!--
                            <ax:input type="text" name="filter" id="filter" clazz="form-control" placeholder="ax.admin.SM0104S0.search"/>
                            -->
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H3"></div>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="*" style="padding-right: 10px; height:100%;">
                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="gridView0">
                    <div class="left">
                        <h3><i class="cqc-list"></i>
                            	예약적용 관리 </h3>
                    </div>
                    <div class="right">

                    </div>
                </div>

            	<ax:tab-layout name="ax2">
            			<ax:tab-panel label="차내장치 업데이트 관리" scroll="scroll" active="true" style="height:100%; padding-bottom:5px;">
					            <div data-ax5grid="gridView0" data-fit-height-content="gridView0" style="height:100%;"></div>
					    </ax:tab-panel>
					    <ax:tab-panel label="음성예약 관리" scroll="scroll" style="height:100%; padding-bottom:5px;">
					            <div data-ax5grid="gridView1" data-fit-height-content="gridView1" style="height:100%;"></div>
					    </ax:tab-panel>
					    <ax:tab-panel label="표출예약 관리" scroll="scroll" style="height:100%; padding-bottom:5px;">
					            <div data-ax5grid="gridView2" data-fit-height-content="gridView2" style="height:100%;"></div>
					    </ax:tab-panel>
					    <ax:tab-panel label="편성영상예약 관리" scroll="scroll" style="height:100%; padding-bottom:5px;">
					            <div data-ax5grid="gridView3" data-fit-height-content="gridView3" style="height:100%;"></div>
					    </ax:tab-panel>
					    <ax:tab-panel label="화면설정예약 관리" scroll="scroll" style="height:100%; padding-bottom:5px;">
					            <div data-ax5grid="gridView4" data-fit-height-content="gridView4" style="height:100%;"></div>
					    </ax:tab-panel>
				</ax:tab-layout>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>