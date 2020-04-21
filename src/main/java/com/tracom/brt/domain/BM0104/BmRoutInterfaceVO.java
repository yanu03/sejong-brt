package com.tracom.brt.domain.BM0104;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class BmRoutInterfaceVO extends BaseVO {
	 
	private String routeId;
	 
	private String routeNo;
	
	private String startNodeNm;
	
	private String endNodeNm;
	
	private String cityCode;
}