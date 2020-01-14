package com.tracom.brt.controllers;

import java.util.List;

import javax.inject.Inject;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BM0402.BM0402Service;
import com.tracom.brt.domain.voice.VoiceInfoVO;

@RestController
@RequestMapping(value = "/api/v1")
public class BM0402Controller extends BaseController {

	@Inject
    private BM0402Service service;
    
    @GetMapping("/BM0402G0S0")
    public Responses.ListResponse BM0402G0S0(RequestParams<VoiceInfoVO> requestParams) {
    	List<VoiceInfoVO> list = service.BM0402G0S0(requestParams);
        return Responses.ListResponse.of(list);
    }
    
    @PostMapping("/BM0402F0I0")
    public ApiResponse BM0402F0I0(@ModelAttribute VoiceInfoVO request) {
    	String vocId = service.BM0402F0I0(request);
    	return ok(vocId);
    }
    
    @PostMapping("/BM0402F0U0")
    public ApiResponse BM0402F0U0(@ModelAttribute VoiceInfoVO request) {
    	service.BM0402F0U0(request);
    	return ok();
    }
    
    @PostMapping("/BM0402G0D0")
    public ApiResponse BM0402G0D0(@RequestBody VoiceInfoVO request) {
    	service.BM0402G0D0(request);
    	return ok();
    }
}