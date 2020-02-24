package com.tracom.brt.domain.BM0503;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class RoutRsvVO extends BaseVO {

	private String routId;
	
	private String interRoutId;
	
	private String routNm;
	
	private String dvcName;
	
	private String userWayDivNm;
	
	private String dvcType;
	
	private String vhcId;
	
	private String vhcNo;
	
	private String dvcId;
	
	private String mngId;
}