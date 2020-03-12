package com.tracom.brt.controllers;

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
import com.tracom.brt.domain.AD0103.AD0103Service;
import com.tracom.brt.domain.AD0103.AdInstInfoVO;

@RestController
@RequestMapping(value = "/api/v1")
public class AD0103Controller extends BaseController {

    @Inject
    private AD0103Service service;

    @GetMapping("/AD0103G0S0")
    public Responses.ListResponse AD0103G0S0(RequestParams<AdInstInfoVO> requestParams) {
        return Responses.ListResponse.of(service.AD0103G0S0(requestParams));
    }
    
    @GetMapping("/AD0103G0S1")
    public Responses.ListResponse AD0103G0S1(RequestParams<AdInstInfoVO> requestParams) {
        return Responses.ListResponse.of(service.AD0103G0S1(requestParams));
    }
    
    @GetMapping("/AD0103G1S0")
    public Responses.ListResponse AD0103G1S0(RequestParams<AdInstInfoVO> requestParams) {
    	return Responses.ListResponse.of(service.AD0103G1S0(requestParams));
    }
    
    @PostMapping("/AD0103F0I0")
    public ApiResponse AD0103F0I0(@RequestBody AdInstInfoVO params) {
    	return ok(service.AD0103F0I0(params));
    }
    
    @PostMapping("/AD0103F0U0")
    public ApiResponse AD0103F0U0(@RequestBody AdInstInfoVO params) {
    	service.AD0103F0U0(params);
    	return ok();
    }
    
    @PostMapping("/AD0103G1U0")
    public ApiResponse AD0103G1U0(@RequestBody AdInstInfoVO params) {
    	service.AD0103G1U0(params);
    	return ok();
    }
    
    @PostMapping("/AD0103G1D0")
    public ApiResponse AD0103G1D0(@RequestBody AdInstInfoVO params) {
    	service.AD0103G1D0(params);
    	return ok();
    }
}