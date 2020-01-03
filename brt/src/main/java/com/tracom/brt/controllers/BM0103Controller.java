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
import com.tracom.brt.domain.BM0102.CustInfoVO;
import com.tracom.brt.domain.BM0103.BM0103Service;
import com.tracom.brt.domain.BM0103.VHCInfoVO;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;

@RestController
@RequestMapping(value = "/api/v1")
public class BM0103Controller extends BaseController {

    @Inject
    private BM0103Service service;

    @GetMapping("/BM0103G0S0")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "filter", value = "검색어", dataType = "String", paramType = "query")
    })
    public Responses.ListResponse BM0103G0S0(RequestParams<VHCInfoVO> requestParams) {
        List<VHCInfoVO> list = service.BM0103G0S0(requestParams);
        return Responses.ListResponse.of(list);
    }

    @PostMapping("/BM0103F0I0")
    public ApiResponse BM0103F0I0(@RequestBody VHCInfoVO request) {
        String vhcId = service.BM0103F0I0(request);
        return ok(vhcId);
    }
    
    @PostMapping("/BM0103F0U0")
    public ApiResponse BM0102F0U0(@RequestBody VHCInfoVO request) {
    	service.BM0103F0U0(request);
    	return ok();
    }
    
    @PostMapping("/BM0103G0D0")
    public ApiResponse BM0103G0D0(@RequestBody VHCInfoVO request) {
    	service.BM0103G0D0(request);
    	return ok();
    }
}