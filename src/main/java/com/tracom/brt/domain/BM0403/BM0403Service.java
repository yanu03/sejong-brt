package com.tracom.brt.domain.BM0403;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.BM0610.InnerLEDVO;
import com.tracom.brt.domain.voice.VoiceInfoVO;
import com.tracom.brt.handler.FTPHandler;

@Service
public class BM0403Service extends BaseService<VoiceInfoVO, String> {
	@Inject
	private BM0403Mapper mapper;
	
	@Inject
	private FTPHandler handler;
	
    public List<VoiceInfoVO> BM0403G0S0(RequestParams<VoiceInfoVO> requestParams) {
        return mapper.BM0403G0S0(requestParams.getString("filter"));
    }
    
    @Transactional
    public String BM0403F0I0(VoiceInfoVO vo) {
    	mapper.BM0403F0I0(vo);
    	handler.uploadVoice(vo);
    	mapper.BM0403F0U0(vo);
    	mapper.insertTxt(vo);
    	
    	//한글
    	InnerLEDVO ledEv = new InnerLEDVO();
    	ledEv.setVocId(vo.getVocId() + 'K');
    	ledEv.setTxtA(vo.getTxtKrA());
    	ledEv.setTxtB(vo.getTxtKrB());
    	ledEv.setTxtCd("CD006");
		handler.makeIld(ledEv);
		
    	return vo.getVocId();
    }
    
    public boolean BM0403F0U0(VoiceInfoVO vo) {
    	handler.uploadVoice(vo);
    	if(mapper.BM0403F0U0(vo) > 0) {
    		if(Integer.parseInt(mapper.isExists(vo)) > 0) {
    			mapper.updateTxt(vo);    			
    		}else {
    			mapper.insertTxt(vo);
    		}
    		
    		//한글
        	InnerLEDVO ledEv = new InnerLEDVO();
        	ledEv.setVocId(vo.getVocId() + 'K');
        	ledEv.setTxtA(vo.getTxtA());
        	ledEv.setTxtB(vo.getTxtB());
        	ledEv.setTxtCd("CD006");
    		handler.makeIld(ledEv);

    		return true;
    	} else {
    		return false;
    	}
    }
    
    public boolean BM0403G0D0(VoiceInfoVO vo) {
    	handler.deleteVoice(vo);
    	if(mapper.BM0403G0D0(vo) > 0) {
    		mapper.deleteTxt(vo);
    		handler.deleteIld(vo.getVocId() + 'K');
    		return true;
    	} else {
    		return false;
    	}
    }
}