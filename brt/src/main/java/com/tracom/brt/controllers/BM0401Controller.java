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
import com.tracom.brt.domain.BM0401.BM0401Service;
import com.tracom.brt.domain.BM0401.VoiceInfoVO;

@RestController
@RequestMapping(value = "/api/v1")
public class BM0401Controller extends BaseController {

	@Inject
    private BM0401Service service;
    
    @GetMapping("/BM0401G0S0")
    public Responses.ListResponse BM0401G0S0(RequestParams<VoiceInfoVO> requestParams) {
    	List<VoiceInfoVO> list = service.BM0401G0S0(requestParams);
        return Responses.ListResponse.of(list);
    }
    
    @PostMapping("/BM0401F0I0")
    public ApiResponse BM0401F0I0(@RequestBody VoiceInfoVO request) {
    	String dlCd = service.BM0401F0I0(request);
    	return ok(dlCd);
    }
    
    @PostMapping("/BM0401F0U0")
    public ApiResponse BM0401F0U0(@RequestBody VoiceInfoVO request) {
    	service.BM0401F0U0(request);
    	return ok();
    }
    
    @PostMapping("/BM0401G0D0")
    public ApiResponse BM0401G0D0(@RequestBody VoiceInfoVO request) {
    	service.BM0401G0D0(request);
    	return ok();
    }
}