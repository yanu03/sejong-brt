package com.tracom.brt.domain.BM0902;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.tracom.brt.domain.BM0901.ElecRouterVO;

public interface BM0902Mapper extends MyBatisMapper{

	List<EdRsvVO> BM0902G1S0();
	ElecRouterVO getEdConfig(EdRsvVO vo);
	int BM0902G1I0(EdRsvVO vo);
	int BM0902G1I1(EdRsvVO vo);
}
