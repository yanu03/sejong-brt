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
	
	/** 0401 노선별 텍스트를 작성하기 위한 변수 **/
	private String day1;
	
	private String day2;
	
	private String satDay1;
	
	private String satDay2;
	
	private String sunDay1;
	
	private String sunDay2;
}
