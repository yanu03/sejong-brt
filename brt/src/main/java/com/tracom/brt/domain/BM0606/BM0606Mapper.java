package com.tracom.brt.domain.BM0606;
 
import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
 
 
public interface BM0606Mapper extends MyBatisMapper {
	//좌측 그리드 셀렉트
	List<VdoOrgaVO> BM0606G0S0(String filter);
}