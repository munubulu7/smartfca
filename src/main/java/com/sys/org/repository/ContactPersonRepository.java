package com.sys.org.repository;

import com.sys.org.domain.ContactPerson;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ContactPerson entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContactPersonRepository extends JpaRepository<ContactPerson,Long> {
    
}
