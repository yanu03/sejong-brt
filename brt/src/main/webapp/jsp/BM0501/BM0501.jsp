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
        <script type="text/javascript" src="<c:url value='/assets/js/view/BM0501/BM0501.js' />"></script>
        <style>
			.grid-cell-gray{
		        
		        color: FFFFFF<!-- #F1F3F5 -->;
		        
		        
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
                            <ax:input type="text" name="filter" id="filter" clazz="form-control" placeholder="노선ID OR 노선명"/>
                        </ax:td>
                    </ax:tr>
                </ax:tbl>
            </ax:form>
            <div class="H10"></div>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="*" style="padding-right: 10px;">
                <!-- 목록 -->
                <div class="ax-button-group" data-fit-height-aside="gridView0">
                    <div class="left">
                        <i class="cqc-list"></i>노선목록
                    </div>
                    <div class="right">
						<!-- 우측에 필요시 -->
                    </div>
                </div>
                <div data-ax5grid="gridView0" data-fit-height-content="gridView0" style="height: 300px;"></div>
            </ax:split-panel>
            <ax:splitter></ax:splitter>
            <ax:split-panel width="700" style="padding-left: 10px;" scroll="scroll">
                <div class="ax-button-group" role="panel-header">
                    <div class="left">
                        <i class="cqc-news"></i>표출정보
                    </div>
                    <div class="right">
						<!-- 우측에 필요시 -->
                    </div>
                </div>
                <ax:form name="formView0">
                    <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                        <ax:tr>
                            <ax:td label="장치유형" width="100%" labelClazz="required">
                            <!-- 
                            <select id="selectBox"></select>
                             -->
                            	<div data-ax5select="selectType" id="selectBox"></div>
                            	<!-- 
                                <ax:SM0105 groupCd="DVC_TYPE" id="dvcType" name="dvcType" dataPath="dvcType" clazz="form-control"/>
                            	 -->
                            </ax:td>
                        </ax:tr>
                        <ax:tr>
                            <ax:td label="노선표시파일" width="100%" labelClazz="required">
                                <!-- <input type="text" name="vocId" data-ax-path="vocId" data-key="true" class="form-control" readonly="readonly"/> -->
								<input type="file" id="bmpFile" name="bmpFile" accept="image/bmp" />
                            </ax:td>
                        </ax:tr>
                        <ax:tr>
                            <ax:td label="동작설정" width="100%" labelClazz="required">
	                            <!-- 
	                            <div class="input-group">
	                        		<input type="text" data-ax-path="conId" name="conId" data-key="true" class="form-control W90" readonly="readonly" title="<ax:lang id="ax.admin.BM0402F0.con.id"/>" data-ax-validate="required">
	                        		<input type="text" data-ax-path="conNm" name="conNm" data-key="true" class="form-control W90" readonly="readonly">
	                       			<button type="button" id="selectButton" class="btn btn-primary" data-form-view-0-btn="selectContract">
	                                	<ax:lang id="ax.admin.select"/>
	                            	</button>
	                            </div>
	                             -->
	                             <!-- 그리드 -->
	                             <div data-ax5grid="gridView1" data-fit-height-content="gridView1" style="min-height:280px;height: 280px;"></div>
                            </ax:td>
                        </ax:tr>
                        
                        <ax:tr>
                            <ax:td label="미리보기" width="100%" style="height: 100px;">
	                            <!-- <div class="input-group" data-ax5picker="date">
	                                <input type="text" name="playStDate" data-ax-path="playStDate" title="<ax:lang id="ax.admin.BM0402F0.play.date"/>" class="form-control" data-ax5formatter="date" data-ax-validate="required">
	                                <span class="input-group-addon">~</span>
	                                <input type="text" name="playEdDate" data-ax-path="playEdDate" title="<ax:lang id="ax.admin.BM0402F0.play.date"/>" class="form-control" data-ax5formatter="date" data-ax-validate="required">
	                                <span class="input-group-addon"><i class="cqc-calendar"></i></span>
	                            </div>
	                             -->
	                             	<div>
	                             		<img id="previewImg" src="#" alt="행선지안내기 미리보기" onError="/assets/videos/BM0605/Default.png"></div>
	                             		<input type="hidden" id="previewHidden" src="#">
                            </ax:td>
                        </ax:tr>
                        
                        <!-- 
                        <ax:tr>
                            <ax:td label="ax.admin.BM0402F0.play.type" width="300px" labelClazz="required">
                            	<ax:SM0105 groupCd="PLAY_TYPE" name="playType" dataPath="playType" clazz="form-control" />
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                            <ax:td id="wavLabel" label="ax.admin.BM0402F0.wav" width="100%">
                            	<input type="file" id="wavFile" name="wavFile" class="form-control inline-block W180" accept="audio/wav" title="<ax:lang id="ax.admin.BM0401F0.wav"/>"/>
                            	<button type="button" class="btn btn-default" data-btn data-btn-test="wav">
                                	<ax:lang id="ax.admin.test"/>
                            	</button>
                            </ax:td>
                       	</ax:tr>
                       	
                       	<ax:tr>
                            <ax:td id="krTtsLabel" label="ax.admin.BM0402F0.kr.tts" width="100%">
                            	<textarea name="krTts" data-ax-path="krTts" title="<ax:lang id="ax.admin.BM0401F0.kr.tts"/>" class="form-control"></textarea>
                            	
                            	<div style="margin-top: 4px; text-align: right;">
	                            	<button type="button" class="btn btn-default" data-btn data-btn-test="krTts">
	                                	<ax:lang id="ax.admin.test"/>
	                            	</button>
	                            	
	                            	<button type="button" class="btn btn-default" data-btn data-btn-common-txt="krTts">
	                                	<ax:lang id="ax.admin.common.txt"/>
	                            	</button>
	                            </div>
                            </ax:td>
                       	</ax:tr>
                       	 -->
                       	
<%--                        	<ax:tr>
                       		<ax:td id="enTtsLabel" label="ax.admin.BM0402F0.en.tts" width="100%">
                            	<textarea name="enTts" data-ax-path="enTts" title="<ax:lang id="ax.admin.BM0401F0.en.tts"/>" class="form-control"></textarea>
                            	
                            	<div style="margin-top: 4px; text-align: right;">
	                            	<button type="button" class="btn btn-default" data-btn data-btn-test="enTts">
	                                	<ax:lang id="ax.admin.test"/>
	                            	</button>
	                            	
	                            	<button type="button" class="btn btn-default" data-btn data-btn-common-txt="enTts">
	                                	<ax:lang id="ax.admin.common.txt"/>
	                            	</button>
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
                            <ax:td label="ax.admin.BM0402F0.remark" width="300px">
                            	<input type="text" name="remark" data-ax-path="remark" class="form-control"/>
                            </ax:td>
                       	</ax:tr>
--%>
                    </ax:tbl>
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>