package com.tracom.brt.domain.contract;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface ContractMapper extends MyBatisMapper {
	List<Contract> findAll(String filter);
	int insert(Contract vo);
	int update(Contract vo);
	int delete(Contract vo);
}
