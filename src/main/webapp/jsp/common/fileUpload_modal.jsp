<%@ page import="com.chequer.axboot.core.utils.RequestUtils" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<%

%>
<ax:set key="pageName" value="File Browser"/>
<ax:set key="page_auto_height" value="true"/>
<ax:set key="axbody_class" value="baseStyle"/>

<ax:layout name="modal">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" />
        <ax:script-lang key="ax.admin" var="ADMIN" />
        <script type="text/javascript" src="<c:url value='/assets/js/common/fileUpload_modal.js' />"></script>
    </jsp:attribute>
    <jsp:attribute name="header">
        <h3 class="title">
            <i class="cqc-browser"></i>
            <ax:lang id="ax.admin.UPLOADFILE.title"/>
        </h3>
    </jsp:attribute>
    <jsp:body>
        <ax:page-buttons>
            <button type="button" class="btn btn-fn1" data-page-btn="choice"><ax:lang id="ax.admin.sample.modal.button.choice"/></button>
            <button type="button" class="btn btn-default" data-page-btn="close"><ax:lang id="ax.admin.sample.modal.button.close"/></button>
        </ax:page-buttons>

            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='ax.admin.UPLOADFILE.file' width="300px">
                        <!-- 
                            <input type="file" name="file" id="file" accept="application/vnd.ms-excel"/>
                         -->
                         	<input type="file" name="file" id="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <br>
            <span style="color:red">※ xls 혹은 xlsx 파일을 업로드 해주세요.</span>
    </jsp:body>
</ax:layout>