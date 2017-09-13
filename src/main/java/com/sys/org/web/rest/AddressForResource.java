package com.sys.org.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sys.org.domain.AddressFor;

import com.sys.org.repository.AddressForRepository;
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
 * REST controller for managing AddressFor.
 */
@RestController
@RequestMapping("/api")
public class AddressForResource {

    private final Logger log = LoggerFactory.getLogger(AddressForResource.class);

    private static final String ENTITY_NAME = "addressFor";

    private final AddressForRepository addressForRepository;

    public AddressForResource(AddressForRepository addressForRepository) {
        this.addressForRepository = addressForRepository;
    }

    /**
     * POST  /address-fors : Create a new addressFor.
     *
     * @param addressFor the addressFor to create
     * @return the ResponseEntity with status 201 (Created) and with body the new addressFor, or with status 400 (Bad Request) if the addressFor has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/address-fors")
    @Timed
    public ResponseEntity<AddressFor> createAddressFor(@RequestBody AddressFor addressFor) throws URISyntaxException {
        log.debug("REST request to save AddressFor : {}", addressFor);
        if (addressFor.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new addressFor cannot already have an ID")).body(null);
        }
        AddressFor result = addressForRepository.save(addressFor);
        return ResponseEntity.created(new URI("/api/address-fors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /address-fors : Updates an existing addressFor.
     *
     * @param addressFor the addressFor to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated addressFor,
     * or with status 400 (Bad Request) if the addressFor is not valid,
     * or with status 500 (Internal Server Error) if the addressFor couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/address-fors")
    @Timed
    public ResponseEntity<AddressFor> updateAddressFor(@RequestBody AddressFor addressFor) throws URISyntaxException {
        log.debug("REST request to update AddressFor : {}", addressFor);
        if (addressFor.getId() == null) {
            return createAddressFor(addressFor);
        }
        AddressFor result = addressForRepository.save(addressFor);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, addressFor.getId().toString()))
            .body(result);
    }

    /**
     * GET  /address-fors : get all the addressFors.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of addressFors in body
     */
    @GetMapping("/address-fors")
    @Timed
    public List<AddressFor> getAllAddressFors() {
        log.debug("REST request to get all AddressFors");
        return addressForRepository.findAll();
    }

    /**
     * GET  /address-fors/:id : get the "id" addressFor.
     *
     * @param id the id of the addressFor to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the addressFor, or with status 404 (Not Found)
     */
    @GetMapping("/address-fors/{id}")
    @Timed
    public ResponseEntity<AddressFor> getAddressFor(@PathVariable Long id) {
        log.debug("REST request to get AddressFor : {}", id);
        AddressFor addressFor = addressForRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(addressFor));
    }

    /**
     * DELETE  /address-fors/:id : delete the "id" addressFor.
     *
     * @param id the id of the addressFor to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/address-fors/{id}")
    @Timed
    public ResponseEntity<Void> deleteAddressFor(@PathVariable Long id) {
        log.debug("REST request to delete AddressFor : {}", id);
        addressForRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
