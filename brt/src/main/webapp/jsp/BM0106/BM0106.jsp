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
        <script type="text/javascript" src="<c:url value='/assets/js/view/BM0106/BM0106.js' />"></script>
        <script src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appkey=bbaeca8d-24d4-425d-9bd2-946552e4e2a7"></script>
    </jsp:attribute>
    <jsp:body>
        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='ax.admin.search' width="300px">
                            <ax:input type="text" name="filter" id="filter" clazz="form-control" placeholder="ax.admin.BM0106S0.search"/>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>


        <ax:split-layout name="ax1" orientation="vertical" height="100%">
            <ax:split-panel width="500" style="padding-right: 10px;">
                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="gridView0">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.BM0106G0.title"/>
                        </h2>
                    </div>
                    <div class="right">
                    </div>
                </div>
                <div data-ax5grid="gridView0" data-fit-height-content="gridView0" style="height: 300px;"></div>
            </ax:split-panel>
            <ax:splitter></ax:splitter>
            <ax:split-panel width="*" style="padding-left: 10px;" scroll="scroll">
            	<div class="ax-button-group">
	                <div class="left">
	                    <h3>
	                        <i class="cqc-list"></i>
	                        <ax:lang id="ax.admin.BM0106F0.title"/>
	                    </h3>
                    </div>
                </div>

                 <ax:form name="formView0" id="formView0">
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                    
                   		<input type="hidden" name="staId" data-ax-path="staId" data-key="true" class="form-control" readonly="readonly"/>
                    	
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0106F0.staNm" width="300px" labelClazz="required">
                    			<input type="text" name="staNm" data-ax-path="staNm" data-key="true" class="form-control" readonly="readonly"/>
                    		</ax:td>
                    	</ax:tr>
                    	
                       	<ax:tr>
                    		<ax:td label="ax.admin.BM0106F0.krNm" width="300px">
                    			<input type="text" name="krNm" data-ax-path="krNm" data-key="true" class="form-control"/>
                    		</ax:td>
                    	
                    		<ax:td label="ax.admin.BM0106F0.enNm" width="300px">
                    			<input type="text" name="enNm" data-ax-path="enNm" data-key="true" class="form-control"/>
                    		</ax:td>
                    	</ax:tr>
                    	        
      	            	<ax:tr>
                    		<ax:td label="ax.admin.BM0106F0.cnNm" width="300px">
                    			<input type="text" name="cnNm" data-ax-path="cnNm" data-key="true" class="form-control"/>
                    		</ax:td>

                    		<ax:td label="ax.admin.BM0106F0.jpNm" width="300px">
                    			<input type="text" name="jpNm" data-ax-path="jpNm" data-key="true" class="form-control"/>
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0106F0.remark" width="300px">
                    			<input type="text" name="remark" data-ax-path="remark" data-key="true" class="form-control"/>
                    		</ax:td>
                    	</ax:tr>
                    </ax:tbl>
               	</ax:form>       
            
                <!-- 지도 -->
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h2><i class="cqc-news"></i>
                            <ax:lang id="ax.admin.BM0106M0.title"/>
                        </h2>
                    </div>
                </div>

                <div id="mapView0" data-fit-height-content="mapView0" style="height:400px;">
                </div>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>