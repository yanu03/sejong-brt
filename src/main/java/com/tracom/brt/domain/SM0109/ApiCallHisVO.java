package com.tracom.brt.domain.SM0109;

import lombok.Data;

@Data
public class ApiCallHisVO {

	private String reqDt;
	private int seq;
	private String reqEndPoint;
	private String reqQuery;
	private String reqIp;
	private String result;
	
}
