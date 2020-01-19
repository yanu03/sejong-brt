package com.tracom.brt.domain.BM0204;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor

public class ObeConditionVO extends BaseVO{
	
	private String vhcId;
	private String dvcId;
	private String dvcKind;
	private String dvcType;
	private String instLoc;
	private String mngId;
	private String dvcIp;
	private String vhcNo;
	private String chasNo;
	private String corpId;
	private String corpNm;
	private String maker;
	private String relsDate;
	private String modelNm;
	private String vhcKind;
	private String vhcType;
	private String dlCdNm;
	private Float lati;
	private Float longi;
	private String spd;
	private String heading;
	private String gps;
}
