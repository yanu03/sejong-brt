package com.tracom.brt.domain.SM0104;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface SM0104Mapper extends MyBatisMapper {
	List<CommonCodeInfoVO> SM0104G0S0(String filter);
	CommonCodeInfoVO SM0104F0S0(String coCd);
	int SM0104F0I0(CommonCodeInfoVO vo);
	int SM0104F0U0(CommonCodeInfoVO vo);
	int SM0104G0D0(CommonCodeInfoVO vo);
}
