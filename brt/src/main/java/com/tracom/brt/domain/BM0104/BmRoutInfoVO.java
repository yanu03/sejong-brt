package com.tracom.brt.domain.BM0104;

import java.util.List;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class BmRoutInfoVO extends BaseVO {
	 
	private String routId;
	 
	private String routNm;
 
	private String shortRoutNm;

	private String wayDiv;
	
	private String userWayDiv;
	
	private String turnDiv;
	
	private String stStaNm;
	
	private String edStaNm;
	
	private List<BmRoutInfoVO> voList;
	
}