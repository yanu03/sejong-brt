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
        <script type="text/javascript" src="<c:url value='/assets/js/view/BM0301/BM0301.js' />"></script>
        <style>
			.grid-cell-red{
		        background: #A9F5A9;
		    }
		    .grid-cell-blue{
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
                        <ax:td label='ax.admin.search' width="300px">
                            <ax:input type="text" name="filter" id="filter" clazz="form-control" placeholder="ax.admin.BM0301S0.search" maxLength="20"/>
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
                        <h3><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.BM0301G0.title"/>
                        </h3>
                    </div>
                    <div class="right">

                    </div>
                </div>
                <div data-ax5grid="gridView0" data-fit-height-content="gridView0" style="height: 300px;"></div>
            </ax:split-panel>
            <ax:splitter></ax:splitter>
            <ax:split-panel width="500" style="height:100%; padding-left: 10px; padding-bottom:50px">
                <!-- 폼 -->
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h3><i class="cqc-news"></i>
                             <ax:lang id="ax.admin.BM0301F0.title"/>
                        </h3>
                    </div>
                </div>
                <ax:form name="formView0">                 
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                     	<ax:tr>
							<ax:td label="ax.admin.BM0301F0.confirmyn" width="210px" >
								<input type="text" id="confirmYn" data-ax-path="confirmYn" data-key="true" class="form-control" readonly="readonly">
							</ax:td>
                    	</ax:tr>
                    	<ax:tr>
							<ax:td label="ax.admin.BM0301F0.conid" width="210px" labelClazz="required">
							    <input type="text" data-ax-path="conId" data-key="true" class="form-control" readonly="readonly">
							</ax:td>                    
                    	</ax:tr>
                        <ax:tr>
                            <ax:td label="ax.admin.BM0301F0.conno" width="300px" labelClazz="required">
                                <input type="text" data-ax-path="conNo" class="form-control" data-ax-validate="required" maxlength="30"/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr>                    
                            <ax:td label="ax.admin.BM0301F0.connm" width="300px" labelClazz="required">
                                <input type="text" data-ax-path="conNm" class="form-control" data-ax-validate="required" maxlength="30"/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr>
                            <ax:td label="ax.admin.BM0301F0.custnm" width="100%"  labelClazz="required">
                           		<div class="input-group">
	                        		<div style="float:left;padding-right:5px;"><input type="text" data-ax-path="custId" data-key="true" class="form-control W70" readonly="readonly"></div>
	                        		<div style="float:left;padding-right:5px;"><input type="text" data-ax-path="custNm" data-key="true" class="form-control W130" readonly="readonly"></div>
	                        		<div style="float:left;padding-right:5px;">
	                        			<button type="button" id="selectButton" class="btn btn-primary" data-form-view-0-btn="selectBM0102">
		                                	<ax:lang id="ax.admin.select"/>
		                            	</button>
		                            </div>
	                        	</div>
                            </ax:td>
                        </ax:tr>
                        <ax:tr>                    
                            <ax:td label="ax.admin.BM0301F0.confd" width="300px">
                            	<div class="input-group" data-ax5picker="date" style="width:100px;">
	                            	<input type="text" class="form-control" data-ax-path="conFstDate" data-ax5formatter="date" placeholder="yyyy/mm/dd" />
	                            	<span class="input-group-addon"><i class="cqc-calendar"></i></span>
                            	</div>
                            </ax:td>
                        </ax:tr>
                      <ax:tr>
                         <ax:td label='ax.admin.BM0301F0.consd' width="300px" labelClazz="required">
                            <div class="input-group" data-ax5picker="date" style="width:100px;">
                                <input type="text" class="form-control" data-ax-path="conStDate" title="<ax:lang id="ax.admin.contract.form.consd"/>" data-ax5formatter="date" placeholder="yyyy/mm/dd" data-ax-validate="required"/>
                                <span class="input-group-addon"><i class="cqc-calendar"></i></span>
                            </div>

                        </ax:td>
                     </ax:tr>
                     
                     <ax:tr>                  	
                        <ax:td label='ax.admin.BM0301F0.coned' width="300px" labelClazz="required"> 
                            <div class="input-group" data-ax5picker="date" style="width:100px;">
                                <input type="text" class="form-control" data-ax-path="conEdDate" title="<ax:lang id="ax.admin.contract.form.coned"/>" data-ax5formatter="date" placeholder="yyyy/mm/dd" data-ax-validate="required"/>
                                <span class="input-group-addon"><i class="cqc-calendar"></i></span>
                            </div>

                        </ax:td>
                     </ax:tr>   
                        <ax:tr>
                            <ax:td label="ax.admin.BM0301F0.suppamt" width="230px">
                            	<input type="text" data-ax-path="suppAmt" class="form-control" data-ax5formatter="money" style="text-align: right" maxlength="14"/>
                            </ax:td>
                       	</ax:tr>
                       	<ax:tr>
                            <ax:td label="ax.admin.BM0301F0.vatamt" width="230px">
                            	<input type="text" data-ax-path="vatAmt" class="form-control" data-ax5formatter="money" style="text-align: right" maxlength="14"/>
                            </ax:td>
						</ax:tr>
                       	<ax:tr>
                       		<ax:td label="ax.admin.BM0301F0.remark" width="100%">
                       			<textarea data-ax-path="remark" class="form-control" maxlength="200"></textarea>
                            </ax:td>
                       	</ax:tr>
 
                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>