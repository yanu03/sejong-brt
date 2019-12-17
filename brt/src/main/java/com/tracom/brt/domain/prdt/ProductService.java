package com.tracom.brt.domain.prdt;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tracom.brt.domain.BaseService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import com.querydsl.core.BooleanBuilder;

import java.util.List;

@Service
public class ProductService extends BaseService<Product, String> {
    private ProductRepository productRepository;

    @Inject
    public ProductService(ProductRepository productRepository) {
        super(productRepository);
        this.productRepository = productRepository;
    }

    public List<Product> gets(RequestParams<Product> requestParams) {
    	String prdtCd = requestParams.getString("prdtCd", "");
    	String prdtNm = requestParams.getString("prdtNm", "");
    	String filter = requestParams.getString("filter");
    	
    	
    	BooleanBuilder builder = new BooleanBuilder();
    	
    	if(isNotEmpty(prdtCd)) {
    		builder.and(qProduct.prdtCd.eq(prdtCd));
    	}
    	
    	if(isNotEmpty(prdtNm)) {
    		builder.and(qProduct.prdtNm.eq(prdtNm));
    	}
    	
    	List<Product> prdtList = select().from(qProduct).where(builder).orderBy(qProduct.prdtCd.asc(), qProduct.prdtNm.asc()).fetch();
    	
    	if(isNotEmpty(filter)) {
    		prdtList = filter(prdtList, filter);
    	}
    	
    	return prdtList;
    }
    
    @Transactional
    public void savePrdt(List<Product> product) {
    	save(product);
    }
}