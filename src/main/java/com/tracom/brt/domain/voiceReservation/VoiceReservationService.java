package com.tracom.brt.domain.voiceReservation;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;

@Service
public class VoiceReservationService extends BaseService<VoiceReservationVO, String> {
	@Inject
	private VoiceReservationMapper mapper;
	
	public boolean checkVoiceReservation(RequestParams<VoiceReservationVO> requestParams) {
		String vocId = requestParams.getString("vocId");
		int count = mapper.checkVoiceReservation(vocId);
		if(count > 0) {
			return true;
		} else {
			return false;
		}
	}
	
	public void voiceReservation(VoiceReservationVO vo) {
		mapper.voiceReservation(vo);
	}
	
	public void voiceOrgaReservation(VoiceReservationVO vo) {
		mapper.voiceOrgaReservation(vo);
	}
}
