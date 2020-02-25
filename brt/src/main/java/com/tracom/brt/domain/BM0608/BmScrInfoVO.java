package com.tracom.brt.domain.BM0608;
 
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;
 
@Data
@NoArgsConstructor
public class BmScrInfoVO extends BaseVO {

	private String setId;
	
	private String setNm;
	
	private String fontColor;
	
	private String remark;
	
	private MultipartFile background;
	
	private MultipartFile land;
	
	private MultipartFile nextstopbg;
	
	private List<BmScrInfoVO> voList;
	
	private String fontList[];
}