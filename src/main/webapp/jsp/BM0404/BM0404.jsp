<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${pageRemark}"/>
<ax:set key="page_auto_height" value="true"/>

<ax:layout name="base">
	<jsp:attribute name="css">
        <link rel="stylesheet" type="text/css" href="<c:url value="/assets/css/jplayer.blue.monday.css"/>">
    </jsp:attribute>
    
	<jsp:attribute name="js">
        <script type="text/javascript" src="<c:url value="/assets/js/jplayer/jquery.jplayer.js"/>"></script>
    </jsp:attribute>
    
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" />
        <ax:script-lang key="ax.admin" var="ADMIN" />
        <script type="text/javascript" src="<c:url value="/assets/js/view/BM0404/BM0404.js"/>"></script>
    </jsp:attribute>
    <jsp:body>

        <ax:page-buttons></ax:page-buttons>

        <div role="page-header">
            <ax:form name="searchView0">
                <ax:tbl clazz="ax-search-tbl" minWidth="500px">
                    <ax:tr>
                        <ax:td label='ax.admin.search' width="300px">
                            <ax:input type="text" name="filter" id="filter" clazz="form-control" placeholder="ax.admin.BM0404S0.search"/>
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
                            <ax:lang id="ax.admin.BM0404G0.title"/> 
                        </h3>
                    </div>
                    <div class="right">

                    </div>
                </div>
                <div data-ax5grid="gridView0" data-fit-height-content="gridView0" style="height: 300px;"></div>
            </ax:split-panel>
            <ax:splitter></ax:splitter>
            <ax:split-panel width="700" style="padding-left: 10px;" scroll="scroll">
                <!-- 폼 -->
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <h3><i class="cqc-news"></i>
                            <ax:lang id="ax.admin.BM0404F0.title"/>
                        </h3>
                    </div>
                </div>
                <ax:form name="formView0">
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                        <ax:tr>
                            <ax:td label="ax.admin.BM0404F0.voc.id" width="210px" labelClazz="required">
                                <input type="text" name="vocId" data-ax-path="vocId" data-key="true" class="form-control" readonly="readonly"/>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="ax.admin.BM0404F0.play.type" width="210px" labelClazz="required">
                            	<ax:SM0105 groupCd="PLAY_TYPE" name="playType" dataPath="playType" clazz="form-control" />
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                            <ax:td id="wavLabel" label="ax.admin.BM0404F0.wav" width="100%">
                            	<div style="float:left;width:450px;">
                            		<input type="file" id="wavFile" name="wavFile" accept="audio/wav" title="<ax:lang id="ax.admin.BM0404F0.wav"/>" style="display: inline-block;" class="W160"/>
                            		<span id="wavFilename" style="color: red; display: inline-block;"></span>
                            	</div>
                            	<div style="float:left;padding-left:5px;">
	                            	<button type="button" class="btn btn-default" data-btn data-btn-test="wav">
	                                	<ax:lang id="ax.admin.test"/>
	                            	</button>
	                            </div>
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                            <ax:td id="krTtsLabel" label="ax.admin.BM0404F0.kr.tts" width="100%">
                            	<div style="float:left;width:450px;">
                            		<textarea name="krTts" data-ax-path="krTts" title="<ax:lang id="ax.admin.BM0403F0.kr.tts"/>" rows="4" class="form-control" maxlength="200"></textarea>
                            	</div>
                            	<div style="float:left;padding-left:5px;">
		                            <div>	
		                            	<button type="button" class="btn btn-default" data-btn data-btn-test="krTts">
		                                	<ax:lang id="ax.admin.test"/>
		                            	</button>
		                            </div>
		                            <div style="padding-top:5px;">
		                            	<button type="button" class="btn btn-default" data-btn data-btn-common-txt="krTts">
		                                	<ax:lang id="ax.admin.common.txt"/>
		                            	</button>
		                            </div>
                            	</div>
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                            <ax:td label="ax.admin.test" width="300px">
                            	<div id="jquery_jplayer_1" class="jp-jplayer"></div>
								<div id="jp_container_1" class="jp-audio" role="application" aria-label="media player">
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
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                            <ax:td label="ax.admin.BM0404F0.remark" width="100%">
                            	<textarea name="remark" data-ax-path="remark" class="form-control" maxlength="200"></textarea>
                            </ax:td>
                       	</ax:tr>
                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>