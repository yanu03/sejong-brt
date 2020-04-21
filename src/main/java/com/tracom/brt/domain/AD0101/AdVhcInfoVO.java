package com.tracom.brt.domain.AD0101;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AdVhcInfoVO extends BaseVO {
	private String vhcId;
	private String adPos;
	private String adPosType;
	private String adPosNm;
	private String isPos;
}
