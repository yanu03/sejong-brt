package com.tracom.brt.domain.BM0607;
 
import java.util.List;

import com.tracom.brt.domain.BaseVO;
import com.tracom.brt.domain.BM0605.VideoInfoVO;

import lombok.Data;
import lombok.NoArgsConstructor;
 
@Data
@NoArgsConstructor
public class VdoRsvVO extends BaseVO {

	private String possible;
	
	private String vhcId;
	
	private String vhcNo;
	
	private String vhcKindNm;
	
	private String instLocNm;
	
	private String mngId;
	
	private String dvcType;
	
	private String dvcTypeNm;
	
	private String rsvId;
	
	private String rsvDate;
	
	private String dvcId;
	
	private String orgaId;
	
	private String orgaNm;
	
	private String completeYn;
	
	private List<VdoRsvVO> voList;
}