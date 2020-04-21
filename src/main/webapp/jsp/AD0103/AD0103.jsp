<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${PAGE_REMARK}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" />
        <ax:script-lang key="ax.admin" var="ADMIN" />
        <script type="text/javascript" src="<c:url value='/assets/js/view/AD0103/AD0103.js' />"></script>
    </jsp:attribute>
    <jsp:attribute name="css">
    	<style>
			.grid-cell-red {
		        background: #A9F5A9;
		    }
		    .grid-cell-blue {
		        background: #F78181;
		    }
		</style>
    </jsp:attribute>
    
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='ax.admin.AD0103S0.search.title' width="300px">
                            <ax:SM0105 groupCd="PRICE_TYPE" dataPath="priceType" id="priceType" clazz="W80"/>
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
                        <h3><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.AD0103G0.title"/> </h3>
                    </div>
                </div>
                <div data-ax5grid="gridView0" data-fit-height-content="gridView0" style="height: 300px;"></div>
            </ax:split-panel>
            
            <ax:splitter></ax:splitter>
            
            <ax:split-panel width="680" style="padding-left: 10px;">
            	<div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h3><i class="cqc-news"></i>
                            <ax:lang id="ax.admin.AD0103G1.title"/>
                        </h3>
                    </div>
                </div>
                <ax:split-panel>
	                <ax:form name="formView0">
	                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
	                        <ax:tr>
	                            <ax:td label="ax.admin.AD0103G1.inst.id" width="300px" labelClazz="required">
	                                <input type="text" data-ax-path="instId" data-key="true" class="form-control W80" readonly="readonly"/>
	                            </ax:td>
	                            
	                            <ax:td label="ax.admin.AD0103G1.inst.nm" width="250px" labelClazz="required">
	                                <input type="text" data-ax-path="instNm" title="<ax:lang id="ax.admin.AD0103G1.inst.nm"/>" data-ax-validate="required" class="form-control" maxlength="50"/>
	                            </ax:td>
	                        </ax:tr>
	                        
	                        <ax:tr>
	                            <ax:td label="ax.admin.AD0103G1.cust.id" width="500px" labelClazz="required">
	                                <div class="input-group">
		                        		<div style="float:left;padding-right:5px;">
		                        			<input type="text" data-ax-path="custId" data-key="true" class="form-control W70" title="<ax:lang id="ax.admin.BM0301F0.custnm"/>" readonly="readonly" data-ax-validate="required">
		                        		</div>
		                        		<div style="float:left;padding-right:5px;">
		                        			<input type="text" data-ax-path="custNm" data-key="true" class="form-control W70" title="<ax:lang id="ax.admin.BM0301F0.custnm"/>" readonly="readonly">
		                        		</div>
	                        			<div style="float:left;padding-right:5px;">
	                        				<button type="button" id="selectButton" class="btn btn-primary" data-form-view-0-btn="selectBM0102">
		                                		<ax:lang id="ax.admin.select"/>
		                            		</button>
		                                </div>
		                        	</div>
	                            </ax:td>
	                        </ax:tr>
	                        
	                        <ax:tr>
	                        	<ax:td label="ax.admin.AD0103G1.ad.st.date" width="300px" labelClazz="required">
	                        		<div style="float:left;padding-right:5px;">
		                        		<div class="input-group" data-ax5picker="date">
			                                <input type="text" name="adStDate" data-ax-path="adStDate" title="<ax:lang id="ax.admin.AD0103G1.ad.st.date"/>" class="form-control W80" data-ax5formatter="date" data-ax-validate="required">
			                                <span class="input-group-addon"><i class="cqc-calendar"></i></span>
			                            </div>
	                        		</div>
		                        	
		                        	<div style="float:left;padding-right:5px;">
		                        		<input type="text" class="form-control W70" data-ax-path="inputMonth" id="inputMonth" placeholder="기간(개월)" maxlength="2" data-ax5formatter="number">
		                        	</div>
	                            </ax:td>
	                            
	                            <ax:td label="ax.admin.AD0103G1.ad.ed.date" width="200px" labelClazz="required">
	                                <div class="input-group" data-ax5picker="date">
		                                <input type="text" name="adEdDate" data-ax-path="adEdDate" title="<ax:lang id="ax.admin.AD0103G1.ad.ed.date"/>" class="form-control W80" data-ax5formatter="date" data-ax-validate="required">
		                                <span class="input-group-addon"><i class="cqc-calendar"></i></span>
		                            </div>
	                            </ax:td>
	                        </ax:tr>
	                        
	                       	<ax:tr>
	                            <ax:td label="ax.admin.AD0103G1.ad.amt" width="300px" labelClazz="required">
	                            	<div class="input-group">
		                        		<div style="float:left;padding-right:5px;">
		                        			<input type="text" data-ax-path="adAmt" class="form-control W80" data-ax5formatter="money" maxlength="11"/>
		                        		</div>
	                        			<div style="float:left;padding-right:5px;">
	                        				<button type="button"  data-form-view-0-btn="btnCalAmt" class="btn btn-default"><ax:lang id="ax.admin.cal.amt"/></button>
		                                </div>
		                        	</div>
	                            </ax:td>
	                       	</ax:tr>
	                       	<ax:tr>
	                            <ax:td label="ax.admin.AD0103G1.remark" width="100%">
	                            	<textarea name="remark" data-ax-path="remark" class="form-control" maxlength="200"></textarea>
	                            </ax:td>
	                        </ax:tr>
	                    </ax:tbl>
	                </ax:form>
                </ax:split-panel>
                
                <ax:split-panel width="700" style="height:100%; padding-bottom: 130px;">
	                <div class="ax-button-group"  data-fit-height-aside="gridView1">
	                    <div class="left">
	                        <h3>
	                            <i class="cqc-list"></i>
	                            <ax:lang id="ax.admin.AD0103G1.title"/>
	                        </h3>
	                    </div>
	                </div>
	
	                <div data-ax5grid="gridView1" data-fit-height-content="gridView1" style="height:100%;"></div>
	           </ax:split-panel>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>