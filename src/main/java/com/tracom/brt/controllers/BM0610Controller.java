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
import com.tracom.brt.domain.BM0101.CorpInfoVO;
import com.tracom.brt.domain.BM0610.BM0610Service;
import com.tracom.brt.domain.BM0610.InnerLEDVO;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;

@RestController
@RequestMapping(value = "/api/v1")
public class BM0610Controller extends BaseController {

    @Inject
    private BM0610Service service;

    @GetMapping("/BM0610G0S0")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "filter", value = "검색어", dataType = "String", paramType = "query")
    })
    public Responses.ListResponse BM0610G0S0(RequestParams<InnerLEDVO> requestParams) {
        List<InnerLEDVO> list = service.BM0610G0S0(requestParams);
        return Responses.ListResponse.of(list);
    }

    @PostMapping("/BM0610F0I0")
    public ApiResponse BM0610F0I0(@RequestBody InnerLEDVO request) {
        String ildId = service.BM0610F0I0(request);
        return ok(ildId);
    }
    
    @PostMapping("/BM0610F0U0")
    public ApiResponse BM0610F0U0(@RequestBody InnerLEDVO request) {
    	service.BM0610F0U0(request);
    	return ok();
    }
    
    @PostMapping("/BM0610G0D0")
    public ApiResponse BM0610G0D0(@RequestBody InnerLEDVO request) {
    	service.BM0610G0D0(request);
    	return ok();
    }
    
    @PostMapping("/BM0610G0U1")
    public ApiResponse BM0610G0U1(@RequestBody InnerLEDVO request) {
    	service.BM0610G0U1(request);
    	return ok();
    }
    
    @PostMapping("/getMax")
    public ApiResponse GetMax() {
    	int val = service.getMax();
       	return ok(String.valueOf(val));
    }
    
    @GetMapping("/selectIldHelp")
    public Responses.ListResponse selectIldHelp(RequestParams requestParams){
    	return Responses.ListResponse.of(service.selectIldHelp());
    }
    
    @PostMapping("/currentLength")
    public ApiResponse currentLength(@RequestBody String str) {
    	return ok(service.currentLength(str));
    }
}