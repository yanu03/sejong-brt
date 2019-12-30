package com.tracom.brt.domain.SM0104;

import java.math.BigDecimal;

import com.chequer.axboot.core.vo.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CommonCodeDetailInfoVo extends BaseVO {
	private String coCd;
	private String dlCd;
	private String dlCdNm;
	private String dlCdEnm;
	private Integer sortOdr;
	private String txtVal1;
	private String txtVal2;
	private String txtVal3;
	private BigDecimal numVal4;
	private BigDecimal numVal5;
	private BigDecimal numVal6;
	private String useYn;
	private String remark;
}
