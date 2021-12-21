package com.tracom.brt.domain.OpenAPI;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface OpenAPIMapper extends MyBatisMapper {
	/**busInfoService **/
	List<BusListVO> getBusList(Map<String, Object> param) throws SQLException;
	
	/** busLocationService **/
	BusLocationVO getBusLocation(String busNo) throws SQLException;
	List<BusLocationListVO> getAllBusLocation() throws SQLException;
	List<BusLocationListVO> getAllElecBusLocation() throws SQLException;
	List<BusLocationListVO> getAllCngBusLocation() throws SQLException;
	List<BusLocationListVO> getBusLocationHistory(Map<String, Object> param) throws SQLException;
	
	/** routeInfoService **/
	List<RoutInfoVO> getRoutList() throws SQLException;
	List<RoutNodeVO> getRoutNode(String routId) throws SQLException;
	List<RoutNodeVO> getRoutStn(String routId) throws SQLException;
	
	/** logging **/
	int insertApiLog(ApiLogVO vo) throws SQLException;
}