package com.tracom.brt.domain.OpenAPI;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonIgnoreProperties({"createdAt", "createdBy", "createdIp", "updatedAt", "updatedBy", "updatedIp"})
public class RoutInfoVO extends BaseVO {
	private String resultCd;
	private String resultDetailCd;
	private String errMsg;
	private List<RoutInfoVO> result;
	
	private String routId;
	private String routNm;
	private String wayDiv;
	private String txt1;
	private String txt2;
	private String stStnNm;
	private String edStnNm;
	
}
