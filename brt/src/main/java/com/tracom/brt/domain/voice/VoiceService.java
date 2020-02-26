package com.tracom.brt.domain.voice;

import java.io.IOException;
import java.nio.file.Paths;

import javax.inject.Inject;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.voiceReservation.VoiceReservationVO;
import com.tracom.brt.handler.FTPHandler;

import selvytts.Pttsnet;

@Service
public class VoiceService {
	
	@Value("${tts.host}")
	private String pHostIP;
	
	@Value("${tts.port}")
	private String pPort;
	
	@Value("${tts.connection.timeout}")
	private int pConnectionTimeout;
	
	@Value("${tts.read.timeout}")
	private int pReadTimeout;
	
	@Value("${tts.format}")
	private int sFormat;
	
	@Value("${tts.pitch}")
	private int nPitch;
	
	@Value("${tts.speed}")
	private int nSpeed;
	
	@Value("${tts.volume}")
	private int nVolume;
	
	@Value("${tts.flag}")
	private int nFlag;
	
	@Value("${tts.content.type}")
	private int contentType;
	
	@Value("${tts.charset}")
	private int charset;
	
	@Value("${tts.chime.file.name}")
	private String chimeFileName;
	
	@Value("${tts.chime.offset}")
	private int chimeOffset;
	
	@Inject
	private FTPHandler handler;
	
	@Inject
	private VoiceMapper mapper;
	
	public byte[] getWavBuffer(String pText, int nLanguage, int nSpeakerId, String chimeYn) {
    	Pttsnet TTS = new Pttsnet();
    	
    	String pAudioFile = Paths.get(handler.getRootLocalPath(), handler.getCommonAudioPath(), chimeFileName).toString();
    	
        try {
        	int ret = -100;

        	String tempAudioFile = new String(pAudioFile);
        	int tempLanguage = nLanguage;
        	
        	// 차임벨 미포함일 때 또는 영어일때
        	if(chimeYn == null || chimeYn.equals("N") || nLanguage == 1) {
        		tempAudioFile = "";
        		tempLanguage = -1;
        	}
        	
        	ret = TTS.PTTSNET_BUFFER(
					pHostIP, 
					pPort,
					pConnectionTimeout,
					pReadTimeout,
					pText,
					nLanguage,
					nSpeakerId,
					sFormat,
					nPitch,
					nSpeed,
					nVolume,
					nFlag,
					contentType,
					charset,
					tempAudioFile,
					tempLanguage);
			
			System.out.println("### TTS Result Message(" + ret + "): " + TTS.SpeechBuffer);
			byte[] buffer = new byte[TTS.SpeechBuffer.length];
			System.arraycopy(TTS.SpeechBuffer, 0, buffer, 0, TTS.SpeechBuffer.length);
			TTS.SpeechBuffer = null;
			
			return buffer;
		} catch (IOException e) {
			e.printStackTrace();
		}
        return null;
    }
	
	public byte[] getWavBufferChime(String pText, int nLanguage, int nSpeakerId, String checkChime) {
    	Pttsnet TTS = new Pttsnet();
    	
    	String pAudioFile = Paths.get(handler.getRootLocalPath(), handler.getCommonAudioPath(), chimeFileName).toString();
    	
        try {
        	int ret = -100;
        	
        	if(nLanguage == 1 || checkChime.equals("N")) { // 영어일 경우 차임벨 미포함
        		pAudioFile = "";
        		chimeOffset = -1;
        	}
        	
        	ret = TTS.PTTSNET_BUFFER(
					pHostIP, 
					pPort,
					pConnectionTimeout,
					pReadTimeout,
					pText,
					nLanguage,
					nSpeakerId,
					sFormat,
					nPitch,
					nSpeed,
					nVolume,
					nFlag,
					contentType,
					charset,
					pAudioFile,
					chimeOffset);
			
			System.out.println("### TTS Result Message(" + ret + "): " + TTS.SpeechBuffer);
			byte[] buffer = new byte[TTS.SpeechBuffer.length];
			System.arraycopy(TTS.SpeechBuffer, 0, buffer, 0, TTS.SpeechBuffer.length);
			TTS.SpeechBuffer = null;
			
			return buffer;
		} catch (IOException e) {
			e.printStackTrace();
		}
        return null;
    }
	//*/
	
	public boolean checkVoiceOrganization(RequestParams<VoiceReservationVO> requestParams) {
		String vocId = requestParams.getString("vocId");
		int count = mapper.checkVoiceOrganization(vocId);
		if(count > 0) {
			return true;
		} else {
			return false;
		}
	}
}
