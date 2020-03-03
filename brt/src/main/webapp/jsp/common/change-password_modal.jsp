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
        <script type="text/javascript" src="<c:url value='/assets/js/common/change-password_modal.js' />"></script>
    </jsp:attribute>
    <jsp:attribute name="header">
        <h3 class="title">
            <i class="cqc-browser"></i>
            	비밀번호 변경
        </h3>
    </jsp:attribute>
    <jsp:body>
	    <ax:page-buttons>
	    	<button type="button" class="btn btn-fn1" data-page-btn="save"><ax:lang id="ax.admin.save"/></button>
	    	<button type="button" class="btn btn-default" data-page-btn="close"><ax:lang id="ax.admin.sample.modal.button.close"/></button>
        </ax:page-buttons>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="*" style="padding-right: 0px;">
            	<ax:form name="formView0">
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                        <ax:tr>
                            <ax:td label="ax.admin.change.password.old" labelWidth="110px" labelClazz="required">
                                <input type="password" name="oldPassword" title="<ax:lang id="ax.admin.change.password.old"/>" data-ax-path="oldPassword" class="form-control" data-ax-validate="required"/>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="ax.admin.change.password.new" labelWidth="110px" labelClazz="required">
                            	<input type="password" name="newPassword" title="<ax:lang id="ax.admin.change.password.new"/>" data-ax-path="newPassword" class="form-control" data-ax-validate="required"/>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="ax.admin.change.password.new.confirm" labelWidth="110px" labelClazz="required">
                            	<input type="password" name="newConfirmPassword" title="<ax:lang id="ax.admin.change.password.new.confirm"/>" data-ax-path="newConfirmPassword" class="form-control" data-ax-validate="required"/>
                            </ax:td>
                        </ax:tr>
					</ax:tbl>
				</ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>