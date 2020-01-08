package com.tracom.brt.domain.BM0104;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BM0104Mapper extends MyBatisMapper {
	List<BmRoutInfoVO> BM0104G0S0(String filter);
	int BM0104F0I0(BmRoutInfoVO vo);
	int BM0104F0U0(BmRoutInfoVO vo);
	int BM0104G0D0(BmRoutInfoVO vo);
}
