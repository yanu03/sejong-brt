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
import com.tracom.brt.domain.AD0102.AD0102Service;
import com.tracom.brt.domain.AD0102.AdStdPriceVO;

@RestController
@RequestMapping(value = "/api/v1")
public class AD0102Controller extends BaseController{
	
	@Inject
	private AD0102Service service;
	
	@GetMapping("/AD0102G0S0")
    public Responses.ListResponse AD0102G0S0(RequestParams<AdStdPriceVO> requestParams) {
    	return Responses.ListResponse.of(service.AD0102G0S0(requestParams));
    }
    
    @PostMapping("/AD0102F0I0")
    public ApiResponse AD0102F0I0(@RequestBody AdStdPriceVO params) {
    	return ok(service.AD0102F0I0(params));
    }
    
    @PostMapping("/AD0102F0U0")
    public ApiResponse AD0102F0U0(@RequestBody AdStdPriceVO params) {
    	service.AD0102F0U0(params);
    	return ok();
    }
    
    @PostMapping("/AD0102G0D0")
    public ApiResponse AD0102G0D0(@RequestBody AdStdPriceVO params) {
    	service.AD0102G0D0(params);
    	return ok();
    }
}
