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
import com.tracom.brt.domain.BM0407.BM0407Service;
import com.tracom.brt.domain.voice.VoiceInfoVO;

@RestController
@RequestMapping(value = "/api/v1")
public class BM0407Controller extends BaseController {

	@Inject
    private BM0407Service service;
    
    @GetMapping("/BM0407G0S0")
    public Responses.ListResponse BM0402G0S0(RequestParams<VoiceInfoVO> requestParams) {
    	List<VoiceInfoVO> list = service.BM0407G0S0(requestParams);
        return Responses.ListResponse.of(list);
    }
        
    @PostMapping("/BM0407F0U0")
    public ApiResponse BM0402F0U0(@ModelAttribute VoiceInfoVO request) {
    	service.BM0407F0U0(request);
    	return ok();
    }
    
    @PostMapping("/BM0407G0D0")
    public ApiResponse BM0402G0D0(@RequestBody VoiceInfoVO request) {
    	service.BM0407G0D0(request);
    	return ok();
    }
}
//서치
//업데이트
//삭제 <-이거도업데이트긴함