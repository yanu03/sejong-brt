package com.tracom.brt.domain.BM0801;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class StatisticsVO extends BaseVO{
	private String playDate;
	private String vhcId;
	private String vhcNo;
	private String conId;
	private String conNm;
	private int countTotal;
	private int countVoice;
	private int countImage;
	private int countVideo;
	private String id;
	private String adType;
	private String adNm;
}
