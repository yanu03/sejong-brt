package com.tracom.brt.domain.BM0101;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class CorpInfoVO extends BaseVO {
	private String corpId;
	private String corpNm;
	private String corpNo;
	private String email;
	private String phone;
	private String fax;
	private String addr1;
	private String zipNo;
	private String addr2;
	private String garage;
	private String remark;
}