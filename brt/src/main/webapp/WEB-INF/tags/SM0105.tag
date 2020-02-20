<%@tag import="com.tracom.brt.domain.SM0105.CommonCodeDetailInfoVO"%>
<%@tag import="com.tracom.brt.utils.SM0105Utils"%>
<%@ tag import="org.apache.commons.lang3.StringUtils" %>
<%@ tag import="java.util.List" %>
<%@ tag language="java" pageEncoding="UTF-8" body-content="empty" %>
<%@ attribute name="groupCd" required="true" %>
<%@ attribute name="name" required="false" %>
<%@ attribute name="clazz" required="false" %>
<%@ attribute name="id" required="false" %>
<%@ attribute name="dataPath" required="false" %>
<%@ attribute name="type" required="false" %>
<%@ attribute name="defaultValue" required="false" %>
<%@ attribute name="emptyValue" required="false" %>
<%@ attribute name="emptyText" required="false" %>
<%@ attribute name="width" required="false" %>
<%@ attribute name="style" required="false" %>

<%
    if (StringUtils.isEmpty(type)) {
        type = "select";
    }

    StringBuilder builder = new StringBuilder();

    List<CommonCodeDetailInfoVO> commonCodes = SM0105Utils.get(groupCd);
    
    String _style = "";
    
    if(StringUtils.isNotEmpty(style)) {
    	_style = style; 
    }

    switch (type) {
        case "select":
            builder.append("<select style=\"width: " + width + "; " + _style + "\" class=\"form-control "+ clazz +" \"");

            if (StringUtils.isEmpty(emptyValue)) {
                emptyValue = "";
            }

            if (StringUtils.isNotEmpty(id)) {
                builder.append("id=\"" + id + "\"");
            }

            if (StringUtils.isNotEmpty(name)) {
                builder.append("name=\"" + name + "\"");
            }

            if (StringUtils.isNotEmpty(dataPath)) {
                builder.append("data-ax-path=\"" + dataPath + "\"");
            }
            
            builder.append(">");


            if (StringUtils.isEmpty(defaultValue) && StringUtils.isNotEmpty(emptyText)) {
                builder.append(String.format("<option value=\"%s\">%s</option>", emptyValue, emptyText));
            }

            for (CommonCodeDetailInfoVO commonCode : commonCodes) {
                if (StringUtils.isNotEmpty(defaultValue) && defaultValue.equals(commonCode.getDlCd())) {
                    builder.append(String.format("<option value=\"%s\" selected>%s</option>", commonCode.getDlCd(), commonCode.getDlCdNm()));
                } else {
                    builder.append(String.format("<option value=\"%s\">%s</option>", commonCode.getDlCd(), commonCode.getDlCdNm()));
                }
            }
            builder.append("</select>");
            break;

        case "checkbox":
            for (CommonCodeDetailInfoVO commonCode : commonCodes) {
                if (StringUtils.isNotEmpty(defaultValue) && defaultValue.equals(commonCode.getDlCd())) {
                    builder.append(String.format("<label class=\"checkbox-inline\"><input type=\"checkbox\" name=\"%s\" data-ax-path=\"%s\" value=\"%s\" checked> %s </label>", name, dataPath, commonCode.getDlCd(), commonCode.getDlCdNm()));
                } else {
                    builder.append(String.format("<label class=\"checkbox-inline\"><input type=\"checkbox\" name=\"%s\" data-ax-path=\"%s\" value=\"%s\"> %s </label>", name, dataPath, commonCode.getDlCd(), commonCode.getDlCdNm()));
                }
            }
            break;

        case "radio":
            for (CommonCodeDetailInfoVO commonCode : commonCodes) {
                if (StringUtils.isNotEmpty(defaultValue) && defaultValue.equals(commonCode.getDlCd())) {
                    builder.append(String.format("<label class=\"checkbox-inline\"><input type=\"radio\" name=\"%s\" data-ax-path=\"%s\" value=\"%s\" checked> %s </label>", name, dataPath, commonCode.getDlCd(), commonCode.getDlCdNm()));
                } else {
                    builder.append(String.format("<label class=\"checkbox-inline\"><input type=\"radio\" name=\"%s\" data-ax-path=\"%s\" value=\"%s\"> %s </label>", name, dataPath, commonCode.getDlCd(), commonCode.getDlCdNm()));
                }
            }
            break;
    }
%>

<%=builder.toString()%>