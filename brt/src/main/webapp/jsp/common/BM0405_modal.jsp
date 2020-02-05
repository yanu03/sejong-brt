<%@ page import="com.chequer.axboot.core.utils.RequestUtils" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>
<%

%>
<ax:set key="pageName" value="File Browser"/>
<ax:set key="page_auto_height" value="true"/>
<ax:set key="axbody_class" value="baseStyle"/>

<ax:layout name="modal">
	<jsp:attribute name="css">
        <link rel="stylesheet" type="text/css" href="<c:url value="/assets/css/jplayer.blue.monday.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/assets/css/BM0405/BM0405.css"/>">
    </jsp:attribute>
    
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" />
        <ax:script-lang key="ax.admin" var="ADMIN" />
        <script type="text/javascript" src="<c:url value="/assets/js/jplayer/jquery.jplayer.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/assets/js/jplayer/jplayer.playlist.js"/>"></script>
        <script type="text/javascript" src="<c:url value='/assets/js/common/BM0405_modal.js' />"></script>
    </jsp:attribute>
    <jsp:attribute name="header">
        <h3 class="title">
            <i class="cqc-browser"></i>
            	음성편성
        </h3>
    </jsp:attribute>
    <jsp:body>
        <ax:page-buttons>
            <button type="button" class="btn btn-fn1" data-page-btn="save"><ax:lang id="ax.admin.save"/></button>
            <button type="button" class="btn btn-fn1" data-page-btn="delete"><ax:lang id="ax.admin.delete"/></button>
            <button type="button" class="btn btn-default" data-page-btn="close"><ax:lang id="ax.admin.close"/></button>
        </ax:page-buttons>

      <%--   <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='ax.admin.sample.search.condition' width="300px">
                            <ax:input type="text" name="filter" id="filter" clazz="form-control" placeholder="ax.admin.BM0102S0.search"/>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>
 --%>
 		<div role="page-header" style="margin-bottom: 5px;">
 			<ax:form id="formView0" name="formView0">
 				<ax:tbl clazz="ax-form-tbl" minWidth="500px">
 					<ax:tr>
 						<ax:td label="ax.admin.BM0405G2.orga.nm" width="250px" labelClazz="required">
 							<input type="text" name="orgaNm" data-ax-path="orgaNm" class="form-control" title="<ax:lang id="ax.admin.BM0405G2.orga.nm"/>" data-ax-validate="required">
 						</ax:td>
 						<ax:td label="ax.admin.BM0405F0.remark" width="250px">
 							<input type="text" name="remark" data-ax-path="remark" class="form-control" title="<ax:lang id="ax.admin.BM0405F0.remark"/>">
 						</ax:td>
 					</ax:tr>
 				</ax:tbl>
 			</ax:form>
 		</div>
 		
        <ax:split-layout name="ax1" orientation="vertical">
        	<ax:SM0105 groupCd="VOC_DIV" id="selectVoice" dataPath="vocDiv" width="200px"/>
        	
            <ax:split-panel width="200" style="margin-right: 30px;">
            	<div class="ax-button-group">
	            	<div class="left">
			            <h3><i class="cqc-list"></i>
			                <ax:lang id="ax.admin.BM0405F0.voice.list"/>
			            </h3>
		            </div>
	            </div>
	            
                <div data-ax5grid="gridView3" style="height: 300px;"></div>
            </ax:split-panel>
            
            <ax:split-panel width="70" style="top: 30%;">
            	<div style="width: 50px; margin-left: 10px;">
	            	<button type="button" class="btn btn-default" style="width: 100%; margin-bottom: 10px;" data-page-btn="addPlayList">
	            		→
	            	</button>
	            	
	            	<button type="button" class="btn btn-default" style="width: 100%;" data-page-btn="deletePlayList">
	            		←
	            	</button>
            	</div>
            </ax:split-panel>
            
            <ax:split-panel width="200">
           		<div class="ax-button-group">
                    <div class="left">
			            <h3><i class="cqc-list"></i>
			                <ax:lang id="ax.admin.BM0405F0.play.list"/>
			            </h3>
		            </div>
		            <div class="right">
			            <button type="button" class="btn btn-default" data-page-btn="upItem">
		            		↑
		            	</button>
		            	
		            	<button type="button" class="btn btn-default" data-page-btn="downItem">
		            		↓
		            	</button>
		            	<button type="button" class="btn btn-default" data-page-btn="test"><ax:lang id="ax.admin.test"/></button>
		            </div>
                </div>
            	
                <div data-ax5grid="gridView4" style="height: 300px;"></div>
            </ax:split-panel>
            
            <div id="jquery_jplayer_0" class="jp-jplayer"></div>
			<div id="jp_container_0" class="jp-audio" role="application" aria-label="media player" style="margin-top: 350px; margin-left: 105px; z-index: 1000;">
				<div class="jp-type-single">
					<div class="jp-gui jp-interface">
						<div class="jp-controls">
							<button class="jp-stop" role="button" tabindex="0">stop</button>
						</div>
						<div class="jp-progress">
							<div class="jp-seek-bar">
								<div class="jp-play-bar"></div>
							</div>
						</div>
						<div class="jp-volume-controls">
							<button class="jp-mute" role="button" tabindex="0">mute</button>
							<button class="jp-volume-max" role="button" tabindex="0">max volume</button>
							<div class="jp-volume-bar">
								<div class="jp-volume-bar-value"></div>
							</div>
						</div>
						<div class="jp-time-holder">
							<div class="jp-current-time" role="timer" aria-label="time">&nbsp;</div>
							<div class="jp-duration" role="timer" aria-label="duration">&nbsp;</div>
						</div>
					</div>
				</div>
			</div>
        </ax:split-layout>
    </jsp:body>
</ax:layout>