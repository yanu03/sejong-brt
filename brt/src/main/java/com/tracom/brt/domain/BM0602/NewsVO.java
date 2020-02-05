package com.tracom.brt.domain.BM0602;

import java.util.List;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NewsVO extends BaseVO{	
	private String vhcNo;
	private String provId;
	private String provUrl;
	private String provNm;
	private String remark;
	private String useYn;
	private String renewDate;
	private String category;
	private String newsTitle;
	private String userNewsId;
	private String newsContents;
	private String pubDt;
	private String dvcId;
	private String proceRst;
	private String sendDate;
	private String attrId;
	private int seq;
	private String txtVal1;
	private String numVal4;
	private String numVal5;
	private String numVal6;
	private List<NewsVO> upList;
}
