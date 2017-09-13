package com.sys.org.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sys.org.domain.Pincode;

import com.sys.org.repository.PincodeRepository;
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
 * REST controller for managing Pincode.
 */
@RestController
@RequestMapping("/api")
public class PincodeResource {

    private final Logger log = LoggerFactory.getLogger(PincodeResource.class);

    private static final String ENTITY_NAME = "pincode";

    private final PincodeRepository pincodeRepository;

    public PincodeResource(PincodeRepository pincodeRepository) {
        this.pincodeRepository = pincodeRepository;
    }

    /**
     * POST  /pincodes : Create a new pincode.
     *
     * @param pincode the pincode to create
     * @return the ResponseEntity with status 201 (Created) and with body the new pincode, or with status 400 (Bad Request) if the pincode has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pincodes")
    @Timed
    public ResponseEntity<Pincode> createPincode(@RequestBody Pincode pincode) throws URISyntaxException {
        log.debug("REST request to save Pincode : {}", pincode);
        if (pincode.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new pincode cannot already have an ID")).body(null);
        }
        Pincode result = pincodeRepository.save(pincode);
        return ResponseEntity.created(new URI("/api/pincodes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pincodes : Updates an existing pincode.
     *
     * @param pincode the pincode to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated pincode,
     * or with status 400 (Bad Request) if the pincode is not valid,
     * or with status 500 (Internal Server Error) if the pincode couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pincodes")
    @Timed
    public ResponseEntity<Pincode> updatePincode(@RequestBody Pincode pincode) throws URISyntaxException {
        log.debug("REST request to update Pincode : {}", pincode);
        if (pincode.getId() == null) {
            return createPincode(pincode);
        }
        Pincode result = pincodeRepository.save(pincode);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pincode.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pincodes : get all the pincodes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of pincodes in body
     */
    @GetMapping("/pincodes")
    @Timed
    public List<Pincode> getAllPincodes() {
        log.debug("REST request to get all Pincodes");
        return pincodeRepository.findAll();
    }

    /**
     * GET  /pincodes/:id : get the "id" pincode.
     *
     * @param id the id of the pincode to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pincode, or with status 404 (Not Found)
     */
    @GetMapping("/pincodes/{id}")
    @Timed
    public ResponseEntity<Pincode> getPincode(@PathVariable Long id) {
        log.debug("REST request to get Pincode : {}", id);
        Pincode pincode = pincodeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(pincode));
    }

    /**
     * DELETE  /pincodes/:id : delete the "id" pincode.
     *
     * @param id the id of the pincode to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pincodes/{id}")
    @Timed
    public ResponseEntity<Void> deletePincode(@PathVariable Long id) {
        log.debug("REST request to delete Pincode : {}", id);
        pincodeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
