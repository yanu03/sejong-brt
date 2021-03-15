package com.tracom.brt.domain.BM0610;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.tracom.brt.domain.SM0105.CommonCodeDetailInfoVO;

public interface BM0610Mapper extends MyBatisMapper{

	List<InnerLEDVO> BM0610G0S0(String filter);
	int BM0610F0I0(InnerLEDVO vo);
	int BM0610F0U0(InnerLEDVO vo);
	int BM0610G0D0(InnerLEDVO vo);
	CommonCodeDetailInfoVO getMax();
	String getSeq();
	int BM0610G0U1(InnerLEDVO vo);
	List<Map<String, Object>> selectIldHelp();
	String currentLength(String str);
	String isExists(String value);
	String makeIldID(String value);
}
