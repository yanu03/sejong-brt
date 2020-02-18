package com.tracom.brt.domain.BM0102;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;

@Service
public class BM0102Service extends BaseService<CustInfoVO, String> {
    @Inject
    private BM0102Mapper mapper;
    
    
    public List<CustInfoVO> BM0102G0S0(RequestParams<CustInfoVO> requestParams) {
        return mapper.BM0102G0S0(requestParams.getString("filter"));
    }

    public String BM0102F0I0(CustInfoVO vo) {
    	mapper.BM0102F0I0(vo);
    	return vo.getCustId();
    }
    
    public boolean BM0102F0U0(CustInfoVO vo) {
    	if(mapper.BM0102F0U0(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
    
    public List<MngrInfoVO> BM0102G1S0(CustInfoVO vo){
    	return mapper.BM0102G1S0(vo);
    }
    
    @Transactional
    public boolean BM0102G0D0(CustInfoVO vo) {
    	mapper.BM0102G1D0(vo.getCustId());
    	if(mapper.BM0102G0D0(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
    
    @Transactional
    public int BM0102G1I0(List<MngrInfoVO> voList) {
    	MngrInfoVO vo = new MngrInfoVO();
    	vo.setVoList(voList);
    	mapper.BM0102G1D0(voList.get(0).getCustId());
    	return mapper.BM0102G1I0(vo);
    }
}