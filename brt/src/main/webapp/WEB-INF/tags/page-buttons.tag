<%@ tag import="com.chequer.axboot.core.utils.MessageUtils" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ tag language="java" pageEncoding="UTF-8" body-content="scriptless" %>
<%@ attribute name="function3Label" required="false" %>
<%@ attribute name="function4Label" required="false" %>
<%@ attribute name="function5Label" required="false" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<div data-page-buttons="">
    <div class="button-warp">
        
        <!-- https://chequer-io.github.io/chequer-icon/demo.html -->
    
        <button type="button" class="btn btn-default" data-page-btn="reload" onclick="window.location.reload();"><i class="cqc-cw"></i></button>
        
        <c:if test="${authGroupMenu.fn4Ah eq 'Y'}">
            <button type="button" class="btn btn-info" data-page-btn="reservation"><%=MessageUtils.getMessage(request, "ax.admin.reservation")%></button>
        </c:if>

        <c:if test="${authGroupMenu.fn5Ah eq 'Y'}">
            <button type="button" class="btn btn-info" data-page-btn="now"><%=MessageUtils.getMessage(request, "ax.admin.now")%></button>
        </c:if>
        
        <c:if test="${authGroupMenu.exlAh eq 'Y'}">
            <button type="button" class="btn btn-info" data-page-btn="excel"><i class="cqc-file-excel-o"></i> <%=MessageUtils.getMessage(request, "ax.admin.excel")%></button>
        </c:if>

        <c:if test="${authGroupMenu.schAh eq 'Y'}">
            <button type="button" class="btn btn-info" data-page-btn="search"><i class="cqc-magnifier"></i> <%=MessageUtils.getMessage(request, "ax.admin.inquery")%> </button>
        </c:if>

        <c:if test="${authGroupMenu.fn6Ah eq 'Y'}">
            <button type="button" class="btn btn-info" data-page-btn="interface"><%=MessageUtils.getMessage(request, "ax.admin.interface")%></button>
        </c:if>
        
        <c:if test="${authGroupMenu.fn1Ah eq 'Y'}">
            <button type="button" class="btn btn-info" data-page-btn="new"><i class="cqc-plus"></i> <%=MessageUtils.getMessage(request, "ax.admin.new")%> </button>
        </c:if>
        
        <c:if test="${authGroupMenu.delAh eq 'Y'}">
            <button type="button" class="btn btn-info" data-page-btn="delete"><i class="cqc-minus"></i> <%=MessageUtils.getMessage(request, "ax.admin.delete")%></button>
        </c:if>

        <c:if test="${authGroupMenu.savAh eq 'Y'}">
            <button type="button" class="btn btn-info" data-page-btn="save"><i class="cqc-save"></i> <%=MessageUtils.getMessage(request, "ax.admin.save")%></button>
        </c:if>

        <c:if test="${authGroupMenu.fn2Ah eq 'Y'}">
            <button type="button" class="btn btn-info" data-page-btn="close"><i class="cqc-cancel"></i> <%=MessageUtils.getMessage(request, "ax.admin.close")%></button>
        </c:if>

        <c:if test="${authGroupMenu.fn3Ah eq 'Y'}">
            <button type="button" class="btn btn-info" data-page-btn="confirmyn"><i class="cqc-check"></i> <%=MessageUtils.getMessage(request, "ax.admin.confirmyn")%></button>
        </c:if>
        

        <jsp:doBody/>
    </div>
</div>