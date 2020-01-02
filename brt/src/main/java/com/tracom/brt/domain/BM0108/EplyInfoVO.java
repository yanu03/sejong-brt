package com.tracom.brt.domain.BM0108;
 
import java.util.Date;

import org.springframework.web.multipart.MultipartFile;

import com.chequer.axboot.core.vo.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;
 
@Data
@NoArgsConstructor
public class EplyInfoVO extends BaseVO {
 
	private String eplyId;
 
	private String eplyNm;
 
	private String phone;
 
	private String busDiv;
 
	private String retireYn;
 
	private String eplyDate1;
 
	private String eplyDate2;
 
	private String licenNo;
 
	private String certiDate;
 
	private String attFile;
 
	private String remark;
 
	private String corpId;
	
	private MultipartFile[] imgFile;
}