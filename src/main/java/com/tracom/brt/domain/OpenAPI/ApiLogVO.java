package com.tracom.brt.domain.OpenAPI;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ApiLogVO extends BaseVO {
	private String endPoint;
	private String query;
	private String ip;
	private String resultCd;
	private String resultDetailCd;
}
