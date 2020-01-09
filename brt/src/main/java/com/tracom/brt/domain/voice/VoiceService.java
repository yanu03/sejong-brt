package com.tracom.brt.domain.voice;

import java.io.IOException;
import java.nio.file.Paths;

import javax.inject.Inject;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

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
	
	public void getWav(String pText, int nLanguage, int nSpeakerId) {
    	Pttsnet TTS = new Pttsnet();
    	
    	String pPath = "D:/test.wav";
    	String pHighlight = "";
    	String pLipsync = "";
    	// int nLanguage = 0; // 한국어
    	// int nSpeakerId = 0; // Yujin
    	int vcType = -1;
    	String pAudioFile = Paths.get(handler.getRootLocalPath(), "/common/audio", chimeFileName).toString();
    	
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
					chimeOffset);
			
			System.out.println("### TTS Result Message(" + ret + "): " + TTS.errorMsg);
		} catch (IOException e) {
			e.printStackTrace();
		}

    }
	
	public byte[] getWavBuffer(String pText, int nLanguage, int nSpeakerId) {
    	Pttsnet TTS = new Pttsnet();
    	
    	String pAudioFile = Paths.get(handler.getRootLocalPath(), "/common/audio", chimeFileName).toString();
    	
        try {
        	int ret = -100;
        	if(nLanguage == 0) { // 한국어일 경우
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
				
        	} else if(nLanguage == 1) { // 영어일 경우
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
    					charset);
        	}
			
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
    	
    	String pAudioFile = Paths.get(handler.getRootLocalPath(), "/common/audio", chimeFileName).toString();
    	
        try {
        	int ret = -100;
        	if(nLanguage == 0) { // 한국어일 경우
        		
        		if(checkChime.equals("Y")) {
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
        		} else if(checkChime.equals("N")) {
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
							charset);
        		}
				
        	} else if(nLanguage == 1) { // 영어일 경우
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
    					charset);
        	}
			
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
}
