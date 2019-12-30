package com.tracom.brt.domain.altercontract;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QAltercontract is a Querydsl query type for Altercontract
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QAltercontract extends EntityPathBase<Altercontract> {

    private static final long serialVersionUID = 262170085L;

    public static final QAltercontract altercontract = new QAltercontract("altercontract");

    public final com.tracom.brt.domain.QSimpleJpaModel _super = new com.tracom.brt.domain.QSimpleJpaModel(this);

    public final DatePath<java.time.LocalDate> altConDate = createDate("altConDate", java.time.LocalDate.class);

    public final StringPath altDiv = createString("altDiv");

    public final DatePath<java.time.LocalDate> conEdDate = createDate("conEdDate", java.time.LocalDate.class);

    public final StringPath confirmYn = createString("confirmYn");

    public final StringPath conId = createString("conId");

    public final StringPath conNo = createString("conNo");

    public final DatePath<java.time.LocalDate> conStDate = createDate("conStDate", java.time.LocalDate.class);

    //inherited
    public final BooleanPath new$ = _super.new$;

    public final StringPath remark = createString("remark");

    public final NumberPath<Integer> seq = createNumber("seq", Integer.class);

    public final NumberPath<java.math.BigDecimal> suppAmt = createNumber("suppAmt", java.math.BigDecimal.class);

    public final NumberPath<java.math.BigDecimal> vatAmt = createNumber("vatAmt", java.math.BigDecimal.class);

    public QAltercontract(String variable) {
        super(Altercontract.class, forVariable(variable));
    }

    public QAltercontract(Path<? extends Altercontract> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAltercontract(PathMetadata metadata) {
        super(Altercontract.class, metadata);
    }

}

