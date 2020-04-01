package com.tracom.brt.domain.BM0301;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BM0301Mapper extends MyBatisMapper {
	//List<ContractInfoVO> BM0301G0S0(String filter);
	List<ContractInfoVO> BM0301G0S0(Map map);
	List<ContractInfoVO> BM0301G0S1(String conId);
	int BM0301F0I0(ContractInfoVO vo);
	int BM0301F0U0(ContractInfoVO vo);
	int BM0301F0U1(ContractInfoVO vo);
	int BM0301F0U2(ContractInfoVO vo);
	int BM0301G0D0(ContractInfoVO vo);
}
