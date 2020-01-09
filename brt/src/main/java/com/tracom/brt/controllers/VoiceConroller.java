package com.tracom.brt.controllers;

import javax.inject.Inject;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.voice.VoiceInfoVO;
import com.tracom.brt.domain.voice.VoiceService;

@RestController
@RequestMapping("/api/v1")
public class VoiceConroller extends BaseController {
	@Inject
	private VoiceService service;
	
	@GetMapping("/getWavBuffer")
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
	
	
}
