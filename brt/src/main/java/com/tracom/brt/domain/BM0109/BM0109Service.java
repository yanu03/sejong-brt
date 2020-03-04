package com.tracom.brt.domain.BM0109;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.BM0104.BmRoutInfoVO;
import com.tracom.brt.domain.BM0104.BmRoutNodeInfoVO;
import com.tracom.brt.utils.ExcelUtils;

@Service
public class BM0109Service extends BaseService<BmRoutInfoVO, String>{
	
	@Inject
	private BM0109Mapper mapper;
	
	@Inject
	private ExcelUtils exUtil;
	
	//좌측상단 그리드 select
	public List<BmRoutInfoVO> BM0109G0S0(RequestParams<BmRoutInfoVO> requestParams){
		return mapper.BM0109G0S0(requestParams.getString("filter"));
	}
	
	//좌측하단 그리드 select
	public List<BmRoutNodeInfoVO> BM0109G1S0(RequestParams<BmRoutNodeInfoVO> requestParams){
    	HashMap<String, String> map = new HashMap<String, String>();
    	map.put("routId", requestParams.getString("routId"));
    	map.put("filter1", requestParams.getString("filter1"));
		return mapper.BM0109G1S0(map);
	}
	
	@Transactional
	//public void BM0109G1I0(List<BmRoutNodeInfoVO> voList) {
	public void BM0109G1I0(BmRoutNodeInfoVO vo) {
		List<BmRoutNodeInfoVO> voList = vo.getVoList();
		
		//BmRoutNodeInfoVO tmp = new BmRoutNodeInfoVO();
		//String routId = null;

		//routId = voList.get(0).getRoutId();
		String routId = vo.getRoutId();
		
		//vo.setVoList(voList);
		//vo.setRoutId(routId);
		
		//0. result테이블 삭제함
		mapper.BM0109G1D0(vo.getRoutId());
		
		//1. result테이블에 인서트함
		mapper.BM0109G1I0(vo);
		//2. 인서트한거 셀렉트함
		//
		List<BmRoutNodeInfoVO >staList = mapper.BM0109G1S1(routId);
		List<BmRoutNodeInfoVO> list = mapper.BM0109G1S2(routId);
		
		vo.setVoList(list);
		mapper.delNodeInfo(vo.getRoutId());
		mapper.insertNodeInfo(vo);

		//
		insertRoutSta(staList, routId);
		insertStaInfo(staList);
		
		
	}
	
	public boolean BM0109G0D0(BmRoutNodeInfoVO vo) {
		if(mapper.BM0109G0D0(vo) > 0) {
			return true;
		}else {
			return false;
		}
	}
	
	//rout-sta 테이블 삽입
	@Transactional
	public boolean insertRoutSta(List<BmRoutNodeInfoVO> voList, String routId) {
		//1. 셀렉트딜리트
		BmRoutNodeInfoVO vo = new BmRoutNodeInfoVO();
		vo.setVoList(voList);
		mapper.BM0109G1D1(routId);
		//2. 순서대로 삽입
		if(mapper.BM0109G1I3(vo) > 0) {
			return true;
		}else {
			return false;
		}
	}
	
	//sta info 테이블 삽입
	public boolean insertStaInfo(List<BmRoutNodeInfoVO> voList) {
		//1. 머지인투
		BmRoutNodeInfoVO vo = new BmRoutNodeInfoVO();
		vo.setVoList(voList);
		if(mapper.BM0109G1I2(vo) > 0) {
			return true;
		}else {
			return false;
		}
	}
	
	//엑셀삽입
	public void BM0109IMPORT(BmRoutInfoVO vo) throws IOException{
		exUtil.downExcel(vo.getAttFile());
		exUtil.readExcel("BM0109");
	}
}
