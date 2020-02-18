package com.tracom.brt.domain.BM0501;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.tracom.brt.domain.BaseVO;
import com.tracom.brt.domain.BM0104.BmRoutInfoVO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DestinationVO extends BaseVO{	

	//프레임번호
	private String frameNo;
	
	//사용유무
	private String useYn;
	
	//효과
	private String effType;
	
	//효과시간
	private String effSpeed;
	
	//표출시간
	private String showTime;
	
	//장치유형
	private String dvcKind;
	
	private String dvcName;
	
	private String userWayDiv;
	
	private String wayDiv;
	
	private String dvcKindCd;
	
	private String shortRoutNm;
	
	private String height;
	
	private String width;
	
	//노선정보
	private BmRoutInfoVO routVO;
	
	private MultipartFile attFile;
	
	private List<DestinationVO> voList;
}
