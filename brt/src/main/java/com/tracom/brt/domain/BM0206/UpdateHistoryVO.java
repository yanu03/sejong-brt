package com.tracom.brt.domain.BM0206;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor

public class UpdateHistoryVO extends BaseVO{
	private String verInfo;
	private String sendDate;
	private String remark;
	private String rsvId;
	private String dvcId;
	private String proceRst;
}
