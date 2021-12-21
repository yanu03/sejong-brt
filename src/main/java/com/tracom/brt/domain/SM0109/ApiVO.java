package com.tracom.brt.domain.SM0109;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;

@Data
public class ApiVO extends BaseVO{

	private String apiId;
	private String apiName;
	private String apiEndPoint;
	private String allowedIp;
	private String allowedIp1;
	private String allowedIp2;
	private String allowedIp3;
	private String allowedIp4;
	private String expireDate;
	private String useYn;
	private String apiKey;
	private String remark;
	
}
