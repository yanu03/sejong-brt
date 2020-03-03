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
import com.tracom.brt.domain.SM0108.ReservationVO;
import com.tracom.brt.domain.SM0108.SM0108Service;

@RestController
@RequestMapping(value = "/api/v1")
public class SM0108Controller extends BaseController {

    @Inject
    private SM0108Service service;
    
    @GetMapping("/SM0108G0S0")
    public Responses.ListResponse SM0108G0S0(RequestParams<ReservationVO> requestParams) {
        return Responses.ListResponse.of(service.SM0108G0S0(requestParams));
    }
    
    @GetMapping("/SM0108G1S0")
    public Responses.ListResponse SM0108G1S0(RequestParams<ReservationVO> requestParams) {
        return Responses.ListResponse.of(service.SM0108G1S0(requestParams));
    }
    
    @GetMapping("/SM0108G2S0")
    public Responses.ListResponse SM0108G2S0(RequestParams<ReservationVO> requestParams) {
        return Responses.ListResponse.of(service.SM0108G2S0(requestParams));
    }
    
    @GetMapping("/SM0108G3S0")
    public Responses.ListResponse SM0108G3S0(RequestParams<ReservationVO> requestParams) {
        return Responses.ListResponse.of(service.SM0108G3S0(requestParams));
    }
    
    @GetMapping("/SM0108G4S0")
    public Responses.ListResponse SM0108G4S0(RequestParams<ReservationVO> requestParams) {
        return Responses.ListResponse.of(service.SM0108G4S0(requestParams));
    }
    
    @PostMapping("/SM0108G0U0")
    public ApiResponse SM0108G0U0(@RequestBody Map<String, Object> request) {
    	service.SM0108G0U0(request);
    	return ok();
    }
    
    @PostMapping("/SM0108G1U0")
    public ApiResponse SM0108G1U0(@RequestBody Map<String, Object> request) {
    	service.SM0108G1U0(request);
    	return ok();
    }
    
    @PostMapping("/SM0108G2U0")
    public ApiResponse SM0108G2U0(@RequestBody Map<String, Object> request) {
    	service.SM0108G2U0(request);
    	return ok();
    }
    
    @PostMapping("/SM0108G3U0")
    public ApiResponse SM0108G3U0(@RequestBody Map<String, Object> request) {
    	service.SM0108G3U0(request);
    	return ok();
    }
    
    @PostMapping("/SM0108G4U0")
    public ApiResponse SM0108G4U0(@RequestBody Map<String, Object> request) {
    	service.SM0108G4U0(request);
    	return ok();
    }
}