<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags"%>

<ax:set key="title" value="${pageName}" />
<ax:set key="page_desc" value="${pageRemark}" />
<ax:set key="page_auto_height" value="true" />

<ax:layout name="base">
	<jsp:attribute name="js">
        <script
			src="https://vjs.zencdn.net/ie8/1.1.2/videojs-ie8.min.js"></script>
        <link href="https://vjs.zencdn.net/7.6.6/video-js.css"
			rel="stylesheet" />

		<link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid.min.css" />
		<link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid-theme.min.css" />
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid.min.js"></script>
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
	        <ax:split-panel width="570" style="height:800px;">
	            <ax:split-panel width="100%"
					style="height:400px; padding-right: 10px;">
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
						data-fit-height-content="gridView0" style="height: 300px;"></div>
	            </ax:split-panel>
            	<div class="ax-button-group"
					data-fit-height-aside="formView0">
            		<div class="left">
			            <h3>
							<i class="cqc-news"></i>
			            	<ax:lang id="ax.admin.BM0606F0.title" /> </h3>
            		</div>
            	</div>
	            <ax:form name="formView0" id="formView0"
					style="padding-right:20px">
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0606G0.orgaId"
								width="300px" labelClazz="required">
                    			<input type="text" name="orgaId"
									data-ax-path="orgaId" data-key="true" class="form-control"
									readonly="readonly" />
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0606G0.orgaNm"
								width="300px" labelClazz="required">
                    			<input type="text" name="orgaNm"
									data-ax-path="orgaNm" class="form-control" />
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0606G0.vdoCnt"
								width="180px" labelClazz="required">
                    			<input type="text" name="vdoCnt"
									data-ax-path="vdoCnt" data-key="true" class="form-control"
									readonly="readonly" />
                    		</ax:td>
                    		
                    		<ax:td label="ax.admin.BM0606G0.ttTime"
								width="180px" labelClazz="required">
                    			<input type="text" name="ttTime"
									data-ax-path="ttTime" data-key="true" class="form-control"
									readonly="readonly" />
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0606G0.remark"
								width="300px">
                    			<input type="text" name="remark"
									data-ax-path="remark" class="form-control" />
                    		</ax:td>
                    	</ax:tr>
                    	
                    </ax:tbl>
                </ax:form>
	            

	        </ax:split-panel>
	        
            <ax:splitter></ax:splitter>
            
            <ax:split-panel width="*" height="100%" style="padding-left: 10px; padding-bottom:40px" scroll="">
            
	            <ax:split-panel width="500" style="height:300px">
	            	<div class="ax-button-group">
		            	<div class="left">
				            <h3>
								<i class="cqc-list"></i>
				                <ax:lang id="ax.admin.BM0606G1.title" />
				            </h3>
			            </div>
		            </div>
		            
	           		 <div data-ax5grid="gridView1"
						data-fit-height-content="gridView1" style="height:300px;"></div>

				</ax:split-panel>
	            
	            <ax:split-panel width="500" style="height:30px; margin-top:50px;">
	            	<div style="margin-left: 10px; margin-right: 10px; text-align:center;">
		            	<button type="button" class="btn btn-default" style="width: 70px;" data-page-btn="addPlayList">
		            		목록추가↓
		            	</button>
		            	
		            	<button type="button" class="btn btn-default" style="width: 70px;" data-page-btn="deletePlayList">
		            		목록제거↑
		            	</button>
	            	</div>
	            </ax:split-panel>
            
            	<ax:split-panel width="500" style="padding-bottom:55px;height:300px">
	            	<div class="ax-button-group">
		            	<div class="left">
				            <h3>
								<i class="cqc-list"></i>
				                <ax:lang id="ax.admin.BM0606G2.title" />
				            </h3>
			            </div>
			            <div class="right">
				            <button type="button" class="btn btn-default" data-page-btn="upItem">
			            		↑
			            	</button>
			            	
			            	<button type="button" class="btn btn-default" data-page-btn="downItem">
			            		↓
			            	</button>
			            </div>
		            </div>
		            
	            	<div data-ax5grid="gridView2"
						data-fit-height-content="gridView2" style="height:300px;"></div>

				</ax:split-panel>

            </ax:split-panel>
			
        </ax:split-layout>

    </jsp:body>
</ax:layout>