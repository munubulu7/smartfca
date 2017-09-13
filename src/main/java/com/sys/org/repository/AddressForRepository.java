package com.sys.org.repository;

import com.sys.org.domain.AddressFor;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the AddressFor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AddressForRepository extends JpaRepository<AddressFor,Long> {
    
}
