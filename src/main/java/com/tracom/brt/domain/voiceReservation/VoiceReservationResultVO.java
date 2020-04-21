package com.tracom.brt.domain.voiceReservation;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;

@Data
public class VoiceReservationResultVO extends BaseVO {
	private String rsvId;
	private String mngId;
	private String proceRst;
	private String rstCont;
	private String sendDate;
	private String completeYn;
}
