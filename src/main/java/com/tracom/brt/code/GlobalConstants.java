package com.tracom.brt.code;

public class GlobalConstants {

    public static final String DOMAIN_PACKAGE = "com.tracom.brt.domain";

    public static final String LAST_NAVIGATED_PAGE = "a_x_b_l_n_p";

    public static final String ADMIN_AUTH_TOKEN_KEY = "b42f668f-7f50-4182-820f-48332d3c80bf";

    public static final String LANGUAGE_COOKIE_KEY = "a_x_lang";

    public static final String LANGUAGE_PARAMETER_KEY = "language";
    
    
    public static class Types {
    	public static final String VOICE		= "voice";		// 음성
    	public static final String SAVED_VOICE	= "savedVoice";	// 저장된 음성
    	public static final String TEMP_VOICE	= "tempVoice";	// 임시 음성
    	public static final String VIDEO		= "video";		// 영상
    	public static final String IMAGE		= "image";		// 이미지
    	public static final String BMP			= "BMP";		// 행선지안내기 이미지
    	public static final String BMPLOGO		= "BMPLOGO";	// 행선지안내기 시정홍보
    	public static final String PNG			= "png";		// 승객용안내기 배경 미리보기
    	//2021 선택음성
    	public static final String SELECTED		= "selected";	// 선택음성안내 미리듣기
    }
    
    public static class VoiceTypes {
    	public static final String KR		= "K";	// 한국어
    	public static final String EN		= "E";	// 영어
    	public static final String US		= "U";	// 사용자 음성
    	public static final String RT		= "R";	// 노선별 음성
    }
    
    public static class PlayListVoiceTypes {
    	public static final int BUS_KR		= 0; // 한글정류장안내 음성
    	public static final int BUS_EN		= 1; // 영문정류장안내 음성
    	public static final int AD			= 2; // 홍보음성
    	public static final int ETC			= 3; // 기타음성
    	public static final int ROUTE		= 4; // 노선선택시 재생 음성
    }
    
    public static class CSVForms {
    	public static final String ROW_SEPARATOR			= "\r\n";
    	public static final String COMMA					= ",";
    	public static final String VOICE_PLAYLIST_TITLE		= "Seq_No,Voice_Code,Audio_FileName,Start_Date,Expire_Date,Text (256Byte)\r\n";
    	
    	public static final String ROUTE_VERSION			= "VERSION:";
    	public static final String ROUTE_LIST				= "FILE_NAME,VERSION,ROUTE_NO,ROUTE_NAME_KO,ROUTE_NM_EN,ROUT_SHAPE,DAY1,DAY2,SATDAY1,SATDAY2,SUNDAY1,SUNDAY2";
    	public static final String ROUTE_BUSSTOP_TITLE		= "NODE_ID,NODE_NAME,TYPE,RANGE,X,Y,NODE_ENAME,TRANSIT_CODE";
    	public static final String ROUTE_NODELIST_TITLE		= "NODE_ID,NODE_NAME,RANGE,X,Y";
    	public static final String ROUTE_TITLE				= "NODE_ID";
    	
    	public static final String VIDEO_PLAY_LIST			="Seq_No,Video_Type,Video_File,Start_Date,Expire_Date,Runtime";
    	public static final String ELEC_ROUTER				="TIME_KO,TIME_EN,CATEGORY,FRAME,FONT";
    }
    
    public static class SCH {
    	public static final String ROW_SEPARATOR			= "\r\n";
    	public static final String TAB						= "\t";
    }
}
