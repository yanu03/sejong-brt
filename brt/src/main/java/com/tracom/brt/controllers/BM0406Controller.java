package com.tracom.brt.controllers;

import java.util.List;
import java.util.Map;

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
import com.tracom.brt.domain.BM0103.VHCInfoVO;
import com.tracom.brt.domain.BM0104.BmRoutInfoVO;
import com.tracom.brt.domain.BM0406.BM0406Service;

@RestController
@RequestMapping(value = "/api/v1")
public class BM0406Controller extends BaseController {

	@Inject
    private BM0406Service service;
	
	@GetMapping("/BM0406G1S0")
    public Responses.ListResponse BM0406G1S0(RequestParams<BmRoutInfoVO> requestParams) {
    	List<VHCInfoVO> list = service.BM0406G1S0(requestParams);
        return Responses.ListResponse.of(list);
    }
	
	@PostMapping("/BM0406G1I0")
    public ApiResponse BM0406G1I0(@RequestBody Map<String, Object> request) {
    	service.BM0406G1I0(request);
    	return ok();
    }
}