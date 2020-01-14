package com.tracom.brt.domain.BM0401;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

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
        return mapper.BM0401G0S0(requestParams.getString("coCd"));
    }
    
    public String BM0401F0I0(VoiceInfoVO vo) {
    	mapper.BM0401F0I0(vo);
    	uploadVoice(vo);
    	return vo.getVocId();
    }
    
    public boolean BM0401F0U0(VoiceInfoVO vo) {
    	if(mapper.BM0401F0U0(vo) > 0) {
    		uploadVoice(vo);
        	
    		return true;
    	} else {
    		return false;
    	}
    }
    
    public boolean BM0401G0D0(VoiceInfoVO vo) {
    	if(mapper.BM0401G0D0(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
    
    private void uploadVoice(VoiceInfoVO vo) {
    	String vocId = vo.getVocId();
    	if(vo.getPlayType().equals("TTS")) {
    		handler.uploadVoiceTTS(vocId, vo.getKrTts(), vo.getEnTts());
    	} else if(vo.getPlayType().equals("WAV")) {
    		if(vo.getWavFile() != null) {
    			handler.uploadVoice(vocId, vo.getWavFile());
    		}
    	}
    }
}