package com.tracom.brt.domain.BM0609;
 
import java.util.List;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;
 
@Data
@NoArgsConstructor
public class ScrRsvVO extends BaseVO {

	private String possible;
	
	private String vhcId;
	
	private String vhcNo;
	
	private String vhcKindNm;
	
	private String instLocNm;
	
	private String mngId;
	
	private String dvcType;
	
	private String dvcTypeNm;
	
	private String dvcKindNm;
	
	private String rsvId;
	
	private String setId;

	private String col1;
	
	private String col2;
	
	private String fontColor;
	
	private String rsvDate;
	
	private String impId;
	
	private String dvcId;

	private String completeYn;
	
	private String makerNm;
	
	private String modelNm;
	

	private List<ScrRsvVO> voList;
}