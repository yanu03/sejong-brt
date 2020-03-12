package com.tracom.brt.domain.BM0105;

import java.util.List;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class BmStaInfoVO extends BaseVO {
	 
	private String routId;
	
	private String staId;
	 
	private String staNm;
 
	private String staNo;
 
	private float lati;
 
	private float longi;
	
	private int seq;
	
	private String krNm;

	private String lineCnt;
	
	private List<BmStaInfoVO> voList;
	
	
}