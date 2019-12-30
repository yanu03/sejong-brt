package com.tracom.brt.domain.BM0108;
 
import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
 
 
public interface BM0108Mapper extends MyBatisMapper {
	List<EplyInfoVO> BM0108G0S0(String filter);
}