package com.tracom.brt.domain.BM0205;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor

public class VhcDvcUpdateVO extends BaseVO{
	
	private String vhcNo;
	private String vhcKind;
	private String vhcType;
	private String maker;
	private String dvcKind;
	private String dvcType;
	private String instLoc;
	private String modelNm;
	
}
