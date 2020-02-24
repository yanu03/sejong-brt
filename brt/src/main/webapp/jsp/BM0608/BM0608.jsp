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
        <style>
			.grid-cell-gray{
		        color: FFFFFF<!-- #F1F3F5 -->;
		    }
		</style>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='ax.admin.search' width="300px">
                            <ax:input type="text" name="filter" id="filter" clazz="form-control" placeholder="노선ID OR 노선명"/>
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
                                <input type="text" id="setId" data-ax-path="setId" title="<ax:lang id="ax.admin.BM0608F0.tplId"/>" class="form-control" readonly="readonly"/>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="템플릿명" width="300px" labelClazz="required">
                                <input type="text" id="setNm" data-ax-path="setNm" title="<ax:lang id="ax.admin.BM0608F0.tplNm"/>" class="form-control" required="required"/>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="전체배경" width="100%" labelClazz="required">
								<input type="file" id="background" name="background" accept="image/bmp" onchange="preview_ChangeImage(this, 'previewImg');"/>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="영상부배경" width="100%" labelClazz="required">
								<input type="file" id="videoBg" name="videoBg" accept="image/bmp" onchange="preview_ChangeImage(this, 'previewImg');"/>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="현재정류장" width="100%" labelClazz="required">
								<input type="file" id="busstopBg" name="busstopBg" accept="image/bmp" onchange="preview_ChangeImage(this, 'previewImg');"/>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="글씨 색 일괄 변경" width="300px">
                                <input type="text" id="fontAll" data-ax-path="fontAll" title="<ax:lang id="ax.admin.BM0608F0.fontAll"/>" class="form-control"/>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="동작설정" width="100%" labelClazz="required">
	                             <div data-ax5grid="gridView1" style="min-height:280px;height:340px;"></div>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="비고" width="300px">
                                <input type="text" id="remark" data-ax-path="remark" title="<ax:lang id="ax.admin.BM0608F0.remark"/>" class="form-control"/>
                            </ax:td>
                        </ax:tr>
                        
                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>