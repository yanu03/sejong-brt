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
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;

@RestController
@RequestMapping(value = "/api/v1")
public class BM0804Controller extends BaseController {

    @Inject
    private BM0804Service service;

    @GetMapping("/BM0804G0S0")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "filter", value = "검색어", dataType = "String", paramType = "query")
    })
    public Responses.ListResponse BM0804G0S0(RequestParams<BmRoutInfoVO> requestParams) {
        List<BmRoutInfoVO> list = service.BM0804G0S0(requestParams);
        return Responses.ListResponse.of(list);
    }
    
    @GetMapping("/BM0804G1S0")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "routId", value = "선택", dataType = "String", paramType = "query"),
    	@ApiImplicitParam(name = "filter1", value = "검색어", dataType = "String", paramType = "query")
    })
    public Responses.ListResponse BM0804G1S0(RequestParams<BmRoutNodeInfoVO> requestParams) {
        List<BmRoutNodeInfoVO> list = service.BM0804G1S0(requestParams);
        return Responses.ListResponse.of(list);
    }
    
    @PostMapping("/BM0804G1I0")
    public ApiResponse BM0804G1I0(@RequestBody List<BmRoutNodeInfoVO> voList) {
    	service.BM0804G1I0(voList);
    	return ok();
    }
    
    @PostMapping("/BM0804G0D0")
    public ApiResponse BM0804G0D0(@RequestBody BmRoutNodeInfoVO vo) {
    	boolean result = service.BM0804G0D0(vo);
    	return ok();
    }
}