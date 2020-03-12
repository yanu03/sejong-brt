package com.tracom.brt.domain.AD0103;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AdInstDlVO extends BaseVO {
	private String instId;
	private String vhcId;
	private String adPos;
	private String adRout;
	private String adLvl;
	private String adLvlNm;
	private String vhcNo;
	private String adPosTypeNm;
	private String adPosNm;
	private int adAmt;
	private int unitAmt;
	private String priceType;
}
