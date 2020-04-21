package com.tracom.brt.controllers;

import java.io.IOException;
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
import com.tracom.brt.domain.BM0609.BM0609Service;
import com.tracom.brt.domain.BM0609.ScrRsvVO;

@RestController
@RequestMapping(value="/api/v1")
public class BM0609Controller extends BaseController{

	@Inject
	private BM0609Service service;
	
	
    @GetMapping("/BM0609G1S0")
    public Responses.ListResponse BM0607G1S0() {
    	List<ScrRsvVO> list = service.BM0609G1S0();
        return Responses.ListResponse.of(list);
    }
    
    
    @PostMapping("/BM0609G1I0")
    public ApiResponse BM0607G1I0(@RequestBody ScrRsvVO requestParam) throws Exception {
    	service.BM0609G1I0(requestParam);
    	return ok();
    }
	
}
