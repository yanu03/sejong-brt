package com.tracom.brt.domain.BM0303;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor

public class ContractViewVO extends BaseVO{

	private String conId;
	private String seq;
	private String conNm;
	private String altDiv;
	private String altConDate;
	private String conStDate;
	private String conEdDate;
	private String suppAmt;
	private String vatAmt;
	private String remark;
	private String confirmYn;
	private String custId;
	private String custNm;
	private String conNo;
	private String vocId;
	private String vocNm;
	private String vdoId;
	private String playStDate;
	private String playEdDate;
	private String attFile;
	private String type;
	private int playTm;
}
