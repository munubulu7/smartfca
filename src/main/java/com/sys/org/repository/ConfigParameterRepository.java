package com.sys.org.repository;

import com.sys.org.domain.ConfigParameter;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ConfigParameter entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConfigParameterRepository extends JpaRepository<ConfigParameter,Long> {
    
}
