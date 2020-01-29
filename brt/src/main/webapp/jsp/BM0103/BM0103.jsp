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
            <div class="H10"></div>
        </div>


        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="500" style="padding-right: 10px;">
                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="gridView0">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.BM0103G0.title"/> </h2>
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
                            <ax:lang id="ax.admin.BM0103F0.title"/>
                        </h2>
                    </div>
                </div>
                
                <ax:form name="formView0" id="formView0">
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                    	<ax:tr> 
                    		<ax:td label="ax.admin.BM0103F0.vhcNo" width="300px" labelClazz="required">
                    			<input type="text" name="vhcNo" data-ax-path="vhcNo" data-key="true" class="form-control"/>
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0103F0.chasNo" width="300px" labelClazz="required">
                    			<input type="text" name="chasNo" data-ax-path="chasNo" data-key="true" class="form-control"/>
                    		</ax:td>
                    	</ax:tr>
                    	 
                    	 <ax:tr>
                    		<ax:td label="ax.admin.BM0103F0.corpId" width="300px" labelClazz="required">
                    		<div class="input-group">
	                        		<input type="text" data-ax-path="corpId" data-key="true" class="form-control W70" readonly="readonly">
	                        		<input type="text" data-ax-path="corpNm" data-key="true" class="form-control W70" readonly="readonly">
                        			<button type="button" id="selectButton" class="btn btn-primary" data-form-view-0-btn="selectBM0101">
	                                	<ax:lang id="ax.admin.select"/>
	                            	</button>
	                        	</div>
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                    		<ax:td>
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0103F0.area" width="300px">
                    			<input type="text" name="area" data-ax-path="area" data-key="true" class="form-control"/>
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0103F0.maker" width="300px">
                    			<input type="text" name="maker" data-ax-path="maker" data-key="true" class="form-control"/>
                    		</ax:td>
                    		<ax:td label="ax.admin.BM0103F0.relsDate" width="300px">
                  			   	<div class="input-group" data-ax5picker="date">
	                            	<input type="text" class="form-control" data-ax-path="relsDate" data-ax5formatter="date" placeholder="yyyy/mm/dd" />
	                            	<span class="input-group-addon"><i class="cqc-calendar"></i></span>
                            	</div>
                    		</ax:td>
                    		
                    	</ax:tr>
                    	
                    	<ax:tr>
                    		<ax:td label="ax.admin.BM0103F0.modelNm" width="300px">
                    			<input type="text" name="modelNm" data-ax-path="modelNm" data-key="true" class="form-control"/>
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                       		<ax:td label="ax.admin.BM0103F0.vhcKind" width="300px" labelClazz="required">
                       		<ax:SM0105 groupCd="BUS_KIND" id="vhcKind" name="vhcKind" dataPath="vhcKind"/>
                       		<!-- 
	     					 	<select class="form-control" name="vhcKind" data-ax-path="vhcKind" >
									 <option value="big"><ax:lang id="ax.admin.BM0103F0.bus.big"/></option>
									 <option value="mid"><ax:lang id="ax.admin.BM0103F0.bus.mid"/></option>
									 <option value="small"><ax:lang id="ax.admin.BM0103F0.bus.small"/></option>
								</select>
                       		 -->
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                       		<ax:td label="ax.admin.BM0103F0.vhcType" width="300px" labelClazz="required">
                       		    <ax:SM0105 groupCd="BUS_DIV" id="vhcType" name="vhcType" dataPath="vhcType"/>
                       		    <!-- 
	     					 	<select class="form-control" name="vhcType" data-ax-path="vhcType" >
									 <option value="city"><ax:lang id="ax.admin.BM0108F0.bus.ctin"/></option>
									 <option value="vilg"><ax:lang id="ax.admin.BM0108F0.bus.vilg"/></option>
									 <option value="cntry"><ax:lang id="ax.admin.BM0108F0.bus.cnty"/></option>
									 <option value="intct"><ax:lang id="ax.admin.BM0108F0.bus.ctout"/></option>
									 <option value="fast"><ax:lang id="ax.admin.BM0108F0.bus.fast"/></option>
								</select>
                       		     -->
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                      		<ax:td label="ax.admin.BM0103F0.lfYn" width="300px" labelClazz="required">
                    			<ax:SM0105 groupCd="LF_YN" id="lfYn" name="lfYn" dataPath="lfYn"/>
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                       		<ax:td label="ax.admin.BM0103F0.vhcFuel" width="300px" labelClazz="required">
                       			<ax:SM0105 groupCd="FUEL_TYPE" id="vhcFuel" name="vhcFuel" dataPath="vhcFuel"/>
	     					 	<!-- 
	     					 	<select class="form-control" name="vhcFuel" data-ax-path="vhcFuel" >
									 <option value="D"><ax:lang id="ax.admin.BM0103F0.bus.disel"/></option>
									 <option value="L"><ax:lang id="ax.admin.BM0103F0.bus.LPG"/></option>
									 <option value="E"><ax:lang id="ax.admin.BM0103F0.bus.elec"/></option>
								</select>
	     					 	 -->
                    		</ax:td>
                    	</ax:tr>
                    	
                    	<ax:tr>
                     		<ax:td label="ax.admin.BM0103F0.useYn" width="300px" labelClazz="required">
                    			<ax:common-code groupCd="USE_YN" name="useYn" dataPath="useYn" clazz="form-control" type=""/>
                    		</ax:td>
                    	</ax:tr>

                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>