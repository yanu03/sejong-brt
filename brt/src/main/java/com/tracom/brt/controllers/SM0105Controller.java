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
import com.tracom.brt.domain.SM0105.CommonCodeDetailInfoVO;
import com.tracom.brt.domain.SM0105.SM0105Service;

@RestController
@RequestMapping(value = "/api/v1")
public class SM0105Controller extends BaseController {

    @Inject
    private SM0105Service service;
    
    @GetMapping("/SM0105G1S0")
    public Responses.ListResponse SM0105G1S0(RequestParams<CommonCodeDetailInfoVO> requestParams) {
    	List<CommonCodeDetailInfoVO> list = service.SM0105G1S0(requestParams);
        return Responses.ListResponse.of(list);
    }
    
    @PostMapping("/SM0105F0S0")
    public ApiResponse SM0105F0S0(@RequestBody CommonCodeDetailInfoVO request) {
    	boolean duplicateDlCd = service.SM0105F0S0(request);
    	return ok(Boolean.toString(duplicateDlCd));
    }
    
    @PostMapping("/SM0105F0I0")
    public ApiResponse SM0105F0I0(@RequestBody CommonCodeDetailInfoVO request) {
    	String dlCd = service.SM0105F0I0(request);
    	return ok(dlCd);
    }
    
    @PostMapping("/SM0105F0U0")
    public ApiResponse SM0105F0U0(@RequestBody CommonCodeDetailInfoVO request) {
    	service.SM0105F0U0(request);
    	return ok();
    }
    
    @PostMapping("/SM0105G1D0")
    public ApiResponse SM0105G1D0(@RequestBody CommonCodeDetailInfoVO request) {
    	service.SM0105G1D0(request);
    	return ok();
    }
    
}