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
        <script type="text/javascript" src="<c:url value='/assets/js/view/BM0109/BM0109.js' />"></script>
        <link rel="stylesheet" type="text/css" href="<c:url value="/assets/css/BM0405/BM0405.css"/>">
        <script src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appkey=l7xx6099b61644bf40d78594611b250c9694"></script>
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
            <div class="H10"></div>
        </div>


        <ax:split-layout name="ax1" orientation="vertical">
	        <ax:split-panel width="450">
	            <ax:split-panel style="height:290px; padding-right: 10px;">
	                <!-- 목록 -->
	                <div class="ax-button-group" data-fit-height-aside="gridView0">
	                    <div class="left">
	                        <h2><i class="cqc-list"></i>
	                            <ax:lang id="ax.admin.BM0107G0.title"/> </h2>
	                    </div>
	                </div>
	                <ax:split-panel  style="height:250px;float:left;">
	                	<div data-ax5grid="gridView0" style="height:250px; width:450px; padding-right:10px;"></div>
	                </ax:split-panel>
	                    
	            </ax:split-panel>
	             <ax:form name="searchView1" style="padding-right:10px; ">
	                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
	                    <ax:tr>
	                        <ax:td label='ax.admin.search' width="500px">
	                        	<div class="input-group" >
		                            <ax:input type="text" name="filter1" id="filter1" placeholder="ax.admin.BM0107S1.search" clazz="inline-block" style="width:180px; margin-right:20px;"/>
		                            <button type="button" id="searchSta" class="btn btn-primary" onclick="">
			                         	<ax:lang id="ax.admin.search"/>
			                        </button>
			                        <button type="button" id="refresh" class="btn btn-info" style="float:right;margin-left:55px;"><i class="cqc-cw"></i></button>
			                    
		                        </div>
	                        </ax:td>
	                    </ax:tr>
	                </ax:tbl>
	            </ax:form>
	            
	            <ax:split-panel width="*" style="height:100%; padding-right: 5px; padding-bottom:166px">
	                <!-- 목록 -->
	                <div data-ax5grid="gridView1" data-fit-height-content="gridView1" style="height: 100%;"></div>
	            </ax:split-panel>
	        </ax:split-panel>
            <ax:splitter></ax:splitter>
            <ax:split-panel width="*" style="padding-left: 10px;" scroll="">
				<!-- 지도 -->
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h2><i class="cqc-news"></i>
                            <ax:lang id="ax.admin.BM0107M0.title"/>
                        </h2>
                    </div>
                    <div class="right">
	                    <div id="rowDel" style="float:right; padding-left:3px;">
	                    	<button class="btn btn-default" data-grid-control="row-del" style="width: 100px;"><i class="cqc-minus"></i>선택삭제</button>
	                    	
	                    </div>
	                    <div id="nodeAdd" style="float:right; padding-left:3px;">
	                    	<button class="btn btn-default" data-grid-control="node-add" style="width:100px;"><i class="cqc-plus"></i>경로추가</button>
	                    </div>
	                    <div id="stopAdd" style="float:right; padding-left:3px;">
	                    	<button class="btn btn-default" data-grid-control="stop-add" style="width:100px;"><i class="cqc-plus"></i>정류장추가</button>
	                    </div>
	                    <div id="stopAdd2" style="float:right; padding-left:3px;">
	                    	<button class="btn btn-default" data-grid-control="stop-add2" style="width:100px;"><i class="cqc-plus"></i>기존정류장</button>
	                    </div>
	                    <div id="toggleN" style="float:right;">
	                    	<input type="checkbox" id="toggleNode" checked="checked">경로&nbsp;
	                    </div>
	                    <div id="toggleS" style="float:right;">
	                    	<input type="checkbox" id="toggleStn" checked="checked">정류장&nbsp;
	                    </div>
                    </div>
                </div>

                <div style="height:100%; padding-bottom:42px; overflow:hidden;">
	                 <div id="mapView0" style="overflow:hidden;"></div>				
                </div>
            </ax:split-panel>
	            
        </ax:split-layout>

    </jsp:body>
</ax:layout>