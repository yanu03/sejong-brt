package com.tracom.brt.controllers;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.file.FileService;
import com.tracom.brt.domain.voice.VoiceInfoVO;

@RestController
@RequestMapping(value = "/api/v1")
public class FileController extends BaseController {
	
	@Inject
	private FileService fileService;

	@GetMapping("/filePreview")
	public void filePreview(RequestParams<Object> requestParams, HttpServletResponse response) {
		fileService.preview(requestParams, response);
	}
	
	@PostMapping("/uplaodWavTemp")
	 public ApiResponse uploadWavTemp(@ModelAttribute VoiceInfoVO request) {
		System.out.println("들어옴");
		fileService.uplaodWavTemp(request);
		return ok();
	}
}
