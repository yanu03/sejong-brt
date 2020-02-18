package com.tracom.brt.domain.BM0102;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BM0102Mapper extends MyBatisMapper {
	List<CustInfoVO> BM0102G0S0(String filter);
	int BM0102F0I0(CustInfoVO vo);
	int BM0102F0U0(CustInfoVO vo);
	int BM0102G0D0(CustInfoVO vo);
	int BM0102G1I0(MngrInfoVO voList);
	int BM0102G1D0(String value);
	List<MngrInfoVO> BM0102G1S0(CustInfoVO vo);
}
