package com.tracom.brt.domain.BM0401;

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
    	
    	//한글
    	mapper.insertTxtKr(vo);
    	InnerLEDVO ledKr = new InnerLEDVO();
    	ledKr.setVocId(vo.getVocId() + 'K');
    	ledKr.setTxtA(vo.getTxtKrA());
    	ledKr.setTxtB(vo.getTxtKrB());
    	ledKr.setTxtCd("CD001");
		handler.makeIld(ledKr);
		
		//영어
		mapper.insertTxtEn(vo);
		InnerLEDVO ledEn = new InnerLEDVO();
		ledEn.setVocId(vo.getVocId() + 'E');
		ledEn.setTxtA(vo.getTxtEnA());
		ledEn.setTxtB(vo.getTxtEnB());
		ledEn.setTxtCd("CD002");
		handler.makeIld(ledEn);
		
    	return vo.getVocId();
    }
    
    @Transactional
    public boolean BM0401F0U0(VoiceInfoVO vo) {
    	vo.setChimeYn("Y");
    	handler.uploadVoice(vo);
    	if(mapper.BM0401F0U0(vo) > 0) {

    		if(Integer.parseInt(mapper.krIsExists(vo)) > 0) {
    			mapper.updateTxtKr(vo);    			
    		}else {
    			mapper.insertTxtKr(vo);
    		}
    		
    		if(Integer.parseInt(mapper.enIsExists(vo)) > 0) {
    			mapper.updateTxtEn(vo);    			
    		}else {
    			mapper.insertTxtEn(vo);
    		}
    		
    		InnerLEDVO ledKr = new InnerLEDVO();
        	ledKr.setVocId(vo.getVocId() + 'K');
        	ledKr.setTxtA(vo.getTxtKrA());
        	ledKr.setTxtB(vo.getTxtKrB());
        	ledKr.setTxtCd("CD001");
    		handler.makeIld(ledKr);
    		
    		InnerLEDVO ledEn = new InnerLEDVO();
    		ledEn.setVocId(vo.getVocId() + 'E');
    		ledEn.setTxtA(vo.getTxtEnA());
    		ledEn.setTxtB(vo.getTxtEnB());
    		ledEn.setTxtCd("CD002");
    		handler.makeIld(ledEn);
    		
    		return true;
    	} else {
    		return false;
    	}
    }
    
    public boolean BM0401G0D0(VoiceInfoVO vo) {
    	handler.deleteVoice(vo);
    	if(mapper.BM0401G0D0(vo) > 0) {
    		mapper.deleteTxtKr(vo);
    		mapper.deleteTxtEn(vo);
    		
    		handler.deleteIld(vo.getVocId() + 'K');
    		handler.deleteIld(vo.getVocId() + 'E');
    		return true;
    	} else {
    		return false;
    	}
    }
}