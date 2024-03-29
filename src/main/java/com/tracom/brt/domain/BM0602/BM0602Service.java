package com.tracom.brt.domain.BM0602;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Locale;

import javax.inject.Inject;
import javax.jdo.annotations.Transactional;
import javax.xml.parsers.ParserConfigurationException;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.Interface.AtmoDataInterface;
import com.tracom.brt.domain.SM0105.CommonCodeDetailInfoVO;
import com.tracom.brt.domain.SM0105.SM0105Mapper;

@EnableScheduling
@Service
public class BM0602Service extends BaseService<NewsVO, String>{

	@Inject
	private BM0602Mapper mapper;
	
	@Inject
	private SM0105Mapper mapper_0105;
	
	@Inject
	private AtmoDataInterface ai;
	
	@Transactional
	public List<NewsVO> BM0602G0S0(RequestParams<NewsVO> requestParams) {
		return mapper.BM0602G0S0(requestParams.getString("filter"));
	}
	
	@Scheduled(cron="0 0 4,16 * * *")
	@Transactional
	public void NewsScheduler() throws ParseException, ParserConfigurationException {
		//덮어쓰기전 삭제
		mapper.BM0602D0();
		
		NewsVO vo = new NewsVO();
		//사용체크 된 뉴스만 가져오기.
		List<NewsVO> voList = mapper.BM0602F0S0(vo);
		
		//뉴스당 개수 공통code
		CommonCodeDetailInfoVO codeVO = new CommonCodeDetailInfoVO();

		//쿠키뉴스 설정 로드
		codeVO.setCoCd(ai.LINK_SET);
		codeVO.setDlCd(ai.NEWS_UPDATE_COUNT);
		CommonCodeDetailInfoVO codeVO2 = mapper_0105.SM0105G1S1(codeVO);
		
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date nowDate = new Date();
		
		//이 갯수만큼 가져올것임
		String StringVO = codeVO2.getTxtVal1();
		int newsCount = Integer.parseInt(StringVO);
		
		//뉴스 개수를 제한하기 위한 cnt 선언
		int cnt = 0;

		//사용자 사용 뉴스 INSERT 개수 반환
		cnt += mapper.insertUserNews();
		
		//사용하는 뉴스 리스트 뉴스 파싱
		for(int i = 0; i < voList.size(); i++) {
			NodeList nodeList = ai.newsInterface_XML(voList.get(i).getProvUrl().toString());
			//String provUrl = mapper.BM0602G0S2(voList.get(i).getProvUrl().toString());
			String provUrl = mapper.BM0602G0S2(voList.get(i).getProvId());
			for (int j = 0; j < newsCount; j++) {
	    		Node child = nodeList.item(j);
	            if(child.getNodeType() == Node.ELEMENT_NODE) {
	            	Element eElement = (Element)child;
	            	if(eElement.getElementsByTagName("category").item(0) !=null){
	            		//VO 세팅
	            		vo.setCategory(ai.getTagValue("category", eElement));	            			
	            		vo.setProvNm(provUrl);
	            		vo.setNewsTitle(ai.getTagValue("title", eElement));
	            		if(vo.getNewsTitle().length()>50) {
	            			vo.setNewsTitle(vo.getNewsTitle().substring(0, 50));
	            		}
	            		//전체 뉴스 20개 까지만 사용으로 넣고 아니면 사용안함으로 사용할것임
	            		if(cnt < 20) {
	            			vo.setUseYn("Y");
	            		}else {
	            			vo.setUseYn("N");
	            		}
	            }else {
	            	   vo.setCategory("전체");
	            	   vo.setProvNm(provUrl);
	            	   vo.setNewsTitle(ai.getTagValue("title", eElement));
	            	   if(vo.getNewsTitle().length()>50) {
	            		   vo.setNewsTitle(vo.getNewsTitle().substring(0, 50));
	            		   }
	            	   if(cnt < 20) {
	            		   vo.setUseYn("Y");
	            	   }else {
	            		   vo.setUseYn("N");
	            	   }
	            }
	            	String date = dateFormat.format(nowDate);
	            	vo.setPubDt(date);

	            }
	            mapper.BM0602G0I0(vo);
	            cnt++;
	        }
			//삽입한 뉴스 개수 추가
		}	
	}

	/*
	//@Scheduled(cron="0 0 3 * * *")
	public void NewsDeleteScheduler() throws ParseException {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date date = new Date();
		
		String delDate = dateFormat.format(date);
		
		Date setDate = dateFormat.parse(delDate);
		Calendar cal = new GregorianCalendar(Locale.KOREA);
		cal.setTime(setDate);
		cal.add(Calendar.DATE, -1);
		
		String deleteDate = dateFormat.format(cal.getTime());
		mapper.BM0602D0(deleteDate);
	}
	 */
	public List<NewsVO> BM0602M0S0(RequestParams<NewsVO> requestParams) {
		return mapper.BM0602M0S0(requestParams.getString("filter"));
	}
	
	public String BM0602F0I0(NewsVO request) {
		mapper.BM0602F0I0(request);
		return request.getProvId();
	}

	public boolean BM0602G0D0(NewsVO request) {
		if(mapper.BM0602G0D0(request) > 0) {			
			return true;
		}else {
			return false;
		}
	}
	
	public boolean BM0602F0U0(NewsVO request) {
	  for(int i = 0; request.getUpList().size() > i; i++) {
		  NewsVO vo = request.getUpList().get(i);
		  mapper.BM0602F0U0(vo);
	  }
	  mapper.BM0602F0U0(request);
	  
	   if(request.getUpList().size() > 0 ) {
		   return true; 
	  }else {
		  return false;
	  }
	}

	public String BM0602M0I0(NewsVO request) {
		mapper.BM0602M0I0(request);
		return request.getTxtVal1();
	}

}
