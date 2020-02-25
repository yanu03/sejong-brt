package com.tracom.brt.controllers;

import java.util.ArrayList;
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
import com.tracom.brt.domain.BM0608.BM0608Service;
import com.tracom.brt.domain.BM0608.BmScrInfoVO;

@RestController
@RequestMapping(value="/api/v1")
public class BM0608Controller extends BaseController{

	@Inject
	private BM0608Service service;
	
	
    @GetMapping("/BM0608G0S0")
    public Responses.ListResponse BM0608G0S0(RequestParams<BmScrInfoVO> requestParams) {
    	List<BmScrInfoVO> list = service.BM0608G0S0(requestParams);
        return Responses.ListResponse.of(list);
    }
    
    @PostMapping("/BM0608F0I0")
    public ApiResponse BM0608F0I0(@RequestBody BmScrInfoVO request) {
    	
        String setId = service.BM0608F0I0(request);
        return ok(setId);
    }
    
    @PostMapping("/BM0608F0U0")
    public ApiResponse BM0608F0U0(@ModelAttribute BmScrInfoVO request) {
    	service.BM0608F0U0(request);
    	return ok();
    }
}
