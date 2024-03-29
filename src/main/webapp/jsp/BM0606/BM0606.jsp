<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags"%>

<ax:set key="title" value="${pageName}" />
<ax:set key="page_desc" value="${pageRemark}" />
<ax:set key="page_auto_height" value="true" />

<ax:layout name="base">
	<jsp:attribute name="js">
        <script type="text/javascript" src="<c:url value='/assets/js/videojs-ie8.min.js' />"></script>
        <link type="text/css" rel="stylesheet" href="<c:url value='/assets/css/video-js.css'/>" />

		<!-- <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid.min.css" />
		<link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid-theme.min.css" />
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid.min.js"></script> -->
		
		<link type="text/css" rel="stylesheet" href="<c:url value='/assets/css/jsgrid.min.css'/>" />
		<link type="text/css" rel="stylesheet" href="<c:url value='/assets/css/jsgrid-theme.min.css'/>" />
		<script type="text/javascript" src="<c:url value='/assets/js/jsgrid.min.js' />"></script>
    </jsp:attribute>

	<jsp:attribute name="script">
        <ax:script-lang key="ax.script" />
        <ax:script-lang key="ax.admin" var="ADMIN" />
        <script type="text/javascript"
			src="<c:url value='/assets/js/view/BM0606/BM0606.js' />"></script>
    </jsp:attribute>


	<jsp:body>
        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='ax.admin.search' width="300px">
                            <ax:input type="text" name="filter"
								id="filter" clazz="form-control"
								placeholder="ax.admin.BM0606S0.search" />
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H3"></div>
        </div>


      <ax:split-layout name="ax1" orientation="vertical">
	        <ax:split-panel width="*" style="height:100%;">
	            <ax:split-panel width="100%" style="height:100%; padding-right: 5px;">
	                <!-- 목록 -->
	                <div class="ax-button-group"
						data-fit-height-aside="gridView0">
	                    <div class="left">
	                        <h3>
								<i class="cqc-list"></i>
	                            <ax:lang id="ax.admin.BM0606G0.title" /> </h3>
	                    </div>
	                </div>
	                <div data-ax5grid="gridView0"
						data-fit-height-content="gridView0" style="height: 100%;"></div>
	            </ax:split-panel>
            	

	        </ax:split-panel>
	        
            <ax:splitter></ax:splitter>
            
            
            
            
            <ax:split-panel width="1010" height="100%" style="padding-left: 10px;" scroll="">
           		<ax:split-panel width="1010" height="200px">
           			<div class="ax-button-group" data-fit-height-aside="formView0">
	            		<div class="left">
				            <h3>
								<i class="cqc-news"></i>
				            	<ax:lang id="ax.admin.BM0606F0.title" />
				            </h3>
	            		</div>
            	</div>
	            <ax:form name="formView0" id="formView0"
					style="padding-right:5px">
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0606G0.orgaId"
								width="300px" labelClazz="required">
                    			<input type="text" name="orgaId"
									data-ax-path="orgaId" data-key="true" class="form-control"
									readonly="readonly" />
                    		</ax:td>
                    	
                    		<ax:td label="ax.admin.BM0606G0.orgaNm"
								width="300px" labelClazz="required" style="border-left: 1px solid #D8D8D8;">
                    			<input type="text" name="orgaNm"
									data-ax-path="orgaNm" class="form-control"/>
                    		</ax:td>
                    	
                    		<ax:td label="ax.admin.BM0606G0.vdoCnt"
								width="180px" labelClazz="required" style="border-left: 1px solid #D8D8D8;">
                    			<input type="text" name="vdoCnt"
									data-ax-path="vdoCnt" data-key="true" class="form-control"
									readonly="readonly" />
                    		</ax:td>
                    		
                    		<ax:td label="ax.admin.BM0606G0.ttTime"
								width="180px" labelClazz="required" style="border-left: 1px solid #D8D8D8;">
                    			<input type="text" name="ttTime"
									data-ax-path="ttTime" data-key="true" class="form-control"
									readonly="readonly" />
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0606G0.remark"
								width="100%">
									<textarea name="remark" data-ax-path="remark" class="form-control" maxlength="200"></textarea>
                    		</ax:td>
                    	</ax:tr>
                    	
                    </ax:tbl>
                </ax:form>
	            
           		</ax:split-panel>
           		
           		<ax:split-panel width="1200" style="padding-left:0px; height:100%; padding-bottom:90px;">
	            	<div style="width:450px; height:100%; float:left;">
	            	   	<div class="ax-button-group">
			            	<div class="left">
					            <h3>
									<i class="cqc-list"></i>
					                <ax:lang id="ax.admin.BM0606G1.title" />
					            </h3>
				            </div>
			            </div>
			            
		           		 <div data-ax5grid="gridView1"
							data-fit-height-content="gridView1" style="height:100%;"></div>
	            	</div>
	            	
	            	
	            	<div style="width:100px; height:100%; float:left; line-height:100px;">
	            		<div style="text-align:center; inline-height:100%;">
			            	<button type="button" id="addlist" class="btn btn-default" style="width: 50px; height:50px;" data-page-btn="addPlayList">
			            		->
			            	</button>
			            	
			            	<button type="button" id="rmvlist" class="btn btn-default" style="width: 50px; height:50px;" data-page-btn="deletePlayList">
			            		<-
			            	</button>
		            	</div>
	            	</div>
	            	
	            	<div style="width:450px; height:100%; float:left;">
	            		<div class="ax-button-group">
			            	<div class="left">
					            <h3>
									<i class="cqc-list"></i>
					                <ax:lang id="ax.admin.BM0606G2.title" />
					            </h3>
				            </div>
				            <div class="right">
					            <button type="button" id="uplist" class="btn btn-default" data-page-btn="upItem" style="width:20px">
				            		↑
				            	</button>
				            	
				            	<button type="button" id="dnlist" class="btn btn-default" data-page-btn="downItem" style="width:20px">
				            		↓
				            	</button>
				            </div>
			            </div>
			            
		            	<div data-ax5grid="gridView2" data-fit-height-content="gridView2" style="height:100%;"></div>
	            	</div>
            	</ax:split-panel>
			</ax:split-panel>			
        </ax:split-layout>

    </jsp:body>
</ax:layout>