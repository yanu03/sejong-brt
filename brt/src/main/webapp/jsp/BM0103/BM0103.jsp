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
        <script type="text/javascript" src="<c:url value='/assets/js/view/BM0103/BM0103.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='ax.admin.search' width="300px">
                            <ax:input type="text" name="filter" id="filter" clazz="form-control" placeholder="ax.admin.BM0103S0.search"/>
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
                            <ax:lang id="ax.admin.BM0103G0.title"/> 
                        </h3>
                    </div>
                    <div class="right">
                    </div>
                </div>
                <div data-ax5grid="gridView0" data-fit-height-content="gridView0" style="height: 300px;"></div>
            </ax:split-panel>
            
            <ax:splitter></ax:splitter>
            
            <ax:split-panel width="550" style="padding-left: 10px;" scroll="scroll">
                <!-- 폼 -->
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h3><i class="cqc-news"></i>
                            <ax:lang id="ax.admin.BM0103F0.title"/>
                        </h3>
                    </div>
                </div>
                
                <ax:form name="formView0" id="formView0">
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                    	<ax:tr> 
                    		<ax:td label="ax.admin.BM0103F0.vhcId" width="210px" labelClazz="required">
                    			<input type="text" name="vhcId" data-ax-path="vhcId" data-key="true" class="form-control" readonly="readonly" maxlength="9"/>
                    		</ax:td>
                    	</ax:tr>

                    	<ax:tr> 
                    		<ax:td label="ax.admin.BM0103F0.vhcNo" width="210px" labelClazz="required">
                    			<input type="text" title="<ax:lang id="ax.admin.BM0103F0.vhcNo"/>" name="vhcNo" data-ax-path="vhcNo" data-key="true" class="form-control" data-ax-validate="required" maxlength="9"/>
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0103F0.chasNo" width="250px" labelClazz="required">
                    			<input type="text" title="<ax:lang id="ax.admin.BM0103F0.chasNo"/>" name="chasNo" data-ax-path="chasNo" data-key="true" class="form-control" data-ax-validate="required" maxlength="17"/>
                    		</ax:td>
                    	</ax:tr>
                    	 
                    	 <ax:tr>
                    		<ax:td label="ax.admin.BM0103F0.corpId" width="500px" labelClazz="findmodal">
                    			<div class="input-group">
	                    			<div style="float:left;padding-right:5px;"><input type="text" title="<ax:lang id="ax.admin.BM0103F0.corpId"/>" data-ax-path="corpId" data-key="true" class="form-control W70" readonly="readonly" data-ax-validate="required"></div>
		                        	<div style="float:left;padding-right:5px;"><input type="text" title="<ax:lang id="ax.admin.BM0103F0.corpNm"/>" data-ax-path="corpNm" data-key="true" class="form-control W130" readonly="readonly"></div>
		                        	<div style="float:left;padding-right:5px;"><button type="button" id="selectButton" class="btn btn-primary" data-form-view-0-btn="selectBM0101">
		                                	<ax:lang id="ax.admin.select"/>
		                            	</button>
		                            </div>	
	                        	</div>
                    		</ax:td>
                    	</ax:tr>
					</ax:tbl>
					<p>
					<ax:tbl clazz="ax-form-tbl" minWidth="500px">
						<ax:tr>
                    		<ax:td label="ax.admin.BM0103F0.area" width="250px">
                    			<ax:SM0105 groupCd="AREA" id="area" name="area" dataPath="area"/>
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0103F0.maker" width="250px">
                    			<ax:SM0105 groupCd="VHC_MAKER" id="maker" name="maker" dataPath="maker"/>
                    		</ax:td>
						</ax:tr>
						<ax:tr>
                    		<ax:td label="ax.admin.BM0103F0.relsDate" width="220px">
                  			   	<div class="input-group" data-ax5picker="date">
	                            	<input type="text" title="<ax:lang id="ax.admin.BM0103F0.relsDate"/>" class="form-control" data-ax-path="relsDate" data-ax5formatter="date" placeholder="yyyy/mm/dd" />
	                            	<span class="input-group-addon"><i class="cqc-calendar"></i></span>
                            	</div>
                    		</ax:td>
                    		
                    	</ax:tr>
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0103F0.modelNm" width="350px">
                    			<input type="text" title="<ax:lang id="ax.admin.BM0103F0.modelNm"/>" name="modelNm" data-ax-path="modelNm" data-key="true" class="form-control" maxlength="20"/>
                    		</ax:td>
                    	</ax:tr>
                    	<ax:tr>
                       		<ax:td label="ax.admin.BM0103F0.vhcKind" width="240px">
                       			<ax:SM0105 groupCd="VHC_KIND" id="vhcKind" name="vhcKind" dataPath="vhcKind"/>
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                       		<ax:td label="ax.admin.BM0103F0.vhcType" width="200px">
                       		    <ax:SM0105 groupCd="VHC_TYPE" id="vhcType" name="vhcType" dataPath="vhcType"/>
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                      		<ax:td label="ax.admin.BM0103F0.lfYn" width="200px">
                    			<ax:SM0105 groupCd="LF_YN" id="lfYn" name="lfYn" dataPath="lfYn"/>
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                       		<ax:td label="ax.admin.BM0103F0.vhcFuel" width="200px">
                       			<ax:SM0105 groupCd="VHC_FUEL" id="vhcFuel" name="vhcFuel" dataPath="vhcFuel"/>
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                       		<ax:td label="운행노선" width="270px">
                       			<input type="text" title="운행노선" name="adRout" data-ax-path="adRout" class="form-control" maxlength="20"/>
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                       		<ax:td label="광고등급" width="180px">
                       			<input type="text" title="광고등급" name="adLvl" data-ax-path="adLvl" class="form-control" maxlength="5"/>
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                     		<ax:td label="ax.admin.BM0103F0.useYn" width="200px" labelClazz="required">
                    			<ax:common-code groupCd="USE_YN" name="useYn" dataPath="useYn" clazz="form-control" type=""/>
                    		</ax:td>
                    	</ax:tr>

                    	<ax:tr>
                     		<ax:td label="ax.admin.BM0103F0.remark" width="100%">
                    			<textarea title="<ax:lang id="ax.admin.BM0103F0.remark"/>" name="remark" data-ax-path="remark" data-key="true" class="form-control" maxlength="200"></textarea>
                    		</ax:td>
                    	</ax:tr>
                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>