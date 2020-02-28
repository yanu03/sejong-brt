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
                        <ax:td label='ax.admin.BM0601S0.search' width="300px" labelWidth="130px;">
                        	<input type="text" data-ax5picker="date" data-ax5formatter="date" class="form-control" name="filter" id="filter" width="50px;" placeholder="yyyy/mm(해당월별)" maxlength="7">
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form> 
            <div class="H3"></div>
        </div>
        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="500" style="padding-right: 15px;" scroll="scroll">
                <div class="ax-button-group">
                    <div class="left">
                        <h3><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.BM0601F0.title"/>
                        </h3>
                    </div>
                </div>                       
                <ax:form name="formView0" >                 
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px" style="position:relative;">
                      	<div id="weatImg" style="border: 2px solid #D8D8D8;"></div>
                      		<ax:tr width="460px;">
		                      	 <ax:td label="ax.admin.BM0601F0.renewdt" width="230px" style="padding-left:20px;">
		                    		<input type="text" id="renewDt" data-ax-path="renewDt" class="form-control W130" readonly="readonly"/>
		                    	 </ax:td>
		                    	 <ax:td label="ax.admin.BM0601F0.skycond" width="230px" style="padding-left:20px;">
		                    		<input type="text" id="skyCond" data-ax-path="skyCond" class="form-control W105" readonly="readonly"/>
		                    	 </ax:td>
                    		</ax:tr> 
                      	<ax:tr>   
                      		<ax:td label="ax.admin.BM0601F0.tempc" width="230px" style="padding-left:20px;">                   	           
								<input type="text" id="tempc" data-ax-path="tempc" class="form-control W105" readonly="readonly">
							</ax:td>
							<ax:td label="ax.admin.BM0601F0.sdustc" width="230px" style="padding-left:20px;">												
							    <input type="text" data-ax-path="sdustc" class="form-control W105" readonly="readonly">
							</ax:td>    													                 		
                      	</ax:tr>
                      
                     	<ax:tr>
							<ax:td label="ax.admin.BM0601F0.temphigh" width="230px" style="padding-left:20px;">
								<input type="text" data-ax-path="tempHigh"  class="form-control W105" readonly="readonly">
							</ax:td>
							<ax:td label="ax.admin.BM0601F0.dustc" width="230px" style="padding-left:20px;">
							    <input type="text" data-ax-path="dustc"  class="form-control W105" readonly="readonly">
							</ax:td>                    
                    	</ax:tr>
                    
                        <ax:tr>
                            <ax:td label="ax.admin.BM0601F0.tempmini" width="230px" style="padding-left:20px;">
                                <input type="text" data-ax-path="tempMini" class="form-control W105" readonly="readonly"/>
                            </ax:td>
                            <ax:td label="ax.admin.BM0601F0.sdc" width="230px" style="padding-left:20px;">
                                <input type="text" data-ax-path="sdc" class="form-control W105" readonly="readonly"/>
                            </ax:td>
                        </ax:tr>                            	
                        
                        <ax:tr>
                            <ax:td label="ax.admin.BM0601F0.humi" width="230px" style="padding-left:20px;">
                            	<input type="text" data-ax-path="humi" class="form-control W105" readonly="readonly"/>
                            </ax:td>
                            <ax:td label="ax.admin.BM0601F0.cmc" width="230px" style="padding-left:20px;">
                            	<input type="text" data-ax-path="cmc" class="form-control W105" readonly="readonly"/>
                            </ax:td>
                       	</ax:tr>

                       	<ax:tr>
                       		<ax:td label="ax.admin.BM0601F0.rainpro" width="230px" style="padding-left:20px;">
                            	<input type="text" data-ax-path="rainPro" class="form-control W105" readonly="readonly"/>
                            </ax:td>
                            <ax:td label="ax.admin.BM0601F0.ozonec" width="230px" style="padding-left:20px;">
                            	<input type="text" data-ax-path="ozonec" class="form-control W105" readonly="readonly"/>
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                       		<ax:td label="ax.admin.BM0601F0.rainfall" width="230px" style="padding-left:20px;">
                            	<input type="text" data-ax-path="rainFall" class="form-control W105" readonly="readonly"/>
                            </ax:td>
                            <ax:td label="ax.admin.BM0601F0.ndc" width="230px" style="padding-left:20px;">
                            	<input type="text" data-ax-path="ndc" class="form-control W105" readonly="readonly"/>
                            </ax:td>
                       	</ax:tr>
                   </ax:tbl>
               </ax:form>              
                
            </ax:split-panel>
            <ax:splitter></ax:splitter>
            <ax:split-panel width="*" style="height:100%; padding-left: 10px; padding-bottom:260px;">
            	<%-- <ax:split-panel width="500" style="height:290px; padding-right: 10px;">
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h3><i class="cqc-list"></i>
                             <ax:lang id="ax.admin.BM0601G0.title"/>
                             <select class="form-control" id="weatAtmo" name="weatAtmo" data-ax-path="weatAtmo" style="width:100px">
                            	<option value="weat"><ax:lang id="ax.admin.BM0601G0.select.weat"/></option>
                            	<option value="atmo"><ax:lang id="ax.admin.BM0601G0.select.atmo"/></option>
                            </select>
                        </h3>
                    </div>
                </div>
                    <div data-ax5grid="gridView1" style="height: 225px;"></div>
                 </ax:split-panel> --%>
                	<ax:tab-layout name="ax2" style="padding-bottom:150px;">
					    <ax:tab-panel label="기상" scroll="scroll" active="true" style="height:100%; padding-bottom:5px;">
					            <div data-ax5grid="gridView1" data-fit-height-content="gridView1" style="height:100%;"></div>
					    </ax:tab-panel>
					    <ax:tab-panel label="대기" scroll="scroll" style="height:100%; padding-bottom:5px;">
					            <div data-ax5grid="gridView3" data-fit-height-content="gridView3" style="height:100%;"></div>
					    </ax:tab-panel>
					</ax:tab-layout>
	               <ax:split-panel width="*" scroll="scroll"> 
	                     <div class="ax-button-group">
	                        <div class="left">
	                            <h3>
	                                <i class="cqc-list"></i>
	                                <ax:lang id="ax.admin.BM0601G1.title"/>
	                            </h3>
	                        </div>
	                    </div>
	                   <div data-ax5grid="gridView2" style="height: 220px;"></div>
	                  </ax:split-panel>
		        </ax:split-panel>
	        </ax:split-layout>
	    </jsp:body>
   </ax:layout>