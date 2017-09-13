package com.sys.org.repository;

import com.sys.org.domain.Employers;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Employers entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmployersRepository extends JpaRepository<Employers,Long> {
    
}
