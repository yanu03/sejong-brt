package com.tracom.brt.domain.BM0608;
 
import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;
 
@Data
@NoArgsConstructor
public class BmScrInfoVO extends BaseVO {

	private String setId;
	
	private String setNm;
	
	private String fontColor;
	
	private String remark;
}