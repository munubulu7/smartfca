package com.sys.org.repository;

import com.sys.org.domain.AddressInformation;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the AddressInformation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AddressInformationRepository extends JpaRepository<AddressInformation,Long> {
    
    @Query("select distinct address_information from AddressInformation address_information left join fetch address_information.addressFors")
    List<AddressInformation> findAllWithEagerRelationships();

    @Query("select address_information from AddressInformation address_information left join fetch address_information.addressFors where address_information.id =:id")
    AddressInformation findOneWithEagerRelationships(@Param("id") Long id);
    
}
