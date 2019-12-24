package com.tracom.brt.domain.BM0102;

import com.chequer.axboot.core.vo.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class CustInfoVo extends BaseVO {
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
}