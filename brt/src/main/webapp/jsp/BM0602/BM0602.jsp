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
        <script type="text/javascript" src="<c:url value='/assets/js/view/BM0602/BM0602.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='ax.admin.search' width="300px">
                            <ax:input type="text" name="filter" id="filter" clazz="form-control" placeholder="ax.admin.BM0602G0.provnm"/>
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
                            <ax:lang id="ax.admin.BM0602G0.title"/>
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
                             <ax:lang id="ax.admin.BM0602F0.title"/>
                        </h2>
                    </div>
                </div>
                <ax:form name="formView0">                 
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                     	<ax:tr>
							<ax:td label="ax.admin.BM0602G0.provid" width="200px" labelClazz="required">
								<input type="text" data-ax-path="provId" data-key="true" class="form-control" readonly="readonly">
							</ax:td>						                
                    	</ax:tr>
                    
                        <ax:tr>
                            <ax:td label="ax.admin.BM0602G0.provnm" width="230px" labelClazz="required">
                                <input type="text" data-ax-path="provNm" class="form-control" data-ax-validate="required"/>
                            </ax:td>
                            <div style="position:absolute; top: 60px; right:140px;">
                            	<ax:td>*제공처명(신문사명)을 정확하게 작성해주세요.</ax:td>                        	                            
                            </div>
                        </ax:tr>                                          	
                        
                        <ax:tr>
                            <ax:td label="ax.admin.BM0602F0.provurl" style="position:relation;" width="370px" labelClazz="required">
                            	<input type="text" data-ax-path="provUrl" class="form-control" data-ax-validate="required"/>
                            </ax:td>
                            <div style="position:absolute; top: 100px; right:10px;">
                            	<ax:td>*Rss형식만 지원합니다.</ax:td>                        	                            
                            </div>
                       	</ax:tr>

                       	<ax:tr>
                       		<ax:td label="ax.admin.BM0602F0.remark" width="100%">
                            	<textarea data-ax-path="remark" class="form-control" style="height: 100px"></textarea>
                            </ax:td>
                       	</ax:tr>
 
                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>