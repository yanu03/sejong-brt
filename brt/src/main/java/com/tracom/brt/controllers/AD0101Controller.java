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
import com.tracom.brt.domain.AD0101.AD0101Service;
import com.tracom.brt.domain.BM0103.VHCInfoVO;

@RestController
@RequestMapping(value = "/api/v1")
public class AD0101Controller extends BaseController {

    @Inject
    private AD0101Service service;

    @GetMapping("/AD0101G1S0")
    public Responses.ListResponse AD0101G1S0(RequestParams<VHCInfoVO> requestParams) {
    	return Responses.ListResponse.of(service.AD0101G1S0(requestParams));
    }
    
    
    @PostMapping("/AD0101G1I0")
    public ApiResponse AD0101G1I0(@RequestBody Map<String, Object> params) {
    	service.AD0101G1I0(params);
    	return ok();
    }
}