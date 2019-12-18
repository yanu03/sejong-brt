<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${pageRemark}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" />
        <script type="text/javascript" src="<c:url value='/assets/js/view/corporation/corporation.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='ax.admin.sample.search.condition' width="500px">
                            <div class="form-inline">
                                <div class="form-group">
                                    <input type="text" id="compStorLabel" class="form-control W150" value=""/>
                                    <button type="button" class="btn btn-primary">
                                        <i class="cqc-magnifier"></i>
                                        <ax:lang id="ax.admin.search"/>
                                    </button>
                                </div>
                            </div>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="500" style="padding-right: 10px;">
                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="grid-view-01">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.corporation.grid.title"/> </h2>
                    </div>
                    <div class="right">

                    </div>
                </div>
                <div data-ax5grid="grid-view-01" data-fit-height-content="grid-view-01" style="height: 300px;"></div>
            </ax:split-panel>
            <ax:splitter></ax:splitter>
            <ax:split-panel width="*" style="padding-left: 10px;" scroll="scroll">
                <!-- 폼 -->
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h2><i class="cqc-news"></i>
                            <ax:lang id="ax.admin.corporation.form.title"/>
                        </h2>
                    </div>
                </div>
                <ax:form name="formView01">
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                        <ax:tr>
                            <ax:td label="ax.admin.corporation.form.id" width="300px">
                                <input type="text" data-ax-path="corpId" class="form-control" data-ax-validate="required" readonly="readonly"/>
                            </ax:td>
                            <ax:td label="ax.admin.corporation.form.name" width="300px">
                                <input type="text" data-ax-path="corpNm" class="form-control" data-ax-validate="required" />
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                        	<ax:td label=""></ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="ax.admin.corporation.form.crn" width="300px">
                                <input type="text" data-ax-path="comRgstNum" class="form-control" data-ax-validate="required" />
                            </ax:td>
                            <ax:td label="ax.admin.corporation.form.email" width="300px">
                            	<input type="text" data-ax-path="email" class="form-control" data-ax-validate="required" />
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="ax.admin.corporation.form.phone" width="300px">
                            	<input type="text" data-ax-path="phone" class="form-control" data-ax-validate="required" />
                            </ax:td>
                            <ax:td label="ax.admin.corporation.form.fax" width="300px">
                            	<input type="text" data-ax-path="fax" class="form-control" data-ax-validate="required" />
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                        	<ax:td label=""></ax:td>
                        </ax:tr>
                       	
                       	<ax:tr>
                            <ax:td label="ax.admin.corporation.form.location" width="300px">
                            	<input type="text" data-ax-path="loc" class="form-control" data-ax-validate="required" />
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                            <ax:td label="ax.admin.corporation.form.zip.number" width="300px">
                            	<input type="text" data-ax-path="zipNum" class="form-control" data-ax-validate="required" />
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                            <ax:td label="ax.admin.corporation.form.zip.address" width="300px">
                            	<input type="text" data-ax-path="zipAddr" class="form-control" data-ax-validate="required" />
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                            <ax:td label="ax.admin.corporation.form.garage" width="300px">
                            	<input type="text" data-ax-path="garage" class="form-control" data-ax-validate="required" />
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                            <ax:td label="ax.admin.corporation.form.remark" width="300px">
                            	<input type="text" data-ax-path="remark" class="form-control" data-ax-validate="required" />
                            </ax:td>
                       	</ax:tr>
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