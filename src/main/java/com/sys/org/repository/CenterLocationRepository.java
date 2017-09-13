package com.sys.org.repository;

import com.sys.org.domain.CenterLocation;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CenterLocation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CenterLocationRepository extends JpaRepository<CenterLocation,Long> {
    
}
