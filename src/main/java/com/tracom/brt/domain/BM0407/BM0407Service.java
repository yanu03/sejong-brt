package com.tracom.brt.domain.BM0407;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.voice.VoiceInfoVO;
import com.tracom.brt.handler.FTPHandler;

@Service
public class BM0407Service extends BaseService<VoiceInfoVO, String> {
	@Inject
	private BM0407Mapper mapper;
	
	@Inject
	private FTPHandler handler;
	
    public List<VoiceInfoVO> BM0407G0S0(RequestParams<VoiceInfoVO> requestParams) {
        return mapper.BM0407G0S0(requestParams.getString("filter"));
    }
    
    @Transactional
    public boolean BM0407F0U0(VoiceInfoVO vo) {
    	if(mapper.BM0407F0U0(vo) > 0) {
    		List<VoiceInfoVO> list = mapper.BM0407G0S0();
    		handler.uploadSelectedAudio(vo, list);
    		mapper.BM0407F0U0(vo);
    		return true;
    	} else {
    		return false;
    	}
    }
    
    @Transactional
    public boolean BM0407G0D0(VoiceInfoVO vo) {
    	if(mapper.BM0407G0D0(vo) > 0) {
    		List<VoiceInfoVO> list = mapper.BM0407G0S0();
    		handler.deleteSelectedAudio(vo, list);
    		return true;
    	} else {
    		return false;
    	}
    }
}