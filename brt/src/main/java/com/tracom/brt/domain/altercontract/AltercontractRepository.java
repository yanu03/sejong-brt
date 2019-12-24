package com.tracom.brt.domain.altercontract;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AltercontractRepository extends AXBootJPAQueryDSLRepository<Altercontract, Altercontract.AltercontractId> {
}
