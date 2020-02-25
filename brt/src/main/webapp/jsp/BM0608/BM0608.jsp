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
        <script type="text/javascript" src="<c:url value='/assets/js/view/BM0608/BM0608.js' />"></script>
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
                        <h3><i class="cqc-list"></i>노선목록</h3>
                    </div>
                    <div class="right">
						<!-- 우측에 필요시 -->
                    </div>
                </div>
                <div data-ax5grid="gridView0" data-fit-height-content="gridView0" style="height: 300px;"></div>
            </ax:split-panel>
            <ax:splitter></ax:splitter>
            <ax:split-panel width="620" style="padding-left: 10px;" scroll="scroll">
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h3><i class="cqc-news"></i>표출정보</h3>
                    </div>
                    <div class="right">
						<!-- 우측에 필요시 -->
                    </div>
                </div>
                <ax:form name="formView0">
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                        <ax:tr>
                            <ax:td label="템플릿ID" width="300px" labelClazz="required">
                                <input type="text" id="setId" data-ax-path="setId" data-key="true" title="<ax:lang id="ax.admin.BM0608F0.tplId"/>" class="form-control" readonly="readonly"/>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="템플릿명" width="300px" labelClazz="required">
                                <input type="text" id="setNm" data-ax-path="setNm" title="<ax:lang id="ax.admin.BM0608F0.tplNm"/>" class="form-control" required="required"/>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="전체배경" width="100%" labelClazz="required">
								<input type="file" id="background" name="background" class="pngFile" accept="image/png"/>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="정류장안내" width="100%" labelClazz="required">
								<input type="file" id="land" name="land" accept="image/png" class="pngFile"/>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="이번정류장" width="100%" labelClazz="required">
								<input type="file" id="nextstopbg" name="nextstopbg" accept="image/png" class="pngFile"/>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="글씨 색 일괄 변경" width="300px">
                                <input type="text" id="fontAll" data-ax-path="fontAll" title="<ax:lang id="ax.admin.BM0608F0.fontAll"/>" class="form-control"/>
                                <input type="button" value="변경" style="float:left;">
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="구역별 글씨 색" width="100%" labelClazz="required">
	                             <div data-ax5grid="gridView1" style="min-height:280px;height:790px;"></div>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="비고" width="300px">
                            	<textarea data-ax-path="remark" class="form-control" title="<ax:lang id="ax.admin.BM0608F0.remark"/>" maxlength="200"></textarea>
                            </ax:td>
                        </ax:tr>
                        
                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>