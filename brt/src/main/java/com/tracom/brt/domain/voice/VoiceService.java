package com.tracom.brt.domain.voice;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLConnection;
import java.nio.file.Paths;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.handler.FTPHandler;
import com.tracom.brt.utils.Utils;

import selvytts.Pttsnet;
import ws.schild.jave.AudioAttributes;
import ws.schild.jave.Encoder;
import ws.schild.jave.EncodingAttributes;
import ws.schild.jave.MultimediaObject;

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
	
	public byte[] getWavBuffer(String pText, int nLanguage, int nSpeakerId, String chimeYn) {
    	Pttsnet TTS = new Pttsnet();
    	
    	String pAudioFile = Paths.get(handler.getRootLocalPath(), "/common/audio", chimeFileName).toString();
    	
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
    	
    	String pAudioFile = Paths.get(handler.getRootLocalPath(), "/common/audio", chimeFileName).toString();
    	
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
	
	public void wavTest(RequestParams<VoiceInfoVO> requestParams, HttpServletRequest request, HttpServletResponse response) {
		String userAgent = request.getHeader("User-Agent");
		String vocId = requestParams.getString("vocId");
		String routId = requestParams.getString("routId");
		String type = requestParams.getString("type");
		String pText = requestParams.getString("pText");
		int nLanguage = requestParams.getInt("nLanguage");
		int nSpeakerId = requestParams.getInt("nSpeakerId");
		String chimeYn = requestParams.getString("chimeYn");
		
		byte[] buffer = null;
		String path;
		File tempFile;
		File file = null;

		try {
			if(type == null) {
				if(routId != null && !routId.equals("")) {
					path = Paths.get(handler.getRootLocalPath(), "/common/audio", routId + "_select.wav").toString();
					tempFile = new File(path);
					file = tempFile;
				}
				// playType이 TTS일떄
				else if(vocId == null) {
					buffer = getWavBuffer(pText, nLanguage, nSpeakerId, chimeYn);
					path = Paths.get(handler.getRootLocalPath(), "/temp/temp.wav").toString();
					tempFile = new File(path);
					file = tempFile;
					
					FileUtils.writeByteArrayToFile(tempFile, buffer);
				}
				// playType이 WAV일때
				else {
					path = Paths.get(handler.getRootLocalPath(), "/common/audio", vocId + ".wav").toString();
					tempFile = new File(path);
					file = tempFile;
				}
			}
				
			// 요청 브라우저가 Internet Explorer일 경우 mp3로 변환
			if(Utils.checkIe(userAgent)) {
				File ieFile;
				
				if(type != null && type.equals("temp")) {
					file = new File(Paths.get(handler.getRootLocalPath(), "/temp/wav_temp.wav").toString());
					ieFile = new File(Paths.get(handler.getRootLocalPath(), "/temp/wav_temp.mp3").toString());
				} else {
					ieFile = new File(Paths.get(handler.getRootLocalPath(), "/temp/temp.mp3").toString());
				}
				
				try {
					wavToMp3(file, ieFile);
				} catch(Exception e) {
					e.printStackTrace();
				}
				
				file = ieFile;
			}
			String mimeType = URLConnection.guessContentTypeFromName(file.getName());
			if (mimeType == null) {
				mimeType = "application/octet-stream";
			}
			
			if(file.exists()) {
				response.setContentType(mimeType);
				response.setHeader("Content-Disposition", String.format("inline; filename=\"" + file.getName() + "\""));
				response.setContentLength((int) file.length());
			
				InputStream is = new BufferedInputStream(new FileInputStream(file));
				FileCopyUtils.copy(is, response.getOutputStream());
				is.close();
			}
			//*/
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public void mp3Test(RequestParams<VoiceInfoVO> requestParams, HttpServletRequest request, HttpServletResponse response) {
		String vocId = requestParams.getString("vocId");
		String playType = requestParams.getString("playType");
		String vocType = requestParams.getString("vocType");
		
		File file = null;
		String fileName = "";
		String path = Paths.get(handler.getRootLocalPath(), "/common/audio").toString();
		
		try {
			if(playType.equals("WAV")) {
				fileName = vocId;
			} else if(playType.equals("TTS")){
				if(vocType.equals("KR")) {
					fileName = vocId + "_KR";
				} else {
					fileName = vocId + "_EN";
				}
			}
			
			file = Paths.get(path, fileName + ".wav").toFile();
			File tempFile = new File(handler.getRootLocalPath(), "/temp/" + fileName + ".mp3");
			
			wavToMp3(file, tempFile);
			
			String mimeType = URLConnection.guessContentTypeFromName(tempFile.getName());
			if (mimeType == null) {
				mimeType = "application/octet-stream";
			}
			
			if(tempFile.exists()) {
				response.setContentType(mimeType);
				response.setHeader("Content-Disposition", String.format("inline; filename=\"" + tempFile.getName() + "\""));
				response.setContentLength((int) tempFile.length());
			
				InputStream is = new BufferedInputStream(new FileInputStream(tempFile));
				FileCopyUtils.copy(is, response.getOutputStream());
				is.close();
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public void uplaodWavTemp(VoiceInfoVO request) {
		handler.uploadWavTemp(request.getWavFile());
	}
	
	public void wavToMp3(File source, File target) throws Exception {
		AudioAttributes audio = new AudioAttributes();
		audio.setCodec("libmp3lame");
		audio.setBitRate(new Integer(128000));
		audio.setChannels(new Integer(1));
		audio.setSamplingRate(new Integer(44100));
		
		EncodingAttributes attrs = new EncodingAttributes();
		attrs.setFormat("mp3");
		attrs.setAudioAttributes(audio);
		
		Encoder encoder = new Encoder();
		encoder.encode(new MultimediaObject(source), target, attrs);
	}
}
