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
        <script type="text/javascript" src="<c:url value='/assets/js/view/BM0201/BM0201.js' />"></script>
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
            <div class="H10"></div>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="600" style="padding-right: 10px;">
                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="gridView0">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.BM0103G0.title"/>
                        </h2>
                    </div>
                    <div class="right">

                    </div>
                </div>
                <div data-ax5grid="gridView0" data-fit-height-content="gridView0" style="height: 300px;"></div>
            </ax:split-panel>
            <ax:splitter></ax:splitter>
            <ax:split-panel width="*" style="padding-left: 10px;" scroll="scroll">
                <!-- 폼 -->
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h2><i class="cqc-news"></i>
                             <ax:lang id="ax.admin.BM0201F0.title"/>
                        </h2>
                    </div>
                </div>
                <ax:form name="formView0">                  
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                    
                     	<ax:tr>
							<ax:td label="ax.admin.BM0201F0.dvcid" width="300px" labelClazz="required">
								<input type="text" id="dvcId" data-ax-path="dvcId" data-key="true" class="form-control" readonly="readonly">
							</ax:td>                         
                             <ax:td label="ax.admin.BM0201F0.maker" width="300px">
                            	<ax:common-code groupCd="DVC_MAKER" dataPath="maker" clazz="form-control"/>
                            </ax:td>                  
                    	</ax:tr>
                    
						 <ax:tr>
							<ax:td label="ax.admin.BM0201F0.dvckind" width="300px" labelClazz="required">
                            	<ax:common-code groupCd="DVC_KIND" dataPath="dvcKind" clazz="form-control"/>
                            </ax:td>
                                          
                            <ax:td label="ax.admin.BM0201F0.dvctype" width="300px" labelClazz="required">
                            	<ax:common-code groupCd="DVC_TYPE" dataPath="dvcType" clazz="form-control"/>
                            </ax:td>                  		
						</ax:tr>              
                 		                    
                        
                        <ax:tr>
                            <ax:td label="ax.admin.BM0201F0.instloc" width="600px" labelClazz="required">
                            	<ax:common-code groupCd="INST_LOC" dataPath="instloc" clazz="form-control"/>
                            </ax:td>                           
                        </ax:tr>                     	
                        
                        <ax:tr>
                            <ax:td label="ax.admin.BM0201F0.mngid" width="300px" labelClazz="required">
                            	<input type="text" data-ax-path="mngId" class="form-control" data-ax-validate="required"/>
                            </ax:td>
                            <ax:td label="ax.admin.BM0201F0.dvcip" width="300px">
                            	<input type="text" data-ax-path="dvcIp" class="form-control"/>
                            </ax:td>
                       	</ax:tr>                                             	
        
                       	<ax:tr>
                       		<ax:td label="ax.admin.BM0301F0.remark" width="100%">
                            	<input type="text" data-ax-path="remark" class="form-control"/>
                            </ax:td>
                       	</ax:tr>                      	
                    </ax:tbl>
                    
                    <div class="ax-button-group">
                        <div class="left">
                            <h3>
                                <i class="cqc-list"></i>
                                <ax:lang id="ax.admin.BM0201G1.title"/>
                            </h3>
                        </div>
                    </div>
                    <div data-ax5grid="gridView1" style="height: 300px;"></div>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
   </ax:layout>