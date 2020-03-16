package com.tracom.brt.handler;

import java.io.UnsupportedEncodingException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.tracom.brt.domain.SM0105.CommonCodeDetailInfoVO;
import com.tracom.brt.domain.SM0105.SM0105Mapper;

@Component
public class TimsAuthHandler {
	@Inject
	private SM0105Mapper mapper_0105;
	
	@Autowired
	private RestTemplate restTemplate;
	
	@Value("${spring.profiles.active}")
	private String profile;
	
	@Value("${tims.server.address}")
	private String timsServerAddress;
	
	@Value("${tims.server.http.port}")
	private String timsServerHttpPort;
	
	@Value("${tims.server.news.url}")
	private String timsServerNewsUrl;
	
	public void sendNews() {
		if(!profile.equals("edu")) {
			CommonCodeDetailInfoVO param = new CommonCodeDetailInfoVO();
			param.setCoCd("TIMS_AUTH");
			param.setDlCd("CD001");
			CommonCodeDetailInfoVO codeVO = mapper_0105.SM0105G1S1(param);
			String timsAuth = codeVO.getDlCdNm();
			try {
				String authEncode  = new String(Base64.getEncoder().encode(timsAuth.getBytes("UTF-8")));
				
				HttpHeaders headers = new HttpHeaders();
				headers.add("authorization", "Basic " + authEncode);
				
				HttpEntity<Map<String, String>> httpEntity = new HttpEntity<>(headers);
				Map<String, Object> params = new HashMap<>();
				
				restTemplate.exchange("http://" + timsServerAddress + ":" + timsServerHttpPort + timsServerNewsUrl, HttpMethod.GET, httpEntity, String.class, params);
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
		}
	}
}
