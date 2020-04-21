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
        <script type="text/javascript" src="<c:url value='/assets/js/view/BM0206/BM0206.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='ax.admin.search' width="300px">
                            <ax:input type="text" name="filter" id="filter" clazz="form-control" placeholder="ax.admin.BM0201S0.search"/>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H3"></div>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="*" style="padding-right: 10px;">
                <div class="ax-button-group" data-fit-height-aside="gridView0">
                    <div class="left">
                        <h3><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.BM0103G0.title"/>
                        </h3>
                    </div>
                </div>
                <div data-ax5grid="gridView0" data-fit-height-content="gridView0" style="height: 300px;"></div>
            </ax:split-panel>
            <ax:splitter></ax:splitter>
            <ax:split-panel width="600" style="padding-left: 10px;">
             <ax:split-panel width="600" style="height:270px;">
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h3><i class="cqc-list"></i>
                             <ax:lang id="ax.admin.BM0202G1.title"/>
                        </h3>
                    </div>
                </div>
                    <div data-ax5grid="gridView1" style="height: 220px;"></div>
              </ax:split-panel>
              <ax:split-panel width="600" style="height:100%; padding-bottom:155px">
                     <div class="ax-button-group">
                        <div class="left">
                            <h3>
                                <i class="cqc-list"></i>
                                <ax:lang id="ax.admin.BM0206G2.title"/>
                            </h3>
                        </div>
                        
                   <%-- <ax:form name="searchView1"> 달력으로 이력검색
                   			<div class="right">           		
                        		<div class="input-group" style="position:absolute; width:100px; right:30px;top:270px;">                                 		
	                            		<input type="text" class="form-control" data-ax5picker="date" name="filterG2" id="filterG2" data-ax5formatter="date" placeholder="yyyy/mm" width="50px"/>
	                            		<button type="button" class="btn btn-info" data-page-btn="searchDate" style="position: absolute; top:0px;left:100px"><i class="cqc-magnifier"></i></button>
                            	</div>
                           </div> 	                                               		                                 		 	                 	 		
            		</ax:form>  --%> 
            		                   
                    </div>
                   <div data-ax5grid="gridView2" data-fit-height-content="gridView2" style="height: 100%;"></div>
              </ax:split-panel>     
            </ax:split-panel>
        </ax:split-layout>
    </jsp:body>
   </ax:layout>