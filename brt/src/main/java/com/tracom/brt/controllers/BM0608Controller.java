package com.tracom.brt.controllers;

import java.util.List;

import javax.inject.Inject;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
	
}
