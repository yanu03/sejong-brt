package com.tracom.brt.domain.BM0406;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.voice.VoiceInfoVO;

@Service
public class BM0406Service extends BaseService<VoiceInfoVO, String> {
	@Inject
	private BM0406Mapper mapper;
}