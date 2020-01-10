package com.tracom.brt.domain.voice;

import java.time.LocalDate;

import org.springframework.web.multipart.MultipartFile;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class VoiceInfoVO extends BaseVO {
	private String vocId;
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
	private String drvEvt;
	private String playEdDate;
	private String playDate;
	private String attFile;
	private MultipartFile wavFile;
}