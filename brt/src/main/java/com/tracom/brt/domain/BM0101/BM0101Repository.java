package com.tracom.brt.domain.BM0101;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BM0101Repository extends AXBootJPAQueryDSLRepository<CorpInfoVo, String> {
}
