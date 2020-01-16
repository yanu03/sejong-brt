package com.tracom.brt.domain.BM0403;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.tracom.brt.domain.voice.VoiceInfoVO;

public interface BM0403Mapper extends MyBatisMapper {
	List<VoiceInfoVO> BM0403G0S0(String filter);
	int BM0403F0I0(VoiceInfoVO vo);
	int BM0403F0U0(VoiceInfoVO vo);
	int BM0403G0D0(VoiceInfoVO vo);
}
