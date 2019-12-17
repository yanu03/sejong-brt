package com.tracom.brt.domain.prdt;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QProduct is a Querydsl query type for Product
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QProduct extends EntityPathBase<Product> {

    private static final long serialVersionUID = 2035251248L;

    public static final QProduct product = new QProduct("product");

    public final com.tracom.brt.domain.QSimpleJpaModel _super = new com.tracom.brt.domain.QSimpleJpaModel(this);

    //inherited
    public final BooleanPath new$ = _super.new$;

    public final StringPath origin = createString("origin");

    public final StringPath prdtCd = createString("prdtCd");

    public final StringPath prdtNm = createString("prdtNm");

    public final NumberPath<Integer> purchasePrice = createNumber("purchasePrice", Integer.class);

    public final NumberPath<Integer> salesPrice = createNumber("salesPrice", Integer.class);

    public QProduct(String variable) {
        super(Product.class, forVariable(variable));
    }

    public QProduct(Path<? extends Product> path) {
        super(path.getType(), path.getMetadata());
    }

    public QProduct(PathMetadata metadata) {
        super(Product.class, metadata);
    }

}

