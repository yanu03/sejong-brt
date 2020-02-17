package com.tracom.brt.domain.BM0102;

import java.util.List;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class MngrInfoVO extends BaseVO {

	private String mngrNm;
	
	private String phone;
	
	private String email;
	
	private String fax;
	
	private String remark;
	
	private String seq;
	
	private String custId;
	
	private String __index;
	
	private List<MngrInfoVO> voList;
}