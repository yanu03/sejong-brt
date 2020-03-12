package com.tracom.brt.domain.AD0101;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AdVhcInfoVO extends BaseVO {
	String vhcId;
	String adPos;
	String adPosType;
	String adPosNm;
	String isPos;
}
