<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${pageRemark}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
	<jsp:attribute name="css">
        <link rel="stylesheet" type="text/css" href="<c:url value="/assets/css/jplayer.blue.monday.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/assets/css/BM0405/BM0405.css"/>">
    </jsp:attribute>
    
	<jsp:attribute name="js">
		<script type="text/javascript" src="<c:url value='/assets/js/common/tmap.js' />"></script>
        <script type="text/javascript" src="<c:url value="/assets/js/jplayer/jquery.jplayer.js"/>"></script>
        <script src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appkey=bbaeca8d-24d4-425d-9bd2-946552e4e2a7"></script>
    </jsp:attribute>
    
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" />
        <ax:script-lang key="ax.admin" var="ADMIN" />
        <script type="text/javascript" src="<c:url value="/assets/js/view/BM0405/BM0405.js"/>"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='ax.admin.search' width="300px">
                            <ax:input type="text" name="filter" id="filter" clazz="form-control" placeholder="ax.admin.BM0405S0.search"/>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>


        <ax:split-layout name="ax1" orientation="vertical" width="250">
            <ax:split-panel width="300" style="padding-right: 10px;">
                <!-- 목록 -->
                <div class="ax-button-group">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.BM0405G0.title"/> </h2>
                    </div>
                </div>
                
               	<div data-ax5grid="gridView0" style="height: 270px;"></div>
                
                <div class="ax-button-group" style="margin-top: 5px;">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.BM0405G1.title"/> </h2>
                    </div>
                </div>
                
               	<div data-ax5grid="gridView1" style="height: 320px;"></div>
            </ax:split-panel>
            
            <ax:splitter></ax:splitter>
            
            <ax:split-panel width="*" style="padding-left: 10px; padding-right: 10px;">
                 <div id="mapView0"></div>				
            </ax:split-panel>
            
            <ax:splitter></ax:splitter>
            
            <ax:split-panel width="300" style="padding-left: 10px;">
                <!-- 목록 -->
                <div class="ax-button-group">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.BM0405G2.title"/> </h2>
                    </div>
                </div>
                
               	<div data-ax5grid="gridView2" style="height: 635px;"></div>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>