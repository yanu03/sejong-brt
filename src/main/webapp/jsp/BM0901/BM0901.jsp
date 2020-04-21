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
        <script type="text/javascript" src="<c:url value='/assets/js/view/BM0901/BM0901.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='ax.admin.search' width="300px">
                            <ax:input type="text" name="filter" id="filter" clazz="form-control" placeholder="템플릿ID 또는 템플릿명"/>
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
                        <h3><i class="cqc-list"></i>템플릿 목록</h3>
                    </div>
                    <div class="right">
						<!-- 우측에 필요시 -->
                    </div>
                </div>
                <div data-ax5grid="gridView0" data-fit-height-content="gridView0" style="height: 300px;"></div>
            </ax:split-panel>
            <ax:splitter></ax:splitter>
            <ax:split-panel width="460" style="padding-left: 10px;" scroll="scroll">
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h3><i class="cqc-news"></i>표출 정보</h3>
                    </div>
                </div>
                <ax:form name="formView0">
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                        <ax:tr>
                            <ax:td label="ax.admin.BM0901G0.setId" width="300px" labelClazz="required">
                                <input type="text" style="width:100px;" id="setId" data-ax-path="setId" data-key="true" title="<ax:lang id="ax.admin.BM0901G0.setId"/>" class="form-control" readonly="readonly"/>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="ax.admin.BM0901G0.setNm" width="300px" labelClazz="required">
                                <input type="text" id="setNm" style="width:220px;" data-ax-path="setNm" title="<ax:lang id="ax.admin.BM0901G0.setNm"/>" class="form-control" data-ax-validate="required" maxlength="16"/>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="ax.admin.BM0901G0.timeKo" width="50%" labelClazz="required">
								<input name="timeKo" id="timeKo" title="<ax:lang id="ax.admin.BM0901G0.timeKo"/>"
									 data-ax-path="timeKo" class="form-control" min="0" maxlength="3" oninput="maxLengthCheck(this)" type="number" style="width:50px;" data-ax-validate="required"/>
                            </ax:td>
                            <ax:td label="ax.admin.BM0901G0.timeEn" width="50%" labelClazz="required" style="border-left: 1px solid #D8D8D8;">
                            <input name="timeEn" id="timeEn" title="<ax:lang id="ax.admin.BM0901G0.timeEn"/>"
									 data-ax-path="timeEn" class="form-control" min="0" maxlength="3" oninput="maxLengthCheck(this)" type="number" style="width:50px;" data-ax-validate="required"/>
                            </ax:td>
                        </ax:tr>
                        
                        
                        <ax:tr>
                            <ax:td label="ax.admin.BM0901G0.category" width="100%" labelClazz="required">
								<ax:SM0105 groupCd="CATEGORY_LOC" id="category" style="width:100px;" name="category" dataPath="category"/>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="ax.admin.BM0901G0.frame" width="100%" labelClazz="required">
                            	<div style="float:left; width:50%;text-align:center">
                            		<img alt="전자노선도 좌측" src="/assets/images/BM0901/0.jpg" style="width:100px;">
                            	</div>
                            	<div style="float:left;width:50%;text-align:center"">
                            		<img alt="전자노선도 좌측" src="/assets/images/BM0901/1.jpg" style="width:100px;">
                            	</div>
                            	<div style="padding-left:5px;" id="frameDiv">
	                            	<ax:SM0105 groupCd="FRAME_LOC" id="frame" name="frame" dataPath="frame" type="radio"/>
                            	</div>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="ax.admin.BM0901G0.font" width="100%" labelClazz="required">
	                            <ax:SM0105 groupCd="FONT" id="font" width="150px" name="font" dataPath="font"/>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="ax.admin.BM0901G0.remark" width="100%">
                            	<textarea data-ax-path="remark" class="form-control" maxlength="200"></textarea>
                            </ax:td>
                        </ax:tr>
                        
                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>