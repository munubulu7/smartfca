package com.sys.org.repository;

import com.sys.org.domain.AreaType;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the AreaType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AreaTypeRepository extends JpaRepository<AreaType,Long> {
    
}
