package com.tracom.brt.domain.BM0407;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.tracom.brt.domain.voice.VoiceInfoVO;

public interface BM0407Mapper extends MyBatisMapper {
	List<VoiceInfoVO> BM0407G0S0(String filter);
	List<VoiceInfoVO> BM0407G0S0();
	int BM0407F0U0(VoiceInfoVO vo);
	int BM0407G0D0(VoiceInfoVO vo);
}
