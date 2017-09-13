package com.sys.org.repository;

import com.sys.org.domain.PremisesBuildingVillage;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PremisesBuildingVillage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PremisesBuildingVillageRepository extends JpaRepository<PremisesBuildingVillage,Long> {
    
}
