package com.tracom.brt.domain.SM0109;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface SM0109Mapper extends MyBatisMapper {
	List<ApiVO> SM0109G0S0(String filter);
	int SM0109F0I0(ApiVO vo);
	int SM0109F0U0(ApiVO vo);
	int SM0109G0D0(ApiVO vo);
	int ApiCallHis(ApiCallHisVO vo);
	List<ApiVO> IfKeyExists(String authKey);
	boolean KeyAlives(String authKey);
}