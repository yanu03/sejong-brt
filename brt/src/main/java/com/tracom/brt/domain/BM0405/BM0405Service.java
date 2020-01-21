package com.tracom.brt.domain.BM0405;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.BM0104.BmRoutInfoVO;
import com.tracom.brt.domain.BM0104.BmRoutNodeInfoVO;
import com.tracom.brt.domain.voice.VoiceInfoVO;
import com.tracom.brt.handler.FTPHandler;

@Service
public class BM0405Service extends BaseService<VoiceInfoVO, String> {
	@Inject
	private BM0405Mapper mapper;
	
	@Inject
	private FTPHandler handler;
	
    public List<BmRoutInfoVO> BM0405G0S0(RequestParams<BmRoutInfoVO> requestParams) {
        return mapper.BM0405G0S0(requestParams.getString("filter"));
    }
    
    public List<BmRoutNodeInfoVO> BM0405G1S0(RequestParams<BmRoutNodeInfoVO> requestParams) {
        return mapper.BM0405G1S0(requestParams.getString("routId"));
    }
    
    public List<VoiceOrganizationVO> BM0405G2S0(RequestParams<VoiceOrganizationVO> requestParams) {
        return mapper.BM0405G2S0(requestParams.getString("routId"));
    }
    
    public List<VoiceInfoVO> BM0405G3S0(RequestParams<VoiceInfoVO> requestParams) {
    	return mapper.BM0405G3S0(requestParams.getString("vocDiv"));
    }
    
    public List<VoiceInfoVO> BM0405G4S0(RequestParams<VoiceOrganizationVO> requestParams) {
    	return mapper.BM0405G4S0(requestParams.getString("orgaId"));
    }
    
    public Map<String, Object> BM0405F0S0(RequestParams<VoiceOrganizationVO> requestParams) {
    	
    	VoiceOrganizationVO vo = mapper.BM0405F0S0(requestParams.getString("orgaId"));
    	List<VoiceInfoVO> playList = BM0405G4S0(requestParams);
    	
    	Map<String, Object> result = new HashMap<String, Object>();
    	result.put("orgaInfo", vo);
    	result.put("playList", playList);
    	
    	return result;
    }
    
    @Transactional
    public String BM0405F0I0(VoiceOrganizationVO vo) {
    	mapper.BM0405G2I0(vo);
    	mapper.BM0405G2I1(vo);
    	mapper.BM0405G2I2(vo);
    	String orgaId = vo.getOrgaId();
    	return orgaId;
    }
    
    @Transactional
    public boolean BM0405F0U0(VoiceOrganizationVO vo) {
    	if(mapper.BM0405F0U0(vo) > 0) {
    		mapper.BM0405G2D1(vo);
    		mapper.BM0405G2I1(vo);
    		mapper.BM0405G2U0(vo);
    		return true;
    	} else {
    		return false;
    	}
    }
    
    @Transactional
    public boolean BM0405G2D0(VoiceOrganizationVO vo) {
    	if(mapper.BM0405G2D0(vo) > 0) {
    		mapper.BM0405G1D0(vo);
    		return true;
    	} else {
    		return false;
    	}
    }
}