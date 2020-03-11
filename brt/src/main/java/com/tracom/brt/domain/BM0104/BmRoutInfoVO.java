package com.tracom.brt.domain.BM0104;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class BmRoutInfoVO extends BaseVO {
	 
	private String routId;
	
	private String interRoutId;
	
	private String routNm;
 
	private String shortRoutNm;

	private String wayInfo;
	private String dirInfo;
	
	private String wayDiv;
	private String wayDivNm;
	
	private String userWayDiv;
	private String userWayDivNm;
	
	private String turnDiv;
	private String turnDivNm;
	
	private String stStaNm;
	
	private String edStaNm;
	
	private String name;
	
	private String code;
	
	private List<BmRoutInfoVO> voList;
	
	private String dvcName;
	
	private String line1Str;
	private String line2Str;
	
	private String line1Satstr;
	private String line2Satstr;
	
	private String line1Sunstr;
	private String line2Sunstr;
	
	private String count;
	
	/** 노선파일 업로드시 사용 **/
	private String version;
	private String mngName;
	private String upDown;
	private String fileName;
	
	/** 버전관리 **/
	private String pubDate;
	private String pubSeq;
	private String flag;
	
	private MultipartFile attFile;
	
	/** 노선 모양 **/
	private String routShape;
	private String routShapeNm;
	
	private List<BmRoutNodeInfoVO> nodeList;
}