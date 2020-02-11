package com.tracom.brt.domain.BM0606;
 
import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.tracom.brt.domain.BM0605.VideoInfoVO;
 
 
public interface BM0606Mapper extends MyBatisMapper {
	//좌측 그리드 셀렉트
	List<VdoOrgaVO> BM0606G0S0(String filter);
	
	//편성된 목록 가져오기
	List<VideoInfoVO> BM0606G2S0(VdoOrgaVO vo);
	
	//폼 삽입
	int BM0606F0I0(VdoOrgaVO vo);
	
	//리스트 삽입
	int BM0606G2I0(VdoOrgaVO playList);
	
	//리스트 삭제
	int BM0606G2D0(VdoOrgaVO vo);
	
	//폼 업데이트
	int BM0606F0U0(VdoOrgaVO vo);
}