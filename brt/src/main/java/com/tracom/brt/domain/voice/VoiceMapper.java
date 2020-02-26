package com.tracom.brt.domain.voice;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface VoiceMapper extends MyBatisMapper {
	int checkVoiceOrganization(String vocId);
}
