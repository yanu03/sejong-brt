<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${pageRemark}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
	<jsp:attribute name="js">
	
        <script src="https://vjs.zencdn.net/ie8/1.1.2/videojs-ie8.min.js"></script>
        <link href="https://vjs.zencdn.net/7.6.6/video-js.css" rel="stylesheet" />
    </jsp:attribute>

    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" />
        <ax:script-lang key="ax.admin" var="ADMIN"/>
        <script type="text/javascript" src="<c:url value='/assets/js/view/BM0605/BM0605.js' />"></script>
    </jsp:attribute>


    <jsp:body>
        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='ax.admin.search' width="300px">
                            <ax:input type="text" name="filter" id="filter" clazz="form-control" placeholder="ax.admin.BM0605S0.search"/>
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
                        <h2><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.BM0605G0.title"/> </h2>
                    </div>
                    <div class="right">

                    </div>
                </div>
                <div data-ax5grid="gridView0" data-fit-height-content="gridView0" style="height: 300px;"></div>
            </ax:split-panel>
            <ax:splitter></ax:splitter>
            <ax:split-panel width="500" style="padding-left: 10px;" scroll="scroll">
                <!-- 폼 -->
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h2><i class="cqc-news"></i>
                            <ax:lang id="ax.admin.BM0605F0.title"/>
                        </h2>
                    </div>
                </div>
                
                <ax:form name="formView0" id="formView0">
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0605G0.vdoId" width="300px" labelClazz="required">
                    			<input type="text" name="vdoId" data-ax-path="vdoId" data-key="true" class="form-control" readonly="readonly"/>
                    		</ax:td>
                    		<ax:td label="ax.admin.BM0605G0.vdoNm" width="300px" labelClazz="required">
                    			<input type="text" name="vdoNm" data-ax-path="vdoNm" data-key="true" class="form-control"/>
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0605G0.conNm" width="300px" labelClazz="required">
                    			<div class="input-group">
	                        		<input type="text" data-ax-path="conId" name="conId" data-key="true" class="form-control W70" readonly="readonly">
	                        		<input type="text" data-ax-path="conNm" name="conNm" data-key="true" class="form-control W70" readonly="readonly">
                        			<button type="button" id="selectButton" class="btn btn-primary" data-form-view-0-btn="selectBM0301">
	                                	<ax:lang id="ax.admin.select"/>
	                            	</button>
	                        	</div>
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0605F0.playTerm" width="400px" labelClazz="required">
	                            <div class="input-group" data-ax5picker="date">
	                                <input type="text" name="playStDate" data-ax-path="playStDate" title="<ax:lang id="ax.admin.BM0605G0.playStDate"/>" class="form-control" placeholder="0000-00-00" data-ax5formatter="date" data-ax-validate="required">
	                                <span class="input-group-addon">~</span>
	                                <input type="text" name="playEdDate" data-ax-path="playEdDate" title="<ax:lang id="ax.admin.BM0605G0.playEdDate"/>" class="form-control" placeholder="0000-00-00" data-ax5formatter="date" data-ax-validate="required">
	                                <span class="input-group-addon"><i class="cqc-calendar"></i></span>
	                            </div>
                    		</ax:td>

                    	</ax:tr>
                    	
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0605G0.fileType" width="300px" labelClazz="required">
                    			<ax:SM0105 groupCd="FILE_TYPE" name="fileType" dataPath="fileType" clazz="form-control" id="fileType"/>
                    		</ax:td>

                    		<ax:td label="ax.admin.BM0605G0.imgPlayTm" width="300px">
								<input type="text" name="imgPlayTm" id="imgPlayTm" data-ax-path="imgPlayTm" data-key="true" class="form-control"/>
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0605F0.attFile" width="300px" labelClazz="required">
                    			<input type="file" name="vdoFile" data-ax-path="vdoFile" data-key="true" class="form-control" id="vdoFile"
                    				                                onchange="preview_Change(this);" style="width: 300px;" />
                    		 <!-- 
                    			<input style="" type="file" accept="image/*" data-ax-path="upFile" id="upFile" name="upFile" onchange="javascript:getThumbnailPreview(this,$('#selectFile'),$('#videoSelect'));" />
                    		  -->
                    		</ax:td>
                    	</ax:tr>
                    	

                    	<ax:tr style="height:200px;">
                    		<ax:td labelStyle="height:200px;" label="ax.admin.BM0605F0.preview" width="300px">
                  
                    			 <div id="imagePreview" style="width:320;height:180;border:1px solid #eee;"></div>
                    			 
                    			 <video
								    id="videoPreview"
								    class="video-js"
								    controls
								    preload="auto"
								    width="320"
								    height="180"
								    poster=""
								    data-setup="{}"
								 ></video>
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0605G0.remark" width="300px">
                    			<input type="text" maxlength="200" name="remark" data-ax-path="remark" data-key="true" class="form-control"/>
                    		</ax:td>
                    	</ax:tr>
                    	 
                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>