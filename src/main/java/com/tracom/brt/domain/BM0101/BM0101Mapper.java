package com.tracom.brt.domain.BM0101;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BM0101Mapper extends MyBatisMapper {
	List<CorpInfoVO> BM0101G0S0(String filter);
	int BM0101F0I0(CorpInfoVO vo);
	int BM0101F0U0(CorpInfoVO vo);
	int BM0101G0D0(CorpInfoVO vo);
}
