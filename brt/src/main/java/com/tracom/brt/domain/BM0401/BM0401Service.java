package com.tracom.brt.domain.BM0401;

import java.io.IOException;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;

import selvytts.Pttsnet;

@Service
public class BM0401Service extends BaseService<VoiceInfoVO, String> {
	@Inject
	private BM0401Mapper mapper;
	
    public List<VoiceInfoVO> BM0401G0S0(RequestParams<VoiceInfoVO> requestParams) {
    	getWav();
        return mapper.BM0401G0S0(requestParams.getString("coCd"));
    }
    
    public String BM0401F0I0(VoiceInfoVO vo) {
    	mapper.BM0401F0I0(vo);
    	return vo.getVocId();
    }
    
    public boolean BM0401F0U0(VoiceInfoVO vo) {
    	if(mapper.BM0401F0U0(vo) > 0) {
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
    
    public void getWav() {
    	Pttsnet TTS = new Pttsnet();
    	
    	String pHostIP = "192.168.35.150";
    	String pPort = "6789";
    	int pConnectionTimeout = 60;
    	int pReadTimeout = 60;
    	String pText = "[증권사]\r\n" + 
    			"*삼성전자 공시입니다\r\n" + 
    			"제목 : 미국 캘리포니아법원에 손해배상 청구소송 피소보도에 대한 조회공시 답변입니다.\r\n" + 
    			"후지찌는 2004년3월6일 미국 캘리포니아소재 연방법원에 PDP 관련 특허에 대한 특허침해행위 중지 및 손해배상 청구소송을 제기하였습니다.\r\n" + 
    			"\r\n" + 
    			"*시황안내입니다.\r\n" + 
    			"이날 코스닥지수는 한때 119.80까지 떨어지기도 했지만, 반발 매수세에 힘입어 막판 소폭 반등했다. 장중 고점은 121.45 였다. \r\n" + 
    			"오늘 종합주가 지수는 전일대비 0.46%, 4.27포인트 하락한 915.38에서 장을 마쳤다. 331개 종목이 오르고 394개 종목이 하락해, 매도 분위기가 우세했다. 거래량은 4억2465만주, 거래대금은 2조5534억원으로 거래대금은 줄고 거래량은 소폭 늘었다. ";
    	String pPath = "D:/test.wav";
    	String pHighlight = "";
    	String pLipsync = "";
    	int nLanguage = 0; // 한국어
    	int nSpeakerId = 0; // Yujin
    	int sFormat = 1313; // 16bit Linear PCM + WAV + 22k Sampling
    	int nPitch = -1;
    	int nSpeed = -1;
    	int nVolume = -1;
    	int nFlag = 0x00;
    	int contentType = Pttsnet.PTTSNET_CONTENT_PLAIN;
    	int charset = Pttsnet.PTTSNET_CHARSET_UTF8;
    	int vcType = -1;
    	String pAudioFile = "";
    	int audioOffset = -1;
    	
        
        try {
			int ret = TTS.PTTSNET_FILE_A_EX(
					pHostIP, 
					pPort,
					pConnectionTimeout,
					pReadTimeout,
					pText,
					pPath,
					pHighlight,
					pLipsync,
					nLanguage,
					nSpeakerId,
					sFormat,
					nPitch,
					nSpeed,
					nVolume,
					nFlag,
					contentType,
					charset,
					vcType,
					pAudioFile,
					audioOffset);
			
			System.out.println("TTS Result Message: " + ret);
		} catch (IOException e) {
			e.printStackTrace();
		}

    }
}