package com.sys.org.repository;

import com.sys.org.domain.PostOffice;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PostOffice entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PostOfficeRepository extends JpaRepository<PostOffice,Long> {
    
}
