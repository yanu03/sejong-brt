package com.tracom.brt.domain.BM0205;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor

public class VhcDvcUpdateVO extends BaseVO{
	
	private String vhcNo;
	private String vhcKind;
	private String vhcType;
	private String maker;
	private String dvcKind;
	private String dvcType;
	private String instLoc;
	private String modelNm;
	private String mngId;
	private MultipartFile dvcFileUp;
	private String dvcId;
	private String attFile;
	private String rsvId;
	private String rsvDate;	
	private String proceRst;
	private String verInfo;
	private String sendDate;
	private String completeYn;
	private String rstCont;
	private String remark;
	private String completeCk;
	private List<VhcDvcUpdateVO> upList;
}
