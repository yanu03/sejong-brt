package com.tracom.brt.domain.BM0801;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class StatisticsVO extends BaseVO{

	private String vocId;
	private String vocNm;
	private String playStDate;
	private String playEdDate;
	private String playTm;
	private String conId;
	private long suppAmt;
	private int vatAmt;
	private String custNm;
	private String vdoId;
	private String vdoNm;
	private String promotionTy;
	private String promotionNm;
	private String remark;
}
