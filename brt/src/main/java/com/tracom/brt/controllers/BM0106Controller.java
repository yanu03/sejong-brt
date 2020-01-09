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
import com.tracom.brt.domain.BM0105.BmStaInfoVO;
import com.tracom.brt.domain.BM0106.BM0106Service;
import com.tracom.brt.domain.BM0106.BmStaNmInfoVO;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;
 
@RestController
@RequestMapping(value = "/api/v1")
public class BM0106Controller extends BaseController {
 
    @Inject
    private BM0106Service service;
 
    @GetMapping("/BM0106G0S0")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "filter", value = "검색어", dataType = "String", paramType = "query")
    })
    public Responses.ListResponse BM0106G0S0(RequestParams<BmStaNmInfoVO> requestParams) {
        List<BmStaNmInfoVO> list = service.BM0106G0S0(requestParams);
        return Responses.ListResponse.of(list);
    }
    
    @PostMapping("/BM0106F0I0")
    public ApiResponse BM0106F0I0(@RequestBody BmStaNmInfoVO request) {
        String staId = service.BM0106F0I0(request);
        return ok(staId);
    }
    
    @PostMapping("/BM0106F0U0")
    public ApiResponse BM0106F0U0(@RequestBody BmStaNmInfoVO request) {    	
    	service.BM0106F0U0(request);
    	return ok();
    }
    
    @PostMapping("/BM0106G0D0")
    public ApiResponse BM0105G0D0(@RequestBody BmStaNmInfoVO request) {
    	service.BM0106G0D0(request);
    	return ok();
    }  


}