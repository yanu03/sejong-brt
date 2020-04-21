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
import com.tracom.brt.domain.BM0902.BM0902Service;
import com.tracom.brt.domain.BM0902.EdRsvVO;

@RestController
@RequestMapping(value="/api/v1")
public class BM0902Controller extends BaseController{

	@Inject
	private BM0902Service service;
	
	
    @GetMapping("/BM0902G1S0")
    public Responses.ListResponse BM0902G1S0() {
    	List<EdRsvVO> list = service.BM0902G1S0();
        return Responses.ListResponse.of(list);
    }
	
    @PostMapping("/BM0902G1I0")
    public ApiResponse BM0902G1I0(@RequestBody EdRsvVO requestParam) throws Exception {
    	service.BM0902G1I0(requestParam);
    	return ok();
    }
}
