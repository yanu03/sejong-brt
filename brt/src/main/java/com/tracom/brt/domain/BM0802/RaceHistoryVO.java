package com.tracom.brt.domain.BM0802;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
public class RaceHistoryVO extends BaseVO{
	
	private String vhcNo;
	private String chasNo;
	private String modelNm;
	private String vhcKind;
	private String vhcType;
	private String lfYn;
	private String vhcFuel;
	private String maker;
	private String area;
	private String dvcId;
	private String corpNm;
	private String remark;
	
}
