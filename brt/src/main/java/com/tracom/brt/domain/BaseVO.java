package com.tracom.brt.domain;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.tracom.brt.utils.SessionUtils;

import lombok.Data;

@Data
public class BaseVO {
	public String createdAt;
	public String createdBy;
	public String createdIp;
	public String updatedAt;
	public String updatedBy;
	public String updatedIp;
	
	public BaseVO() {
		this.createdBy = this.updatedBy = SessionUtils.getCurrentLoginUserCd();
		this.createdAt = this.updatedAt = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
		ServletRequestAttributes attr = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes());
		
		if(attr != null) {
			HttpServletRequest request = attr.getRequest();
			if(request != null) {
				this.createdIp = this.updatedIp = request.getRemoteAddr();
			}
		}
		
	}
}
