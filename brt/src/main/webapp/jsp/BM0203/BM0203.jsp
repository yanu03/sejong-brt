<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${pageRemark}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" />
        <ax:script-lang key="ax.admin" var="ADMIN" />
        <script type="text/javascript" src="<c:url value='/assets/js/view/BM0203/BM0203.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='ax.admin.search' width="300px">
                            <ax:input type="text" name="filter" id="filter" clazz="form-control" placeholder="ax.admin.BM0201S0.search"/>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="*" style="padding-right: 10px;">
                <div class="ax-button-group" data-fit-height-aside="gridView0">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.BM0103G0.title"/>
                        </h2>
                    </div>
                </div>
                <div data-ax5grid="gridView0" data-fit-height-content="gridView0" style="height: 300px;"></div>
            </ax:split-panel>
            <ax:splitter></ax:splitter>
            <ax:split-panel width="600" style="padding-left: 10px;" scroll="scroll">
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                             <ax:lang id="ax.admin.BM0202G1.title"/>
                        </h2>
                    </div>
                </div>
                    <div data-ax5grid="gridView1" style="height: 220px;"></div>
                    
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                             <ax:lang id="ax.admin.BM0203F0.title"/>
                        </h2>
                    </div>
                </div>                    
            		<ax:form name="formView0">
                    	<ax:tbl clazz="ax-form-tbl" minWidth="300px">                   	                                    		
                    		<div id="check" style="width: 500px;height: 230px; position:relative; background-image:url('/assets/images/BM0203/BusImage.png'); margin: 0px auto;">
                    			<div style="width:200px; height: 100px; position: absolute; top:0px; left:400px;">
                    				<div style= "background-color: red; width:14px; height:14px; border-radius: 7px; float:left;"></div>
                    				<span><input type="text" value="비정상" style="background-color:#00ff0000; border:none; width: 40px; float:left; " disabled/></span>
                    				<div style= "background-color: #00FF00; width:14px; height:14px; border-radius: 7px; float:left; "></div>
                    				<span><input type="text" value="정상" style="background-color:#00ff0000; border:none; width: 40px; float:left; " disabled/></span>
                    			</div>
                    		</div>                   	  		                   
            			</ax:tbl>
            		</ax:form>
            		
            </ax:split-panel>
            
            
        </ax:split-layout>

    </jsp:body>
   </ax:layout>