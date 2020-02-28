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
        <script type="text/javascript" src="<c:url value='/assets/js/view/BM0107/BM0107.js' />"></script>
        <script src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appkey=bbaeca8d-24d4-425d-9bd2-946552e4e2a7"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='ax.admin.search' width="300px">
                            <ax:input type="text" name="filter" id="filter" clazz="form-control" placeholder="ax.admin.BM0107S0.search"/>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H3"></div>
        </div>


        <ax:split-layout name="ax1" orientation="vertical">
	        <ax:split-panel width="500">
	            <ax:split-panel width="500" style="height:270px; padding-right: 10px;">
	                <!-- 목록 -->
	                <div class="ax-button-group" data-fit-height-aside="gridView0">
	                    <div class="left">
	                        <h3><i class="cqc-list"></i>
	                            <ax:lang id="ax.admin.BM0107G0.title"/> </h3>
	                    </div>
	                </div>
	                <div data-ax5grid="gridView0" data-fit-height-content="gridView0" style="height: 300px;"></div>
	            </ax:split-panel>
	             <ax:form name="searchView1" style="padding-right:20px">
	                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
	                    <ax:tr>
	                        <ax:td label='ax.admin.search' width="500px">
	                        	<div class="input-group" >
		                            <ax:input type="text" name="filter1" id="filter1" placeholder="ax.admin.BM0107S1.search" clazz="inline-block" style="width:180px; margin-right:20px;"/>
		                            <button type="button" id="searchSta" class="btn btn-primary" onclick="">
			                         	<ax:lang id="ax.admin.search"/>
			                        </button>
			                        <button type="button" id="refresh" class="btn btn-info" style="margin-right:5px;margin-left:50px;">새로고침</button>
		                        </div>
	                        </ax:td>
	                    </ax:tr>
	                </ax:tbl>
	            </ax:form>
	            
	            <ax:split-panel width="500" style="height:100%; padding-right: 10px; padding-bottom:155px">
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
	                            <ax:lang id="ax.admin.BM0107M0.title"/>
	                        </h3>
	                    </div>
	                    <div class="right">
		   		            <div id="toggleN" style="float:right;">
		                    	<input type="checkbox" id="toggleNode" checked="checked">경로&nbsp;
		                    </div>
		                    <div id="toggleS" style="float:right;">
		                    	<input type="checkbox" id="toggleStn" checked="checked">정류장&nbsp;
		                    </div>
	                    </div>
	                </div>
	                <div style="height:100%; padding-bottom:50px; overflow:hidden;">
		                 <div id="mapView0" style="overflow:hidden;"></div>				
	                </div>
	            </ax:split-panel>
	            
        </ax:split-layout>

    </jsp:body>
</ax:layout>