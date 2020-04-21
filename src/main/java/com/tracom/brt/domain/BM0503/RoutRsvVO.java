package com.tracom.brt.domain.BM0503;

import java.util.List;

import com.tracom.brt.domain.BaseVO;
import com.tracom.brt.domain.BM0103.VHCInfoVO;

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
	
	private String impId;
	
	private String dvcId;
	
	private String mngId;
	
	/** 예약 **/
	private String rsvId;
	private String rsvDate;
	private String completeYn;
	
	private String possible;
	private String vhcKindNm;
	private String instLocNm;
	private String chasNo;
	private String corpNm;
	private String areaNm;
	private String makerNm;
	private String relsDate;
	private String modelNm;
	private String vhcTypeNm;
	private String lfYnNm;
	private String vhcFuelNm;
	private String useYn;
	private String remark;
	
	private List<RoutRsvVO> rsvList;
	
	private List<VHCInfoVO> vhcList;
}