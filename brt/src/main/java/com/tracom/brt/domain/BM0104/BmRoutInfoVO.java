package com.tracom.brt.domain.BM0104;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class BmRoutInfoVO extends BaseVO {
	 
	private String routId;
	 
	private String routNm;
 
	private String wayDiv;
 
	private String shortRoutNm;
	
}