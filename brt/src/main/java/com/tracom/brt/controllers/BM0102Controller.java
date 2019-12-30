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
import com.tracom.brt.domain.BM0102.BM0102Service;
import com.tracom.brt.domain.BM0102.CustInfoVO;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;

@RestController
@RequestMapping(value = "/api/v1")
public class BM0102Controller extends BaseController {

    @Inject
    private BM0102Service service;

    @GetMapping("/BM0102G0S0")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "filter", value = "검색어", dataType = "String", paramType = "query")
    })
    public Responses.ListResponse BM0102G0S0(RequestParams<CustInfoVO> requestParams) {
        List<CustInfoVO> list = service.BM0102G0S0(requestParams);
        return Responses.ListResponse.of(list);
    }

    @PostMapping("/BM0102F0I0")
    public ApiResponse BM0102F0I0(@RequestBody CustInfoVO request) {
        String corpId = service.BM0102F0I0(request);
        return ok(corpId);
    }
    
    @PostMapping("/BM0102F0U0")
    public ApiResponse BM0102F0U0(@RequestBody CustInfoVO request) {
    	service.BM0102F0U0(request);
    	return ok();
    }
    
    @PostMapping("/BM0102G0D0")
    public ApiResponse BM0102G0D0(@RequestBody CustInfoVO request) {
    	service.BM0102G0D0(request);
    	return ok();
    }
}