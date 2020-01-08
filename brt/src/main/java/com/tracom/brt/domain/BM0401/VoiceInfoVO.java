package com.tracom.brt.domain.BM0401;

import java.time.LocalDate;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class VoiceInfoVO extends BaseVO {
	private String vocId;
	private String vocNm;
	private LocalDate playStDate;
	private String playType;
	private String krTts;
	private String enTts;
	private String scrTxt;
	private String remark;
	private Integer playTm;
	private String vocDiv;
	private String conId;
	private String drvEvt;
	private LocalDate playEdDate;
	private String attFile;
}