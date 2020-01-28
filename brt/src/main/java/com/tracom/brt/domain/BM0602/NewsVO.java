package com.tracom.brt.domain.BM0602;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NewsVO extends BaseVO{	
	private String provId;
	private String provUrl;
	private String provNm;
	private String remark;
	private String useYn;	
}
