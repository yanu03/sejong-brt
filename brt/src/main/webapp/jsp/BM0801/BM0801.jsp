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
        <script type="text/javascript" src="<c:url value='/assets/js/view/BM0801/BM0801.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
					<ax:tr>
						<ax:form name="searchView0">
							<ax:td label='ax.admin.search' width="300px">
								<ax:input type="text" name="filter" id="filter" clazz="form-control" placeholder="ax.admin.BM0801S0.search" maxLength="20"/>
							</ax:td>
							
							<ax:td label="ax.admin.date" width="350px">
	                        	<div class="input-group" data-ax5picker="date">
	                                <input type="text" id="stDate" class="form-control" data-ax5formatter="date" placeholder="<ax:lang id="ax.admin.date.format"/>">
	                                <span class="input-group-addon">~</span>
	                                <input type="text" id="edDate" class="form-control" data-ax5formatter="date" placeholder="<ax:lang id="ax.admin.date.format"/>">
	                                <span class="input-group-addon"><i class="cqc-calendar"></i></span>
	                            </div>
	                        </ax:td>
            		  </ax:form>
                    </ax:tr>
                </ax:tbl>
            <div class="H3"></div>
        </div>
        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="800" style="padding-right: 10px;">
                <div class="ax-button-group" data-fit-height-aside="gridView0">
                    <div class="left">
                        <h3>
                            <i class="cqc-list"></i>
                            <ax:lang id="ax.admin.BM0801G0.title"/>
                        </h3>
                    </div>
                </div>
                <div data-ax5grid="gridView0" data-fit-height-content="gridView0" style="height: 300px;"></div>
            </ax:split-panel>
            
            <ax:splitter></ax:splitter>
            
            <ax:split-panel width="*" style="padding-left: 10px;" scroll="scroll">
                <div class="ax-button-group" data-fit-height-aside="gridView1">
                    <div class="left">
                        <h3><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.BM0801G1.title"/> </h3>
                    </div>
                </div>
                <div data-ax5grid="gridView1" data-fit-height-content="gridView1" style="height: 300px;"></div>
            </ax:split-panel>
        </ax:split-layout>


    </jsp:body>
</ax:layout>