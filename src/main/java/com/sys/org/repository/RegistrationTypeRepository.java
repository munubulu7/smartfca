package com.sys.org.repository;

import com.sys.org.domain.RegistrationType;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the RegistrationType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RegistrationTypeRepository extends JpaRepository<RegistrationType,Long> {
    
}
