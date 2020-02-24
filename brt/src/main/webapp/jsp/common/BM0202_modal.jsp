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
        <script type="text/javascript" src="<c:url value='/assets/js/common/BM0202_modal.js' />"></script>
    </jsp:attribute>
    <jsp:attribute name="header">
        <h3 class="title">
            <i class="cqc-browser"></i>
            <ax:lang id="ax.admin.BM0202M0.title"/>
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
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                    
						<ax:tr>
							<ax:td label="ax.admin.BM0201F0.dvcid" width="200px" labelClazz="required">
	     					 	<input type="text" id="dvcId" data-ax-path="dvcId" data-key="true" class="form-control" readonly="readonly">
                    		</ax:td>
						</ax:tr>                    
                     	<ax:tr>
							<ax:td label="ax.admin.BM0201F0.dvckind" width="250px" >
								<input type="text" id="dvcKind" data-ax-path="dvcKind" data-key="true" class="form-control" readonly="readonly">
							</ax:td>							                 
                    	</ax:tr>                                 
                        
                        <ax:tr>
                           	<ax:td label='ax.admin.BM0201M0.aplydate' width="250px" labelClazz="required">
                            <div class="input-group" data-ax5picker="date">
                                <input type="text" class="form-control" data-ax-path="aplyDate" data-ax5formatter="date" title="<ax:lang id="ax.admin.BM0201M0.aplydate"/>" placeholder="yyyy/mm/dd" data-ax-validate="required" />
                                <span class="input-group-addon"><i class="cqc-calendar"></i></span>
                            </div>
                          </ax:td>
                        </ax:tr>
                 
                     <ax:tr>
                          <ax:td label="ax.admin.BM0201M0.devserialno" width="250px" >
								<input type="text" id="devSerialNo" data-ax-path="devSerialNo" data-key="true" class="form-control" maxlength="30">
						  </ax:td>                     
                     </ax:tr>                       	
                        
                        <ax:tr>
                        	<ax:td label="ax.admin.BM0201M0.modelnm" width="250px" >
								<input type="text" id="modelNm" data-ax-path="modelNm" data-key="true" class="form-control" maxlength="30">
						 	</ax:td>                        
                       	</ax:tr>
                       	
                       	<ax:tr>
                    		<ax:td label="ax.admin.BM0201M0.worktype" width="250px" labelClazz="required">
                    			<ax:SM0105 groupCd="WORK_TYPE" id="workType" name="workType" dataPath="workType" clazz="form-control"/>
                            </ax:td>
						</ax:tr>
						
						<ax:tr>
							<ax:td label="ax.admin.BM0201M0.workamt" width="250px">
                            	<input type="text" id="workAmt" data-ax-path="workAmt" class="form-control" data-ax5formatter="money" style="text-align : right" maxlength="30"/>
                            </ax:td>
						</ax:tr>                                             	
        
                       	<ax:tr>
                       		<ax:td label="ax.admin.BM0301F0.remark" width="100%">
                       			<textarea data-ax-path="remark" class="form-control" style="height: 100px;" maxlength="200"></textarea>
                            </ax:td>
                       	</ax:tr>
                       	                    

                    </ax:tbl>
                    
                </ax:form>

            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>