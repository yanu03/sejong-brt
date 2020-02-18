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
        <script type="text/javascript" src="<c:url value='/assets/js/view/BM0102/BM0102.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='ax.admin.search' width="300px">
                            <ax:input type="text" name="filter" id="filter" clazz="form-control" placeholder="ax.admin.BM0102S0.search"/>
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
                        <h3><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.BM0102G0.title"/> </h3>
                    </div>
                    <div class="right">

                    </div>
                </div>
                <div data-ax5grid="gridView0" data-fit-height-content="gridView0" style="height: 300px;"></div>
            </ax:split-panel>
            <ax:splitter></ax:splitter>
            
            <ax:split-panel width="500" style="padding-left: 10px; height:100%; padding-bottom:490px;">
            
            <ax:split-panel width="500" style="padding-left: 10px; height:450px;" scroll="scroll">
                <!-- 폼 -->
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h3><i class="cqc-news"></i>
                            <ax:lang id="ax.admin.BM0102F0.title"/>
                        </h3>
                    </div>
                </div>
                <ax:form name="formView0">
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                        <ax:tr>
                            <ax:td label="ax.admin.BM0102F0.cust.id" width="300px" labelClazz="required">
                                <input type="text" data-ax-path="custId" data-key="true" class="form-control" readonly="readonly"/>
                            </ax:td>
                        <ax:tr>
                        </ax:tr>
                            <ax:td label="ax.admin.BM0102F0.cust.name" width="300px" labelClazz="required">
                                <input type="text" data-ax-path="custNm" title="<ax:lang id="ax.admin.BM0102F0.cust.name"/>" class="form-control" data-ax-validate="required" maxlength="20"/>
                            </ax:td>
                        </ax:tr>
                    </ax:tbl>
                    <p>
					<ax:tbl clazz="ax-form-tbl" minWidth="500px">
						<ax:tr>
                            <ax:td label="ax.admin.BM0102F0.corp.no" width="200px">
                                <input type="text" numberOnly data-ax-path="corpNo" class="form-control" maxlength="10" />
                            </ax:td>
						<ax:tr>
						</ax:tr>
                            <ax:td label="ax.admin.BM0102F0.email" width="300px">
                            	<input type="text" data-ax-path="email" class="form-control" maxlength="50"/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr>
                            <ax:td label="ax.admin.BM0102F0.phone" width="200px">
                            	<input type="text" numberOnly data-ax-path="phone" class="form-control" maxlength="11"/>
                            </ax:td>
                            <ax:td label="ax.admin.BM0102F0.fax" width="200px" style="border-left: 1px solid #D8D8D8;">
                            	<input type="text" numberOnly data-ax-path="fax" class="form-control" maxlength="11"/>
                            </ax:td>
                       	</ax:tr>
                    </ax:tbl>
                    <p>
					<ax:tbl clazz="ax-form-tbl" minWidth="500px">
                       	<ax:tr>
                            <ax:td label="ax.admin.BM0102F0.addr1" width="450px">
                            	<input type="text" data-ax-path="addr1" class="form-control" maxlength="50"/>
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                       		<ax:td label="ax.admin.BM0102F0.zip.no" width="200px">
                            	<input type="text" numberOnly data-ax-path="zipNo" class="form-control" maxlength="6"/>
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                            <ax:td label="ax.admin.BM0102F0.addr2" width="450px">
                            	<input type="text" data-ax-path="addr2" class="form-control" maxlength="50"/>
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                            <ax:td label="ax.admin.BM0102F0.remark" width="450px">
                            	<textarea data-ax-path="remark" class="form-control" maxlength="200"></textarea>
                            </ax:td>
                       	</ax:tr>
                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
            
            <ax:split-panel width="500" style="padding-left: 10px; height:100%;">
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h3><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.BM0102G1.title"/>
                        </h3>
                    </div>
                    
                    <div class="right">
                    	
                    	<button class="btn btn-default" data-grid-control="row-add">추가</button>
                    	<button class="btn btn-default" data-grid-control="row-del">삭제</button>
                    </div>
                </div>

                <div data-ax5grid="gridView1" data-fit-height-content="gridView1" style="height: 200px;"></div>
            
            </ax:split-panel>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>