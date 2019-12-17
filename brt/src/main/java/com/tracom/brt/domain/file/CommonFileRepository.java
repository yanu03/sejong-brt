package com.tracom.brt.domain.file;

import com.chequer.axboot.core.domain.base.AXBootJPAQueryDSLRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommonFileRepository extends AXBootJPAQueryDSLRepository<CommonFile, Long> {
}
