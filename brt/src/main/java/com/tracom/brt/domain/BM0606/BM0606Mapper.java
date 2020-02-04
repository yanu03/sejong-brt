package com.tracom.brt.domain.BM0606;
 
import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
 
 
public interface BM0606Mapper extends MyBatisMapper {

	//좌측 그리드 셀렉트
	List<VideoInfoVO> BM0606G0S0(String filter);
	//우측 폼 인서트
	int BM0606F0I0(VideoInfoVO vo);
	//우측 폼 업데이트
	int BM0606F0U0(VideoInfoVO vo);
}