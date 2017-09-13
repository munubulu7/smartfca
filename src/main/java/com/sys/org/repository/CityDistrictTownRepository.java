package com.sys.org.repository;

import com.sys.org.domain.CityDistrictTown;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CityDistrictTown entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CityDistrictTownRepository extends JpaRepository<CityDistrictTown,Long> {
    
}
