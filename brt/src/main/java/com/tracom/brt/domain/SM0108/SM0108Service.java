package com.tracom.brt.domain.SM0108;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.BM0103.VHCInfoVO;
import com.tracom.brt.domain.BM0205.VhcDvcUpdateVO;
import com.tracom.brt.domain.BM0607.VdoRsvVO;
import com.tracom.brt.domain.BM0609.ScrRsvVO;

@Service
public class SM0108Service extends BaseService<ReservationVO, String> {
	@Inject
	private SM0108Mapper mapper;
	
    public List<VhcDvcUpdateVO> SM0108G0S0(RequestParams<ReservationVO> requestParams) {
        return mapper.SM0108G0S0();
    }
    
    public List<VHCInfoVO> SM0108G1S0(RequestParams<ReservationVO> requestParams) {
        return mapper.SM0108G1S0();
    }
    
    public List<VHCInfoVO> SM0108G2S0(RequestParams<ReservationVO> requestParams) {
        return mapper.SM0108G2S0();
    }
    
    public List<VdoRsvVO> SM0108G3S0(RequestParams<ReservationVO> requestParams) {
        return mapper.SM0108G3S0();
    }
    
    public List<ScrRsvVO> SM0108G4S0(RequestParams<ReservationVO> requestParams) {
        return mapper.SM0108G4S0();
    }
    
    public void SM0108G0U0(Map<String, Object> request) {
    	mapper.SM0108G0U0(request);
    }
    
    public void SM0108G1U0(Map<String, Object> request) {
    	mapper.SM0108G1U0(request);
    }
    
    public void SM0108G2U0(Map<String, Object> request) {
    	mapper.SM0108G2U0(request);
    }
    
    public void SM0108G3U0(Map<String, Object> request) {
    	mapper.SM0108G3U0(request);
    }
    
    public void SM0108G4U0(Map<String, Object> request) {
    	mapper.SM0108G4U0(request);
    }
}