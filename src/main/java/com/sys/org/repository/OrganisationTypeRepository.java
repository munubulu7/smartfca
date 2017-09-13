package com.sys.org.repository;

import com.sys.org.domain.OrganisationType;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the OrganisationType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrganisationTypeRepository extends JpaRepository<OrganisationType,Long> {
    
}
