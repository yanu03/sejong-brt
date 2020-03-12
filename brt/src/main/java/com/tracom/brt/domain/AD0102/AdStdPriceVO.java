package com.tracom.brt.domain.AD0102;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AdStdPriceVO extends BaseVO {
	private String priceId;
	private String priceType;
	private String priceTypeNm;
	private String adLvl;
	private String adLvlNm;
	private String adPos;
	private String adPosNm;
	private String adPosType;
	private int unitAmt;
	private int instAmt;
	private String remark;
}
