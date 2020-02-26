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
        <script type="text/javascript" src="<c:url value='/assets/js/common/tts-help_modal.js' />"></script>
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
            <div class="H3"></div>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="*" style="padding-right: 0px;">

                <ax:form name="formView0">                  
                    <ax:tbl clazz="ax-form-tbl" minWidth="600px">                   
						<ax:tr>
							<ax:td label="ax.admin.BM0601M0.updatecycle" width="400px" labelClazz="required">
	     					 	<input type="text" id="updateCycle" data-ax-path="numVal6" data-key="true" class="form-control" readonly="readonly"/>
                    		</ax:td>
						</ax:tr>                    
                     	<ax:tr>
							<ax:td label="ax.admin.BM0601M0.updatetimeset" width="400px" labelClazz="required">																						    
							  <div class="input-group">
							  	<input type="text" id="updateSetF" data-ax-path="numVal4" data-key="true" class="form-control" readonly="readonly"/>                        
                                <span class="input-group-addon">~</span>
                                <input type="text" id="updateSetE" data-ax-path="numVal5" data-key="true" class="form-control" readonly="readonly"/>                               
                            </div>																			                 
							</ax:td>
                        </ax:tr>                                                         
                        <ax:tr>
                          	<ax:td label="ax.admin.BM0601M0.weaturl" width="500px" labelClazz="required">	     
	                                <input type="text" data-ax-path="remarkWeat" class="form-control" readonly="readonly"/>	                            
                        	</ax:td>
                        </ax:tr>
                 
                     <ax:tr>
                            <ax:td label="ax.admin.BM0601M0.weatapi" width="500px" labelClazz="required">
								<input type="text" data-ax-path="weatApiKey" data-key="true" class="form-control" maxlength="200">
							</ax:td>                    
                     </ax:tr>                       	                       
                     <ax:tr>
                         <ax:td label="ax.admin.BM0601M0.atmourl" width="500px" labelClazz="required">
								<input type="text" data-ax-path="remarkAtmo" data-key="true" class="form-control" readonly="readonly">
						 </ax:td>                     	                            
                     </ax:tr>
                       	
                      <ax:tr>
                    		<ax:td label="ax.admin.BM0601M0.atmoapi" width="500px" labelClazz="required">
                            	<input type="text" data-ax-path="atmoApiKey" data-key="true" class="form-control" maxlength="200">
                            </ax:td>
						</ax:tr>                      	                    
                    </ax:tbl>                    
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>