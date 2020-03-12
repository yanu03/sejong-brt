package com.tracom.brt.domain.routeReservation;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;

@Data
public class RoutListCSVVO extends BaseVO {

	private String fileVersion;
	
	private String fileName;
	
	private String routVersion;
	
	private String routNo;
	
	private String routNmKo;
	
	private String routNmEn;
	
	private String routShape;
}
