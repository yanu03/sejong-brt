package com.tracom.brt.domain.OpenAPI;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonIgnoreProperties({"createdAt", "createdBy", "createdIp", "updatedAt", "updatedBy", "updatedIp"})
public class BusListVO extends BaseVO {
	private String resultCd;
	private String resultDetailCd;
	private String errMsg;
	private List<BusListVO> result;
	
	private String busNo;
	private String corpNm;
	private String area;
	private String maker;
	private String busKind;
	private String fuel;
	
}
