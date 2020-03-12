package com.tracom.brt.domain.BM0109;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.BM0104.BmRoutInfoVO;
import com.tracom.brt.domain.BM0104.BmRoutNodeInfoVO;
import com.tracom.brt.domain.BM0105.BM0105Mapper;
import com.tracom.brt.domain.BM0105.BmStaInfoVO;
import com.tracom.brt.domain.BM0107.BM0107Mapper;
import com.tracom.brt.domain.BM0107.BM0107Service;
import com.tracom.brt.utils.ExcelUtils;

@Service
public class BM0109Service extends BaseService<BmRoutInfoVO, String>{
	
	@Inject
	private BM0109Mapper mapper;
	
	@Inject
	private ExcelUtils exUtil;
	
	@Inject
	private BM0107Service BM0107Service;
	
	@Inject
	private BM0107Mapper mapper_107;
	
	@Inject
	private BM0105Mapper mapper_105;
	
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
		
		String routId = vo.getRoutId();
		
		List<BmRoutNodeInfoVO >staList = new ArrayList<>();
		List<BmRoutNodeInfoVO> list = new ArrayList<>();
		List<BmRoutNodeInfoVO> agList = new ArrayList<>();
		
		//0. result테이블 삭제함
		mapper.BM0109G1D0(vo.getRoutId());
		
		//1. result테이블에 인서트함
		if(voList.size() > 0) {
			mapper.BM0109G1I0(vo);

			//2. 인서트한거 셀렉트함
			//정류장리스트
			staList = mapper.BM0109G1S1(routId);
			//노드리스트
			list = mapper.BM0109G1S2(routId);
			//음성리스트
			agList = mapper.getAgInfo(routId);
			
			vo.setVoList(list);
		}
		//노드정보삭제
		mapper.delNodeInfo(vo.getRoutId());
		
		//vo 있을경우
		if(voList.size() > 0) {
				
			//노드인포테이블에 인서트함
			mapper.insertNodeInfo(vo);
			//정류장이 있을경우
			if(staList.size() > 0) {
				insertRoutSta(staList, routId);
				insertStaInfo(staList);
				
				/**뭘 하려던 거였지??
				for(BmRoutNodeInfoVO _o : staList) {
					BmStaInfoVO _staVO = new BmStaInfoVO();
					
				}
				 * **/
				List<BmStaInfoVO> _voList = mapper_105.getNoNamed();
				for(BmStaInfoVO _o : _voList) {
					if(mapper_105.getStaNm(_o) != null) {
						mapper_105.setNoNamed(_o);
					}else {
						mapper_105.setNewStaNm(_o);						
					}
				}
				
			}

			if(agList.size() > 0) {
				Map<String, String> map = new HashMap<>();
				map.put("routId", vo.getRoutId());
				List<BmRoutNodeInfoVO> nodeList = mapper.BM0109G1S0(map);
				
				List<BmRoutNodeInfoVO> finalList = BM0107Service.insertAg(nodeList, agList);
				BmRoutNodeInfoVO tm = new BmRoutNodeInfoVO();
				tm.setVoList(finalList);
				tm.setRoutId(routId);
				//mapper.delNodeInfo(vo.getRoutId());
				mapper.BM0109G1D0(vo.getRoutId());
				mapper.BM0109G1I0(tm);
			}
		}
		
		
	}
	
	public boolean BM0109G0D0(BmRoutNodeInfoVO vo) {
		if(mapper.getAgCnt(vo.getRoutId()) > 0){
			return false;
		}else {
			if(mapper.BM0109G0D0(vo) > 0) {
				return true;
			}else {
				return false;
			}
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
		exUtil.readExcel("BM0109", vo.getRoutId());
	}
}
