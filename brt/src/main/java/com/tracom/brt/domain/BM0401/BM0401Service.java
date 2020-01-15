package com.tracom.brt.domain.BM0401;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.voice.VoiceInfoVO;
import com.tracom.brt.handler.FTPHandler;

@Service
public class BM0401Service extends BaseService<VoiceInfoVO, String> {
	@Inject
	private BM0401Mapper mapper;
	
	@Inject
	private FTPHandler handler;
	
    public List<VoiceInfoVO> BM0401G0S0(RequestParams<VoiceInfoVO> requestParams) {
        return mapper.BM0401G0S0(requestParams.getString("filter"));
    }
    
    @Transactional
    public String BM0401F0I0(VoiceInfoVO vo) {
    	vo.setChimeYn("Y");
    	mapper.BM0401F0I0(vo);
    	handler.uploadVoice(vo);
    	mapper.BM0401F0U0(vo);
    	return vo.getVocId();
    }
    
    public boolean BM0401F0U0(VoiceInfoVO vo) {
    	vo.setChimeYn("Y");
    	handler.uploadVoice(vo);
    	if(mapper.BM0401F0U0(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
    
    public boolean BM0401G0D0(VoiceInfoVO vo) {
    	if(mapper.BM0401G0D0(vo) > 0) {
    		handler.deleteVoice(vo);
    		return true;
    	} else {
    		return false;
    	}
    }
}