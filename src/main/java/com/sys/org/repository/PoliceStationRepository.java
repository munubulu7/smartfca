package com.sys.org.repository;

import com.sys.org.domain.PoliceStation;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PoliceStation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PoliceStationRepository extends JpaRepository<PoliceStation,Long> {
    
}
