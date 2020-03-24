package com.tracom.brt.domain.file;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.tracom.brt.domain.BM0201.VhcDeviceVO;
import com.tracom.brt.domain.BM0605.VideoInfoVO;
import com.tracom.brt.domain.voice.VoiceInfoVO;

public interface FileMapper extends MyBatisMapper {
	List<VoiceInfoVO> selectVoiceList();
	List<VideoInfoVO> selectVideoList();
	List<VhcDeviceVO> selectDeviceList();
}
