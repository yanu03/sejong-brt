<%@ page import="com.chequer.axboot.core.utils.RequestUtils" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="pageName" value="File Browser"/>
<ax:set key="page_auto_height" value="true"/>
<ax:set key="axbody_class" value="baseStyle"/>

<ax:layout name="modal">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" />
        <ax:script-lang key="ax.admin" var="ADMIN" />
        <script type="text/javascript" src="<c:url value='/assets/js/common/BM0601_modal.js' />"></script>
    </jsp:attribute>
    <jsp:attribute name="header">
        <h3 class="title">
            <i class="cqc-browser"></i>
            <ax:lang id="ax.admin.BM0601M0.linkset"/>
        </h3>
    </jsp:attribute>
    <jsp:body>
        <ax:page-buttons>
            <button type="button" class="btn btn-fn1" data-page-btn="save"><ax:lang id="ax.admin.sample.modal.button.save"/></button>
            <button type="button" class="btn btn-default" data-page-btn="close"><ax:lang id="ax.admin.sample.modal.button.close"/></button>
        </ax:page-buttons>

        <div role="page-header">
            <div class="H10"></div>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="*" style="padding-right: 0px;">

                <ax:form name="formView0">                  
                    <ax:tbl clazz="ax-form-tbl" minWidth="600px">                   
						<ax:tr>
							<ax:td label="ax.admin.BM0601M0.updatecycle" width="400px" labelClazz="required">
	     					 	<select id="updateCycle" name="updateCycle" style="width:250px; height: 30px;" data-key="true"></select>
                    		</ax:td>
						</ax:tr>                    
                     	<ax:tr>
							<ax:td label="ax.admin.BM0601M0.updatetimeset" width="400px" labelClazz="required">																						    
							  <div class="input-group">
							  	<select id="updateSetF" name="updateSetF" style="width:100px; height: 30px;" data-key="true"></select>                        
                                <span class="input-group-addon">~</span>
                                <select id="updateSetB" name="updateSetB" style="width:100px; height: 30px;" data-key="true"></select>                               
                            </div>																			                 
							</ax:td>
                        </ax:tr>                                                         
                        <ax:tr>
                          	<ax:td label="ax.admin.BM0601M0.weaturl" width="500px" labelClazz="required">	     
	                                <input type="text" class="form-control" data-ax-path="aplyDate" readonly="readonly"/>	                            
                        	</ax:td>
                        </ax:tr>
                 
                     <ax:tr>
                            <ax:td label="ax.admin.BM0601M0.weatapi" width="500px" labelClazz="required">
								<input type="text" data-ax-path="remark" data-key="true" class="form-control">
							</ax:td>                    
                     </ax:tr>                       	                       
                     <ax:tr>
                         <ax:td label="ax.admin.BM0601M0.atmourl" width="500px" labelClazz="required">
								<input type="text" data-ax-path="modelNm" data-key="true" class="form-control" readonly="readonly">
						 </ax:td>                     	                            
                     </ax:tr>
                       	
                      <ax:tr>
                    		<ax:td label="ax.admin.BM0601M0.atmoapi" width="500px" labelClazz="required">
                            	<input type="text" data-ax-path=remark data-key="true" class="form-control">
                            </ax:td>
						</ax:tr>                      	                    
                    </ax:tbl>                    
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>