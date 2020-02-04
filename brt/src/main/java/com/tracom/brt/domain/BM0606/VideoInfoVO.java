package com.tracom.brt.domain.BM0606;
 
import org.springframework.web.multipart.MultipartFile;

import com.tracom.brt.domain.BaseVO;

import lombok.Data;
import lombok.NoArgsConstructor;
 
@Data
@NoArgsConstructor
public class VideoInfoVO extends BaseVO {
 
		private String vdoId;
	 
		private String vdoNm;
	 
		private String conId;
	 
		private String conNm;
		
		private String fileType;
	 
		private int imgPlayTm;
	 
		private String playStDate;
	 
		private String playEdDate;
	 
		private int playTm;
	 
		private String attFile;
	 
		private String remark;
	 	
		private MultipartFile vdoFile;
}