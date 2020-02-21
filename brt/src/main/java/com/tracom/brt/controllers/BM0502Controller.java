package com.tracom.brt.controllers;

import java.util.List;

import javax.inject.Inject;

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

@RestController
@RequestMapping(value = "/api/v1")
public class BM0502Controller extends BaseController {

	@Inject
    private BM0501Service service;
    

    @PostMapping("/BM0502F0S0")
    public Responses.ListResponse BM0502F0S0(@RequestBody DestinationVO request) throws Exception{
    	List<DestinationVO> list = service.selectSCHFileLOGO(request);
    	return Responses.ListResponse.of(list);
    }
    
    @PostMapping("/BM0502G1U0")
    public ApiResponse BM0502G1U0(@ModelAttribute DestinationVO request) {
    	//BMP파일 업로드
    	service.writeBmpFileLOGO(request);
    	return ok();
    }
    
    @PostMapping("/BM0502G1U1")
    public ApiResponse BM0502G1U1(@RequestBody DestinationVO request) {
    	//SCH파일 업로드
    	service.writeSCHFileLOGO(request);
    	return ok();
    }
}