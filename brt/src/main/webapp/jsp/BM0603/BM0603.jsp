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
        <script type="text/javascript" src="<c:url value='/assets/js/view/BM0603/BM0603.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">      	
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='ax.admin.search' width="300px">
                            <ax:input type="text" name="filter" id="filter" clazz="form-control" placeholder="ax.admin.BM0603S0.search"/>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>


        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="*" style="padding-right: 10px;">
                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="gridView0">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.BM0603G0.title"/>
                        </h2>
                    </div>
                    <div class="right">

                    </div>
                </div>
                <div data-ax5grid="gridView0" data-fit-height-content="gridView0" style="height: 300px;"></div>
            </ax:split-panel>
            <ax:splitter></ax:splitter>
            <ax:split-panel width="700" style="padding-left: 10px;" scroll="scroll">
                <!-- 폼 -->
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h2><i class="cqc-news"></i>
                             <ax:lang id="ax.admin.BM0603F0.title"/>
                        </h2>
                    </div>
                </div>
                <ax:form name="formView0">                 
                    <ax:tbl clazz="ax-form-tbl" minWidth="700px">
                     	<ax:tr>
							<ax:td label="ax.admin.BM0603G0.usernewsid" width="200px" labelClazz="required">
								<input type="text" data-ax-path="userNewsId" data-key="true" class="form-control" readonly="readonly">
							</ax:td>						                
                    	</ax:tr>
                    
                        <ax:tr>
                            <ax:td label="ax.admin.BM0603G0.newstitle" width="230px" labelClazz="required">
                                <input type="text" data-ax-path="newsTitle" class="form-control" data-ax-validate="required"/>
                            </ax:td>
                        </ax:tr>                                          	
						
						<ax:tr>
                       		<ax:td label="ax.admin.BM0603G0.newscontents" width="600px" labelClazz="required">
                            	<textarea data-ax-path="newsContents" class="form-control" style="height: 100px;"></textarea>
                            </ax:td>
                       	</ax:tr>
						
                       	<ax:tr>
                       		<ax:td label="ax.admin.BM0602F0.remark" width="600px">
                            	<textarea data-ax-path="remark" class="form-control" style="height: 50px;"></textarea>
                            </ax:td>
                       	</ax:tr>
 
                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>