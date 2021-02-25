package com.tracom.brt.domain.BM0503;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.tracom.brt.domain.BM0103.VHCInfoVO;

public interface BM0503Mapper extends MyBatisMapper {
	List<RoutRsvVO> BM0503G0S0(String filter);
	List<RoutRsvVO> BM0503G1S0();
	List<RoutRsvVO> vhcMngList(String value);
	int BM0503G1I0(RoutRsvVO vo);
	int BM0503G1I1(RoutRsvVO vo);
	List<DvcCodeVO> selectDvcCd(VHCInfoVO vo);
}
