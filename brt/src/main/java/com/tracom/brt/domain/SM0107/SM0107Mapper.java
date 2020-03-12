package com.tracom.brt.domain.SM0107;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.tracom.brt.domain.BM0103.VHCInfoVO;
import com.tracom.brt.domain.BM0205.VhcDvcUpdateVO;
import com.tracom.brt.domain.BM0607.VdoRsvVO;
import com.tracom.brt.domain.BM0609.ScrRsvVO;
import com.tracom.brt.domain.BM0902.EdRsvVO;

public interface SM0107Mapper extends MyBatisMapper {
	List<VhcDvcUpdateVO> SM0107G0S0();
	List<VHCInfoVO> SM0107G1S0();
	List<VHCInfoVO> SM0107G2S0();
	List<VdoRsvVO> SM0107G3S0();
	List<ScrRsvVO> SM0107G4S0();
	List<EdRsvVO> SM0107G5S0();
	
	int SM0107G0U0(Map<String, Object> request);
	int SM0107G1U0(Map<String, Object> request);
	int SM0107G2U0(Map<String, Object> request);
	int SM0107G3U0(Map<String, Object> request);
	int SM0107G4U0(Map<String, Object> request);
	int SM0107G5U0(Map<String, Object> request);
}
