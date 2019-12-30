package com.tracom.brt.domain.SM0104;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface SM0104Mapper extends MyBatisMapper {
	List<CommonCodeInfoVo> SM0104G0S0(String filter);
	CommonCodeInfoVo SM0104F0S0(String coCd);
	int SM0104F0I0(CommonCodeInfoVo vo);
	int SM0104F0U0(CommonCodeInfoVo vo);
	int SM0104G0D0(CommonCodeInfoVo vo);
}
