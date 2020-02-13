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
import com.tracom.brt.domain.BM0607.BM0607Service;
import com.tracom.brt.domain.BM0607.VdoRsvVO;

@RestController
@RequestMapping(value="/api/v1")
public class BM0607Controller extends BaseController{

	@Inject
	private BM0607Service service;
	
	
    @GetMapping("/BM0607G1S0")
    public Responses.ListResponse BM0607G1S0() {
    	List<VdoRsvVO> list = service.BM0607G1S0();
        return Responses.ListResponse.of(list);
    }
    
    @PostMapping("/BM0607G1I0")
    public ApiResponse BM0607G1I0(@RequestBody List<VdoRsvVO> requestParams) {
    	return ok(service.BM0607G1S0(requestParams));
    }
	
}
