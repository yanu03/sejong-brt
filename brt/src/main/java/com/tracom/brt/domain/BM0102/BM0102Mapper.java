package com.tracom.brt.domain.BM0102;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BM0102Mapper extends MyBatisMapper {
	List<CustInfoVo> BM0102G0S0(String filter);
	int BM0102F0I0(CustInfoVo vo);
	int BM0102F0U0(CustInfoVo vo);
	int BM0102G0D0(CustInfoVo vo);
}
