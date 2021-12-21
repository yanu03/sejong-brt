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
        <script type="text/javascript" src="<c:url value='/assets/js/view/SM0109/SM0109.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='ax.admin.search' width="300px">
                            <ax:input type="text" name="filter" id="filter" clazz="form-control" placeholder="ax.admin.SM0109S0.search"/>
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
                            <ax:lang id="ax.admin.SM0109G0.title"/> </h3>
                    </div>
                    <div class="right">

                    </div>
                </div>
                <div data-ax5grid="gridView0" data-fit-height-content="gridView0" style="height: 300px;"></div>
            </ax:split-panel>
            <ax:splitter></ax:splitter>
            
            <ax:split-panel width="550" style="padding-left: 10px; height:100%; padding-bottom:490px;" scroll="scroll">
                <!-- 폼 -->
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h3><i class="cqc-news"></i>
                            <ax:lang id="ax.admin.SM0109F0.title"/>
                        </h3>
                    </div>
                </div>
                <ax:form name="formView0">
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                        <ax:tr>
                            <ax:td label="ax.admin.SM0109F0.api.id" width="300px" labelClazz="required">
                                <input type="text" data-ax-path="apiId" data-key="true" class="form-control W90" readonly="readonly"/>
                            </ax:td>
                        <ax:tr>
                        </ax:tr>
                            <ax:td label="ax.admin.SM0109F0.api.name" width="400px" labelClazz="required">
                                <input type="text" data-ax-path="apiName" class="form-control W150" data-ax-validate="required" maxlength="20"/>
                            </ax:td>
                        </ax:tr>
                    	<!-- 
						<ax:tr>
                            <ax:td label="ax.admin.SM0109F0.api.endPoint" width="400px" labelClazz="required">
                                <input type="text" data-ax-path="apiEndPoint" class="form-control" maxlength="50" data-ax-validate="required"/>
                            </ax:td>
						</ax:tr>
                    	 -->
       
                        <ax:tr>
                            <ax:td label="ax.admin.SM0109F0.api.allowedIp" width="500px" labelClazz="required">
                                <div class="input-group">
	                        		<div style="float:left;padding-right:5px;">
	                        			<input type="text" ip data-ax-path="allowedIp1" id="ip1" class="form-control" maxlength="3" data-ax-validate="required" style="width:44px; text-align:center;" disabled="disabled"/>
	                        		</div>
	                        		<div style="float:left;padding-right:5px;padding-top:10px">
	                        			.
	                        		</div>
	                        		<div style="float:left;padding-right:5px;">
	                        			<input type="text" ip data-ax-path="allowedIp2" id="ip2" class="form-control" maxlength="3" data-ax-validate="required" style="width:44px; text-align:center;" disabled="disabled"/>
	                        		</div>
	                        		<div style="float:left;padding-right:5px;padding-top:10px">
	                        			.
	                        		</div>
	                        		<div style="float:left;padding-right:5px;">
	                        			<input type="text" ip data-ax-path="allowedIp3" id="ip3" class="form-control" maxlength="3" data-ax-validate="required" style="width:44px; text-align:center;" disabled="disabled"/>
	                        		</div>
	                        		<div style="float:left;padding-right:5px;padding-top:10px">
	                        			.
	                        		</div>
	                        		<div style="float:left;padding-right:5px;">
	                        			<input type="text" ip data-ax-path="allowedIp4" id="ip4" class="form-control" maxlength="3" data-ax-validate="required" style="width:44px; text-align:center;" disabled="disabled"/>
	                        		</div>
	                        	</div>
                            </ax:td>
                        </ax:tr>
		
                        <ax:tr>
                       		<ax:td label="ax.admin.SM0109F0.api.expireDate" width="220px" labelClazz="required">
                  			   	<div class="input-group" data-ax5picker="date">
	                            	<input type="text" title="<ax:lang id="ax.admin.SM0109F0.api.expireDate"/>" class="form-control" data-ax-path="expireDate" data-ax5formatter="date" placeholder="yyyy/mm/dd" data-ax-validate="required" />
	                            	<span class="input-group-addon"><i class="cqc-calendar"></i></span>
                            	</div>
                    		</ax:td>
                    	</ax:tr>
                           <ax:tr>
                     		<ax:td label="ax.admin.SM0109F0.api.useYn" width="200px" labelClazz="required">
                    			<ax:common-code groupCd="USE_YN" name="useYn" dataPath="useYn" clazz="form-control" type=""/>
                    		</ax:td>
                       	</ax:tr>
                       	<ax:tr>
                            <ax:td label="ax.admin.SM0109F0.api.remark" width="100%">
                            	<textarea data-ax-path="remark" class="form-control" maxlength="200"></textarea>
                            </ax:td>
                       	</ax:tr>
                       	<ax:tr>
                            <ax:td label="ax.admin.SM0109F0.api.key" width="100%" labelClazz="required">
                            	<textarea data-ax-path="apiKey" data-key="true" class="form-control" maxlength="64" readonly="readonly"></textarea>
                            </ax:td>
                       	</ax:tr>
                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>