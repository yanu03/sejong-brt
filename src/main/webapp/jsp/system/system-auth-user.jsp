<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="system-auth-user-version" value="1.0.0"/>
<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${pageRemark}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" var="LANG" />
        <ax:script-lang key="ax.admin" var="COL" />
        <script type="text/javascript" src="<c:url value='/assets/js/axboot/system/system-auth-user.js' />"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <!-- 검색바 -->
        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='ax.admin.search' width="300px">
                            <ax:input type="text" name="filter" id="filter" clazz="form-control" placeholder="ax.admin.user.search"/>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H3"></div>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="*" style="padding-right: 10px;">

                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="gridView0">
                    <div class="left">
                        <h3><i class="cqc-list"></i>
                            <ax:lang id="ax.admin.user.title"/>
                        </h3>
                    </div>
                    <div class="right"></div>
                </div>
                <div data-ax5grid="gridView0" data-fit-height-content="gridView0" style="height: 300px;"></div>

            </ax:split-panel>
            
            <ax:splitter></ax:splitter>
            
            <ax:split-panel width="550" style="padding-left: 10px;" scroll="scroll">
                <!-- 폼 -->
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h3><i class="cqc-news"></i>
                            <ax:lang id="ax.admin.user.information"/>
                        </h3>
                    </div>
                </div>

                <ax:form name="formView0">
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                        <ax:tr>
                        	<ax:td label="ax.admin.user.id" width="300px" labelClazz="required">
                                <input type="text" name="userCd" data-ax-path="userCd" maxlength="50" title="아이디" class="form-control W180" readonly="readonly" data-key="true" data-ax-validate="required"/>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                        	<ax:td label="ax.admin.user.name" width="300px" labelClazz="required">
                                <input type="text" name="userNm" data-ax-path="userNm" maxlength="15" title="사용자명" class="form-control W180" data-ax-validate="required"/>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="ax.admin.user.password" width="300px" id="passwordLabel">
                                <input type="password" name="userPs" data-ax-path="userPs" maxlength="128" title="비밀번호" class="form-control W180" placeholder="••••••"/>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="ax.admin.user.scd.password" width="500px">
                                <input type="password" name="scdPs" data-ax-path="scdPs" maxlength="128" class="inline-block form-control W180"/>
                                
                                <ax:common-code groupCd="USE_YN" dataPath="scdPsUseYn" clazz="inline-block W90"/>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="ax.admin.user.email" width="300px">
                                <input type="text" name="email" data-ax-path="email" maxlength="50" title="이메일" placeholder="abc@abc.com" class="av-email form-control W180" value=""/>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                        	<ax:td label="ax.admin.user.hp" width="300px">
                                <input type="text" name="hpNo" data-ax-path="hpNo" maxlength="13" placeholder="" class="av-phone form-control W180" data-ax5formatter="phone" value=""/>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                        	<ax:td label="ax.admin.use.or.not" width="300px">
                                <ax:common-code groupCd="USE_YN" dataPath="useYn" clazz="W180"/>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="ax.admin.user.auth.group" width="300px" labelClazz="required">
                                <ax:common-code groupCd="AUTH_GROUP" dataPath="grpAuthCd" name="grpAuthCd" clazz="W180" type="checkbox"/>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="ax.admin.remark" width="100%">
                            	<textarea data-ax-path="remark" class="form-control" maxlength="100"></textarea>
                            </ax:td>
                        </ax:tr>
                    </ax:tbl>
                </ax:form>

            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>