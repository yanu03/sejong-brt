<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="title" value="${pageName}"/>
<ax:set key="page_desc" value="${PAGE_REMARK}"/>
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
        <script type="text/javascript" src="<c:url value='/assets/js/view/SM0108/SM0108.js' />"></script>
    </jsp:attribute>
    
    <jsp:body>
        <ax:page-buttons>
        </ax:page-buttons>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="*" style="padding-right: 10px; height:100%;">
            	<ax:tbl clazz="ax-form-tbl" minWidth="500px">
            		<ax:tr>
                       <ax:td id="krTtsLabel" label="ax.admin.BM0401F0.kr.tts" width="100%">
							<%-- <span>차임벨: </span><ax:common-code groupCd="CHIME_YN" dataPath="chimeYn" clazz="form-control" /> --%>
                        	<div style="float:left;width:450px;">
                        		<textarea name="krTts" data-ax-path="krTts" title="<ax:lang id="ax.admin.BM0401F0.kr.tts"/>" rows="4" class="form-control" maxlength="200"></textarea>
                        	</div>
                        	<div style="float:left;padding-left:5px;">
                        		<div>	
	                            	<button type="button" class="btn btn-default" data-btn data-btn-test="krTts">
	                                	<ax:lang id="ax.admin.test"/>
	                            	</button>
	                            </div>
								<div>	
		                          	<button type="button" class="btn btn-default" data-btn data-btn-download="krTts">
		                              	다운로드
		                          	</button>
								</div>
                        	</div>
                        </ax:td>
                   	</ax:tr>
                       	
                   	<ax:tr>
                   		<ax:td id="enTtsLabel" label="ax.admin.BM0401F0.en.tts" width="100%">
                   			<div style="float:left;width:450px;">
                        		<textarea name="enTts" data-ax-path="enTts" title="<ax:lang id="ax.admin.BM0401F0.en.tts"/>" rows="4" class="form-control" maxlength="200"></textarea>
                        	</div>
                        	<div style="float:left;padding-left:5px;">
                        		<div>
	                            	<button type="button" class="btn btn-default" data-btn data-btn-test="enTts">
	                                	<ax:lang id="ax.admin.test"/>
	                            	</button>
								</div>
	                         	<div>
		                          	<button type="button" class="btn btn-default" data-btn data-btn-download="enTts">
		                              	다운로드
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
            	</ax:tbl>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>