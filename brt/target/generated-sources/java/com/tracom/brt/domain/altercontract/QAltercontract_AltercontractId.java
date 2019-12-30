package com.tracom.brt.domain.altercontract;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QAltercontract_AltercontractId is a Querydsl query type for AltercontractId
 */
@Generated("com.querydsl.codegen.EmbeddableSerializer")
public class QAltercontract_AltercontractId extends BeanPath<Altercontract.AltercontractId> {

    private static final long serialVersionUID = 774425658L;

    public static final QAltercontract_AltercontractId altercontractId = new QAltercontract_AltercontractId("altercontractId");

    public final StringPath conId = createString("conId");

    public final NumberPath<Integer> seq = createNumber("seq", Integer.class);

    public QAltercontract_AltercontractId(String variable) {
        super(Altercontract.AltercontractId.class, forVariable(variable));
    }

    public QAltercontract_AltercontractId(Path<? extends Altercontract.AltercontractId> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAltercontract_AltercontractId(PathMetadata metadata) {
        super(Altercontract.AltercontractId.class, metadata);
    }

}

