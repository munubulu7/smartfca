package com.sys.org.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sys.org.domain.MaritalStatus;

import com.sys.org.repository.MaritalStatusRepository;
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
 * REST controller for managing MaritalStatus.
 */
@RestController
@RequestMapping("/api")
public class MaritalStatusResource {

    private final Logger log = LoggerFactory.getLogger(MaritalStatusResource.class);

    private static final String ENTITY_NAME = "maritalStatus";

    private final MaritalStatusRepository maritalStatusRepository;

    public MaritalStatusResource(MaritalStatusRepository maritalStatusRepository) {
        this.maritalStatusRepository = maritalStatusRepository;
    }

    /**
     * POST  /marital-statuses : Create a new maritalStatus.
     *
     * @param maritalStatus the maritalStatus to create
     * @return the ResponseEntity with status 201 (Created) and with body the new maritalStatus, or with status 400 (Bad Request) if the maritalStatus has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/marital-statuses")
    @Timed
    public ResponseEntity<MaritalStatus> createMaritalStatus(@RequestBody MaritalStatus maritalStatus) throws URISyntaxException {
        log.debug("REST request to save MaritalStatus : {}", maritalStatus);
        if (maritalStatus.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new maritalStatus cannot already have an ID")).body(null);
        }
        MaritalStatus result = maritalStatusRepository.save(maritalStatus);
        return ResponseEntity.created(new URI("/api/marital-statuses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /marital-statuses : Updates an existing maritalStatus.
     *
     * @param maritalStatus the maritalStatus to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated maritalStatus,
     * or with status 400 (Bad Request) if the maritalStatus is not valid,
     * or with status 500 (Internal Server Error) if the maritalStatus couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/marital-statuses")
    @Timed
    public ResponseEntity<MaritalStatus> updateMaritalStatus(@RequestBody MaritalStatus maritalStatus) throws URISyntaxException {
        log.debug("REST request to update MaritalStatus : {}", maritalStatus);
        if (maritalStatus.getId() == null) {
            return createMaritalStatus(maritalStatus);
        }
        MaritalStatus result = maritalStatusRepository.save(maritalStatus);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, maritalStatus.getId().toString()))
            .body(result);
    }

    /**
     * GET  /marital-statuses : get all the maritalStatuses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of maritalStatuses in body
     */
    @GetMapping("/marital-statuses")
    @Timed
    public List<MaritalStatus> getAllMaritalStatuses() {
        log.debug("REST request to get all MaritalStatuses");
        return maritalStatusRepository.findAll();
    }

    /**
     * GET  /marital-statuses/:id : get the "id" maritalStatus.
     *
     * @param id the id of the maritalStatus to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the maritalStatus, or with status 404 (Not Found)
     */
    @GetMapping("/marital-statuses/{id}")
    @Timed
    public ResponseEntity<MaritalStatus> getMaritalStatus(@PathVariable Long id) {
        log.debug("REST request to get MaritalStatus : {}", id);
        MaritalStatus maritalStatus = maritalStatusRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(maritalStatus));
    }

    /**
     * DELETE  /marital-statuses/:id : delete the "id" maritalStatus.
     *
     * @param id the id of the maritalStatus to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/marital-statuses/{id}")
    @Timed
    public ResponseEntity<Void> deleteMaritalStatus(@PathVariable Long id) {
        log.debug("REST request to delete MaritalStatus : {}", id);
        maritalStatusRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
