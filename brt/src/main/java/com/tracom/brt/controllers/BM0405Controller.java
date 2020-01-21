package com.tracom.brt.controllers;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.commons.beanutils.BeanUtils;
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
import com.tracom.brt.domain.BM0405.BM0405Service;
import com.tracom.brt.domain.BM0405.VoiceOrganizationVO;
import com.tracom.brt.domain.voice.VoiceInfoVO;

@RestController
@RequestMapping(value = "/api/v1")
public class BM0405Controller extends BaseController {

	@Inject
    private BM0405Service service;
    
    @GetMapping("/BM0405G0S0")
    public Responses.ListResponse BM0405G0S0(RequestParams<BmRoutInfoVO> requestParams) {
    	List<BmRoutInfoVO> list = service.BM0405G0S0(requestParams);
        return Responses.ListResponse.of(list);
    }
    
    @GetMapping("/BM0405G1S0")
    public Responses.ListResponse BM0405G1S0(RequestParams<BmRoutNodeInfoVO> requestParams) {
    	List<BmRoutNodeInfoVO> list = service.BM0405G1S0(requestParams);
        return Responses.ListResponse.of(list);
    }
    
    @GetMapping("/BM0405G2S0")
    public Responses.ListResponse BM0405G2S0(RequestParams<VoiceOrganizationVO> requestParams) {
    	List<VoiceOrganizationVO> list = service.BM0405G2S0(requestParams);
        return Responses.ListResponse.of(list);
    }
    
    @GetMapping("/BM0405G3S0")
    public Responses.ListResponse BM0405G3S0(RequestParams<VoiceInfoVO> requestParams) {
    	List<VoiceInfoVO> list = service.BM0405G3S0(requestParams);
    	return Responses.ListResponse.of(list);
    }
    
    @GetMapping("/BM0405G4S0")
    public Responses.ListResponse BM0405G4S0(RequestParams<VoiceOrganizationVO> requestParams) {
    	List<VoiceInfoVO> list = service.BM0405G4S0(requestParams);
    	return Responses.ListResponse.of(list);
    }
    
    @GetMapping("/BM0405F0S0")
    public Responses.MapResponse BM0405F0S0(RequestParams<VoiceOrganizationVO> requestParams) {
    	Map<String, Object> result = service.BM0405F0S0(requestParams);
    	return Responses.MapResponse.of(result);
    }
    
    @PostMapping("/BM0405F0I0")
    public ApiResponse BM0405G2I0(@RequestBody VoiceOrganizationVO request) {
    	String orgaId = service.BM0405F0I0(request);
    	return ok(orgaId);
    }
    
    @PostMapping("/BM0405F0U0")
    public ApiResponse BM0405F0U0(@RequestBody VoiceOrganizationVO request) {
    	service.BM0405F0U0(request);
    	return ok();
    }
    
    @PostMapping("/BM0405G2D0")
    public ApiResponse BM0405G2D0(@RequestBody VoiceOrganizationVO request) {
    	service.BM0405G2D0(request);
    	return ok();
    }
}