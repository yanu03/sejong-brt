package com.tracom.brt.controllers;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLConnection;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.voice.VoiceInfoVO;
import com.tracom.brt.domain.voice.VoiceService;
import com.tracom.brt.handler.FTPHandler;

@RestController
@RequestMapping("/api/v1")
public class VoiceConroller extends BaseController {
	@Inject
	private VoiceService service;
	
	@Inject
	private FTPHandler handler;
	
	@GetMapping("/getWavDownload")
	public ResponseEntity<byte[]> getWavBuffer(RequestParams<VoiceInfoVO> requestParams) {
		String pText = requestParams.getString("pText");
		int nLanguage = requestParams.getInt("nLanguage");
		int nSpeakerId = requestParams.getInt("nSpeakerId");
		String checkChime = requestParams.getString("checkChime");
		
		byte[] buffer = service.getWavBufferChime(pText, nLanguage, nSpeakerId, checkChime);
		
		HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        httpHeaders.setContentLength(buffer.length);
        httpHeaders.setContentDispositionFormData("attachment", System.currentTimeMillis() + ".wav");
        
        return new ResponseEntity<>(buffer, httpHeaders, HttpStatus.OK);
	}
	
	@GetMapping("/getWavTest")
	public void getWavTest(RequestParams<VoiceInfoVO> requestParams, HttpServletResponse response) {
		String pText = requestParams.getString("pText");
		int nLanguage = requestParams.getInt("nLanguage");
		int nSpeakerId = requestParams.getInt("nSpeakerId");
		
		byte[] buffer = service.getWavBuffer(pText, nLanguage, nSpeakerId);
		String path = handler.getRootLocalPath() + "/temp/temp.wav";
		File file = new File(path);
		try {
			FileUtils.writeByteArrayToFile(file, buffer);
			
			String mimeType = URLConnection.guessContentTypeFromName(file.getName());
			if (mimeType == null) {
				mimeType = "application/octet-stream";
			}
			response.setContentType(mimeType);
			response.setHeader("Content-Disposition", String.format("inline; filename=\"" + file.getName() + "\""));
			response.setContentLength((int) file.length());
			
			InputStream inputStream = new BufferedInputStream(new FileInputStream(file));
			FileCopyUtils.copy(inputStream, response.getOutputStream());

		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
