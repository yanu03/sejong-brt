package com.tracom.brt.domain.SM0104;

import com.chequer.axboot.core.vo.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CommonCodeInfoVo extends BaseVO {
	private String coCd;
	private String coCdNm;
	private String coCdEnm;
	private String useYn;
	private String remark;
}