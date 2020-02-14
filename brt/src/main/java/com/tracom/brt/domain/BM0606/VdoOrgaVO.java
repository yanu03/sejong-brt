package com.tracom.brt.domain.BM0606;
 
import java.util.List;

import com.tracom.brt.domain.BaseVO;
import com.tracom.brt.domain.BM0605.VideoInfoVO;

import lombok.Data;
import lombok.NoArgsConstructor;
 
@Data
@NoArgsConstructor
public class VdoOrgaVO extends BaseVO {

	private String	orgaId;
	
	private String	orgaNm;
	
	private String	remark;
	
	private int		vdoCnt;
	
	private int		ttTime;
	
	private String routId;
	
	private List<VideoInfoVO> playList;
}