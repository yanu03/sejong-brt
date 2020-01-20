package com.tracom.brt.domain.BM0405;

import java.math.BigDecimal;
import java.util.List;

import com.tracom.brt.domain.BaseVO;
import com.tracom.brt.domain.voice.VoiceInfoVO;

import lombok.Data;

@Data
public class VoiceOrganizationVO extends BaseVO {
	private String orgaId;
	private String orgaNm;
	private BigDecimal lati;
	private BigDecimal longi;
	private Integer allPlayTm;
	private String remark;
	private String routId;
	private String staId;
	private List<VoiceInfoVO> orgaList;
}
