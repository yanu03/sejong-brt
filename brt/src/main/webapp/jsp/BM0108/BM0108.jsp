<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${pageRemark}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" />
        <ax:script-lang key="ax.admin" var="ADMIN"/>
        <script type="text/javascript" src="<c:url value='/assets/js/view/BM0108/BM0108.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='ax.admin.search' width="300px">
                            <ax:input type="text" name="filter" id="filter" clazz="form-control" placeholder="ax.admin.BM0108S0.search"/>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>


        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="500" style="padding-right: 10px;">
                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="gridView0">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.BM0108G0.title"/> </h2>
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
                            <ax:lang id="ax.admin.BM0108F0.title"/>
                        </h2>
                    </div>
                </div>
                
                <ax:form name="formView0" id="formView0">
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0108F0.eplyId" width="300px" labelClazz="required">
                    			<input type="text" name="eplyId" data-ax-path="eplyId" data-key="true" class="form-control" readonly="readonly"/>
                    		</ax:td>
                    		<ax:td label="ax.admin.BM0108F0.eplyNm" width="300px" labelClazz="required">
                    			<input type="text" name="eplyNm" data-ax-path="eplyNm" data-key="true" class="form-control"/>
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0108F0.phone" width="300px" labelClazz="required">
                    			<input type="text" name="phone" data-ax-path="phone" data-key="true" class="form-control"/>
                    		</ax:td>
                    		<ax:td label="ax.admin.BM0108F0.corpId" width="300px" labelClazz="required">
                    			<div class="input-group">
	                        		<input type="text" data-ax-path="corpId" name="corpId" data-key="true" class="form-control W70" readonly="readonly">
	                        		<input type="text" data-ax-path="corpNm" name="corpNm" data-key="true" class="form-control W70" readonly="readonly">
                        			<button type="button" id="selectButton" class="btn btn-primary" data-form-view-0-btn="selectBM0101">
	                                	<ax:lang id="ax.admin.select"/>
	                            	</button>
	                        	</div>
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0108F0.busDiv" width="300px" labelClazz="required">
                    			<ax:common-code groupCd="BUS_DIV" name="busDiv" dataPath="busDiv" clazz="form-control" />
                    		</ax:td>
                    		<ax:td label="ax.admin.BM0108F0.retireYn" width="300px" labelClazz="required">
                    			<ax:common-code groupCd="RETIRE_YN" name="retireYn" dataPath="retireYn" clazz="form-control" type="radio"/>
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0108F0.eplyDate1" width="300px" labelClazz="required">
	                            <div class="input-group" data-ax5picker="date">
 	                          		<input  readonly="readonly" type="text" class="form-control" id="eplyDate1" data-ax5formatter="date" placeholder="yyyy/mm/dd" data-ax-path="eplyDate1" name="eplyDate1" />
	                                <span class="input-group-addon"><i class="cqc-calendar"></i></span>
	                            </div>
                    		</ax:td>

                    		<ax:td label="ax.admin.BM0108F0.eplyDate2" width="300px">
                    			<div class="input-group" data-ax5picker="date">
	                                <input readonly="readonly" type="text" class="form-control" placeholder="yyyy/mm/dd" data-ax-path="eplyDate2" name="data-ax-path"/>
	                                <span class="input-group-addon"><i class="cqc-calendar"></i></span>
	                            </div>
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0108F0.licenNo" width="300px" labelClazz="required">
                    			<input type="text" name="licenNo" data-ax-path="licenNo" data-key="true" class="form-control"/>
                    		</ax:td>
                    		<ax:td label="ax.admin.BM0108F0.certiDate" width="300px" labelClazz="required">
                    			<div class="input-group" data-ax5picker="date">
	                                <input readonly="readonly" type="text" class="form-control" placeholder="yyyy/mm/dd" data-ax-path="certiDate" name="certiDate"/>
	                                <span class="input-group-addon"><i class="cqc-calendar"></i></span>
	                            </div>
                    		</ax:td>
                    	</ax:tr>
                    	<ax:tr style="height:300px;">
                    		<ax:td labelStyle="height:300px;" label="ax.admin.BM0108F0.attFile" width="300px">
                    			<div style="width: 180px;height: 260px;">
	                                <img id="previewImg" src="#" alt="승무사원 이미지" style="width:180px;height:250px">
                    			</div>
                    			<div class="input-group">
	                                <input type="file" name="imgFile" class="form-control" id="employeeImg"
	                                onchange="preview_ChangeImage(this);"
	                                onError="preview_Image();"
	                                style="width: 300px;" />
	                        	</div>
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0108F0.remark" width="300px">
                    			<input type="text" maxlength="100" name="remark" data-ax-path="remark" data-key="true" class="form-control"/>
                    		</ax:td>
                    	</ax:tr>
                    	 
                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>