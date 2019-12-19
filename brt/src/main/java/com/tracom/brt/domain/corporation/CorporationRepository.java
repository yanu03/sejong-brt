package com.tracom.brt.domain.corporation;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CorporationRepository extends AXBootJPAQueryDSLRepository<Corporation, String> {
}
