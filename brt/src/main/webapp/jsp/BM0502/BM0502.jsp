<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${PAGE_REMARK}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="script">
        <script type="text/javascript" src="<c:url value='/assets/js/view/BM0502/BM0502.js' />"></script>
        <style>
			.grid-cell-gray{
		        color: #F1F3F5;
		    }
		    .grid-cell-black{
		    	color: #000000;
		    }
		</style>
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
            <div class="H10"></div>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="900" style="padding-right: 10px;">
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <i class="cqc-news"></i>전면 시정홍보
                    </div>
                    <div class="right">
						<!-- 우측에 필요시 -->
                    </div>
                </div>
                <ax:form name="formView0">
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                        <ax:tr>
                            <ax:td label="전면 행선지 안내기" width="100%" labelClazz="required">
								<input type="file" id="bmpFileF" name="bmpFileF" accept="image/bmp" onchange="preview_ChangeImage(this, 'previewImgF');"/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr>
                            <ax:td label="동작설정" width="100%" labelClazz="required">
	                             <!-- 그리드 -->
	                             <div data-ax5grid="gridView0" style="height: 280px;"></div>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="미리보기" width="100%" style="height: 100px;">
	                             	<div>
	                             		<img id="previewImgF" src="#" alt="전면 시정홍보 미리보기" onError="/assets/videos/BM0605/Default.png"></div>
                            </ax:td>
                        </ax:tr>
                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
            <ax:splitter></ax:splitter>
            <ax:split-panel width="*" style="padding-left:10px; height:100%;">
            	                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <i class="cqc-news"></i>측면 시정홍보
                    </div>
                    <div class="right">
						<!-- 우측에 필요시 -->
                    </div>
                </div>
                <ax:form name="formView1">
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px" style="height:100%;">
                        <ax:tr>
                            <ax:td label="측면 행선지 안내기" width="100%" labelClazz="required">
								<input type="file" id="bmpFileS" name="bmpFileS" accept="image/bmp" onchange="preview_ChangeImage(this, 'previewImgS');"/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr>
                            <ax:td label="동작설정" width="100%" labelClazz="required">
	                             <!-- 그리드 -->
	                             <div data-ax5grid="gridView1" style="height: 280px;"></div>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="미리보기" width="100%" style="height: 100px;">
	                             	<div>
	                             		<img id="previewImgS" src="#" alt="측면 시정홍보 미리보기" onError="/assets/videos/BM0605/Default.png"></div>
                            </ax:td>
                        </ax:tr>
                        
                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>