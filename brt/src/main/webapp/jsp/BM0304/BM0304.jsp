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
        <script type="text/javascript" src="<c:url value='/assets/js/view/BM0304/BM0304.js' />"></script>       
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
                            <ax:input type="text" name="filter" id="filter" clazz="form-control" placeholder="예약ID"/>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H3"></div>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">        	
            <ax:split-panel width="500" style="padding-right: 10px;">
              <ax:split-panel>
              	<div class="ax-button-group" data-fit-height-aside=formView0>
                    <div class="left">
                        <h3><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.BM0304F0.title"/>
                        </h3>
                    </div>
                </div>
                <ax:form name="formView0">                  
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                     	<ax:tr>
							<ax:td label="ax.admin.BM0304F0.rsvid" width="250px" labelClazz="required">
								<input type="text" id="dvcId" data-ax-path="dvcId" data-key="true" class="form-control W90" readonly="readonly">
							</ax:td>                                      
                    	</ax:tr>                  	
                        
                        <ax:tr>
                            <ax:td label="ax.admin.BM0304F0.term" width="350px" labelClazz="required">
	                            <div class="input-group" data-ax5picker="date">
	                                <input type="text" name="playStDate" data-ax-path="playStDate" title="<ax:lang id="ax.admin.BM0401F0.play.date"/>" class="form-control" data-ax5formatter="date" data-ax-validate="required">
	                                <span class="input-group-addon">~</span>
	                                <input type="text" name="playEdDate" data-ax-path="playEdDate" title="<ax:lang id="ax.admin.BM0401F0.play.date"/>" class="form-control" data-ax5formatter="date" data-ax-validate="required">
	                                <span class="input-group-addon"><i class="cqc-calendar"></i></span>
	                            </div>
                            </ax:td>
                       	</ax:tr>                                             	
        
                       	<ax:tr>
                       		<ax:td label="ax.admin.BM0301F0.remark" width="100%">
                       			<textarea data-ax-path="remark" class="form-control W300" maxlength="200"></textarea>
                            </ax:td>
                       	</ax:tr>                      	
                    </ax:tbl>
                </ax:form>
              </ax:split-panel>
              <ax:split-panel style="height:100%; padding-bottom:90px;">
                <div class="ax-button-group" data-fit-height-aside="gridView0">
                    <div class="left">
                        <h3><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.BM0304G0.title"/>
                        </h3>
                    </div>
                </div>
                <div data-ax5grid="gridView0" data-fit-height-content="gridView0" style="height: 100%;"></div>
               </ax:split-panel>
            </ax:split-panel>
            <ax:splitter></ax:splitter>
            <ax:split-panel width="*" style="padding-left: 10px;" scroll="scroll">
                <div class="ax-button-group" data-fit-height-aside="gridView1">
                    <div class="left">
                        <h3><i class="cqc-list"></i>
                             <ax:lang id="ax.admin.BM0304G1.title"/>
                        </h3>
                    </div>
                </div>
                    <div data-ax5grid="gridView1" data-fit-height-content="gridView1" style="height: 300px;"></div>
            </ax:split-panel>
            
            
        </ax:split-layout>

    </jsp:body>
   </ax:layout>