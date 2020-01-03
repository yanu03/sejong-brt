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
        <script type="text/javascript" src="<c:url value='/assets/js/view/BM0302/BM0302.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                    	<%-- <ax:td width="100px">
                    		<select class="form-control" id="" name="" data-ax-path="serDiv" >
                    			<option value="all"><ax:lang id="ax.admin.BM0302F0.div.extension"/></option>
								<option value="exten"><ax:lang id="ax.admin.BM0302F0.div.extension"/></option>
								<option value="termi"><ax:lang id="ax.admin.BM0302F0.div.terminated"/></option>
							</select>
                    	</ax:td> --%>
                        <ax:td label='ax.admin.search' width="300px">
                            <ax:input type="text" name="filter" id="filter" clazz="form-control" placeholder="ax.admin.BM0301S0.search"/>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="600" style="padding-right: 10px;">
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
                             <ax:lang id="ax.admin.BM0302F0.title"/>
                        </h2>
                    </div>
                </div>
                <ax:form name="formView0">                  
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                    
						<ax:tr>
							<ax:td label="ax.admin.BM0302F0.altdiv" width="300px" labelClazz="required">
	     					 	<select class="form-control" id="" name="" data-ax-path="altDiv">
									 <option value="연장"><ax:lang id="ax.admin.BM0302F0.div.extension"/></option>
									 <option value="종료"><ax:lang id="ax.admin.BM0302F0.div.terminated"/></option>
								</select>
                    		</ax:td>
						</ax:tr>                    
                     	<ax:tr>
							<ax:td label="ax.admin.BM0301F0.confirmyn" width="300px" >
								<input type="text" id="confirmYn" data-ax-path="confirmYn" data-key="true" class="form-control" readonly="readonly">
							</ax:td>
							<ax:td label="ax.admin.BM0301F0.conid" width="300px">
							    <input type="text" data-ax-path="conId" data-key="true" class="form-control" readonly="readonly">
							</ax:td>                    
                    	</ax:tr>
                    
                 		<%-- <ax:tr>
                            <ax:td label="ax.admin.BM0301F0.conno" width="300px" >
                                <input type="text" data-ax-path="conNo" data-key="true" class="form-control" readonly="readonly"/>
                            </ax:td>
                            <ax:td label="ax.admin.BM0301F0.name" width="300px" labelClazz="required">
                                <input type="text" data-ax-path="conNm" data-key="true" class="form-control" readonly="readonly"/>
                            </ax:td> 
                        </ax:tr>  --%>                     
                        
                        <ax:tr>
                            <%-- <ax:td label="ax.admin.BM0301F0.custnm" width="300px">
                                <input type="text" data-ax-path="custId" data-key="true" class="form-control" readonly="readonly"/>
                            </ax:td> --%>
                            <ax:td label="ax.admin.BM0302F0.altcd" width="300px">
                            	<div class="input-group" data-ax5picker="date">
	                            	<input type="text" class="form-control" data-ax-path="altConDate" data-ax5formatter="date" placeholder="yyyy/mm/dd"/>
	                            	<span class="input-group-addon"><i class="cqc-calendar"></i></span>
                            	</div>
                            </ax:td>
                        </ax:tr>
                 
                      <ax:tr>
                         <ax:td label='ax.admin.BM0302F0.altsd' width="300px" labelClazz="required">

                            <div class="input-group" data-ax5picker="date">
                                <input type="text" class="form-control" data-ax-path="conStDate" data-ax5formatter="date" title="<ax:lang id="ax.admin.BM0302F0.altsd"/>" placeholder="yyyy/mm/dd" data-ax-validate="required" />
                                <span class="input-group-addon"><i class="cqc-calendar"></i></span>
                            </div>

                        </ax:td>
                        
                        <ax:td label='ax.admin.BM0302F0.alted' width="300px" labelClazz="required">

                            <div class="input-group" data-ax5picker="date">
                                <input type="text" class="form-control" data-ax-path="conEdDate" data-ax5formatter="date" title="<ax:lang id="ax.admin.BM0302F0.alted"/>" placeholder="yyyy/mm/dd" data-ax-validate="required" />
                                <span class="input-group-addon"><i class="cqc-calendar"></i></span>
                            </div>

                        </ax:td>
                        
                     </ax:tr>                       	
                        
                        <ax:tr>
                            <ax:td label="ax.admin.BM0301F0.suppamt" width="300px">
                            	<input type="text" data-ax-path="suppAmt" class="form-control" data-ax5formatter="money"/>
                            </ax:td>
                            <ax:td label="ax.admin.BM0301F0.vatamt" width="300px">
                            	<input type="text" data-ax-path="vatAmt" class="form-control" data-ax5formatter="money"/>
                            </ax:td>
                       	</ax:tr>                                             	
        
                       	<ax:tr>
                       		<ax:td label="ax.admin.BM0301F0.remark" width="100%">
                            	<input type="text" data-ax-path="remark" class="form-control"/>
                            </ax:td>
                       	</ax:tr>

                    </ax:tbl>
                    
                    <div class="ax-button-group">
                        <div class="left">
                            <h3>
                                <i class="cqc-list"></i>
                                <ax:lang id="ax.admin.BM0302G1.title"/>
                            </h3>
                        </div>
                    </div>
                    <div data-ax5grid="gridView1" style="height: 300px;"></div>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
   </ax:layout>