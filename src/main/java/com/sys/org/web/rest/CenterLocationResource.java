package com.sys.org.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sys.org.domain.CenterLocation;

import com.sys.org.repository.CenterLocationRepository;
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
 * REST controller for managing CenterLocation.
 */
@RestController
@RequestMapping("/api")
public class CenterLocationResource {

    private final Logger log = LoggerFactory.getLogger(CenterLocationResource.class);

    private static final String ENTITY_NAME = "centerLocation";

    private final CenterLocationRepository centerLocationRepository;

    public CenterLocationResource(CenterLocationRepository centerLocationRepository) {
        this.centerLocationRepository = centerLocationRepository;
    }

    /**
     * POST  /center-locations : Create a new centerLocation.
     *
     * @param centerLocation the centerLocation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new centerLocation, or with status 400 (Bad Request) if the centerLocation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/center-locations")
    @Timed
    public ResponseEntity<CenterLocation> createCenterLocation(@RequestBody CenterLocation centerLocation) throws URISyntaxException {
        log.debug("REST request to save CenterLocation : {}", centerLocation);
        if (centerLocation.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new centerLocation cannot already have an ID")).body(null);
        }
        CenterLocation result = centerLocationRepository.save(centerLocation);
        return ResponseEntity.created(new URI("/api/center-locations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /center-locations : Updates an existing centerLocation.
     *
     * @param centerLocation the centerLocation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated centerLocation,
     * or with status 400 (Bad Request) if the centerLocation is not valid,
     * or with status 500 (Internal Server Error) if the centerLocation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/center-locations")
    @Timed
    public ResponseEntity<CenterLocation> updateCenterLocation(@RequestBody CenterLocation centerLocation) throws URISyntaxException {
        log.debug("REST request to update CenterLocation : {}", centerLocation);
        if (centerLocation.getId() == null) {
            return createCenterLocation(centerLocation);
        }
        CenterLocation result = centerLocationRepository.save(centerLocation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, centerLocation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /center-locations : get all the centerLocations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of centerLocations in body
     */
    @GetMapping("/center-locations")
    @Timed
    public List<CenterLocation> getAllCenterLocations() {
        log.debug("REST request to get all CenterLocations");
        return centerLocationRepository.findAll();
    }

    /**
     * GET  /center-locations/:id : get the "id" centerLocation.
     *
     * @param id the id of the centerLocation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the centerLocation, or with status 404 (Not Found)
     */
    @GetMapping("/center-locations/{id}")
    @Timed
    public ResponseEntity<CenterLocation> getCenterLocation(@PathVariable Long id) {
        log.debug("REST request to get CenterLocation : {}", id);
        CenterLocation centerLocation = centerLocationRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(centerLocation));
    }

    /**
     * DELETE  /center-locations/:id : delete the "id" centerLocation.
     *
     * @param id the id of the centerLocation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/center-locations/{id}")
    @Timed
    public ResponseEntity<Void> deleteCenterLocation(@PathVariable Long id) {
        log.debug("REST request to delete CenterLocation : {}", id);
        centerLocationRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
