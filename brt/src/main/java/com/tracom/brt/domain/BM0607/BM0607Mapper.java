package com.tracom.brt.domain.BM0607;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.SM0105.CommonCodeDetailInfoVO;

public interface BM0607Mapper extends MyBatisMapper{

	List<VdoRsvVO> BM0607G1S0();
	int	BM0607G1I0();
}
