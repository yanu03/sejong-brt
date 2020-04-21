package com.tracom.brt.domain.BM0303;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BM0303Mapper extends MyBatisMapper {
	List<ContractViewVO> BM0303G1S0(String filter);
	List<ContractViewVO> BM0303G2S0(String filter);
	List<ContractViewVO> BM0303G2S1(String filter);
}
