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
        <script type="text/javascript" src="<c:url value='/assets/js/view/AD0105/AD0105.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label="ax.admin.AD0105S0.search.date" width="300px">
                        	<div class="input-group" data-ax5picker="date">
                                <input type="text" id="date" class="form-control" data-ax5formatter="date" placeholder="<ax:lang id="ax.admin.date.format"/>">
                                <span class="input-group-addon"><i class="cqc-calendar"></i></span>
                            </div>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H3"></div>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="*">
                <!-- 목록 -->
                <%-- <div class="ax-button-group" data-fit-height-aside="gridView0">
                    <div class="left">
                        <h3><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.AD0104G0.title"/> 
                        </h3>
                    </div>
                    <div class="right">
                    </div>
                </div> --%>
                <div data-ax5grid="gridView0" data-fit-height-content="gridView0" style="height: 300px;"></div>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>