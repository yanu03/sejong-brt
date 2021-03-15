package com.tracom.brt.domain.BM0610;
 
import java.util.List;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;
 
@Data
@NoArgsConstructor
public class InnerLEDVO extends BaseVO {

	private String ildId;
	
	private String ildNm;
	
	private String seq;
	
	private String txtA;
	
	private String txtB;
	
	private String vocId;
	
	private String txtCd;
	
	private String remark;

	private List<InnerLEDVO> voList;
}