package com.tracom.brt.domain.SM0107;

import java.util.HashMap;
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
import com.tracom.brt.domain.BM0902.EdRsvVO;

@Service
public class SM0107Service extends BaseService<ReservationVO, String> {
	@Inject
	private SM0107Mapper mapper;
	
    public List<VhcDvcUpdateVO> SM0107G0S0(RequestParams<ReservationVO> requestParams) {
    	Map<String, Object> params = new HashMap<>();
    	params.put("completeYn", requestParams.getString("completeYn"));
    	
        return mapper.SM0107G0S0(params);
    }
    
    public List<VHCInfoVO> SM0107G1S0(RequestParams<ReservationVO> requestParams) {
    	Map<String, Object> params = new HashMap<>();
    	params.put("completeYn", requestParams.getString("completeYn"));
    	
        return mapper.SM0107G1S0(params);
    }
    
    public List<VHCInfoVO> SM0107G2S0(RequestParams<ReservationVO> requestParams) {
    	Map<String, Object> params = new HashMap<>();
    	params.put("completeYn", requestParams.getString("completeYn"));
    	
        return mapper.SM0107G2S0(params);
    }
    
    public List<VdoRsvVO> SM0107G3S0(RequestParams<ReservationVO> requestParams) {
    	Map<String, Object> params = new HashMap<>();
    	params.put("completeYn", requestParams.getString("completeYn"));
    	
        return mapper.SM0107G3S0(params);
    }
    
    public List<ScrRsvVO> SM0107G4S0(RequestParams<ReservationVO> requestParams) {
    	Map<String, Object> params = new HashMap<>();
    	params.put("completeYn", requestParams.getString("completeYn"));
    	
        return mapper.SM0107G4S0(params);
    }
    
    public List<EdRsvVO> SM0107G5S0(RequestParams<ReservationVO> requestParams) {
    	Map<String, Object> params = new HashMap<>();
    	params.put("completeYn", requestParams.getString("completeYn"));
    	
        return mapper.SM0107G5S0(params);
    }
    
    public void SM0107G0U0(Map<String, Object> request) {
    	mapper.SM0107G0U0(request);
    }
    
    public void SM0107G1U0(Map<String, Object> request) {
    	mapper.SM0107G1U0(request);
    }
    
    public void SM0107G2U0(Map<String, Object> request) {
    	mapper.SM0107G2U0(request);
    }
    
    public void SM0107G3U0(Map<String, Object> request) {
    	mapper.SM0107G3U0(request);
    }
    
    public void SM0107G4U0(Map<String, Object> request) {
    	mapper.SM0107G4U0(request);
    }
    
    public void SM0107G5U0(Map<String, Object> request) {
    	mapper.SM0107G5U0(request);
    }
}