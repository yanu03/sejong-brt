package com.tracom.brt.domain.routeReservation;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;

@Data
public class RouteReservationVO extends BaseVO {
	private String rsvDate;
	private String orgaId;
	private String rsvId;
	private String vocId;
}
