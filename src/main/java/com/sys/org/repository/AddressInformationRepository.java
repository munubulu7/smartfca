package com.sys.org.repository;

import com.sys.org.domain.AddressInformation;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the AddressInformation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AddressInformationRepository extends JpaRepository<AddressInformation,Long> {
    
}
