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

        <div role="page-header">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
            		  <ax:form name="searchView0">
                        <ax:td label='ax.admin.search' width="300px">
                            <ax:input type="text" name="filter" id="filter" clazz="form-control" placeholder="ax.admin.BM0801S0.search" maxLength="20"/>
                        </ax:td>
            		  </ax:form>
            		  <ax:form name="searchView1">
                        <ax:td label="ax.admin.BM0401F0.play.date" width="400px">
	                            <div class="input-group" data-ax5picker="date">
	                                <input type="text" id="playStDate" name="playStDate" data-ax-path="playStDate" title="<ax:lang id="ax.admin.BM0401F0.play.date"/>" class="form-control" data-ax5formatter="date" placeholder="<ax:lang id="ax.admin.date.format"/>">
	                                <span class="input-group-addon">~</span>
	                                <input type="text" id="playEdDate" name="playEdDate" data-ax-path="playEdDate" title="<ax:lang id="ax.admin.BM0401F0.play.date"/>" class="form-control" data-ax5formatter="date" placeholder="<ax:lang id="ax.admin.date.format"/>">
	                                <span class="input-group-addon"><i class="cqc-calendar"></i></span>
	                            </div>
                       </ax:td>
                       </ax:form>
                    </ax:tr>
                </ax:tbl>
            <div class="H3"></div>
        </div>
        <ax:split-layout name="ax1" orientation="horizontal">
            <ax:split-panel width="*" style="">

                <!-- 목록 -->
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
        </ax:split-layout>


    </jsp:body>
</ax:layout>