package com.tracom.brt.controllers;

import java.io.IOException;
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
import com.tracom.brt.domain.BM0104.BmRoutInfoVO;
import com.tracom.brt.domain.BM0104.BmRoutNodeInfoVO;
import com.tracom.brt.domain.BM0109.BM0109Service;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;

@RestController
@RequestMapping(value = "/api/v1")
public class BM0109Controller extends BaseController {

    @Inject
    private BM0109Service service;
    

    @GetMapping("/BM0109G0S0")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "filter", value = "검색어", dataType = "String", paramType = "query")
    })
    public Responses.ListResponse BM0109G0S0(RequestParams<BmRoutInfoVO> requestParams) {
        List<BmRoutInfoVO> list = service.BM0109G0S0(requestParams);
        return Responses.ListResponse.of(list);
    }
    
    @GetMapping("/BM0109G1S0")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "routId", value = "선택", dataType = "String", paramType = "query"),
    	@ApiImplicitParam(name = "filter1", value = "검색어", dataType = "String", paramType = "query")
    })
    public Responses.ListResponse BM0109G1S0(RequestParams<BmRoutNodeInfoVO> requestParams) {
        List<BmRoutNodeInfoVO> list = service.BM0109G1S0(requestParams);
        return Responses.ListResponse.of(list);
    }
    
    @PostMapping("/BM0109G1I0")
   // public ApiResponse BM0109G1I0(@RequestBody List<BmRoutNodeInfoVO> voList) {
    public ApiResponse BM0109G1I0(@RequestBody BmRoutNodeInfoVO vo) {
    	service.BM0109G1I0(vo);
    	return ok();
    }
    
    @PostMapping("/BM0109G0D0")
    public ApiResponse BM0109G0D0(@RequestBody BmRoutNodeInfoVO vo) {
    	boolean result = service.BM0109G0D0(vo);
    	if(result) {
    		return ok("true");    		
    	}else {
    		return ok("false");
    	}
    }
    
    @PostMapping("/BM0109IMPORT")
    public ApiResponse BM0109IMPORT(@ModelAttribute BmRoutInfoVO request) throws IOException {
    	service.BM0109IMPORT(request);
    	return null;
    }
    
}