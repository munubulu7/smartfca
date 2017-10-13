package com.sys.org.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sys.org.domain.AddressInformation;

import com.sys.org.repository.AddressInformationRepository;
import com.sys.org.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing AddressInformation.
 */
@RestController
@RequestMapping("/api")
public class AddressInformationResource {

    private final Logger log = LoggerFactory.getLogger(AddressInformationResource.class);

    private static final String ENTITY_NAME = "addressInformation";

    private final AddressInformationRepository addressInformationRepository;

    public AddressInformationResource(AddressInformationRepository addressInformationRepository) {
        this.addressInformationRepository = addressInformationRepository;
    }

    /**
     * POST  /address-informations : Create a new addressInformation.
     *
     * @param addressInformation the addressInformation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new addressInformation, or with status 400 (Bad Request) if the addressInformation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/address-informations")
    @Timed
    public ResponseEntity<AddressInformation> createAddressInformation(@RequestBody AddressInformation addressInformation) throws URISyntaxException {
        log.debug("REST request to save AddressInformation : {}", addressInformation);
        if (addressInformation.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new addressInformation cannot already have an ID")).body(null);
        }
        AddressInformation result = addressInformationRepository.save(addressInformation);
        return ResponseEntity.created(new URI("/api/address-informations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /address-informations : Updates an existing addressInformation.
     *
     * @param addressInformation the addressInformation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated addressInformation,
     * or with status 400 (Bad Request) if the addressInformation is not valid,
     * or with status 500 (Internal Server Error) if the addressInformation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/address-informations")
    @Timed
    public ResponseEntity<AddressInformation> updateAddressInformation(@RequestBody AddressInformation addressInformation) throws URISyntaxException {
        log.debug("REST request to update AddressInformation : {}", addressInformation);
        if (addressInformation.getId() == null) {
            return createAddressInformation(addressInformation);
        }
        AddressInformation result = addressInformationRepository.save(addressInformation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, addressInformation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /address-informations : get all the addressInformations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of addressInformations in body
     */
    @GetMapping("/address-informations")
    @Timed
    public List<AddressInformation> getAllAddressInformations() {
        log.debug("REST request to get all AddressInformations");
        return addressInformationRepository.findAllWithEagerRelationships();
    }

    /**
     * GET  /address-informations/:id : get the "id" addressInformation.
     *
     * @param id the id of the addressInformation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the addressInformation, or with status 404 (Not Found)
     */
    @GetMapping("/address-informations/{id}")
    @Timed
    public ResponseEntity<AddressInformation> getAddressInformation(@PathVariable Long id) {
        log.debug("REST request to get AddressInformation : {}", id);
        AddressInformation addressInformation = addressInformationRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(addressInformation));
    }

    /**
     * DELETE  /address-informations/:id : delete the "id" addressInformation.
     *
     * @param id the id of the addressInformation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/address-informations/{id}")
    @Timed
    public ResponseEntity<Void> deleteAddressInformation(@PathVariable Long id) {
        log.debug("REST request to delete AddressInformation : {}", id);
        addressInformationRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
