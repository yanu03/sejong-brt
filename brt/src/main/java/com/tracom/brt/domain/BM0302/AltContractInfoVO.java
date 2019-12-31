package com.tracom.brt.domain.BM0302;

import com.chequer.axboot.core.vo.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor

public class AltContractInfoVO extends BaseVO{
	
	private String conId;
	private String seq;
	private String altDiv;
	private String altConDate;
	private String conStDate;
	private String conEdDate;
	private String suppAmt;
	private String vatAmt;
	private String remark;
	private String confirmYn;
	private String conNo;
	
}
