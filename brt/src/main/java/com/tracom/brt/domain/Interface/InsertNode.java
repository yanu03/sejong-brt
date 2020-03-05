package com.tracom.brt.domain.Interface;

import org.springframework.stereotype.Service;

@Service
public class InsertNode {

	/**두 지점간 거리 계산**/
	public double getDistanceBetween(double x1, double y1, double x2, double y2) {
		double kEarthRadiusKms = 6376.5;
		
		double lat1_rad = y1 * (Math.PI/180);
		double lng1_rad = x1 * (Math.PI/180);
		double lat2_rad = y2 * (Math.PI/180);
		double lng2_rad = x2 * (Math.PI/180);
		
		double lat_gap = lat2_rad - lat1_rad;
		double lng_gap = lng2_rad - lng1_rad;
		
	    double mid_val = Math.pow(Math.sin(lat_gap / 2.0), 2.0) +
                Math.cos(lat1_rad) * 
                Math.cos(lat2_rad) *
                Math.pow(Math.sin(lng_gap / 2.0), 2.0);

	    double circle_distance = 2.0 * Math.atan2(Math.sqrt(mid_val), Math.sqrt(1.0 - mid_val));
	    double distance = kEarthRadiusKms * circle_distance * 1000; 

	    return distance; 
	}
	
	/**한점이 직선상에 직교좌표를 생성한 좌표를 반환**/
	public LocationVO getPointToLine(double x, double y, double x1, double y1, double x2, double y2) {
		boolean isValid = false;
		LocationVO point = new LocationVO();
		
		if(y1 == y2 && x1 == y2)
			y1 -= 0.00001;
		double U = ((y - y1) * (y2 - y1)) + ((x - x1) * (x2 - x1));
		double Udenom = Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2);
		
		U /= Udenom;
		
		y = y1 + (U * (y2 - y1));
		x = x1 + (U * (x2 - x1));
		point.setX(x);
		point.setY(y);
		
		double minx, maxx, miny, maxy;
		
		minx = Math.min(y1, y2);
		maxx = Math.max(y1, y2);
		
		miny = Math.min(x1, x2);
		maxy = Math.max(x1, x2);
		
		isValid = (point.getY() >= minx && point.getY() <= maxx) && (point.getX() >= miny && point.getX() <= maxy);
		return isValid ? point : null;
	}
	
	/**한점이 직선에 직교좌표를 생성하고 거리를 계산**/
	public LocationVO getDistanceToLine(double x, double y, double x1, double y1, double x2, double y2) {
		LocationVO point = getPointToLine(x, y, x1, y1, x2, y2);
		
		if(point == null) {
			return null;
		} else {
			double distance = getDistanceBetween(x, y, point.getX(), point.getY());
			if(distance < 999999999) {
				point.setDistance(distance);
			}
			return point;
		}
	}
}
