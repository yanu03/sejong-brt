package com.tracom.brt.domain.BM0402;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.tracom.brt.domain.voice.VoiceInfoVO;

public interface BM0402Mapper extends MyBatisMapper {
	List<VoiceInfoVO> BM0402G0S0(String filter);
	int BM0402F0I0(VoiceInfoVO vo);
	int BM0402F0U0(VoiceInfoVO vo);
	int BM0402G0D0(VoiceInfoVO vo);
}
