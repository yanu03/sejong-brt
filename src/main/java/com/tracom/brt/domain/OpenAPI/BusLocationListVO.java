package com.tracom.brt.domain.OpenAPI;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonIgnoreProperties({"createdAt", "createdBy", "createdIp", "updatedAt", "updatedBy", "updatedIp"})
public class BusLocationListVO extends BaseVO {
	private String resultCd;
	private String resultDetailCd;
	private String errMsg;
	private List<BusLocationListVO> result;
	
	private String busNo;
	private String lati;
	private String longi;
	private String alti;
	private String spd;
	private String heading;
	private String routId;
	private String gpsStat;
	private String satCnt;
	private String evtCode;
	private String evtData;
	private String updDtm;
	
}
