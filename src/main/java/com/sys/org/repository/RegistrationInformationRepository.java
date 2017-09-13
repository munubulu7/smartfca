package com.sys.org.repository;

import com.sys.org.domain.RegistrationInformation;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the RegistrationInformation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RegistrationInformationRepository extends JpaRepository<RegistrationInformation,Long> {
    
}
