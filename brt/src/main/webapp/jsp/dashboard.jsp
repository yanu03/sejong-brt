<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="home"/>
<ax:set key="page_desc" value="${pageRemark}"/>
<ax:set key="page_auto_height" value="true"/>
<ax:set key="axbody_class" value="dashboard"/>

<ax:layout name="base">
    <jsp:attribute name="css">
        <link rel="stylesheet" type="text/css" href="<c:url value='/assets/plugins-fix/light-bootstrap-dashboard/css/light-bootstrap-dashboard.css'/>"/>
		<style type="text/css">
		   body {background-image:url('${pageContext.request.contextPath}${config.main.background}');background-repeat:no-repeat;background-position:right bottom;}
		</style>

    </jsp:attribute>
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" />
        <ax:script-lang key="ax.admin" var="ADMIN" />
    </jsp:attribute>
    <jsp:attribute name="header">
        <!-- <h1 class="title"><i class='cqc-gauge'></i> ${title}</h1> -->
        <p class="desc">${page_desc}</p>
    </jsp:attribute>
    <jsp:body>
        <ax:split-layout name="ax1" orientation="vertical">
    		<ax:split-panel width="*" style="padding:0px;" scroll="scroll">
    			<div data-fit-height-content="left-view-01" style="padding:0px 0px 0px 0px;">내용0</div>
    		</ax:split-panel>
			<ax:split-panel width="500" style="padding:0px;" scroll="scroll">
				<ax:split-panel width="500" height="300" style="padding:0px;" scroll="scroll">
					<div style="height:300px;padding:0px 0px 0px 0px;">내용1</div>
				</ax:split-panel>
    		</ax:split-panel>
    	</ax:split-layout>
    </jsp:body>
</ax:layout>