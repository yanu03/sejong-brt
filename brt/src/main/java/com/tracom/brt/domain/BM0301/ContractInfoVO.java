package com.tracom.brt.domain.BM0301;

import com.chequer.axboot.core.vo.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor

public class ContractInfoVO extends BaseVO{	
	private String conId;
	private String conNm;
	private String conFstDate;
	private String conStDate;
	private String conEdDate;
	private String confirmYn;
	private String suppAmt;
	private String vatAmt;
	private String custId;
	private String custNm;
	private String remark;
	private String conNo;

}
