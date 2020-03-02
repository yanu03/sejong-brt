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
import com.tracom.brt.domain.BM0503.BM0503Service;
import com.tracom.brt.domain.BM0503.RoutRsvVO;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;

@RestController
@RequestMapping(value = "/api/v1")
public class BM0503Controller extends BaseController {

    @Inject
    private BM0503Service service;

    @GetMapping("/BM0503G0S0")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "filter", value = "검색어", dataType = "String", paramType = "query")
    })
    public Responses.ListResponse BM0503G0S0(RequestParams<RoutRsvVO> requestParams) {
        List<RoutRsvVO> list = service.BM0503G0S0(requestParams);
        return Responses.ListResponse.of(list);
    }
    
    @GetMapping("/BM0503G1S0")
    public Responses.ListResponse BM0503G1S0(RequestParams<RoutRsvVO> requestParams){
    	List<RoutRsvVO> list = service.BM0503G1S0(requestParams);
    	return Responses.ListResponse.of(list);
    }
    
    @PostMapping("/BM0503G1I0")
    public ApiResponse BM0503G1I0(@RequestBody RoutRsvVO requestParam) {
    	System.out.println(requestParam);
    	System.out.println(requestParam.getVhcList());
    	System.out.println(requestParam.getRsvList());
    	return null;
    }
}