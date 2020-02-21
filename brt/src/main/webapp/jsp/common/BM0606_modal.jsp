<%@ page import="com.chequer.axboot.core.utils.RequestUtils" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ax" tagdir="/WEB-INF/tags" %>

<ax:set key="pageName" value="File Browser"/>
<ax:set key="page_auto_height" value="true"/>
<ax:set key="axbody_class" value="baseStyle"/>

<ax:layout name="modal">
    <jsp:attribute name="script">
        <ax:script-lang key="ax.script" />
        <ax:script-lang key="ax.admin" var="ADMIN" />
        <script type="text/javascript" src="<c:url value='/assets/js/common/BM0606_modal.js' />"></script>
    </jsp:attribute>
    <jsp:attribute name="header">
        <h3 class="title">
            <i class="cqc-browser"></i>
            <ax:lang id="ax.admin.BM0606G3.modal.title"/>
        </h3>
    </jsp:attribute>
    <jsp:body>
        <ax:page-buttons>
            <button type="button" class="btn btn-default" data-page-btn="close"><ax:lang id="ax.admin.sample.modal.button.close"/></button>
        </ax:page-buttons>

        <div role="page-header">
            <div class="H3"></div>
        </div>

        <ax:split-layout name="ax1" orientation="vertical">
            <ax:split-panel width="*" style="padding-right: 0px;">

                <ax:form name="formView0">                 
                    <ax:tbl clazz="ax-form-tbl" minWidth="600px">                   
						<ax:tr style="height:200px;">
                    		<ax:td labelStyle="height:200px;" label="ax.admin.BM0605F0.preview" width="300px">
                  
                    			 <img id="imagePreview" src="#" style="width:320px;height:180px;border:1px solid #eee;"
                    			 onError="/assets/videos/BM0605/Default.png"/>
                    			 
                    			 
                    			 <video
								    id="videoPreview"
								    class="video-js"
								    controls
								    preload="auto"
								    width="320"
								    height="180"
								    poster=""
								    data-setup="{}"
								 ></video>
                    		</ax:td>
                    	</ax:tr>                                                        
                    </ax:tbl>                    
                </ax:form>
            </ax:split-panel>
        </ax:split-layout>

    </jsp:body>
</ax:layout>