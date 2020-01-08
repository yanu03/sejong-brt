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
        <script type="text/javascript" src="<c:url value="/assets/js/view/BM0401/BM0401.js"/>"></script>
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
                            <ax:td label="ax.admin.BM0401F0.play.date" width="400px">
	                            <div class="input-group" data-ax5picker="date">
	                                <input type="text" data-ax-path="playStDate" class="form-control" placeholder="0000-00-00">
	                                <span class="input-group-addon">~</span>
	                                <input type="text" data-ax-path="playEdDate" class="form-control" placeholder="0000-00-00">
	                                <span class="input-group-addon"><i class="cqc-calendar"></i></span>
	                            </div>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="ax.admin.BM0401F0.play.type" width="300px">
                            	<ax:common-code groupCd="TTS" dataPath="playType" clazz="form-control" />
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                            <ax:td label="ax.admin.test" width="500px">
	                            	<input type="file" id="wavFile" class="form-control inline-block W180" accept="audio/wav"/>
	                            	<button type="button" id="testButton" class="btn btn-primary">
	                                	<ax:lang id="ax.admin.test"/>
	                            	</button>
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                            <ax:td label="ax.admin.BM0401F0.kr.tts" width="100%">
                            	<textarea data-ax-path="krTts" class="form-control"></textarea>
                            	
                            	<div style="margin-top: 4px; text-align: right;">
	                            	<button type="button" data-test-btn="krTts" class="btn btn-primary">
	                                	<ax:lang id="ax.admin.test"/>
	                            	</button>
	                            	
	                            	<button type="button" class="btn btn-primary" data-common-txt-btn="krTts">
	                                	<ax:lang id="ax.admin.common.txt"/>
	                            	</button>
	                            </div>
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                       		<ax:td label="ax.admin.BM0401F0.en.tts" width="100%">
                            	<textarea data-ax-path="enTts" class="form-control"></textarea>
                            	
                            	<div style="margin-top: 4px; text-align: right;">
	                            	<button type="button" data-test-btn="enTts" class="btn btn-primary">
	                                	<ax:lang id="ax.admin.test"/>
	                            	</button>
	                            	
	                            	<button type="button" class="btn btn-primary" data-common-txt-btn="enTts">
	                                	<ax:lang id="ax.admin.common.txt"/>
	                            	</button>
	                            </div>
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                            <ax:td label="ax.admin.BM0401F0.scr.txt" width="100%">
                            	<textarea data-ax-path="scrTxt" class="form-control"></textarea>
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                            <ax:td label="ax.admin.BM0401F0.scr.txt.en" width="100%">
                            	<textarea data-ax-path="scrTxtEn" class="form-control"></textarea>
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                            <ax:td label="ax.admin.test" width="300px">
                            	<div id="jquery_jplayer_1" class="jp-jplayer"></div>
								<div id="jp_container_1" class="jp-audio" role="application" aria-label="media player">
									<div class="jp-type-single">
										<div class="jp-gui jp-interface">
											<div class="jp-controls">
												<button class="jp-play" role="button" tabindex="0">play</button>
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
												<div class="jp-toggles">
													<button class="jp-repeat" role="button" tabindex="0">repeat</button>
												</div>
											</div>
										</div>
									</div>
								</div>
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