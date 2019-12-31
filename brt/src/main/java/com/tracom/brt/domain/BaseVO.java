package com.tracom.brt.domain;

import java.time.Clock;
import java.time.Instant;

import com.tracom.brt.utils.SessionUtils;

import lombok.Data;

@Data
public class BaseVO {
	public Instant createdAt;
	public String createdBy;
	public Instant updatedAt;
	public String updatedBy;
	
	public BaseVO() {
		this.createdBy = this.updatedBy = SessionUtils.getCurrentLoginUserCd();
		this.createdAt = this.updatedAt = Instant.now(Clock.systemUTC());
	}
}
