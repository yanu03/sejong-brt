package com.tracom.brt.domain.altercontract;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface AltercontractMapper extends MyBatisMapper {
	List<Altercontract> findAll(String filter);
	int insert(Altercontract vo);
	int update(Altercontract vo);
	int delete(Altercontract vo);
}
