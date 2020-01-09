package com.tracom.brt.domain.BM0999;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BM0999Mapper extends MyBatisMapper {
	List<TsRoutNodeVO> BM0999G0S0(String filter);
	int BM0999G0S1(String staId);
	int BM0999F0I0(BmValMapVO vo);
	int BM0999F0U0(BmValMapVO vo);
	int BM0999G0D0(BmValMapVO vo);
	
	List<TsRoutNodeVO> BM0998G0S0(String filter);
	int BM0999M0I0(BmValMapVO vo);
	int BM0999M0D0(BmValMapVO vo);
}
