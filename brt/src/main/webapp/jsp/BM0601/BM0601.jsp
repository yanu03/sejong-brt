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
        <script type="text/javascript" src="<c:url value='/assets/js/view/BM0601/BM0601.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
        		<button type="button" class="btn btn-primary" data-page-btn="setTing" style="position:absolute; width:70px; left:950px; top:17px">
	            <ax:lang id="ax.admin.setting"/>
	            </button>
              <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                     <ax:tr>
                        <ax:td label='ax.admin.BM0601S0.search' width="300px">
                        	<input type="text" data-ax5picker="date" data-ax5formatter="date" class="form-control" name="filter" id="filter" width="50px;" placeholder="yyyy/mm(해당월별)">
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form> 
            <div class="H10"></div> 
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="600" style="padding-right: 10px;" scroll="scroll">
                <div class="ax-button-group">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.BM0601F0.title"/>
                        </h2>
                    </div>
                </div>                       
                <ax:form name="formView0">                 
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px" style="position:relative;">
                      <div style="position:absolute; width:300px; left:100px; top:30px;">
                      	<ax:tr>
                      	 <ax:td label="ax.admin.BM0601F0.renewdt" width="300px">
                    		<input type="text" id="renewDt" data-ax-path="renewDt" class="form-control" readonly="readonly" style="width:200px;"/>
                    	 </ax:td>
                    	</ax:tr> 
                      </div>
                      <div id="123" style="position:absolute; width:400px; left:60px; top:80px;">
                      	<div id="weatImg"></div>
                      	<ax:tr>   
                      		<ax:td label="ax.admin.BM0601F0.tempc" width="200px">                   	           
								<input type="text" id="tempc" data-ax-path="tempc" class="form-control" readonly="readonly">
							</ax:td>
							<ax:td label="ax.admin.BM0601F0.skycond" width="200px">												
							    <input type="text" data-ax-path="skyCond" class="form-control" readonly="readonly">
							</ax:td>    													                 		
                      	</ax:tr>
                      
                     	<ax:tr>
							<ax:td label="ax.admin.BM0601F0.temphigh" width="200px" >
								<input type="text" data-ax-path="tempHigh"  class="form-control" readonly="readonly">
							</ax:td>
							<ax:td label="ax.admin.BM0601F0.dustc" width="200px">
							    <input type="text" data-ax-path="dustc"  class="form-control" readonly="readonly">
							</ax:td>                    
                    	</ax:tr>
                    
                        <ax:tr>
                            <ax:td label="ax.admin.BM0601F0.tempmini" width="200px" >
                                <input type="text" data-ax-path="tempMini" class="form-control" readonly="readonly"/>
                            </ax:td>
                            <ax:td label="ax.admin.BM0601F0.sdc" width="200px">
                                <input type="text" data-ax-path="sdc" class="form-control" readonly="readonly"/>
                            </ax:td>
                        </ax:tr>                            	
                        
                        <ax:tr>
                            <ax:td label="ax.admin.BM0601F0.humi" width="200px">
                            	<input type="text" data-ax-path="humi" class="form-control" readonly="readonly"/>
                            </ax:td>
                            <ax:td label="ax.admin.BM0601F0.cmc" width="200px">
                            	<input type="text" data-ax-path="cmc" class="form-control" readonly="readonly"/>
                            </ax:td>
                       	</ax:tr>

                       	<ax:tr>
                       		<ax:td label="ax.admin.BM0601F0.rainpro" width="200px">
                            	<input type="text" data-ax-path="rainPro" class="form-control" readonly="readonly"/>
                            </ax:td>
                            <ax:td label="ax.admin.BM0601F0.ozonec" width="200px">
                            	<input type="text" data-ax-path="ozonec" class="form-control" readonly="readonly"/>
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                       		<ax:td label="ax.admin.BM0601F0.rainfall" width="200px">
                            	<input type="text" data-ax-path="rainFall" class="form-control" readonly="readonly"/>
                            </ax:td>
                            <ax:td label="ax.admin.BM0601F0.ndc" width="200px">
                            	<input type="text" data-ax-path="ndc" class="form-control" readonly="readonly"/>
                            </ax:td>
                       	</ax:tr>
                       	
 					 </div>
                   </ax:tbl>
               </ax:form>              
                
            </ax:split-panel>
            <ax:splitter></ax:splitter>
            <ax:split-panel width="*" style="padding-left: 10px;" scroll="scroll">
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                             <ax:lang id="ax.admin.BM0601G0.title"/>
                             <select class="form-control" id="weatAtmo" name="weatAtmo" data-ax-path="weatAtmo" style="width:100px">
                            	<option value="weat"><ax:lang id="ax.admin.BM0601G0.select.weat"/></option>
                            	<option value="atmo"><ax:lang id="ax.admin.BM0601G0.select.atmo"/></option>
                            </select>
                        </h2>
                    </div>
                </div>
                    <div data-ax5grid="gridView1" style="height: 220px;"></div>
                    
                     <div class="ax-button-group">
                        <div class="left">
                            <h3>
                                <i class="cqc-list"></i>
                                <ax:lang id="ax.admin.BM0601G1.title"/>
                            </h3>
                        </div>
                   <ax:form name="searchView1">
                   			<div class="right">           		
                        		<div class="input-group" style="position:absolute; width:100px; right:30px;top:290px;">                                 		
	                            		<input type="text" class="form-control" name="filterG2" id="filterG2" width="50px" placeholder="<ax:lang id="ax.admin.BM0103F0.vhcNo"/>">
	                            		<button type="button" class="btn btn-info" data-page-btn="searchDate" style="position: absolute; top:0px;left:100px"><i class="cqc-magnifier"></i></button>
                            	</div>
                           </div> 	                                               		                                 		 	                 	 		
            		</ax:form>                      
                    </div>
                   <div data-ax5grid="gridView2" style="height: 200px;"></div>     
            </ax:split-panel>
                 
        </ax:split-layout>

    </jsp:body>
   </ax:layout>