package com.tracom.brt.domain.BM0405;

import java.util.List;

import com.tracom.brt.domain.BM0104.BmRoutNodeInfoVO;
import com.tracom.brt.domain.voice.VoiceInfoVO;

import lombok.Data;

@Data
public class VoiceOrganizationVO extends BmRoutNodeInfoVO {
	private String orgaId;
	private String orgaNm;
	private String routId;
	private String remark;
	private List<VoiceInfoVO> playList;
}
