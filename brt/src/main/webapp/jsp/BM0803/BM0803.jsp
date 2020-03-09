<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${pageRemark}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" />
        <ax:script-lang key="ax.admin" var="ADMIN"/>
        <script type="text/javascript" src="<c:url value='/assets/js/common/tmap.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/BM0803/BM0803.js' />"></script>
        <script src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appkey=bbaeca8d-24d4-425d-9bd2-946552e4e2a7"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <ax:split-layout name="ax1" orientation="vertical">
	        <ax:split-panel width="300">
	            <ax:split-panel width="300" style="height:230px; padding-right: 5px;">
	                <!-- 목록 -->
	                <div class="ax-button-group" data-fit-height-aside="gridView0">
	                    <div class="left">
	                        <h3><i class="cqc-list"></i>
	                            <ax:lang id="ax.admin.BM0802G0.title"/> </h3>
	                    </div>
	                </div>
	                <div data-ax5grid="gridView0" data-fit-height-content="gridView0" style="height: 220px;"></div>
	            </ax:split-panel>
	            
	            <ax:form name="searchView1" style="padding-right:10px">
	                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
	                    <ax:tr>
	                        <ax:td label='ax.admin.search' width="405px">
	                        	<div class="input-group" >
	                        		<div data-ax5select="selectType" id="selectBox" style="width:180px"></div>
		                        </div>
	                        </ax:td>
	                    </ax:tr>
	                </ax:tbl>
	            </ax:form>
	            
	            <ax:split-panel width="300" style="height:100%; padding-right: 5px; padding-bottom:155px">
	                <!-- 목록 -->
	                <div data-ax5grid="gridView1" data-fit-height-content="gridView1" style="height: 100%;"></div>
	            </ax:split-panel>
	        </ax:split-panel>
	            <ax:splitter></ax:splitter>
	            <ax:split-panel width="*" style="padding-left: 10px;" scroll="">
					<!-- 지도 -->
	                <div class="ax-button-group" role="panel-header">
	                    <div class="left">
	                        <h3><i class="cqc-news"></i>
	                            <ax:lang id="ax.admin.BM0105M0.title"/>
	                        </h3>
	                    </div>
	                </div>
	                <div style="height:100%; padding-bottom:50px; overflow:hidden;">
		                 <div id="mapView0" style="overflow:hidden;"></div>				
	                </div>
	            </ax:split-panel>
	            
        </ax:split-layout>

    </jsp:body>
</ax:layout>