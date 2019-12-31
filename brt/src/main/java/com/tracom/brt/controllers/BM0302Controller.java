package com.tracom.brt.controllers;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import org.springframework.stereotype.Controller;
import com.chequer.axboot.core.api.response.ApiResponse;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tracom.brt.domain.BM0301.BM0301Service;
import com.tracom.brt.domain.BM0301.ContractInfoVO;
import com.tracom.brt.domain.BM0302.AltContractInfoVO;
//import com.tracom.brt.domain.BM0302.BM0302;
import com.tracom.brt.domain.BM0302.BM0302Service;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;

import javax.inject.Inject;
import java.util.List;

@RestController
@RequestMapping(value = "/api/v1")
public class BM0302Controller extends BaseController {
	
	@Inject
	private BM0302Service service;
	
    @GetMapping("/BM0302G0S0")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "filter", value = "검색어", dataType = "String", paramType = "query")
    })
    public Responses.ListResponse list(RequestParams<AltContractInfoVO> requestParams) {
        List<AltContractInfoVO> list = service.BM0302G0S0(requestParams);
        return Responses.ListResponse.of(list);
    }

    @PostMapping("/BM0302F0I0")
    public ApiResponse save(@RequestBody AltContractInfoVO request) {
        String conId = service.BM0302F0I0(request);
       
        return ok(conId);
    }
    
    @PostMapping("/BM0302F0U0")
    public ApiResponse update(@RequestBody AltContractInfoVO request) {
    	service.BM0302F0U0(request);
    	return ok();
    }
    
    @PostMapping("/BM0302F0U1")
    public ApiResponse ynupdate(@RequestBody AltContractInfoVO request) {
    	service.BM0302F0U1(request);
    	return ok();
    }
    
    @PostMapping("/BM0302G0D0")
    public ApiResponse delete(@RequestBody AltContractInfoVO request) {
    	service.BM0302G0D0(request);
    	return ok();
    }
}