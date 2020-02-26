package com.tracom.brt.domain.voice;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface VoiceMapper extends MyBatisMapper {
	int checkVoiceOrganization(String vocId);
	List<Map<String, Object>> selectTtsHelp();
}
