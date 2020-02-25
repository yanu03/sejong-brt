package com.tracom.brt.domain.BM0601;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BM0601Mapper extends MyBatisMapper{

	List<WeatAtmoVO> BM0601F0S0(String measDt);
	List<WeatAtmoVO> BM0601G1S0(String filter);
	List<WeatAtmoVO> BM0601G1S1(String filter);
	List<WeatAtmoVO> BM0601G2S1(String filter);
	List<WeatAtmoVO> BM0601G2S2(String filter);
	List<WeatAtmoVO> BM0601F0S1(String filter);
	List<WeatAtmoVO> BM0601M0S0(String filter);
	int BM0601M0I0(Map<String, String> hm);
	int BM0601M0U1(Map<String, String> weatUrl);
	int BM0601M0U2(Map<String, String> atmoUrl);
	int BM0601M0U3(Map<String, String> weatApiKey);
	int BM0601M0U4(Map<String, String> atmoApiKey);
	int BM0601F0I0(WeatAtmoVO vo);
	int BM0601F0I1(WeatAtmoVO weatVO);
	WeatAtmoVO BM0601F0S2(String filter);
}
