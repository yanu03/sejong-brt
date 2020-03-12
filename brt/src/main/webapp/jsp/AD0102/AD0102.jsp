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
        <script type="text/javascript" src="<c:url value='/assets/js/view/AD0102/AD0102.js' />"></script>       
    </jsp:attribute>
   
    <jsp:body>
        <ax:page-buttons></ax:page-buttons>
        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='ax.admin.search' width="300px">
                            <ax:input type="text" name="filter" id="filter" clazz="form-control" placeholder="ax.admin.AD0102S0.search"/>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H3"></div>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="*" style="padding-right: 10px;">
                <div class="ax-button-group" data-fit-height-aside="gridView0">
                    <div class="left">
                        <h3><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.AD0102G0.title"/>
                        </h3>
                    </div>
                </div>
                <div data-ax5grid="gridView0" data-fit-height-content="gridView0" style="height: 300px;"></div>
            </ax:split-panel>
            
            <ax:splitter></ax:splitter>
            
            <ax:split-panel width="400" style="padding-left: 10px;" scroll="scroll">
                <div class="ax-button-group">
                    <div class="left">
                        <h3><i class="cqc-list"></i>
                             <ax:lang id="ax.admin.AD0102F0.title"/>
                        </h3>
                    </div>
                </div>
                
                <ax:form name="formView0" id="formView0">
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                    	<ax:tr> 
                    		<ax:td label="ax.admin.AD0102G0.price.type" width="210px" labelClazz="required">
                    			<ax:SM0105 groupCd="PRICE_TYPE" dataPath="priceType"/>
                    		</ax:td>
                    	</ax:tr>

                    	<ax:tr> 
                    		<ax:td label="ax.admin.AD0102G0.ad.lvl" width="210px" labelClazz="required">
                    			<ax:SM0105 groupCd="AD_LVL" dataPath="adLvl"/>
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                    		<ax:td label="ax.admin.AD0102G0.ad.pos" width="250px" labelClazz="required">
                    			<ax:SM0105 groupCd="AD_POS" dataPath="adPos"/>
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                    		<ax:td label="ax.admin.AD0102G0.unit.amt" width="250px" labelClazz="required">
                    			<input type="text" title="<ax:lang id="ax.admin.AD0102G0.unit.amt"/>" data-ax-path="unitAmt" class="form-control" data-ax5formatter="money" data-ax-validate="required"/>
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                    		<ax:td label="ax.admin.AD0102G0.inst.amt" width="250px" labelClazz="required">
                    			<input type="text" title="<ax:lang id="ax.admin.AD0102G0.inst.amt"/>" data-ax-path="instAmt" class="form-control" data-ax5formatter="money" data-ax-validate="required"/>
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                    		<ax:td label="ax.admin.AD0102G0.remark" width="100%">
                    			<textarea title="<ax:lang id="ax.admin.AD0102G0.remark"/>" name="remark" data-ax-path="remark" class="form-control" maxlength="200"></textarea>
                    		</ax:td>
                    	</ax:tr>
					</ax:tbl>
                </ax:form>
            </ax:split-panel>
            
            
        </ax:split-layout>

    </jsp:body>
   </ax:layout>