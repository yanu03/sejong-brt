package com.tracom.brt.domain.file;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.net.URLConnection;
import java.nio.file.Paths;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.code.GlobalConstants;
import com.tracom.brt.domain.BM0501.BM0501Service;
import com.tracom.brt.domain.SM0105.SM0105Mapper;
import com.tracom.brt.domain.voice.VoiceInfoVO;
import com.tracom.brt.domain.voice.VoiceService;
import com.tracom.brt.handler.FTPHandler;
import com.tracom.brt.utils.Utils;

@Service
public class FileService {
	
	@Inject
	private FTPHandler handler;
	
	@Inject
	private VoiceService voiceService;
	
	@Inject
	SM0105Mapper DLCDMapper;
	
	@Inject
	private BM0501Service destiService; 
	
	public void preview(RequestParams<?> requestParams, HttpServletResponse response) {
		String type = requestParams.getString("type");
        String path = "";
        File file = null;
        
        try {
			switch (type) {
				case GlobalConstants.Types.IMAGE:
					path = imagePreview(requestParams, response);
					break;
			    case GlobalConstants.Types.VOICE:
			    	path = voicePreview(requestParams, response);
			        break;
			    case GlobalConstants.Types.SAVED_VOICE:
			    	path = savedVoicePreview(requestParams, response);
			    	break;
			    case GlobalConstants.Types.TEMP_VOICE:
			    	path = tempVoicePreview(requestParams, response);
			    	break;
			    case GlobalConstants.Types.VIDEO:
			    	path = videoPreview(requestParams, response);
			        break;
			    case GlobalConstants.Types.BMP:
			    	path = bmpPreview(requestParams, response);
			    	break;
			}
			
			file = new File(path);
			
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
        } catch(Exception e) {
        	e.printStackTrace();
        }
	}
	
	// 사원 이미지 미리보기
	private String imagePreview(RequestParams<?> requestParams, HttpServletResponse response) {
		String eplyId = requestParams.getString("eplyId");
		return Paths.get(handler.getRootLocalPath(), "/common/employee", eplyId + ".jpg").toString();
	}
	
	// 저장된 음성 미리듣기
	private String savedVoicePreview(RequestParams<?> requestParams, HttpServletResponse response) throws Exception {
		String vocId = requestParams.getString("vocId");
		String playType = requestParams.getString("playType");
		String vocType = requestParams.getString("vocType");
		
		File file = null;
		String fileName = "";
		String path = Paths.get(handler.getRootLocalPath(), "/common/audio").toString();
		
		if(playType.equals("WAV")) {
			fileName = vocId;
		} else if(playType.equals("TTS")){
			if(vocType.equals(GlobalConstants.VoiceTypes.KR)) {
				fileName = vocId + GlobalConstants.VoiceTypes.KR;
			} else {
				fileName = vocId + GlobalConstants.VoiceTypes.EN;
			}
		}
		
		file = Paths.get(path, fileName + ".wav").toFile();
		File tempFile = new File(handler.getRootLocalPath(), "/temp/" + fileName + ".mp3");
		
		Utils.wavToMp3(file, tempFile);
		
		return tempFile.getAbsolutePath();
	}
	
	// TTS/WAV 미리듣기
	public String voicePreview(RequestParams<?> requestParams, HttpServletResponse response) throws Exception {
		String vocId = requestParams.getString("vocId");
		String routId = requestParams.getString("routId");
		String pText = requestParams.getString("pText");
		int nLanguage = requestParams.getInt("nLanguage");
		int nSpeakerId = requestParams.getInt("nSpeakerId");
		String chimeYn = requestParams.getString("chimeYn");
		
		byte[] buffer = null;
		
		File file = null;
		File tempFile = null;
		
		if(routId != null && !routId.equals("")) {
			file = new File(Paths.get(handler.getRootLocalPath(), "/common/audio", routId + GlobalConstants.VoiceTypes.US + ".wav").toString());
		}
		// playType이 TTS일떄
		else if(vocId == null) {
			buffer = voiceService.getWavBuffer(pText, nLanguage, nSpeakerId, chimeYn);
			file = new File(Paths.get(handler.getRootLocalPath(), "/temp/temp.wav").toString());
			
			FileUtils.writeByteArrayToFile(file, buffer);
		}
		// playType이 WAV일때
		else {
			file = new File(Paths.get(handler.getRootLocalPath(), "/common/audio", vocId + ".wav").toString());
		}
		
		tempFile = new File(Paths.get(handler.getRootLocalPath(), "/temp/temp.mp3").toString());
		Utils.wavToMp3(file, tempFile);
		
		return tempFile.getAbsolutePath();
	}
	
	// WAV 파일 미리듣기 시 임시(temp) wav파일 mp3 저장
	public void uplaodWavTemp(VoiceInfoVO request) {
		handler.uploadWavTemp(request.getWavFile());
	}
	
	// 임시 mp3파일 경로 반환
	private String tempVoicePreview(RequestParams<?> requestParams, HttpServletResponse response) throws Exception {
		return Paths.get(handler.getRootLocalPath(), "/temp/wav_temp.mp3").toString();
	}
	
	private String videoPreview(RequestParams<?> requestParams, HttpServletResponse response) {
		String fileType = requestParams.getString("fileType");
		String vdoId	= requestParams.getString("vdoId");
		String path 	= null;
		File file		= null;
		switch(fileType) {
		case "AV001" :
			path = handler.getRootLocalPath() + "/common/video/" + vdoId + ".mp4";
			break;
		case "AV002" :
			path = handler.getRootLocalPath() + "/common/video/" + vdoId + ".jpg";
			break;
		}
		
		file = new File(Paths.get(path).toString());
		
		return file.getAbsolutePath();
	}
	
	// 행선지안내기 이미지 미리보기
	private String bmpPreview(RequestParams<?> requestParams, HttpServletResponse response) {
		String fileNameHeader = destiService.getHeader(requestParams.getString("dvcKindCd")).getTxtVal2();
		String userWayDiv = requestParams.getString("userWayDiv");
		String userWayCode = DLCDMapper.SM0105G2S2(userWayDiv);
		String fileNameBody = requestParams.getString("dvcName");
		String fileNameTail = ".BMP";
		String fileName = "";
		
		if(userWayCode == null) {
			fileName = fileNameHeader + fileNameBody;
		}else {
			fileName = fileNameHeader + fileNameBody + userWayCode + fileNameTail;			
		}
		return Paths.get(handler.getRootLocalPath(), "/destination/images/", fileName).toString();
	}
}
