package com.tracom.brt.domain.SM0105;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface SM0105Mapper extends MyBatisMapper {
	List<CommonCodeDetailInfoVO> SM0105G1S0(String coCd);
	CommonCodeDetailInfoVO SM0105F0S0(String dlCd);
	int SM0105F0I0(CommonCodeDetailInfoVO vo);
	int SM0105F0U0(CommonCodeDetailInfoVO vo);
	int SM0105G1D0(CommonCodeDetailInfoVO vo);
	CommonCodeDetailInfoVO SM0105G1S1(CommonCodeDetailInfoVO vo);
	List<CommonCodeDetailInfoVO> SM0105G1S2(CommonCodeDetailInfoVO vo);
	
	List<CommonCodeDetailInfoVO> SM0105G2S0();
	CommonCodeDetailInfoVO SM0105G2S1(String value);
	
	String SM0105G2S2(String value);
}
