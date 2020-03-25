<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<meta http-equiv="Expires" content=0">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${pageRemark}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" />
        <ax:script-lang key="ax.admin" var="ADMIN"/>
        <script type="text/javascript" src="<c:url value='/assets/js/jquery.mask.js' />"></script>
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
            <div class="H3"></div>
        </div>


        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="*" style="padding-right: 10px;">
                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="gridView0">
                    <div class="left">
                        <h3><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.BM0108G0.title"/>
                        </h3>
                    </div>
                    <div class="right">
                    </div>
                </div>
                <div data-ax5grid="gridView0" data-fit-height-content="gridView0" style="height: 300px;"></div>
            </ax:split-panel>
            
            <ax:splitter></ax:splitter>
            
            <ax:split-panel width="800" style="padding-left: 10px;" scroll="scroll">
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h3><i class="cqc-news"></i>
                            <ax:lang id="ax.admin.BM0108F0.title"/>
                        </h3>
                    </div>
                </div>
                
                <ax:form name="formView0" id="formView0">
                    <ax:tbl clazz="ax-form-tbl" minWidth="800px">
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0108F0.eplyId" width="380px" labelClazz="required">
                    			<input type="text" name="eplyId" id="eplyId" numberOnly title="<ax:lang id="ax.admin.BM0108F0.eplyId"/>" data-ax-path="eplyId" data-key="true" class="form-control W70" maxlength="6" data-ax-validate="required"/>
                    		</ax:td>
                    		<ax:td label="ax.admin.BM0108F0.eplyNm" width="380px" labelClazz="required" style="border-left: 1px solid #D8D8D8;">
                    			<input type="text" name="eplyNm" title="<ax:lang id="ax.admin.BM0108F0.eplyNm"/>" data-ax-path="eplyNm" class="form-control W70" maxlength="4" data-ax-validate="required"/>
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0108F0.phone" width="380px" labelClazz="required">
                    			<input type="text" name="phone" numberOnly title="<ax:lang id="ax.admin.BM0108F0.phone"/>" data-ax-path="phone" class="form-control W100" maxlength="11" data-ax-validate="required"/>
                    		</ax:td>
                    		<ax:td label="ax.admin.BM0108F0.corpId" width="380px" labelClazz="required" style="border-left: 1px solid #D8D8D8;">
                    			<div class="input-group">
	                        		<div style="float:left;padding-right:5px;"><input type="text" title="<ax:lang id="ax.admin.BM0108F0.corpId"/>" data-ax-path="corpId" name="corpId" class="form-control W70" readonly="readonly" data-ax-validate="required"></div>
	                        		<div style="float:left;padding-right:5px;"><input type="text" data-ax-path="corpNm" name="corpNm" data-key="true" class="form-control W130" readonly="readonly"></div>
                        			<div style="float:left;padding-right:5px;"><button type="button" id="selectButton" class="btn btn-primary" data-form-view-0-btn="selectBM0101">
	                                		<ax:lang id="ax.admin.select"/>
	                            		</button>
	                            	</div>
	                        	</div>
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0108F0.busDiv" width="380px" labelClazz="required">
                    			<!-- 
                    			<ax:SM0105 groupCd="VHC_TYPE" name="busDiv" dataPath="busDiv" clazz="form-control W100"/>
                    			 -->
                    			 <ax:SM0105 groupCd="ARTI_TYPE" name="busDiv" dataPath="busDiv" clazz="form-control W100" style="width:120px;"/>
                    		</ax:td>
                    		<ax:td label="ax.admin.BM0108F0.eplyDate1" width="380px" labelClazz="required" style="border-left: 1px solid #D8D8D8;">
	                            <div class="input-group" data-ax5picker="date" style="width:100px;">
 	                          		<input type="text" class="form-control" id="eplyDate1" data-ax5formatter="date" placeholder="yyyy/mm/dd"
 	                          			title="<ax:lang id="ax.admin.BM0108F0.eplyDate1"/>"
 	                          			data-ax-path="eplyDate1" name="eplyDate1" readonly="readonly" data-ax-validate="required" />
 	                          			
	                                <span class="input-group-addon"><i class="cqc-calendar"></i></span>
	                            </div>
                    		</ax:td>

                    	</ax:tr>
                    	
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0108F0.licenNo" width="380px" labelClazz="required">
                    			<input type="text"  data-ax5formatter="license" name="licenNo" title="<ax:lang id="ax.admin.BM0108F0.licenNo"/>" data-ax-path="licenNo" class="form-control W120" maxlength="15" data-ax-validate="required"/>
                    		</ax:td>
                    		<ax:td label="ax.admin.BM0108F0.certiDate" width="380px" labelClazz="required" style="border-left: 1px solid #D8D8D8;">
                    			<div class="input-group" data-ax5picker="date" style="width:100px;">
	                                <input readonly="readonly" type="text" class="form-control" placeholder="yyyy/mm/dd"
	                                	title="<ax:lang id="ax.admin.BM0108F0.certiDate"/>"
	                                	data-ax-path="certiDate" name="certiDate" data-ax-validate="required"/>
	                                <span class="input-group-addon"><i class="cqc-calendar"></i></span>
	                            </div>
                    		</ax:td>
                    	</ax:tr>
                    	<ax:tr>
                    		<ax:td labelStyle="height:360px;" label="ax.admin.BM0108F0.attFile" width="380px" labelClazz="required">

								<div style="float:left;width:260px;border: 0px solid #D8D8D8;">
									<input type="file" id="employeeImg" name="employeeImg" accept="image/jpeg"
		                                onchange="preview_ChangeImage(this, 'previewImg');" data-ax-path="employeeImg"
		                                
									 />
								 </div>
								 <div style="float:left;width:260px;height:300px;padding:10px;border: 0px solid #D8D8D8;">
								 	<img id="previewImg" src="#" alt="승무사원 이미지" style="width:180px;"
	                                onError="preview_Image('previewImg');">
								 </div>

                    		</ax:td>
                    		<ax:td labelStyle="height:360px;" label="실명제판이미지" width="380px" style="border-left: 1px solid #D8D8D8;" labelClazz="required">

								<div style="float:left;width:260px;border:0px solid #D8D8D8;">
									<input type="file" id="certiImg" name="certiImg" accept="image/jpeg"
		                                onchange="preview_ChangeImage(this, 'previewImg2');" data-ax-path="certiImg"
									 />
								 </div>
								 <div style="float:left;width:260px;height:300px;padding:10px;border: 0px solid #D8D8D8;">
								 	<img id="previewImg2" src="#" alt="실명제판 이미지" style="width:180px;"
	                                onError="preview_Image('previewImg2');">
								 </div>

                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                      		<ax:td label="ax.admin.BM0108F0.retireYn" width="380px" labelClazz="required">
                    			<ax:SM0105 groupCd="RETIRE_YN" id="retireYn" name="retireYn" dataPath="retireYn" clazz="form-control" type="select"/>
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0108F0.remark" width="100%">
                    			<textarea maxlength="200" name="remark" data-ax-path="remark" class="form-control" ></textarea>
                    		</ax:td>
                    	</ax:tr>
                    	 
                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>