package com.tracom.brt.domain.OpenAPI;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonIgnoreProperties({"createdAt", "createdBy", "createdIp", "updatedAt", "updatedBy", "updatedIp"})
public class ErrorVO extends BaseVO {
	private String resultCd;
	private String resultDetailCd;
	private String errMsg;
}
