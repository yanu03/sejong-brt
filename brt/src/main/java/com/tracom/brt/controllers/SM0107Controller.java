package com.tracom.brt.controllers;

import java.util.Map;

import javax.inject.Inject;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.SM0107.ReservationVO;
import com.tracom.brt.domain.SM0107.SM0107Service;

@RestController
@RequestMapping(value = "/api/v1")
public class SM0107Controller extends BaseController {

    @Inject
    private SM0107Service service;
    
    @GetMapping("/SM0107G0S0")
    public Responses.ListResponse SM0107G0S0(RequestParams<ReservationVO> requestParams) {
        return Responses.ListResponse.of(service.SM0107G0S0(requestParams));
    }
    
    @GetMapping("/SM0107G1S0")
    public Responses.ListResponse SM0107G1S0(RequestParams<ReservationVO> requestParams) {
        return Responses.ListResponse.of(service.SM0107G1S0(requestParams));
    }
    
    @GetMapping("/SM0107G2S0")
    public Responses.ListResponse SM0107G2S0(RequestParams<ReservationVO> requestParams) {
        return Responses.ListResponse.of(service.SM0107G2S0(requestParams));
    }
    
    @GetMapping("/SM0107G3S0")
    public Responses.ListResponse SM0107G3S0(RequestParams<ReservationVO> requestParams) {
        return Responses.ListResponse.of(service.SM0107G3S0(requestParams));
    }
    
    @GetMapping("/SM0107G4S0")
    public Responses.ListResponse SM0107G4S0(RequestParams<ReservationVO> requestParams) {
        return Responses.ListResponse.of(service.SM0107G4S0(requestParams));
    }
    
    @GetMapping("/SM0107G5S0")
    public Responses.ListResponse SM0107G5S0(RequestParams<ReservationVO> requestParams) {
        return Responses.ListResponse.of(service.SM0107G5S0(requestParams));
    }
    
    @PostMapping("/SM0107G0U0")
    public ApiResponse SM0107G0U0(@RequestBody Map<String, Object> request) {
    	service.SM0107G0U0(request);
    	return ok();
    }
    
    @PostMapping("/SM0107G1U0")
    public ApiResponse SM0107G1U0(@RequestBody Map<String, Object> request) {
    	service.SM0107G1U0(request);
    	return ok();
    }
    
    @PostMapping("/SM0107G2U0")
    public ApiResponse SM0107G2U0(@RequestBody Map<String, Object> request) {
    	service.SM0107G2U0(request);
    	return ok();
    }
    
    @PostMapping("/SM0107G3U0")
    public ApiResponse SM0107G3U0(@RequestBody Map<String, Object> request) {
    	service.SM0107G3U0(request);
    	return ok();
    }
    
    @PostMapping("/SM0107G4U0")
    public ApiResponse SM0107G4U0(@RequestBody Map<String, Object> request) {
    	service.SM0107G4U0(request);
    	return ok();
    }
    
    @PostMapping("/SM0107G5U0")
    public ApiResponse SM0107G5U0(@RequestBody Map<String, Object> request) {
    	service.SM0107G5U0(request);
    	return ok();
    }
}