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
        <script type="text/javascript" src="<c:url value='/assets/js/view/BM0401/BM0401.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='ax.admin.search' width="300px">
                            <ax:input type="text" name="filter" id="filter" clazz="form-control" placeholder="ax.admin.BM0401S0.search"/>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>


        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="500" style="padding-right: 10px;">
                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="gridView0">
                    <div class="left">
                        <h2><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.BM0401G0.title"/> </h2>
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
                            <ax:lang id="ax.admin.BM0401F0.title"/>
                        </h2>
                    </div>
                </div>
                <ax:form name="formView0">
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                        <ax:tr>
                            <ax:td label="ax.admin.BM0401F0.voc.id" width="300px" labelClazz="required">
                                <input type="text" data-ax-path="vocId" data-key="true" class="form-control" readonly="readonly"/>
                            </ax:td>
                            <ax:td label="ax.admin.BM0401F0.voc.nm" width="300px" labelClazz="required">
                                <input type="text" data-ax-path="vocNm" title="<ax:lang id="ax.admin.BM0401F0.voc.nm"/>" class="form-control" data-ax-validate="required" />
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="ax.admin.BM0401F0.play.date" width="300px">
                                <input type="text" data-ax-path="corpNo" class="form-control"  />
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="ax.admin.BM0401F0.play.type" width="300px">
                            	<input type="text" data-ax-path="phone" class="form-control"/>
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                            <ax:td label="ax.admin.BM0401F0.wav" width="300px">
                            	<input type="text" data-ax-path="phone" class="form-control"/>
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                            <ax:td label="ax.admin.BM0401F0.kr.tts" width="300px">
                            	<input type="text" data-ax-path="addr1" class="form-control"/>
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                       		<ax:td label="ax.admin.BM0401F0.en.tts" width="300px">
                            	<input type="text" data-ax-path="zipNo" class="form-control"/>
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                            <ax:td label="ax.admin.BM0401F0.scr.txt" width="300px">
                            	<input type="text" data-ax-path="addr2" class="form-control"/>
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                            <ax:td label="ax.admin.BM0401F0.test" width="300px">
                            	<input type="text" data-ax-path="addr2" class="form-control"/>
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                            <ax:td label="ax.admin.BM0401F0.remark" width="300px">
                            	<input type="text" data-ax-path="remark" class="form-control"/>
                            </ax:td>
                       	</ax:tr>
                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>