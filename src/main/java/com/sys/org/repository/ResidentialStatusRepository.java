package com.sys.org.repository;

import com.sys.org.domain.ResidentialStatus;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ResidentialStatus entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResidentialStatusRepository extends JpaRepository<ResidentialStatus,Long> {
    
}
