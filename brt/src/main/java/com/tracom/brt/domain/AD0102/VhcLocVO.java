package com.tracom.brt.domain.AD0102;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class VhcLocVO{
	
	private String dlCd;
	private String dlCdNm;
	private String txtVal1;
	private String adPos;
	private String vhcId;
	private String adPosYn;
	private List<VhcLocVO> upList;
	
}
