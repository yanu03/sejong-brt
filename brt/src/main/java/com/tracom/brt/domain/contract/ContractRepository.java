package com.tracom.brt.domain.contract;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContractRepository extends AXBootJPAQueryDSLRepository<Contract, String> {
}
