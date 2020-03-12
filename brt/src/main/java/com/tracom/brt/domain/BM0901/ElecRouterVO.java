package com.tracom.brt.domain.BM0901;
 
import java.util.List;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;
 
@Data
@NoArgsConstructor
public class ElecRouterVO extends BaseVO {

	private String setId;
	
	private String setNm;
	
	private int timeKo;
	
	private int timeEn;
	
	private String category;
	private String categoryNm;
	
	private String frame;
	private String frameNm;
	
	private String font;
	private String fontNm;
	
	private String remark;
	
	private List<ElecRouterVO> voList;
	
}