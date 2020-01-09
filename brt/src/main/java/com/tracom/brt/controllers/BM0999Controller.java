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
import com.tracom.brt.domain.BM0999.BM0999Service;
import com.tracom.brt.domain.BM0999.BmValMapVO;
import com.tracom.brt.domain.BM0999.TsRoutNodeVO;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;
 
@RestController
@RequestMapping(value = "/api/v1")
public class BM0999Controller extends BaseController {
 
    @Inject
    private BM0999Service service;
 
    @GetMapping("/BM0999G0S0")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "filter", value = "검색어", dataType = "String", paramType = "query")
    })
    public Responses.ListResponse BM0999G0S0(RequestParams<TsRoutNodeVO> requestParams) {
        List<TsRoutNodeVO> list = service.BM0999G0S0(requestParams);
        return Responses.ListResponse.of(list);
    }
    
    @GetMapping("/BM0998G0S0")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "filter", value = "검색어", dataType = "String", paramType = "query")
    })
    public Responses.ListResponse BM0998G0S0(RequestParams<TsRoutNodeVO> requestParams) {
        List<TsRoutNodeVO> list = service.BM0998G0S0(requestParams);
        return Responses.ListResponse.of(list);
    }
    
    @PostMapping("/BM0999M0I0")
    public ApiResponse BM0999M0I0(@RequestBody BmValMapVO request) {
    	System.out.println(request);
    	service.BM0999M0I0(request);
     	return ok();
    }
    
    @PostMapping("/BM0999M0D0")
    public ApiResponse BM0999M0D0(@RequestBody BmValMapVO request) {
    	service.BM0999M0D0(request);
    	return ok();
    }

}