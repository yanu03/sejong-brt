package com.tracom.brt.domain.corporation;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface CorporationMapper extends MyBatisMapper {
	List<Corporation> findAll(String filter);
	int insert(Corporation vo);
	int update(Corporation vo);
	int delete(Corporation vo);
}
