package com.sys.org.repository;

import com.sys.org.domain.Salutation;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Salutation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SalutationRepository extends JpaRepository<Salutation,Long> {
    
}
