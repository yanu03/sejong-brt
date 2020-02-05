package com.tracom.brt.domain.BM0201;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BM0201Mapper extends MyBatisMapper{

	List<VhcDeviceVO> BM0201G0S0(String coCd);
	List<VhcDeviceVO> BM0201G1S0(String vhcId);
	List<VhcDeviceVO> BM0201M0S0(String filter);
	List<VhcDeviceVO> BM0201F0S2(String dvcId);
	List<VhcDeviceVO> BM0201G1S1(String dvcId);
	VhcDeviceVO BM0201F0S1(String dvcId);
	int BM0201F0I0(VhcDeviceVO vo);
	int BM0201M0I0(VhcDeviceVO vo);
	int BM0201F0U0(VhcDeviceVO vo);
	int BM0201G1D0(VhcDeviceVO vo);
}
