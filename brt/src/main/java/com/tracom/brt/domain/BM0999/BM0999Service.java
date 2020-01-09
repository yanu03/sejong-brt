package com.tracom.brt.domain.BM0999;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;

@Service
public class BM0999Service extends BaseService<BmValMapVO, String> {
    @Inject
    private BM0999Mapper mapper;
    
    
    public List<TsRoutNodeVO> BM0999G0S0(RequestParams<TsRoutNodeVO> requestParams) {
        return mapper.BM0999G0S0(requestParams.getString("filter"));
    }
    
    public List<TsRoutNodeVO> BM0998G0S0(RequestParams<TsRoutNodeVO> requestParams) {
        return mapper.BM0998G0S0(requestParams.getString("filter"));
    }

    public int BM0999M0I0(BmValMapVO vo) {
    	return mapper.BM0999M0I0(vo);
    }
    
    public int BM0999M0D0(BmValMapVO vo) {
    	return mapper.BM0999M0D0(vo);
    }
    public boolean save(/*input:route_id*/) {
    	//route_id로 해당 노선의 노드 좌표 받아옴
    	//하나씩돌면서 거리계산, 30미터 이내면 삭제함
    	//갱신된노드정보를 디비에저장
    	return false;
    }
    
    public double calcDist(double x1, double y1, double x2, double y2) {
    	double result = Math.acos(Math.cos(Math.toRadians(90-y1)) * Math.cos(Math.toRadians(90-y2)) + Math.sin(Math.toRadians(90-y1)) * Math.sin(Math.toRadians(90-y2)) * Math.cos(Math.toRadians(x1-x2))) * 6378.137 * 1000;
    	return result;
    }
    
}