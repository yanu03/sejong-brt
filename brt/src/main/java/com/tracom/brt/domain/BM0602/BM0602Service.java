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
	
	@Scheduled(cron="0 10 * * * *")
	public void NewsScheduler() {
		NewsVO vo = new NewsVO();
		List<NewsVO> voList = mapper.BM0602F0S0(vo);
		
		CommonCodeDetailInfoVO codeVO = new CommonCodeDetailInfoVO();
		codeVO.setCoCd(ai.LINK_SET);
		codeVO.setDlCd(ai.NEWS_UPDATE_COUNT);
		CommonCodeDetailInfoVO codeVO2 = mapper_0105.SM0105G1S1(codeVO);
		
		String StringVO = codeVO2.getTxtVal1();
		int newsCount = Integer.parseInt(StringVO);
		
		for(int i = 0; i < voList.size(); i++) {
			NodeList nodeList = ai.newsInterface_XML(voList.get(i).getProvUrl().toString());
			for (int j = 0; j < newsCount; j++) {
	    		Node child = nodeList.item(j);
	            if(child.getNodeType() == Node.ELEMENT_NODE) {
	            	Element eElement = (Element)child;           		            	
	            		vo.setCategory(ai.getTagValue("category", eElement));
	            		if(vo.getCategory() == null) {
	            			vo.setCategory("전체");
	            		}
	            		vo.setProvNm(ai.getTagValue("author", eElement));
	            		vo.setNewsTitle(ai.getTagValue("title", eElement));
	            		if(vo.getNewsTitle().length()>50) {
	            			vo.setNewsTitle(vo.getNewsTitle().substring(0, 50));
	            		}
	            		vo.setPubDt(ai.getTagValue("pubDate", eElement));
	            }
	            System.out.println("뉴스");
	            System.out.println(vo);
	            System.out.println(vo.getPubDt().length()-3);
	            vo.setPubDt(vo.getPubDt().substring(0, vo.getPubDt().length()-4));
	            mapper.BM0602G0I0(vo);
	        }
		}
	}
	
	/* @Scheduled(cron="0 * 10 * * *") 뉴스 delete 스케쥴러 cron 시간 확인하고 설정*/
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
