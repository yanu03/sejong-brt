<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${PAGE_REMARK}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" />
        <ax:script-lang key="ax.admin" var="ADMIN" />
        <script type="text/javascript" src="<c:url value='/assets/js/view/SM0105/SM0105.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='ax.admin.search' width="300px">
                            <ax:input type="text" name="filter" id="filter" clazz="form-control" placeholder="ax.admin.SM0104S0.search"/>
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
                            <ax:lang id="ax.admin.SM0104G0.title"/> </h2>
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
                            <ax:lang id="ax.admin.SM0105F0.title"/>
                        </h2>
                    </div>
                </div>
                <ax:form name="formView0">
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                        <ax:tr>
                            <ax:td label="ax.admin.SM0105F0.dl.cd" width="300px" labelClazz="required">
                                <input type="text" data-ax-path="dlCd" maxlength="5" title="<ax:lang id="ax.admin.SM0105F0.dl.cd"/>" data-key="true" data-ax-validate="required" class="form-control"/>
                            </ax:td>
                            
                            <ax:td label="ax.admin.SM0105F0.dl.cd.nm" width="300px" labelClazz="required">
                                <input type="text" data-ax-path="dlCdNm" title="<ax:lang id="ax.admin.SM0105F0.dl.cd.nm"/>" data-ax-validate="required" class="form-control" />
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="ax.admin.SM0105F0.dl.cd.enm" width="300px">
                                <input type="text" data-ax-path="coCdEnm" class="form-control"  />
                            </ax:td>
                            
                            <ax:td label="ax.admin.SM0105F0.sort.odr" width="300px">
                                <input type="text" data-ax-path="sortOdr" class="form-control"/>
                            </ax:td>
                        </ax:tr>
                        
                       	<ax:tr>
                            <ax:td label="ax.admin.SM0105F0.txt.val1" width="300px">
                            	<input type="text" data-ax-path="txtVal1" class="form-control"/>
                            </ax:td>
                            
                            <ax:td label="ax.admin.SM0105F0.num.val4" width="300px">
                            	<input type="text" data-ax-path="numVal4" class="form-control"/>
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                            <ax:td label="ax.admin.SM0105F0.txt.val2" width="300px">
                            	<input type="text" data-ax-path="txtVal2" class="form-control"/>
                            </ax:td>
                            
                            <ax:td label="ax.admin.SM0105F0.num.val5" width="300px">
                            	<input type="text" data-ax-path="numVal5" class="form-control"/>
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                            <ax:td label="ax.admin.SM0105F0.txt.val3" width="300px">
                            	<input type="text" data-ax-path="txtVal3" class="form-control"/>
                            </ax:td>
                            
                            <ax:td label="ax.admin.SM0105F0.num.val6" width="300px">
                            	<input type="text" data-ax-path="numVal6" class="form-control"/>
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                            <ax:td label="ax.admin.SM0105F0.useyn" width="300px">
                            	<ax:common-code groupCd="useYn" dataPath="useYn" clazz="form-control"/>
                            </ax:td>
                            
                            <ax:td label="ax.admin.SM0105F0.remark" width="300px">
                            	<input type="text" data-ax-path="remark" class="form-control"/>
                            </ax:td>
                       	</ax:tr>
                    </ax:tbl>
                    
                    <div class="ax-button-group">
                        <div class="left">
                            <h3>
                                <i class="cqc-list"></i>
                                <ax:lang id="ax.admin.SM0105G1.title"/>
                            </h3>
                        </div>
                    </div>

                    <div data-ax5grid="gridView1" style="height: 300px;"></div>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>