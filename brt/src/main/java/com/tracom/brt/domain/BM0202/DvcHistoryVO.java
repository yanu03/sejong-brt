package com.tracom.brt.domain.BM0202;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DvcHistoryVO extends BaseVO{
	
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
	private String area;
	private String maker;
	private String relsDate;
	private String modelNm;
	private String vhcKind;
	private String vhcType;
	private String lfYn;
	private String vhcFuel; 
	private String remark; 
	private String useYn;
	private String devSerialNo;
	private String aplyDate;
	private String workType;
	private String workAmt;
	private String seq;
}
