package com.tracom.brt.controllers;

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
import com.tracom.brt.domain.BM0501.BM0501Service;
import com.tracom.brt.domain.BM0501.DestinationVO;
import com.tracom.brt.domain.SM0105.CommonCodeDetailInfoVO;

@RestController
@RequestMapping(value = "/api/v1")
public class BM0501Controller extends BaseController {

	@Inject
    private BM0501Service service;
    
    @GetMapping("/BM0501G2S0")
    public Responses.ListResponse BM0501G2S0() {
    	List<CommonCodeDetailInfoVO> list = service.selectBox();
        return Responses.ListResponse.of(list);
    }
   
    @PostMapping("/BM0501F0S0")
    public Responses.ListResponse BM0501F0S0(@RequestBody DestinationVO request) throws Exception{
    	List<DestinationVO> list = service.selectSCHFile(request);
    	return Responses.ListResponse.of(list);
    }
    
    @PostMapping("/BM0501G1U0")
    public ApiResponse BM0501G1U0(@ModelAttribute DestinationVO request) {
    	//BMP파일 업로드
    	service.writeBmpFile(request);
    	return ok();
    }
    
    @PostMapping("/BM0501G1U1")
    public ApiResponse BM0501G1U1(@RequestBody DestinationVO request) {
    	//SCH파일 업로드
    	service.writeSCHFile(request);
    	return ok();
    }
}