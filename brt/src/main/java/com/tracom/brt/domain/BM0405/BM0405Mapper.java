package com.tracom.brt.domain.BM0405;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.tracom.brt.domain.BM0104.BmRoutInfoVO;
import com.tracom.brt.domain.BM0104.BmRoutNodeInfoVO;
import com.tracom.brt.domain.voice.VoiceInfoVO;

public interface BM0405Mapper extends MyBatisMapper {
	List<BmRoutInfoVO> BM0405G0S0(String filter);
	List<BmRoutNodeInfoVO> BM0405G1S0(String routId);
	List<VoiceOrganizationVO> BM0405G2S0(String routId);
	List<VoiceInfoVO> BM0405G3S0(String vocDiv);
	List<VoiceInfoVO> BM0405G4S0(String orgaId);
	int BM0405G2I0(VoiceOrganizationVO vo);
	int BM0405G2I1(VoiceOrganizationVO vo);
	int BM0405F0U0(VoiceOrganizationVO vo);
	int BM0405G2D0(VoiceOrganizationVO vo);
	int BM0405G2D1(VoiceOrganizationVO vo);
}
