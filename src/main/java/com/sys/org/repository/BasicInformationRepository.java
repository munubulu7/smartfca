package com.sys.org.repository;

import com.sys.org.domain.BasicInformation;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the BasicInformation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BasicInformationRepository extends JpaRepository<BasicInformation,Long> {
    
}
