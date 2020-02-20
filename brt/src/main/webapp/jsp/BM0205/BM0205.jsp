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
        <script type="text/javascript" src="<c:url value='/assets/js/view/BM0205/BM0205.js' />"></script>
        
        <style>
			.grid-cell-red{
		        background: #A9F5A9;
		    }
		    .grid-cell-blue{
		        background: #F78181;
		    }
		</style>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header" style="position: relative;">
        	  <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='ax.admin.search' width="300px">
                            <ax:input type="text" name="filter" id="filter" clazz="form-control" placeholder="ax.admin.BM0205S0.search"/>
                        </ax:td>
                        <ax:td label='ax.admin.BM0205S0.file' width="300px">
                        <input type="file" id="dvcFileUp" name="dvcFileUp" class="form-control inline-block W150" style="width:200px;"/>
                        </ax:td>
                        <ax:td label='ax.admin.BM0205S0.version' width="300px">
                        	<ax:input type="text" name="version" id="version" clazz="form-control" maxLength="50"/>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>

        <ax:split-layout name="ax1" orientation="horizontal">
            <ax:split-panel width="*" style="height:100%; padding-right: 10px; padding-bottom:25px">

                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="gridview0">
                    <div class="left">
                        <h2>
                            <i class="cqc-list"></i>
                            <ax:lang id="ax.admin.BM0103G0.title"/>
                        </h2>
                    </div>
                </div>
                <div data-ax5grid="gridView0" data-fit-height-content="gridView0" style="height: 100%;"></div>
            </ax:split-panel>
        </ax:split-layout>


    </jsp:body>
</ax:layout>