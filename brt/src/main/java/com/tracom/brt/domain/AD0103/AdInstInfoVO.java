package com.tracom.brt.domain.AD0103;

import java.util.List;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AdInstInfoVO extends BaseVO {
	private String instId;
	private String instNm;
	private String custId;
	private String custNm;
	private String priceId;
	private String adStDate;
	private String adEdDate;
	private int adAmt;
	private int etcAmt;
	private String remark;
	private String comfirmYn;
	private String priceType;
	private String confirmYn;
	private List<AdInstDlVO> list;
}
