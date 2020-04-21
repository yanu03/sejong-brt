package com.tracom.brt.domain.user;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface UserMapper extends MyBatisMapper {
	public List<Map<String, Object>> selectUserList(String filter);
}
