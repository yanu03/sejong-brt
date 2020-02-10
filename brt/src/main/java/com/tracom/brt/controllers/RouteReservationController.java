package com.tracom.brt.controllers;

import javax.inject.Inject;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chequer.axboot.core.controllers.BaseController;
import com.tracom.brt.domain.routeReservation.RouteReservationService;

@RestController
@RequestMapping("/api/v1")
public class RouteReservationController extends BaseController {
	
	@Inject
	private RouteReservationService service;
	
	/*
	@PostMapping("/routeReservation")
	public ApiResponse routeReservation(@RequestBody RouteReservationVO request) {
		service.voiceReservation(request);
		return ok();
	}
	
	@PostMapping("/voiceOrgaReservation")
	public ApiResponse voiceOrgaReservation(@RequestBody VoiceReservationVO request) {
		service.voiceOrgaReservation(request);
		return ok();
	}
	*/
}
