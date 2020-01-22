package com.tracom.brt.utils;

import java.util.List;

import com.chequer.axboot.core.code.AXBootTypes;
import com.chequer.axboot.core.context.AppContextManager;
import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.SM0105.CommonCodeDetailInfoVO;
import com.tracom.brt.domain.SM0105.SM0105Service;

public class SM0105Utils {

    public static List<CommonCodeDetailInfoVO> get(String groupCd) {
        RequestParams<CommonCodeDetailInfoVO> requestParams = new RequestParams<>(CommonCodeDetailInfoVO.class);
        requestParams.put("coCd", groupCd);
        requestParams.put("useYn", AXBootTypes.Used.YES.getLabel());
        return getService().SM0105G1S2(requestParams);
    }

    public static SM0105Service getService() {
        return AppContextManager.getBean(SM0105Service.class);
    }
}
