package com.tracom.brt.domain.BM0103;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BM0103Mapper extends MyBatisMapper {
	List<VHCInfoVO> BM0103G0S0(String filter);
	int BM0103F0I0(VHCInfoVO vo);
	int BM0103F0U0(VHCInfoVO vo);
	int BM0103G0D0(VHCInfoVO vo);
}
