<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<<<<<<< HEAD
<ax:set key="page_desc" value="${PAGE_REMARK}"/>
=======
<ax:set key="page_desc" value="${pageRemark}"/>
>>>>>>> dev
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="script">
<<<<<<< HEAD
        <script type="text/javascript" src="<c:url value='/assets/js/view/BM0108/BM0108.js' />"></script>
=======
        <ax:script-lang key="ax.script" />
        <script type="text/javascript" src="<c:url value='/assets/js/view/BM0108/BM0108.js' />"></script>
        <%-- <script type="text/javascript" src="<c:url value='/assets/js/view/BM0102/BM0102.js' />"></script> --%>
>>>>>>> dev
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

<<<<<<< HEAD

=======
>>>>>>> dev
        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
<<<<<<< HEAD
                        <ax:td label='검색조건' width="300px">
                            <input type="text" class="form-control" />
                        </ax:td>
                        <ax:td label='검색조건 1' width="300px">
                            <input type="text" class="form-control" />
                        </ax:td>
                        <ax:td label='검색조건 2' width="300px">
                            <input type="text" class="form-control" />
=======
                        <ax:td label='ax.admin.search' width="300px">
                            <ax:input type="text" name="filter" id="filter" clazz="form-control" placeholder="ax.admin.BM0108S0.search"/>
>>>>>>> dev
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>

<<<<<<< HEAD
        <ax:split-layout name="ax1" orientation="horizontal">
            <ax:split-panel width="*" style="">

                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="grid-view-01">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                            프로그램 목록 </h2>
                    </div>
                    <div class="right">
                        <button type="button" class="btn btn-default" data-grid-view-01-btn="add"><i class="cqc-circle-with-plus"></i> 추가</button>
                        <button type="button" class="btn btn-default" data-grid-view-01-btn="delete"><i class="cqc-circle-with-plus"></i> 삭제</button>
                    </div>
                </div>
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>

=======

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
                            <ax:lang id="ax.admin.BM0102F0.title"/>
                        </h2>
                    </div>
                </div>
                <ax:form name="formView0">
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0108F0.eply.id" width="300px" labelClazz="required">
                    			<input type="text" data-ax-path="eplyId" data-key="true" class="form-control" readonly="readonly"/>
                    		</ax:td>
                    		<ax:td label="ax.admin.BM0108F0.eply.nm" width="300px" labelClazz="required">
                    			<input type="text" data-ax-path="eplyNm" data-key="true" class="form-control"/>
                    		</ax:td>
                    	</ax:tr>
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0108F0.phone" width="300px" labelClazz="required">
                    			<input type="text" data-ax-path="phone" data-key="true" class="form-control"/>
                    		</ax:td>
                    		<ax:td label="ax.admin.BM0108F0.corp.id" width="300px" labelClazz="required">
                    			<div class="input-group">
	                        		<input type="text" class="form-control" id="Keyword"  data-ax-path="Keyword" id="Keyword"/>
	                        		<span class="input-group-btn">
	                        			<button type="button" id="rightSearchButton" class="btn btn-primary" data-grid-view-01-btn="item-search">
		                                	<ax:lang id="ax.admin.search"/>
		                            	</button>
		                            </span>
	                        	</div>
                    		</ax:td>
                    	</ax:tr>
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0108F0.bus.div" width="300px" labelClazz="required">
	     					 	<select class="form-control" id="" name="" data-ax-path="busDiv" >
									 <option value="city"><ax:lang id="ax.admin.BM0108F0.bus.ct.in"/></option>
									 <option value="vilg"><ax:lang id="ax.admin.BM0108F0.bus.vilg"/></option>
									 <option value="cntry"><ax:lang id="ax.admin.BM0108F0.bus.cnty"/></option>
									 <option value="intct"><ax:lang id="ax.admin.BM0108F0.bus.ct.out"/></option>
									 <option value="fast"><ax:lang id="ax.admin.BM0108F0.bus.fast"/></option>
								</select>
                    		</ax:td>
                    		<ax:td label="ax.admin.BM0108F0.retire.yn" width="300px" labelClazz="required">
                    			<input type="checkbox" data-ax-path="retireYn" name="retireYn">
                    		</ax:td>
                    	</ax:tr>
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0108F0.eply.date1" width="300px" labelClazz="required">
	                            <div class="input-group" data-ax5picker="date">
<!-- 	                                <input type="text" class="form-control" placeholder="yyyy/mm/dd" data-ax-path="eplyDate1"/>
	                                <span class="input-group-addon"><i class="cqc-calendar"></i></span>
 -->	                                <input readonly="readonly" type="text" class="form-control" id="eplyDate1" onchange="" placeholder="yyyy/mm/dd" data-ax-path="eplyDate1" />
	                                <span class="input-group-addon"><i id="eplyDateCal1" class="cqc-calendar"></i></span>
	                                <div class="input-group">
	                            </div>
	                            </div>
                    		</ax:td>
                    		<ax:td label="ax.admin.BM0108F0.eply.date2" width="300px">
                    			<div class="input-group" data-ax5picker="date">
	                                <input type="text" class="form-control" placeholder="yyyy/mm/dd" data-ax-path="eplyDate2"/>
	                                <span class="input-group-addon"><i class="cqc-calendar"></i></span>
	                            </div>
                    		</ax:td>
                    	</ax:tr>
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0108F0.licen.no" width="300px" labelClazz="required">
                    			<input type="text" data-ax-path="licenNo" data-key="true" class="form-control"/>
                    		</ax:td>
                    		<ax:td label="ax.admin.BM0108F0.certi.date" width="300px" labelClazz="required">
                    			<div class="input-group" data-ax5picker="date">
	                                <input type="text" class="form-control" placeholder="yyyy/mm/dd" data-ax-path="certiDate"/>
	                                <span class="input-group-addon"><i class="cqc-calendar"></i></span>
	                            </div>
                    		</ax:td>
                    	</ax:tr>
                    	<ax:tr style="height:300px;">
                    		<ax:td labelStyle="height:300px;" label="ax.admin.BM0108F0.att.file" width="300px">
                    			사원이미지
                    			<div class="input-group">
	                        		
		                            <div class="input-group">
                                        <input type="file" name="upload" class="form-control" width="100px"/>
                                        <span class="input-group-btn">
                                            <button type="submit" name="Upload" class="btn btn-primary"><i class="cqc-upload"></i> 업로드</button>
                                        </span>
                                    </div><!-- /input-group -->
	                        	</div>
                    			
       			                <ax:form name="formView01">
				                    <div data-fit-height-aside="form-view-01">
				                        <div class="ax-button-group">
				                            <div class="left">
				                                <h2>
				                                    <i class="cqc-blackboard"></i>
				                                </h2>
				                            </div>
				                            <div class="right">
				                            </div>
				                        </div>	
				                    </div>
				                    <div class="H10"></div>
				                    <div id="preview-target"></div>
				                </ax:form>
                    			
                    		</ax:td>
                    	</ax:tr>
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0108F0.remark" width="300px">
                    			<input type="text" maxlength="100" data-ax-path="remark" data-key="true" class="form-control"/>
                    		</ax:td>
                    	</ax:tr>
                    	 
                    </ax:tbl>
                </ax:form>
>>>>>>> dev
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>