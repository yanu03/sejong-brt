package com.tracom.brt.domain.BM0103;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class VHCInfoVO extends BaseVO {
	
	private String rsvId;
	
	private String rsvDate;
	
	private String completeYn;
	
	private String mngId;
	 
	private String vhcId;
 
	private String vhcNo;
 
	private String chasNo;
 
	private String corpId;
	
	private String corpNm;
 
	private String area;
	
	private String areaNm;
 
	private String maker;
 
	private String makerNm;
	private String relsDate;
 
	private String modelNm;
 
	private String vhcKind;
 
	private String vhcType;
 
	private String lfYn;
 
	private String vhcFuel;
 
	private String remark;
 
	private String useYn;
	
	private String vhcKindNm;
	
	private String vhcTypeNm;
	
	private String lfYnNm;
	
	private String vhcFuelNm;
	
	private String proceRst;
	
	private String sendDate;
	
	/**버스 광고용 컬럼**/
	private String adRout;
	
	private String adLvl;
	
	private String adLvlNm;
	
}