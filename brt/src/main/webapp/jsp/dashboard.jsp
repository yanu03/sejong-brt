<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="DASH BOARD"/>
<ax:set key="page_desc" value="${pageRemark}"/>
<ax:set key="axbody_class" value="dashboard"/>

<ax:layout name="base">
    <jsp:attribute name="css">
        <link rel="stylesheet" type="text/css" href="<c:url value='/assets/plugins-fix/light-bootstrap-dashboard/css/light-bootstrap-dashboard.css'/>"/>
    </jsp:attribute>
    <jsp:attribute name="script">
    </jsp:attribute>
    <jsp:attribute name="header">
        <h1 class="title"><i class='cqc-gauge'></i> ${title}</h1>
        <p class="desc">${page_desc}</p>
    </jsp:attribute>
    <jsp:body>
    </jsp:body>
</ax:layout>