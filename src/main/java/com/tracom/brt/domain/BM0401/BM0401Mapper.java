package com.tracom.brt.domain.BM0401;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.tracom.brt.domain.voice.VoiceInfoVO;

public interface BM0401Mapper extends MyBatisMapper {
	List<VoiceInfoVO> BM0401G0S0(String filter);
	int BM0401F0I0(VoiceInfoVO vo);
	int BM0401F0U0(VoiceInfoVO vo);
	int BM0401G0D0(VoiceInfoVO vo);
	
	int insertTxtKr(VoiceInfoVO vo);
	int insertTxtEn(VoiceInfoVO vo);
	int updateTxtKr(VoiceInfoVO vo);
	int updateTxtEn(VoiceInfoVO vo);
	int deleteTxtKr(VoiceInfoVO vo);
	int deleteTxtEn(VoiceInfoVO vo);
	
	String krIsExists(VoiceInfoVO vo);
	String enIsExists(VoiceInfoVO vo);
}
