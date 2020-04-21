package com.tracom.brt.domain.Interface;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class LocationVO extends BaseVO {

	private double y;

	private double x;
	
	private double distance;
	
}