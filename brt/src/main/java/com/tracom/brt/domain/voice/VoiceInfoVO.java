package com.tracom.brt.domain.voice;

import org.springframework.web.multipart.MultipartFile;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class VoiceInfoVO extends BaseVO {
	private String vocId;
	private String routId;
	private String routNm;
	private String vocNm;
	private String playStDate;
	private String playType;
	private String krTts;
	private String enTts;
	private String scrTxt;
	private String remark;
	private Integer playTm;
	private String vocDiv;
	private String conId;
	private String conNm;
	private String drvEvt;
	private String playEdDate;
	private String playDate;
	private String attFile;
	private MultipartFile wavFile;
	private String chimeYn;
	private String routUpdatedAt;
	private String isDeadline;
	private String vocDivNm;
}