package com.tracom.brt.domain.BM0102;

import java.util.List;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class CustInfoVO extends BaseVO {
	private String custId;
	private String custNm;
	private String corpNo;
	private String email;
	private String phone;
	private String fax;
	private String addr1;
	private String zipNo;
	private String addr2;
	private String remark;
	
	List<MngrInfoVO> mngrList;
}