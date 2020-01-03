<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${pageRemark}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" />
        <script type="text/javascript" src="<c:url value='/assets/js/view/BM0301/BM0301.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='ax.admin.search' width="300px">
                            <ax:input type="text" name="filter" id="filter" clazz="form-control" placeholder="ax.admin.BM0301S0.search"/>
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
                            <ax:lang id="ax.admin.BM0301G0.title"/>
                        </h2>
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
                             <ax:lang id="ax.admin.BM0301F0.title"/>
                        </h2>
                    </div>
                </div>
                <ax:form name="formView0">                 
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                     	<ax:tr>
							<ax:td label="ax.admin.BM0301F0.confirmyn" width="300px" >
								<input type="text" id="confirmYn" data-ax-path="confirmYn" data-key="true" class="form-control" readonly="readonly">
							</ax:td>
							<ax:td label="ax.admin.BM0301F0.conid" width="300px" labelClazz="required">
							    <input type="text" data-ax-path="conId" data-key="true" class="form-control" readonly="readonly">
							</ax:td>                    
                    	</ax:tr>
                    
                        <ax:tr>
                            <ax:td label="ax.admin.BM0301F0.conno" width="300px" labelClazz="required">
                                <input type="text" data-ax-path="conNo" title="<ax:lang id="ax.admin.BM0301F0.conno"/>" class="form-control" data-ax-validate="required"/>
                            </ax:td>
                            <ax:td label="ax.admin.BM0301F0.name" width="300px" labelClazz="required">
                                <input type="text" data-ax-path="conNm" title="<ax:lang id="ax.admin.BM0301F0.name"/>" class="form-control" data-ax-validate="required" />
                            </ax:td>
                        </ax:tr>                      
                        
                        <ax:tr>
                            <ax:td label="ax.admin.BM0301F0.custnm" width="300px"  labelClazz="required">
                           		<div class="input-group">
	                        		<input type="text" data-ax-path="custId" data-key="true" class="form-control W70" readonly="readonly">
	                        		<input type="text" data-ax-path="custNm" data-key="true" class="form-control W70" readonly="readonly">
                        			<button type="button" id="selectButton" class="btn btn-primary" data-form-view-0-btn="selectBM0102">
	                                	<ax:lang id="ax.admin.select"/>
	                            	</button>
	                        	</div>
                            </ax:td>
                            <ax:td label="ax.admin.BM0301F0.confd" width="300px">
                            	<div class="input-group" data-ax5picker="date">
	                            	<input type="text" class="form-control" data-ax-path="conFstDate" data-ax5formatter="date" placeholder="yyyy/mm/dd" />
	                            	<span class="input-group-addon"><i class="cqc-calendar"></i></span>
                            	</div>
                            </ax:td>
                        </ax:tr>
                        
              
                        
 <!-- 12월26일 -->                     
                      <ax:tr>
                         <ax:td label='ax.admin.BM0301F0.consd' width="300px" labelClazz="required">

                            <div class="input-group" data-ax5picker="date">
                                <input type="text" class="form-control" data-ax-path="conStDate" title="<ax:lang id="ax.admin.contract.form.consd"/>" data-ax5formatter="date" placeholder="yyyy/mm/dd" data-ax-validate="required"/>
                                <span class="input-group-addon"><i class="cqc-calendar"></i></span>
                            </div>

                        </ax:td>
                        
                        <ax:td label='ax.admin.BM0301F0.coned' width="300px" labelClazz="required"> 

                            <div class="input-group" data-ax5picker="date">
                                <input type="text" class="form-control" data-ax-path="conEdDate" title="<ax:lang id="ax.admin.contract.form.coned"/>" data-ax5formatter="date" placeholder="yyyy/mm/dd" data-ax-validate="required"/>
                                <span class="input-group-addon"><i class="cqc-calendar"></i></span>
                            </div>

                        </ax:td>
                        
                     </ax:tr>
						
						
                     	
 <!-- 12월26일 -->                     	
                        
                        <ax:tr>
                            <ax:td label="ax.admin.BM0301F0.suppamt" width="300px">
                            	<input type="text" data-ax-path="suppAmt" class="form-control" data-ax5formatter="money"/>
                            </ax:td>
                            <ax:td label="ax.admin.BM0301F0.vatamt" width="300px">
                            	<input type="text" data-ax-path="vatAmt" class="form-control" data-ax5formatter="money"/>
                            </ax:td>
                       	</ax:tr>
                       	
                       	
                   <%--     	<ax:tr>
                            <ax:td label="ax.admin.contract.form.custid" width="300px">
                            	<input type="text" data-ax-path="custid" class="form-control"/>
                            </ax:td>
                       	</ax:tr>
                       	 --%>
                       	<ax:tr>
                       		<ax:td label="ax.admin.BM0301F0.remark" width="100%">
                            	<input type="text" data-ax-path="remark" class="form-control"/>
                            </ax:td>
                       	</ax:tr>
                       <%-- 	<ax:tr>
                            <ax:td label="ax.admin.corporation.form.addr2" width="300px">
                            	<input type="text" data-ax-path="addr2" class="form-control"/>
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                            <ax:td label="ax.admin.corporation.form.garage" width="300px">
                            	<input type="text" data-ax-path="garage" class="form-control"/>
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                            <ax:td label="ax.admin.corporation.form.remark" width="300px">
                            	<input type="text" data-ax-path="remark" class="form-control"/>
                            </ax:td>
                       	</ax:tr> --%>
                        <%-- 
                        <ax:tr>
                            <ax:td label="ax.admin.sample.form.etc3" width="300px">
                                <select data-ax-path="etc3" class="form-control W100">
                                    <option value="Y"><ax:lang id="ax.admin.used"/></option>
                                    <option value="N"><ax:lang id="ax.admin.not.used"/></option>
                                </select>
                            </ax:td>
                            <ax:td label="ax.admin.sample.form.etc4" width="220px">
                                <ax:common-code groupCd="USER_STATUS" dataPath="userStatus"/>
                            </ax:td>
                        </ax:tr>
                        <ax:tr>
                            <ax:td label="ax.admin.sample.form.etc5" width="100%">
                                <textarea data-ax-path="etc5" class="form-control"></textarea>
                            </ax:td>
                        </ax:tr> --%>
                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>