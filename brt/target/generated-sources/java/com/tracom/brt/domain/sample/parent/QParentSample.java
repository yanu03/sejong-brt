package com.tracom.brt.domain.sample.parent;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QParentSample is a Querydsl query type for ParentSample
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QParentSample extends EntityPathBase<ParentSample> {

    private static final long serialVersionUID = -273464303L;

    public static final QParentSample parentSample = new QParentSample("parentSample");

    public final com.tracom.brt.domain.QSimpleJpaModel _super = new com.tracom.brt.domain.QSimpleJpaModel(this);

    public final StringPath etc1 = createString("etc1");

    public final StringPath etc2 = createString("etc2");

    public final StringPath etc3 = createString("etc3");

    public final StringPath etc4 = createString("etc4");

    public final StringPath key = createString("key");

    //inherited
    public final BooleanPath new$ = _super.new$;

    public final StringPath value = createString("value");

    public QParentSample(String variable) {
        super(ParentSample.class, forVariable(variable));
    }

    public QParentSample(Path<? extends ParentSample> path) {
        super(path.getType(), path.getMetadata());
    }

    public QParentSample(PathMetadata metadata) {
        super(ParentSample.class, metadata);
    }

}

