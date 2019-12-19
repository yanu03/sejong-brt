package com.tracom.brt.domain;

import java.io.Serializable;

import com.chequer.axboot.core.domain.base.AXBootBaseService;
import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import com.tracom.brt.domain.code.QCommonCode;
import com.tracom.brt.domain.corporation.QCorporation;
import com.tracom.brt.domain.file.QCommonFile;
import com.tracom.brt.domain.prdt.QProduct;
import com.tracom.brt.domain.program.QProgram;
import com.tracom.brt.domain.program.menu.QMenu;
import com.tracom.brt.domain.user.QUser;
import com.tracom.brt.domain.user.auth.QUserAuth;
import com.tracom.brt.domain.user.auth.menu.QAuthGroupMenu;
import com.tracom.brt.domain.user.role.QUserRole;


public class BaseService<T, ID extends Serializable> extends AXBootBaseService<T, ID> {

    protected QUserRole qUserRole = QUserRole.userRole;
    protected QAuthGroupMenu qAuthGroupMenu = QAuthGroupMenu.authGroupMenu;
    protected QCommonCode qCommonCode = QCommonCode.commonCode;
    protected QUser qUser = QUser.user;
    protected QProgram qProgram = QProgram.program;
    protected QUserAuth qUserAuth = QUserAuth.userAuth;
    protected QMenu qMenu = QMenu.menu;
    protected QCommonFile qCommonFile = QCommonFile.commonFile;
    protected QProduct qProduct = QProduct.product;
    protected QCorporation qCorporation = QCorporation.corporation;

    protected AXBootJPAQueryDSLRepository<T, ID> repository;

    public BaseService() {
        super();
    }

    public BaseService(AXBootJPAQueryDSLRepository<T, ID> repository) {
        super(repository);
        this.repository = repository;
    }
}
