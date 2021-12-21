package com.tracom.brt.domain.OpenAPI;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonIgnoreProperties({"createdAt", "createdBy", "createdIp", "updatedAt", "updatedBy", "updatedIp"})
public class RoutNodeVO extends BaseVO {
	private String resultCd;
	private String resultDetailCd;
	private String errMsg;
	private List<RoutNodeVO> result;
	
	private String nodeSeq;
	private String nodeId;
	private String nodeNm;
	private String nodetype;
	private String lati;
	private String longi;
	
	private String stnId;
	private String stnNm;
}
