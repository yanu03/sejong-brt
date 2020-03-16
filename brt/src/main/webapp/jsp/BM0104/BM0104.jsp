<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${pageRemark}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" />
        <ax:script-lang key="ax.admin" var="ADMIN"/>
        <script type="text/javascript" src="<c:url value='/assets/js/common/tmap.js' />"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/view/BM0104/BM0104.js' />"></script>
        <script src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appkey=bbaeca8d-24d4-425d-9bd2-946552e4e2a7"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='ax.admin.search' width="300px">
                            <ax:input type="text" name="filter" id="filter" clazz="form-control" placeholder="ax.admin.BM0104S0.search"/>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H3"></div>
        </div>


        <ax:split-layout name="ax1" orientation="vertical">
	        <ax:split-panel width="*">
                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="gridView0">
                    <div class="left">
                        <h3><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.BM0104G0.title"/> </h3>
                    </div>
                    <div class="right">

                   	</div>
                </div>
                <div data-ax5grid="gridView0" data-fit-height-content="gridView0" style="height:500px;padding-right:10px;"></div>
	        </ax:split-panel>
	            
	        <ax:splitter></ax:splitter>
	        
	        <ax:split-panel width="520" style="padding-left: 10px;" scroll="scroll">
	        	<div class="ax-button-group" role="panel-header">
	        		<div class="left">
	        			<h3><i class="cqc-news"></i>노선정보</h3>
	        		</div>
	        		<div class="right">
	        		</div>
	        	</div>
	        	<ax:form name="formView0">
	        		<ax:tbl clazz="ax-form-tbl" minWidth="500px">
	        			<ax:tr>
	        				<ax:td label="ax.admin.BM0104G0.routId" width="250px" labelClazz="required">
                                <input type="text" id="routId" data-ax-path="routId" data-key="true" title="<ax:lang id="ax.admin.BM0104G0.routId"/>" class="form-control" readonly="readonly" maxlength="9"/>
                            </ax:td>
                            
                            <ax:td label="ax.admin.BM0104G0.routNm" width="250px" style="border-left: 1px solid #D8D8D8;" labelClazz="required">
                                <input type="text" data-ax-path="routNm" id="routNm" title="<ax:lang id="ax.admin.BM0104G0.routNm"/>" class="form-control" maxlength="20" data-ax-validate="required"/>
                            </ax:td>
						</ax:tr>
                       	
                       	<ax:tr>
                            <ax:td label="ax.admin.BM0104G0.stStaNm" width="250px" labelClazz="required">
                            	<input type="text" data-ax-path="stStaNm" id="stStaNm" title="<ax:lang id="ax.admin.BM0104G0.stStaNm"/>" class="form-control" maxlength="20" data-ax-validate="required"/>
                            </ax:td>
                            <ax:td label="ax.admin.BM0104G0.edStaNm" width="250px" style="border-left: 1px solid #D8D8D8;" labelClazz="required">
                            	<input type="text" data-ax-path="edStaNm" id="edStaNm" title="<ax:lang id="ax.admin.BM0104G0.edStaNm"/>" class="form-control" maxlength="20" data-ax-validate="required"/>
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                            <ax:td label="ax.admin.BM0104G0.wayDiv" width="250px" labelClazz="required">
                           		<ax:SM0105 groupCd="UPDOWN_FLAG" id="wayDiv" name="wayDiv" dataPath="wayDiv"/>
                            </ax:td>
                       	</ax:tr>
                       	
                    </ax:tbl>
                    <p>
                    <ax:tbl>
                    	<ax:tr>
	                    	<ax:td id="interRoutId" label="ax.admin.BM0104G0.interRoutId" width="250px" labelClazz="required">
	                        	<input type="text" data-ax-path="interRoutId" title="연계노선ID" class="form-control" maxlength="9" data-ax-validate="required"/>
	                        </ax:td>
                        </ax:tr>
                        
                        
						<ax:tr>
                            <ax:td label="ax.admin.BM0104G0.shortRoutNm" width="250px" labelClazz="required">
                            	<input type="text" data-ax-path="shortRoutNm" title="<ax:lang id="ax.admin.BM0104G0.shortRoutNm"/>" class="form-control" maxlength="7" data-ax-validate="required"/>
                            </ax:td>
                            <ax:td label="ax.admin.BM0104G0.dvcName" width="250px" style="border-left: 1px solid #D8D8D8;" labelClazz="required">
                            	<input type="text" data-ax-path="dvcName" title="<ax:lang id="ax.admin.BM0104G0.dvcName"/>" class="form-control" maxlength="10" data-ax-validate="required"/>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="ax.admin.BM0104G0.wayInfo" width="250px" labelClazz="required">
                            	<input type="text" data-ax-path="wayInfo" title="<ax:lang id="ax.admin.BM0104G0.wayInfo"/>" class="form-control" maxlength="10" data-ax-validate="required"/>
                            </ax:td>
                            <ax:td label="ax.admin.BM0104G0.dirInfo" width="250px" style="border-left: 1px solid #D8D8D8;" labelClazz="required">
                            	<input type="text" data-ax-path="dirInfo" title="<ax:lang id="ax.admin.BM0104G0.dirInfo"/>" class="form-control" maxlength="10" data-ax-validate="required"/>
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                       		<ax:td label="ax.admin.BM0104G0.userWayDiv" width="250px" labelClazz="required">
                      			<ax:SM0105 groupCd="UPDOWN_FLAG" id="userWayDiv" name="userWayDiv" dataPath="userWayDiv"/>
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                            <ax:td label="ax.admin.BM0104G0.line1Str" width="250px">
                            	<input type="text" data-ax-path="line1Str" title="<ax:lang id="ax.admin.BM0104G0.line1Str"/>" class="form-control" maxlength="20"/>
                            </ax:td>
                            <ax:td label="ax.admin.BM0104G0.line2Str" width="250px" style="border-left: 1px solid #D8D8D8;">
                            	<input type="text" data-ax-path="line2Str" title="<ax:lang id="ax.admin.BM0104G0.line2Str"/>" class="form-control" maxlength="20"/>
                            </ax:td>
						</ax:tr>
						                       	
                       	<ax:tr>
                            <ax:td label="ax.admin.BM0104G0.line1Satstr" width="250px">
                            	<input type="text" data-ax-path="line1Satstr" title="<ax:lang id="ax.admin.BM0104G0.line1Satstr"/>" class="form-control" maxlength="20"/>
                            </ax:td>
                            <ax:td label="ax.admin.BM0104G0.line2Satstr" width="250px" style="border-left: 1px solid #D8D8D8;">
                            	<input type="text" data-ax-path="line2Satstr" title="<ax:lang id="ax.admin.BM0104G0.line2Satstr"/>" class="form-control" maxlength="20"/>
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                            <ax:td label="ax.admin.BM0104G0.line1Sunstr" width="250px">
                            	<input type="text" data-ax-path="line1Sunstr" title="<ax:lang id="ax.admin.BM0104G0.line1Sunstr"/>" class="form-control" maxlength="20"/>
                            </ax:td>
                            <ax:td label="ax.admin.BM0104G0.line2Sunstr" width="250px" style="border-left: 1px solid #D8D8D8;">
                            	<input type="text" data-ax-path="line2Sunstr" title="<ax:lang id="ax.admin.BM0104G0.line2Sunstr"/>" class="form-control" maxlength="20"/>
                            </ax:td>
                       	</ax:tr>
                       	<ax:tr>
                       		<ax:td label="노선도 모양" width="500px">
                       			<ax:SM0105 groupCd="ROUT_SHAPE" id="routShape" name="routShape" dataPath="routShape" style="width:100px;"/>
                       		</ax:td>
                       	</ax:tr>
                    </ax:tbl>
	        	</ax:form>
	        </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>