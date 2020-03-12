package com.tracom.brt.domain.BM0106;

import com.tracom.brt.domain.BM0105.BmStaInfoVO;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class BmStaNmInfoVO extends BmStaInfoVO {
	 
	private String staId;
	
	private String staNm;
	
	private String krNm;
 
	private String enNm;
 
	private String cnNm;
 
	private String jpNm;
 
	private String remark;
	
	private String lineCnt;
	
}