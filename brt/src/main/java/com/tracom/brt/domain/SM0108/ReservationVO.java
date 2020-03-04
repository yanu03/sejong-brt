package com.tracom.brt.domain.SM0108;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReservationVO extends BaseVO {
	String rsvId;
	String mngId;
	String proceRst;
	String rstCont;
	String sendDate;
	String completeYn;
}
