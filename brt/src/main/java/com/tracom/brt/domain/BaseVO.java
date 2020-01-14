package com.tracom.brt.domain;

import java.time.Clock;
import java.time.Instant;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.tracom.brt.utils.SessionUtils;

import lombok.Data;

@Data
public class BaseVO {
	public Instant createdAt;
	public String createdBy;
	public String createdIp;
	public Instant updatedAt;
	public String updatedBy;
	public String updatedIp;
	
	public BaseVO() {
		this.createdBy = this.updatedBy = SessionUtils.getCurrentLoginUserCd();
		this.createdAt = this.updatedAt = Instant.now(Clock.systemUTC());
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder .getRequestAttributes()).getRequest();
		this.createdIp = this.updatedIp = request.getRemoteAddr();
	}
}
