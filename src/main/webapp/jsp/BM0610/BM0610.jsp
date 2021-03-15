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
        <script type="text/javascript" src="<c:url value='/assets/js/view/BM0610/BM0610.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H3"></div>
        </div>


        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="*" style="padding-right: 10px;">
                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="gridView0">
                    <div class="left">
                        <h3><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.BM0610G0.title"/> </h3>
                    </div>
                    <div class="right">
			            <button type="button" id="uplist" class="btn btn-default" data-page-btn="upItem" style="width:20px">
		            		↑
		            	</button>
		            	
		            	<button type="button" id="dnlist" class="btn btn-default" data-page-btn="downItem" style="width:20px">
		            		↓
		            	</button>
		               	<button type="button" id="updateSort" class="btn btn-default" data-page-btn="updateSort" style="width:70px">
		            		순서저장
		               	</button>
		            </div>
                </div>
                <div data-ax5grid="gridView0" data-fit-height-content="gridView0" style="height: 300px;"></div>
            </ax:split-panel>
            
            <ax:splitter></ax:splitter>
            
            <ax:split-panel width="500" style="padding-left: 10px;" scroll="scroll">
                <!-- 폼 -->
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h3><i class="cqc-news"></i>
                            <ax:lang id="ax.admin.BM0610F0.title"/>
                        </h3>
                    </div>
                </div>
                <ax:form name="formView0">
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                        <ax:tr>
                            <ax:td label="ax.admin.BM0610G0.ildId" width="200px" labelClazz="required">
                                <input type="text" data-ax-path="ildId" data-key="true" class="form-control W90" readonly="readonly"/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr>
                            <ax:td label="ax.admin.BM0610G0.ildNm" width="200px" labelClazz="required">
                                <input type="text" data-ax-path="ildNm" class="form-control W150" data-ax-validate="required" maxlength="20"/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr>
                            <ax:td label="ax.admin.BM0610G0.seq" width="150px">
                                <input type="text" data-ax-path="seq" data-key="true" class="form-control" readonly="readonly" maxlength="2"/>
                            </ax:td>
						</ax:tr>
						<ax:tr>
                            <ax:td label="ax.admin.BM0610G0.txtA" width="100%">
                            	<textarea data-ax-path="txtA" id="txtA" class="form-control" maxlength="120" onkeyup="currentLength('A')"></textarea>
                            	<div id="txtALen" style="text-align: right;"></div>
                            </ax:td>
                        </ax:tr>
                        <ax:tr>
                            <ax:td label="ax.admin.BM0610G0.txtB" width="100%">
                            	<textarea data-ax-path="txtB" id="txtB" class="form-control" maxlength="120" onkeyup="currentLength('B')"></textarea>
                            	<div id="txtBLen" style="text-align: right;"></div>
                            </ax:td>
                       	</ax:tr>
                       	<ax:tr>
                            <ax:td label="ax.admin.BM0610G0.remark" width="100%">
                            	<textarea data-ax-path="remark" class="form-control" maxlength="200"></textarea>
                            </ax:td>
                       	</ax:tr>
                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>