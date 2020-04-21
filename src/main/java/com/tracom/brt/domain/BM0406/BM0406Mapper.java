package com.tracom.brt.domain.BM0406;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.tracom.brt.domain.BM0103.VHCInfoVO;

public interface BM0406Mapper extends MyBatisMapper {
	List<VHCInfoVO> BM0406G1S0();
	int insertVoiceReservation(Map<String, Object> param);
	int insertVoiceReservationResult(Map<String, Object> param);
}
