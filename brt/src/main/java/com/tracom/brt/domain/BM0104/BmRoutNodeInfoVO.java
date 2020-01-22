package com.tracom.brt.domain.BM0104;

import java.util.List;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class BmRoutNodeInfoVO extends BaseVO {
	
	private String nodeId;
	private String nodeNm;
	private int nodeType;
	private float lati;
	private float longi;
	private int seq;
	private String routId;
	private String staId;
	private String staNm;
	private String staNo;
	private int allPlayTm;
	private List<BmRoutNodeInfoVO> voList;
	
}