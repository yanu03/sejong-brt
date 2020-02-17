package com.tracom.brt.domain.BM0601;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WeatAtmoVO extends BaseVO{
	
	private String dustc;
	private String sDustc;
	private String sdc;
	private String cmc;
	private String ozonec;
	private String ndc;
	private String skyCond;
	private String skyCondCode;
	private String tempc;
	private String tempMini;
	private String tempHigh;
	private String humi;
	private String rainPro;
	private String rainFall;
	private String measDt;
	private String notiDt;
	private String renewDt;
	private String dvcId;
	private String vhcId;
	private String vhcNo;
	private String proceRst;
	private String sendDate;
	private String attrId;
	private String seq;
	private String numVal4;
	private String numVal5;
	private String numVal6;
	private String remarkAtmo;
	private String remarkWeat;
	private String weatApiKey;
	private String atmoApiKey;
	private String remark;
}
