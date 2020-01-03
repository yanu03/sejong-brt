package com.tracom.brt.domain.BM0105;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BM0105Mapper extends MyBatisMapper {
	List<BmStaInfoVO> BM0105G0S0(String filter);
	int BM0105F0I0(BmStaInfoVO vo);
	int BM0105F0U0(BmStaInfoVO vo);
	int BM0105G0D0(BmStaInfoVO vo);
}
