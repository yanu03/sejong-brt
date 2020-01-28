package com.tracom.brt.domain.BM0302;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BM0302Mapper extends MyBatisMapper {
	List<AltContractInfoVO> BM0302G1S0(String filter);
	List<AltContractInfoVO> BM0302G0S0(String filter);
	List<AltContractInfoVO> BM0302G0S1(String string);
	AltContractInfoVO BM0302F0S0(String seq);
	int BM0302F0I0(AltContractInfoVO vo);
	int BM0302F0U0(AltContractInfoVO vo);
	int BM0302F0U1(AltContractInfoVO vo);
	int BM0302F0U2(AltContractInfoVO vo);
	int BM0302G1D0(AltContractInfoVO vo);
}
