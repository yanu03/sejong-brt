package com.tracom.brt.domain.voiceReservation;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;

@Data
public class VoiceReservationVO extends BaseVO {
	private String rsvDate;
	private String orgaId;
	private String rsvId;
	private String vocId;
}
