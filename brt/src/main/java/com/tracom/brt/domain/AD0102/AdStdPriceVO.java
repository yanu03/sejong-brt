package com.tracom.brt.domain.AD0102;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AdStdPriceVO extends BaseVO {
	String priceId;
	String priceType;
	String priceTypeNm;
	String adLvl;
	String adLvlNm;
	String adPos;
	String adPosNm;
	String adPosType;
	int unitAmt;
	int instAmt;
	String remark;
}
