package com.tracom.brt.domain.BM0999;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class TsRoutNodeVO extends BaseVO {
	 
	private String routId;
	 
	private int seq;
 
	private String nodeId;
 
	private String noteType;
 
	private double x;
 
	private double y;
	
}