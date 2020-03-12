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
import com.tracom.brt.domain.BM0104.BmRoutInfoVO;
import com.tracom.brt.domain.BM0104.BmRoutNodeInfoVO;
import com.tracom.brt.domain.BM0804.BM0804Service;

@RestController
@RequestMapping(value = "/api/v1")
public class AD0103Controller extends BaseController {

    @Inject
    private BM0804Service service;

    @GetMapping("/BM0903G0S0")
    public Responses.ListResponse BM0902G0S0(RequestParams<BmRoutInfoVO> requestParams) {
        List<BmRoutInfoVO> list = service.BM0804G0S0(requestParams);
        return Responses.ListResponse.of(list);
    }
    
    
    @PostMapping("/BM0903F0I0")
    public ApiResponse BM0902F0I0(@RequestBody List<BmRoutNodeInfoVO> voList) {
    	service.BM0804G1I0(voList);
    	return ok();
    }
    
    @PostMapping("/BM0903F0U0")
    public ApiResponse BM0902F0U0(@RequestBody List<BmRoutNodeInfoVO> voList) {
    	service.BM0804G1I0(voList);
    	return ok();
    }
    
    @PostMapping("/BM0903G0D0")
    public ApiResponse BM0903G0D0(@RequestBody List<BmRoutNodeInfoVO> voList) {
    	return ok();
    }
}