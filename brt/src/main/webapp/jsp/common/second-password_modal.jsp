<%@ page import="com.chequer.axboot.core.utils.RequestUtils" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="pageName" value="File Browser"/>
<ax:set key="page_auto_height" value="true"/>
<ax:set key="axbody_class" value="baseStyle"/>

<ax:layout name="modal">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" />
        <ax:script-lang key="ax.admin" var="ADMIN" />
        <script type="text/javascript" src="<c:url value='/assets/js/common/second-password_modal.js' />"></script>
    </jsp:attribute>
    <jsp:attribute name="header">
        <h3 class="title">
            <i class="cqc-browser"></i>
            <ax:lang id="ax.admin.scd.ps.title"/>
        </h3>
    </jsp:attribute>
    <jsp:body>
        <ax:page-buttons>
            <button type="button" class="btn btn-default" data-page-btn="close"><ax:lang id="ax.admin.sample.modal.button.close"/></button>
        </ax:page-buttons>

        <div role="page-header">
            <div class="H3"></div>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="*" style="padding-right: 0px;">

                <ax:form name="formView0">                 
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">                   
						<ax:tr>
						  <div class="input-group">
							<ax:td label="ax.admin.scd.ps" width="400px" labelClazz="required">
	     					 	<div style="float:left;padding-right:5px;"><input type="password" id="scdPs" name="scdPs" class="form-control W180" maxlength="50"/></div>
	     					 	<div style="float:left;padding-right:5px;"><button type="button" id="checkButton" data-page-btn="checkButton" class="btn btn-primary">확인</button></div>
                    		</ax:td>
                    	   </div>
						</ax:tr>                    
                    </ax:tbl>                    
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>