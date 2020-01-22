package com.tracom.brt.domain.voiceReservation;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface VoiceReservationMapper extends MyBatisMapper {
	int checkVoiceReservation(String vocId);
	int voiceReservation(VoiceReservationVO vo);
	int voiceOrgaReservation(VoiceReservationVO vo);
}
