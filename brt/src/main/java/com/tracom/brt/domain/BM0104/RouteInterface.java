package com.tracom.brt.domain.BM0104;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.net.UnknownHostException;

import javax.servlet.ServletOutputStream;

import org.json.simple.JSONObject;

public class RouteInterface {

public String getAjax_POST() {
	//String url = "http://bis.sejong.go.kr/web/traffic/searchBusRouteDetail.do";
	String url = "http://openapi.tago.go.kr/openapi/service/BusRouteInfoInqireService/getRouteNoList?cityCode=12&ServiceKey=q7BdPG6D2Gl0PoL8WUl7tbu0iI%2FxiWXnPqWdoohP4yqxmCjv0838gCkMvMmjjWYWDy9KcPmTHySjj%2Fq4IXmFgA%3D%3D";
    String sb = "";  
    try {
       URL object=new URL(url);

       HttpURLConnection con = (HttpURLConnection) object.openConnection();

       con.setDoOutput(true);
       con.setDoInput(true);
       con.setRequestProperty("Content-Type", "application/json");
       con.setRequestProperty("Accept", "*/*");
       con.setRequestProperty("X-Requested-With", "XMLHttpRequest");
       con.setRequestMethod("GET");


       JSONObject data = new JSONObject();
       //data.put("busRouteId","293000099");
       OutputStreamWriter wr= new OutputStreamWriter(con.getOutputStream());

       wr.write(data.toString());
       wr.flush();


       int HttpResult =con.getResponseCode(); 

       if(HttpResult ==HttpURLConnection.HTTP_OK){
           BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(),"utf-8"));  
           String line = null;  
           while ((line = br.readLine()) != null) {  
            sb = sb+line + "\n";  
           }  
           br.close();  
           System.out.println("success");
           System.out.println(URLEncoder.encode(sb.toString(), "UTF-8"));
           System.out.println(""+sb.toString());  
       }else{
    	   System.out.println("fail");
           System.out.println(con.getResponseMessage());  
       }  
       }
      catch (Exception e) {
       e.printStackTrace();
      }
      finally {

      }

      return sb;
	}

public void ajax2() {
	
	
	}
}
