package com.tracom.brt.controllers;

import java.io.IOException;

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
import com.tracom.brt.utils.ExcelUtils;

@RestController
@RequestMapping(value = "/api/v1")
public class FileController extends BaseController {
	
	@Inject
	private FileService fileService;

	@Inject
	private ExcelUtils utils;
	
	@GetMapping("/filePreview")
	public void filePreview(RequestParams<Object> requestParams, HttpServletResponse response) {
		fileService.preview(requestParams, response);
	}
	
	@PostMapping("/uplaodWavTemp")
	 public ApiResponse uploadWavTemp(@ModelAttribute VoiceInfoVO request) {
		fileService.uplaodWavTemp(request);
		return ok();
	}
	
	@GetMapping("/downloadExcel")
	public void downloadExcel(RequestParams<Object> requestParams, HttpServletResponse response) throws IOException {
		utils.writeExcel(requestParams.getString("type"), response);
	}
}
