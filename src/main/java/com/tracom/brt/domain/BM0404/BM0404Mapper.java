package com.tracom.brt.domain.BM0404;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.tracom.brt.domain.voice.VoiceInfoVO;

public interface BM0404Mapper extends MyBatisMapper {
	List<VoiceInfoVO> BM0404G0S0(String filter);
	int BM0404F0I0(VoiceInfoVO vo);
	int BM0404F0U0(VoiceInfoVO vo);
	int BM0404G0D0(VoiceInfoVO vo);
}
