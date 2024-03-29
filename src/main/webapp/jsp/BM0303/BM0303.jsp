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
        <script type="text/javascript" src="<c:url value='/assets/js/view/BM0303/BM0303.js' />"></script>
        <style>
			.grid-cell-red{
		        background: #A9F5A9;
		    }
		    .grid-cell-blue{
		        background: #F78181;
		    }
		    .grid-cell-yellow{
		        background: #F3F781;
		    }
		    .grid-cell-gray{
		    	background: #AAAAAA;
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
                            <ax:input type="text" name="filter" id="filter" clazz="form-control" placeholder="ax.admin.BM0301S0.search"/>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H3"></div>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="700" style="padding-right: 10px;">
                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="gridView0">
                    <div class="left">
                        <h3><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.BM0301G0.title"/>
                        </h3>
                    </div>
                    <div class="right">
						<span style="line-height:28px;">변경계약 확정 종료일 기준 &nbsp;</span>
                    	<ax:SM0105 groupCd="CON_END" name="conEnd" id="conEnd" dataPath="conEnd" style="width:80px; float:right;"/>
                    </div>
                </div>
               <div data-ax5grid="gridView0" data-fit-height-content="gridView0" style="height: 300px;"></div>
              </ax:split-panel>
            <ax:splitter></ax:splitter>
            <ax:split-panel width="*" style="padding-left: 10px;" scroll="scroll">
            	<ax:split-panel width="500" style="height:270px;">
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h3><i class="cqc-list"></i>
                             <ax:lang id="ax.admin.BM3030G1.title"/>
                        </h3>
                    </div>
                </div>
                   <div data-ax5grid="gridView1" style="height: 220px;"></div>
            	</ax:split-panel>
            	<ax:tab-layout name="ax2">
					    <ax:tab-panel label="영상" scroll="scroll" active="true" style="height:100%; padding-bottom:270px;">
					            <div data-ax5grid="gridView2" data-fit-height-content="gridView2" style="height:100%;"></div>
					    </ax:tab-panel>
					    <ax:tab-panel label="음성" scroll="scroll" style="height:100%; padding-bottom:270px;">
					            <div data-ax5grid="gridView3" data-fit-height-content="gridView3" style="height:100%;"></div>
					    </ax:tab-panel>
				</ax:tab-layout>
             <%-- <ax:split-panel width="500" style="height:100%; padding-bottom:155px">
                     <div class="ax-button-group">
                        <div class="left">
                            <h3>
                                <i class="cqc-list"></i>
                                <ax:lang id="ax.admin.BM0303G2.title"/>
                            </h3>
                        </div>
                    </div>
                   <div data-ax5grid="gridView2" data-fit-height-content="gridView2" style="height: 100%;"></div>       
              </ax:split-panel> --%>
           </ax:split-panel> 
        </ax:split-layout>
    </jsp:body>
   </ax:layout>