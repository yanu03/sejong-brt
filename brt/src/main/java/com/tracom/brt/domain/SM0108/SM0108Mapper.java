package com.tracom.brt.domain.SM0108;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.tracom.brt.domain.BM0103.VHCInfoVO;
import com.tracom.brt.domain.BM0205.VhcDvcUpdateVO;
import com.tracom.brt.domain.BM0607.VdoRsvVO;
import com.tracom.brt.domain.BM0609.ScrRsvVO;

public interface SM0108Mapper extends MyBatisMapper {
	List<VhcDvcUpdateVO> SM0108G0S0();
	List<VHCInfoVO> SM0108G1S0();
	List<VHCInfoVO> SM0108G2S0();
	List<VdoRsvVO> SM0108G3S0();
	List<ScrRsvVO> SM0108G4S0();
	
	int SM0108G0U0(Map<String, Object> request);
	int SM0108G1U0(Map<String, Object> request);
	int SM0108G2U0(Map<String, Object> request);
	int SM0108G3U0(Map<String, Object> request);
	int SM0108G4U0(Map<String, Object> request);
}
