package com.tracom.brt.controllers;

import javax.inject.Inject;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.voiceReservation.VoiceReservationService;
import com.tracom.brt.domain.voiceReservation.VoiceReservationVO;

@RestController
@RequestMapping("/api/v1")
public class VoiceReservationController extends BaseController {
	
	@Inject
	private VoiceReservationService service;
	
	@GetMapping("/checkVoiceReservation")
	public ApiResponse checkVoiceReservation(RequestParams<VoiceReservationVO> requestParams) {
        boolean check = service.checkVoiceReservation(requestParams);
        return ok(Boolean.toString(check));
    }
	
	@PostMapping("/voiceReservation")
	public ApiResponse voiceReservation(@RequestBody VoiceReservationVO request) {
		service.voiceReservation(request);
		return ok();
	}
	
	@PostMapping("/voiceOrgaReservation")
	public ApiResponse voiceOrgaReservation(@RequestBody VoiceReservationVO request) {
		service.voiceOrgaReservation(request);
		return ok();
	}
}
