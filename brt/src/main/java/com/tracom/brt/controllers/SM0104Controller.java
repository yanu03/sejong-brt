package com.tracom.brt.controllers;

import java.util.List;

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
import com.tracom.brt.domain.SM0104.CommonCodeInfoVO;
import com.tracom.brt.domain.SM0104.SM0104Service;

@RestController
@RequestMapping(value = "/api/v1")
public class SM0104Controller extends BaseController {

    @Inject
    private SM0104Service service;

    @GetMapping("/SM0104G0S0")
    public Responses.ListResponse SM0104G0S0(RequestParams<CommonCodeInfoVO> requestParams) {
    	List<CommonCodeInfoVO> list = service.SM0104G0S0(requestParams);
        return Responses.ListResponse.of(list);
    }
    
    @PostMapping("/SM0104F0S0")
    public ApiResponse SM0104F0S0(@RequestBody CommonCodeInfoVO request) {
    	boolean duplicateCoCd = service.SM0104F0S0(request);
    	return ok(Boolean.toString(duplicateCoCd));
    }
    
    @PostMapping("/SM0104F0I0")
    public ApiResponse SM0104F0I0(@RequestBody CommonCodeInfoVO request) {
    	String coCd = service.SM0104F0I0(request);
    	return ok(coCd);
    }
    
    @PostMapping("/SM0104F0U0")
    public ApiResponse SM0104F0U0(@RequestBody CommonCodeInfoVO request) {
    	service.SM0104F0U0(request);
    	return ok();
    }
    
    @PostMapping("/SM0104G0D0")
    public ApiResponse SM0104G0D0(@RequestBody CommonCodeInfoVO request) {
    	service.SM0104G0D0(request);
    	return ok();
    }
}