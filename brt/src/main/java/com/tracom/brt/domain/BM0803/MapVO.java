package com.tracom.brt.domain.BM0803;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MapVO extends BaseVO{
	private String vhcId;
	private String vhcNo;
	private String chasNo;
	private String modelNm;
	private String corpId;
	private String useYn;
	private String remark;
}
