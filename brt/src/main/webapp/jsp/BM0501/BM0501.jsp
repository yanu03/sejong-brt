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
        <script type="text/javascript" src="<c:url value='/assets/js/view/BM0501/BM0501.js' />"></script>
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
            <div class="H10"></div>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="*" style="padding-right: 10px;">
                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="gridView0">
                    <div class="left">
                        <i class="cqc-list"></i>노선목록
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
                        <i class="cqc-news"></i>표출정보
                    </div>
                    <div class="right">
						<!-- 우측에 필요시 -->
                    </div>
                </div>
                <ax:form name="formView0">
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                        <ax:tr>
                            <ax:td label="장치유형" width="100%" labelClazz="required">
                            	<div data-ax5select="selectType" id="selectBox"></div>
                            	<!-- 
                                <ax:SM0105 groupCd="DVC_TYPE" id="dvcType" name="dvcType" dataPath="dvcType" clazz="form-control"/>
                            	 -->
                            </ax:td>
                        </ax:tr>
                        <ax:tr>
                            <ax:td label="노선표시파일" width="100%" labelClazz="required">
								<input type="file" id="bmpFile" name="bmpFile" accept="image/bmp" onchange="preview_ChangeImage(this, 'previewImg');"/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr>
                            <ax:td label="동작설정" width="100%" labelClazz="required">
	                             <!-- 그리드 -->
	                             <div data-ax5grid="gridView1" style="min-height:280px;height:340px;"></div>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="미리보기" width="100%" style="height: 100px;">
	                             	<div>
	                             		<img id="previewImg" src="#" alt="행선지안내기 미리보기" onError="/assets/videos/BM0605/Default.png"></div>
                            </ax:td>
                        </ax:tr>
                        
                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>